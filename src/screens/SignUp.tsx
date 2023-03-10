import {
  ScrollView,
  Text,
  Box,
  HStack,
  VStack,
  FormControl,
  Input,
  Pressable,
  StatusBar,
  Button,
  useToast,
  View,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { CreateUserDTO } from "src/@types/types";
import { AlertFeedback } from "@components/AlertFeedback";
import { createUser } from "@services/useUserService";
import { useState } from "react";

const schema = yup.object({
  name: yup.string().required("Required field"),
  email: yup.string().required("Required field"),
  password: yup.string().required("Required field"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required field"),
});

export const SignUp = () => {
  const { navigate } = useNavigation();
  const [isRequestingData, setIsRequestingData] = useState<boolean>(false);
  const toast = useToast();
  const toastId = "toast-id";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserDTO>({
    resolver: yupResolver(schema),
  });

  const handleSignup = async (data: CreateUserDTO) => {
    setIsRequestingData(true);
    try {
      const message = await createUser(data);
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          title: "User created successfully",
          placement: "top",
          render: () => (
            <AlertFeedback
              title="Success"
              message={message}
              variant="success"
            />
          ),
        });
      }
      navigate("signin");
      reset();
    } catch (error: any) {
      const message = error.response.data.message;
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          title: "Error",
          placement: "top",
          render: () => (
            <AlertFeedback title="Error" message={message} variant="error" />
          ),
        });
      }
    } finally {
      setIsRequestingData(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        position: "relative",
        flex: 1,
        paddingTop: 62,
        backgroundColor: "white"
      }}
    >
      <Box position={"absolute"} top={0} left={0}>
        <Svg width={152} height={152} fill="none" viewBox="0 0 152 152">
          <Path
            d="M152 0C0 12.5 31.5 94.5 0 152C-83.9473 152 -152 83.9473 -152 0C-152 -83.9473 -83.9473 -152 0 -152C83.9473 -152 152 -83.9473 152 0Z"
            fill="#013099"
          />
        </Svg>
      </Box>
      <Box position={"absolute"} bottom={0} right={0}>
        <Svg width={161} height={130} fill="none" viewBox="0 0 161 130">
          <Path
            d="M304 160C304 243.947 235.947 312 152 312C68.0527 312 0 243.947 0 160C0 76.0527 152.5 149 161 0C244.947 0 304 76.0527 304 160Z"
            fill="#C8102E"
          />
        </Svg>
      </Box>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Box>
        <Svg width={68} height={75} fill="none" viewBox="0 0 68 75">
          <Path
            d="M0 29.9832C0 24.1764 1.25422 19.0117 3.76265 14.4891C6.27108 9.91067 9.75501 6.36516 14.2144 3.8526C18.7296 1.2842 23.8301 0 29.5159 0C36.4837 0 42.4482 1.84255 47.4093 5.52764C52.3705 9.21273 55.6872 14.2379 57.3595 20.603H41.6399C40.4694 18.1463 38.7971 16.2758 36.6231 14.9916C34.5049 13.7074 32.08 13.0653 29.3486 13.0653C24.945 13.0653 21.3774 14.6008 18.646 17.6717C15.9146 20.7426 14.5489 24.8465 14.5489 29.9832C14.5489 35.12 15.9146 39.2239 18.646 42.2948C21.3774 45.3657 24.945 46.9012 29.3486 46.9012C32.08 46.9012 34.5049 46.2591 36.6231 44.9749C38.7971 43.6907 40.4694 41.8202 41.6399 39.3635H57.3595C55.6872 45.7286 52.3705 50.7538 47.4093 54.4389C42.4482 58.0681 36.4837 59.8827 29.5159 59.8827C23.8301 59.8827 18.7296 58.6265 14.2144 56.1139C9.75501 53.5455 6.27108 50 3.76265 45.4774C1.25422 40.9548 0 35.7901 0 29.9832Z"
            fill="#013099"
          />
          <Path
            d="M68 26.7504L47.5145 75H36.7449L44.2368 58.3501L30.9505 26.7504H42.1297L49.6801 47.2111L57.1719 26.7504H68Z"
            fill="#C8102E"
          />
        </Svg>
      </Box>
      <VStack w="3/4" mt={6}>
        <FormControl.Label _text={{ color: "primary.500" }}>Name</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              borderWidth={0}
              placeholderTextColor={"#728ABE"}
              color="primary.500"
              backgroundColor="#F5F8FF"
              placeholder="Your name here"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              _focus={{ borderColor: "primary.500" }}
            />
          )}
          name="name"
        />
        <Text textAlign={"right"} color="rose.500" fontSize={"xs"}>
          {errors.name?.message}
        </Text>
        <FormControl.Label _text={{ color: "primary.500" }}>Email</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              borderWidth={0}
              placeholderTextColor={"#728ABE"}
              color="primary.500"
              backgroundColor="#F5F8FF"
              placeholder="Your email here"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              _focus={{ borderColor: "primary.500" }}
            />
          )}
          name="email"
        />
        <Text textAlign={"right"} color="rose.500" fontSize={"xs"}>
          {errors.email?.message}
        </Text>
        <FormControl.Label _text={{ color: "primary.500" }}>Password</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              borderWidth={0}
              placeholderTextColor={"#728ABE"}
              color="primary.500"
              backgroundColor="#F5F8FF"
              type="password"
              placeholder="Your password here"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              _focus={{ borderColor: "primary.500" }}
            />
          )}
          name="password"
        />
        <Text textAlign={"right"} color="rose.500" fontSize={"xs"}>
          {errors.password?.message}
        </Text>
        <FormControl.Label _text={{ color: "primary.500" }}>Confirm Password</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              borderWidth={0}
              placeholderTextColor={"#728ABE"}
              color="primary.500"
              backgroundColor="#F5F8FF"
              type="password"
              placeholder="Your password here"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              _focus={{ borderColor: "primary.500" }}
            />
          )}
          name="passwordConfirmation"
        />
        <Text textAlign={"right"} color="rose.500" fontSize={"xs"}>
          {errors.passwordConfirmation?.message}
        </Text>

        <FormControl mt={6} alignItems="center">
          <Button
            onPress={handleSubmit(handleSignup)}
            bgColor={"secondary.500"}
            fontSize={"xl"}
            fontWeight="bold"
            w="full"
            _pressed={{
              bg: "secondary.800",
            }}
            isLoading={isRequestingData}
          >
            Sign Up
          </Button>
        </FormControl>
      </VStack>
      <HStack space={1} justifyContent="center" mt={6}>
        <Text color="primary.500">Already have an account?</Text>
        <Pressable onPress={() => navigate("signin")}>
          <Text color="secondary.500">Sign in</Text>
        </Pressable>
      </HStack>
    </ScrollView>
  );
};
