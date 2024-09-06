import { Box, Flex, Grid, Image, Img, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import Divider from "./Divider";
import Btn from "./Btn";
import {
  BlogIcon,
  DashboardIcon,
  NotifIcon,
  ProjectIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "./svg";
import { FiHome, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom={"1px solid #E1E4EA"}
      padding={"40px 30px 40px 60px"}
      left={{ base: "20px", lg: "256px" }}
      maxW={{ base: "full", lg: "80vw" }}
      pos="sticky"
      zIndex={99}
    >
      <Grid gridTemplateColumns={"40px 2fr"} gap={0}>
        <Flex
          border={"1px solid #E1E4EA"}
          borderRadius={"50%"}
          maxW={"30px"}
          h="30px"
          align={"center"}
          justify={"center"}
          mt="15%"
        >
          <DashboardIcon />
        </Flex>
        <Flex direction={"column"}>
          <Text
            className="robotoF"
            color="#0E121B"
            fontSize={".875rem"}
            fontWeight={500}
          >
            Dashboard
          </Text>
          <Text
            className="robotoF"
            color="#525866"
            fontSize={".75rem"}
            fontWeight={400}
          >
            An overview of activities, verify users and properties.
          </Text>
        </Flex>
      </Grid>
      <Flex gap={"20px"} alignItems={"center"}>
        <SearchIcon />
        <NotifIcon />
      </Flex>
    </Flex>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  const navData = [
    {
      label: "Dashboard",
      icon: (color:string) => <DashboardIcon color={color} />,
      url: "/dashboard",
    },
    {
      label: "Users",
      icon: (color:string) => <UserIcon color={color} />,
      url: "/users",
    },
    {
      label: "Property",
      icon: (color:string) => <FiHome size={"1rem"} color={color} />,
      url: "/property",
    },
    {
      label: "Projects",
      icon: (color:string) => <ProjectIcon color={color} />,
      url: "/projects",
    },
    {
      label: "Blog",
      icon: (color:string) => <BlogIcon color={color} />,
      url: "/blog",
    },
    {
      label: "Team",
      icon: (color:string) => <FiUser size={"1rem"} color={color} />,
      url: "/team",
    },
    {
      label: "Settings",
      icon: (color:string) => <SettingsIcon color={color} />,
      url: "/settings",
    },
  ];

  const route = window.location.href;
  console.log("route", route);

  const path = route.split("/").pop();
  console.log("path", path);

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <Box
      borderRight={"1px solid #E1E4EA"} py="40px" w="244px" minH={"100vh"}>
=======
    <Box borderRight={"1px solid #E1E4EA"} pt="40px" w="244px" minH={"100vh"}>
>>>>>>> b574ee1216d2747fd38608ec5715b9dda26e440d
      <TabList
        display={"flex"}
        flexDir={"column"}
        alignItems={"flex-start"}
        padding={"0 1.5rem 3.5rem 1.5rem"}
        border={"none"}
        onClick={(event: any) => {
          event.preventDefault();
          
          // Check if the clicked element is a tab (you can customize the condition based on your tab structure)
          if (event.target && event.target.getAttribute('role') === 'tab') {
            const clickedTabName = event.target.textContent.trim();
            handleTabClick(clickedTabName);
            setTabLabel(clickedTabName);
          }
        }}
=======
    <Box>
      <Box
        borderRight={"1px solid #E1E4EA"}
        w="244px"
        pos={"fixed"}
        // top={0}
        // left={0}
        h={"100vh"}
        px="24px"
        py="40px"
        overflowY={"auto"}
        display={{ base: "none", lg: "block" }}
>>>>>>> 95f85cda40aec92575722550f6c3dd67828f8167
      >
        <Link href={"/"}>
          <Image src="/logo.svg" width="226px" height="40px" alt="logo" />
        </Link>
        <Box my="2rem">
          <Divider w="196px" color="#1A1D66" />
        </Box>
        <Box
          // marginTop={"2rem"}
          display={"flex"}
          flexDir={"column"}
          gap={"1rem"}
          alignItems={"flex-start"}
        >
          {navData.map((item) => {
            const isActive = path === item.label.toLowerCase();
            const iconColor = isActive ? "#335CFF" : "#525866";

            return (
              <Link href={item.url}>
                <Box
                  className="robotoF"
                  cursor={"pointer"}
                  display={"flex"}
                  justifyContent={"start"}
                  fontWeight={500}
                  w="196px"
                  borderRadius="6px"
                  fontSize={"0.875rem"}
                  p="8px 12px"
                  backgroundColor={isActive ? "#F5F7FA" : ""}
                  color={isActive ? "#0E121B" : "#525866"}
                  _hover={{
                    backgroundColor: "#F5F7FA",
                    color: "#000",
                  }}
                  // _selected={{ color: "white", bg: "#F18313" }}
                >
                  <span
                    style={{ marginRight: "10px" }}
                    color={
                      isActive ? "#335CFF" : "#525866"
                    }
                  >
                    {/* <DashboardIcon
                            color={currentTab === item.label ? "#fff" : "#000"}
                          /> */}
                    {item.icon(iconColor)}
                  </span>{" "}
                  {item.label}
                </Box>
              </Link>
            );
          })}
        </Box>
        <Box mt={"5rem"}>
          <Divider color="#E1E4EA" mb={"20px"} w="204px" />
          <Grid
            gridTemplateColumns={"1fr 2fr"}
            gridTemplateRows={"1fr 1fr"}
            w={"full"}
            rowGap={"20px"}
          >
            <Img src="/profile.png" alt="profile" />
            <Flex direction={"column"}>
              <Text
                color="#0E121B"
                className="inter"
                fontSize={"0.875rem"}
                fontWeight={500}
              >
                Black Chang
              </Text>
              <Text
                color="#525866"
                className="inter"
                fontSize={"0.75rem"}
                fontWeight={400}
              >
                blackchang@gmail.com
              </Text>
            </Flex>
            <Btn
              color="#fff"
              bgColor="#FF3B30BF"
              w="100%"
              fontSize={"0.875rem"}
              fontWeight={500}
              className="inter"
              gridColumn={"span 2"}
            >
              Logout
            </Btn>
          </Grid>
        </Box>
      </Box>
      <Header />
      <Box
        position={"relative"}
        top={"20px"}
        left={{ base: "20px", lg: "250px" }}
        maxW={{ base: "full", lg: "80vw" }}
        px="20px"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Wrapper;
