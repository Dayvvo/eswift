import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { poppins } from "./_app";
import Btn from "@/components/Btn";
import Property from "@/server/models/Property";
import { PropertyScreen } from "@/screens/Property/property";
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
      <PropertyScreen/>
    </>
  );
};
