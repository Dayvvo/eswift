import { useCallback, useEffect, useState } from "react";
import httpClient from "./useApi";

interface PropertyObj {
  title: string;
  type: string;
  description: string;
  address: string;
  price: string;
  category: string;
  features: string[];
  images: any;
}

const useProperty = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData);
      setToken(parsedData.token);
    }

    // console.log("storedToken", userData);
  }, []);

  const { query, post } = httpClient({ token });

  const addProperty = useCallback(
    async (data: PropertyObj) => {
      try {
        const res = await post(`/property`, data);
        // console.log("res", res);
        return res;
      } catch (err) {
        console.log("error calling addProperty", err);
      }
      // return res
    },
    [token]
  );
  const getPropertyDetails = useCallback(async (id:string) => {
    try {
      const res = await query (`/property/${id}`);
      console.log('res', res);
      return res;
    }
    catch (err) {
      console.log(err)
    }
  }, []);


  return {
    addProperty,
    getPropertyDetails,
  };
};

export default useProperty;
