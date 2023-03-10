import React from "react";
import { Box, Text } from "native-base";

interface CardTagProps {
  title: string;
}

export const CardTag = ({ title }: CardTagProps) => {
  return (
    <Box
      p={1}
      rounded="md"
      bgColor="primary.100"
      display={"flex"}
      alignItems={"center"}
      opacity={50}
    >
      <Text textAlign={"center"} color={"primary.500"} fontSize={10}>
        {title}
      </Text>
    </Box>
  );
};
