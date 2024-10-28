import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { AuthHeaderProps } from "./authheader";
import { MdOutlineEmail } from "react-icons/md";
import React from "react";
import Btn from "@/components/Btn";
import Link from "next/link";

export const ResetPasswordScreen = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      bg={"#FFF"}
      justifyContent={"space-between"}
      w={"100%"}
      h={"100vh"}
      px={{ base: "16px", lg: "44px" }}
      py={"24px"}
      className="robotoF"
    >
      <Box h={"fit-content"}>
        <Image width={200} height={100} src={"/logo.svg"} alt={"e-Swift"} />
      </Box>
      <Flex flexBasis={1} justifyContent={"center"} alignItems={"center"}>
        <Box
          w={{ base: "100%", sm: "440px" }}
          h={"fit-content"}
          p={{ base: "16px", md: "32px" }}
          border={"1px solid var(--soft200)"}
          boxShadow={"lg"}
          borderRadius={"20px"}
        >
          <AuthHeaderProps
            icon="/registerIcon.png"
            title="Reset Password"
            description="Enter your email to reset your password."
          />
          <Box w={"100%"} border={"1px solid var(--soft200)"} my={"24px"} />
          <Flex flexDir={"column"} w={"100%"} gap={"12px"}>
            <FormControl w={"100%"}>
              <FormLabel
                fontWeight={500}
                fontSize={"14px"}
                textColor={"var(--strong950)"}
              >
                Email address{" "}
                <Text as="span" textColor={"var(--primaryBase)"}>
                  *
                </Text>
              </FormLabel>
              <InputGroup
                border={"1px"}
                borderRadius={"10px"}
                borderColor={"var(--soft200)"}
                cursor={"text"}
                fontSize={14}
                textColor={"var--(sub600)"}
                w="100%"
                h="40px"
                _placeholder={{ textColor: "var--(soft400)" }}
              >
                <InputLeftElement pointerEvents="none" color={"var(--soft400)"}>
                  <MdOutlineEmail className="formicon" />
                </InputLeftElement>
                <Input
                  w={"100%"}
                  h={"100%"}
                  type="email"
                  placeholder="hello@gmail.com"
                />
              </InputGroup>
              <FormHelperText>Email is required</FormHelperText>
            </FormControl>
          </Flex>
          <Btn
            bg={"var(--primaryBase)"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            border={"1px"}
            borderColor={"#FFFFFF"}
            borderRadius={"10px"}
            textColor={"#FFFFFF"}
            my={"24px"}
          >
            <Link href={"/verify-password"}>Reset Password</Link>
          </Btn>
          <Flex w="100%" justifyContent={"center"}>
            <Link href={"/login"}>
              <Text
                fontWeight={500}
                fontSize={"14px"}
                textColor={"var(--sub600)"}
                textDecor={"underline"}
              >
                Back to Login
              </Text>
            </Link>
          </Flex>
        </Box>
      </Flex>
      <Text fontSize={"14px"} fontWeight={400} textColor={"var(--sub600)"}>
        © {new Date().getFullYear()} e-Swift Property Mart
      </Text>
    </Box>
  );
};
