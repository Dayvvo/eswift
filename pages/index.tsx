
import HomePage from "@/screens/home/home";
import { Resdesign } from "@/screens/home/redesign";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [building, setBuilding] = useState<boolean>(false);
  // const [cookie, setCookie] = useState("")

  const navigate = useRouter();

  const isWidow = typeof window !== 'undefined';

  useEffect(()=>{
    if(isWidow){
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
        myCookie && localStorage.setItem("userData", myCookie);
        console.log('old cookie',myCookie);
        const authRoute = sessionStorage.getItem('authRoute');
        authRoute && navigate.push(authRoute);
      } 
      catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    return ()=> localStorage.removeItem('authRoute');
  },[isWidow])

  return (
      <>
        {
          building ?  <Resdesign/>: <HomePage/>
        }
      </>
    )
};
