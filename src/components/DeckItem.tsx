import { Text, Box, Pressable } from "native-base";

interface CardProps {
  title: string;
  description: string;
  data: string;
  action?: () => void;
}

export const DeckItem = ({ description, data, title, action }: CardProps) => {
  return (
    <Pressable onPress={action}>
      <Box
        bgColor={"white"}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        rounded="lg"
        h={16}
        w={85}
        p={3}
      >
        <Box style={{ display: "flex" }}>
          <Text color={"primary.500"} fontSize={"md"}>
            {title}
          </Text>
          <Text color={"primary.500"} opacity={50} fontSize={"xs"}>
            {description}
          </Text>
        </Box>
        <Text fontSize={"lg"} color="primary.500">
          {data}
        </Text>
      </Box>
    </Pressable>
  );
};