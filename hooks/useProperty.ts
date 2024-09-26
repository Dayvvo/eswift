import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import httpClient from "./useApi";

interface PropertyObj {
  title: string;
  type: string;
  address: string;
  price: string;
  category: string;
  features: string[];
  images: string[];
}

const useProperty = () => {
  const baseUrl = "http://localhost:5500/api";
  const [token, setToken] = useState("");

  console.log("token", token)

  useEffect(() => {

    const userData = localStorage.getItem(("userData")) || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData);
      setToken(parsedData.token);
    }

    console.log("storedToken", userData);
  }, []);

  const { query, post } = httpClient({token});

  const addProperty = useCallback(async (data: PropertyObj) => {
    try {
      const res = await post(`${baseUrl}/property`, data);
      // console.log("res", res);
      return res;
    } catch (err) {
      console.log("error calling addProperty", err);
    }
    // return res
  }, [token]);


  return {
    addProperty,
  };
};

export default useProperty;
