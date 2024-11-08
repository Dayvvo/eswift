import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { AuthHeaderProps } from "./authheader";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Btn from "@/components/Btn";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthBackground } from "./authBackground";

export const CustomerSignUpcreen = () => {
  const navigate = useRouter();

  const HandleGoogleSubmit = async () => {
    let requestId = "";
    const allowedOrigin = "https://accounts.google.com";


    const authWindow = window.open(
      `/api/auth/google`,
      "_blank",
      "width=500, height=500"
    );

    if (!authWindow || !authWindow.focus) {
      console.error(`Can't access server at the moment`);
      return;
    }

    window.addEventListener("message", async (event) => {
      if (event.origin !== allowedOrigin) {
        return console.log("not from google");
      }

      if (
        event.data &&
        event.data.type === "googleAuthCode" &&
        event.data.requestId === requestId
      ) {
        const googleAuthCode = event.data.code;

        try {
          const response = await axios.get("api/auth/google", googleAuthCode);
          console.log(response.data);
        } catch (err) {
          console.error("Error verifying Google auth code:", err);
        } finally {
          authWindow.close();
          navigate.push("/dashboard");
        }
      }
    });
  };

  const router  = useRouter();

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      bg="transparent"
      justifyContent={"space-between"}
      w={"100%"}
      minH={"100vh"}
      px={{ base: "16px", lg: "44px" }}
      py={'24px'}
      className="robotoF"
    >
      <AuthBackground />
      <Box h={"fit-content"}>
        <Image width={200} height={100} src={"/Logo.svg"} alt={"e-Swift"} />
      </Box>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Box
          w={{ base: "100%", sm: "440px" }}
          h={"fit-content"}
          p={{ base: "16px", md: "32px" }}
          border={"1px solid var(--soft200)"}
          boxShadow={"lg"}
          borderRadius={"20px"}
          bg={"white"}
        >
          <AuthHeaderProps
            icon="/LoginIcon.png"
            title="Create an account to access exclusive features and benefits."
            description=""
          />
          <Box w={"100%"} border={"1px solid var(--soft200)"} my={"24px"} />
            
            <Btn
              onClick={()=>router.push('/api/auth/google')}
              bg={"transparent"}
              my={2}
              borderColor={"#D0DDD5"}
              display={"flex"}
              alignItems={"center"}
              w={"100%"}
              h={"40px"}
              border={"1px"}
              borderRadius={"10px"}
              textColor={"#667085"}
              fontSize={{ base: "12px", lg: "14px" }}
              gap={"4px"}
            >
              Sign in with Google <FcGoogle />
            </Btn>
            <Flex w="100%" my={"10px"} justifyContent={"space-between"}>
              <Text
                fontWeight={400}
                fontSize={{ base: "10px", lg: "14px" }}
                textColor={"var(--strong950)"}
              >
                Already have an account?
              </Text>
              <Link href={"/login"}>
                <Text
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--sub600)"}
                  textDecor={"underline"}
                >
                  Log In
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
