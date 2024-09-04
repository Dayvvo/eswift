import {
  Box,
  Flex,
  Grid,
  Image,
  Img,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import Divider from "./Divider";
import {
  BlogIcon,
  DashboardIcon,
  NotifIcon,
  ProjectIcon,
  PropertyIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "./svg";
import Btn from "./Btn";
import { FiHome, FiUser } from "react-icons/fi";

const NavigationTab = ({
  tabLabel,
  setTabLabel,
}: {
  tabLabel: string;
  setTabLabel: any;
}) => {
  const navData = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Users",
      icon: <UserIcon />,
    },
    {
      label: "Property",
      icon: <FiHome size={"1rem"} />,
    },
    {
      label: "Projects",
      icon: <ProjectIcon />,
    },
    {
      label: "Blog",
      icon: <BlogIcon />,
    },
    {
      label: "Team",
      icon: <FiUser size={"1rem"} />,
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    const hashValue = window.location.hash.substring(1);
    setCurrentTab(hashValue);
  }, [tabLabel]);
  

  const handleTabClick = (tabName: any) => {
    // Replace the "#" in the URL with the tab name
    // const newUrl = window.location.href.replace("#", tabName);
    const newUrl = window.location.href.split("#")[0] + `#${tabName}`;
    window.history.pushState(null, "", newUrl);
  };

  return (
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
          {navData.map((item) => (
            <Tab
              className="robotoF"
              display={"flex"}
              justifyContent={"start"}
              fontWeight={500}
              w="196px"
              borderRadius="6px"
              fontSize={"0.875rem"}
              backgroundColor={currentTab === item.label ? "#F5F7FA" : ""}
              // color={currentTab === item.label ? "#FFF" : ""}
              _hover={{
                backgroundColor: "#F5F7FA",
                color: "#000",
              }}
              // _selected={{ color: "white", bg: "#F18313" }}
            >
              <span style={{ marginRight: "10px" }}>
                {/* <DashboardIcon
                      color={currentTab === item.label ? "#fff" : "#000"}
                    /> */}
                {item.icon}
              </span>{" "}
              {item.label}
            </Tab>
          ))}
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
      </TabList>
    </Box>
  );
};

const Header = ({ tabLabel }: { tabLabel: string }) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom={"1px solid #E1E4EA"}
      padding={"40px 30px 40px 60px"}
      w={"80vw"}
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
            {tabLabel || "Dashboard"}
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
  const [tabLabel, setTabLabel] = useState("");

  return (
    <Box width={"100%"}>
      <Tabs
        // height={{ md: "100%" }}
        width={"100%"}
        display={"flex"}
        flexDir={"row"}
        variant="unstyled"
      >
        <Flex align={"start"} justify="start" gap={0}>
          <NavigationTab setTabLabel={setTabLabel} tabLabel={tabLabel} />
          <Box>
            <Header tabLabel={tabLabel} />
            <TabPanels>{children}</TabPanels>
          </Box>
        </Flex>
      </Tabs>
    </Box>
  );
};

export default Wrapper;
