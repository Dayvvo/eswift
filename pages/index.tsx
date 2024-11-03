
import HomePage from "@/screens/home/home";
import { Resdesign } from "@/screens/home/redesign";
import { useEffect, useState } from "react";

export default function Home() {
  const [building, setBuilding] = useState<boolean>(false);

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

    try {
      const myCookie = getCookie('auth-cookie') as string;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }


  },[])

  return (
      <>
        {
          building ?  <Resdesign/>: <HomePage/>
        }
      </>
    )
};
