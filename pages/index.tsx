import { useEffect } from "react";
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

    const myCookie = getCookie('auth-cookie') as string;

    console.log('my cookie',JSON.parse(myCookie))


  },[])

  return (
    <>
      <div style={{fontSize:'30px'}}>ESWIFT</div>

    </>
  );
};
