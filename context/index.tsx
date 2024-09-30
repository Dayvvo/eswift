"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext<any>({
  check: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  },
});

export function AppWrapper({ children }: { children: ReactNode }) {
  const check = "context check!";

  const [user, setUser] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const userData =
    typeof window !== "undefined" ? localStorage.getItem("userData") : null;

  useEffect(() => {
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData);
      setUser((prevData: any) => ({
        ...prevData,
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        email: parsedData.email,
        role: parsedData.role,
      }));
    }

    console.log("context user", user);
  }, []);

  return <AppContext.Provider value={{check, user}}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
