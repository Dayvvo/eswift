import Btn from "@/components/Btn";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export const SettingsScreen = () => {
  const [user, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const settings: any[] = [
    {
      id: 1,
      type: "Full Name",
      description: "Your name will be visible to your contacts.",
      info: `${user?.firstName} ${user.lastName}`,
    },
    {
      id: 2,
      type: "Email Address",
      description: "Business email address recommended.",
      info: user.email,
    },
    {
      id: 3,
      type: "Phone Number",
      description: "Business phone number recommended.",
      info: user.phoneNumber,
    },
    {
      id: 4,
      type: "Legal Address",
      description: "Legal residential address for billing details",
      info: user.address,
    },
  ];

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    }
  }, []);
  return (
    <>
      <Box w={"100%"}>
        <Flex flexDir={"column"} w={"100%"} className="inter">
          <Flex
            w={"100%"}
            alignItems={"center"}
            pt={"24px"}
            pb={"20px"}
            borderBottom={"1px solid var(--soft200)"}
          >
            <Flex w={"100%"} gap={"24px"} justifyContent={"space-between"}>
              <Box>
                <Text
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                  mb={"6px"}
                >
                  Profile Photo
                </Text>
                <Text
                  fontWeight={400}
                  fontSize={"12px"}
                  textColor={"var(--sub600)"}
                >
                  Min 400x400px, PNG or JPEG Formats.
                </Text>
              </Box>
              <Flex
                alignItems={"center"}
                w={"40%"}
                gap={"20px"}
                h={"fit-content"}
              >
                <Box
                  w={"fit-content"}
                  h={"fit-content"}
                  borderRadius={"999px"}
                  overflow={"hidden"}
                >
                  <Image width={56} height={56} src={"/avatar1.png"} alt="/" />
                </Box>
                <Btn
                  bg={"transparent"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"68px"}
                  h={"32px"}
                  borderRadius={"8px"}
                  textColor={"var(--sub600)"}
                  fontWeight={500}
                  fontSize={"14px"}
                  border={"1px solid var(--soft200)"}
                >
                  Upload
                </Btn>
              </Flex>
            </Flex>
          </Flex>
          {settings.map((setting) => (
            <Flex
              key={setting?.id}
              w={"100%"}
              alignItems={"center"}
              py={"20px"}
              borderBottom={"1px solid var(--soft200)"}
            >
              <Flex w={"100%"} gap={"24px"} justifyContent={"space-between"}>
                <Box w={"50%"}>
                  <Text
                    fontWeight={500}
                    fontSize={"14px"}
                    textColor={"var(--strong950)"}
                    mb={"6px"}
                  >
                    {setting?.type}
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={"12px"}
                    textColor={"var(--sub600)"}
                  >
                    {setting?.description}
                  </Text>
                </Box>
                <Flex flexDir="column" gap={"12px"} w={"40%"}>
                  <Text
                    fontWeight={500}
                    fontSize={"14px"}
                    textColor={"var(--strong950)"}
                    maxW={"180px"}
                  >
                    {setting?.info}
                  </Text>
                  <Text
                    display={"flex"}
                    alignItems={"center"}
                    fontWeight={500}
                    fontSize={"14px"}
                    textColor={"var(--primaryBase)"}
                  >
                    Edit <IoIosArrowForward />
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
          <Flex w={"100%"} alignItems={"center"} py={"20px"}>
            <Flex
              w={"100%"}
              flexDir={{ base: "column", lg: "row" }}
              justifyContent={"space-between"}
              gap={"24px"}
            >
              <Box>
                <Text
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                  mb={"6px"}
                >
                  Change Password
                </Text>
                <Text
                  fontWeight={400}
                  fontSize={"12px"}
                  textColor={"var(--sub600)"}
                >
                  Update password for enhanced account security.
                </Text>
              </Box>
              <Btn
                bg={"transparent"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                w={"148px"}
                h={"40px"}
                borderRadius={"8px"}
                textColor={"var(--sub600)"}
                fontWeight={500}
                fontSize={"14px"}
                border={"1px solid var(--soft200)"}
              >
                Change Password
              </Btn>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
