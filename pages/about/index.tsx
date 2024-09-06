import Btn from "@/components/Btn";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const About = () => {
  const router = useRouter();

  return (
    <Box>
      <Btn color="#000" bgColor="red" onClick={() => router.push("/")}>
        About us
      </Btn>
    </Box>
  );
};

export default About;
