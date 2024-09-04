import { Box, TabPanel, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { poppins } from "./_app";
import Btn from "@/components/Btn";
import Wrapper from "@/components/Wrapper";
import UserComponent from "@/components/UserComponent";
export default function Home() {

  useEffect(()=>{
    const getCookie = (name:string) => {
      if(window?.document?.cookie){
        const windowCookie = window.document.cookie
        const value = `; ${windowCookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2) {
          let uriEncodedValue = parts.pop()?.split(';').shift() as string;
          return decodeURIComponent(uriEncodedValue);
        };
      }

    };

    // const myCookie = getCookie('auth-cookie') as string;

    // console.log('my cookie',JSON.parse(myCookie))

    try {
      const myCookie = getCookie('auth-cookie') as string;
      console.log('my cookie',JSON.parse(myCookie))      
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }


  },[])

  return (
    <>
      <Wrapper>
        <TabPanel>Dashboard</TabPanel>
        <TabPanel><UserComponent /></TabPanel>
        <TabPanel>Property</TabPanel>
        <TabPanel>Projects</TabPanel>
        <TabPanel>Blog</TabPanel>
        <TabPanel>TEam</TabPanel>
        <TabPanel>Settings</TabPanel>
      </Wrapper>
    </>
  );
};
