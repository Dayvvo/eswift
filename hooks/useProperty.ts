import { useCallback, useEffect, useState } from "react";
import httpClient from "./useApi";

interface PropertyObj {
  title: string;
  type: string;
  description: string;
  address: string;
  price: string;
  duration: string;
  category: string;
  features: string[];
  images: any;
  name: string;
  file: any;
}

const useProperty = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);

      setToken(parsedData.token);
    }

    // console.log("storedToken", userData);
  }, []);

  const { query, post } = httpClient({ token });

  const addProperty = useCallback(
    async (data: PropertyObj) => {
      try {
        const res = await post(`/property`, data);
        return res;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    [token]
  );
  const getPropertyDetails = useCallback(async (id: string) => {
    const res = await query(`/property/${id}`);
    return res;
  }, []);

  return {
    addProperty,
    getPropertyDetails,
  };
};

export default useProperty;
