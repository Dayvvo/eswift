import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}


const useAuth = () => {
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");

  const isWindow = typeof window !== "undefined";

  const {push} = useRouter()


  useEffect(() => {
    if (isWindow) {
      const userFromLocalStorage = window.localStorage.getItem("userData");
      if (userFromLocalStorage){ 
        const {user,token} = JSON.parse(userFromLocalStorage);
        setToken(token);
        setUser(user);
      };
    }
  }, [isWindow]);


  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const token = response?.data?.token;
      const userData = response?.data?.data;

      localStorage.setItem("token", token);

      setUser(userData);
    } 
    catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    axios.defaults.headers.common["Authorization"] = "";
    setUser(null);
  };

  const reset = async (credentials: {
    email: string;
    old_password: string;
    new_password: string;
    confirm_new_password: string;
  }) => {
    try {
      const req = await axios.put("/api/auth/reset", credentials);
      return req as any;
    } catch (error) {
      throw error;
    }
  };

  const authProtectedFn = (fn:(args?:any)=> unknown,route:string)=>{
    if(token){
      fn();
    }
    else{
      window.sessionStorage.setItem('authRoute',route);
      push('/auth');
    }
  }

  return { user, loading, error, isWindow, login, logout, token, reset,authProtectedFn };
};

export default useAuth;
