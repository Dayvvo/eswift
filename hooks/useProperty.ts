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

interface PropertyResponse {
  data: any;
}
interface VerificationProps {
  verificationState: string;
}
const useProperty = () => {
  const baseUrl = "http://localhost:5500/api";
  const [token, setToken] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);

      setToken(parsedData.token);
    }

    // console.log("storedToken", userData);
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Token is set, ready to make requests!");
    }
  }, [token]);

  const { query, post, putMutation } = httpClient({ token });

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
  const verifyProperty = useCallback(
    async (id: any, data: VerificationProps) => {
      try {
        const res = await putMutation(`/property/${id}/verify`, data);
        return res as any;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    [token]
  );
  const getAdminProperty = useCallback(
    async (inputValue: string, page: any) => {
      try {
        const res = await query(
          `${baseUrl}/property/admin?keyword=${inputValue}&pageNumber=${page}`
        );
        return res as PropertyResponse;
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
    verifyProperty,
    addProperty,
    getAdminProperty,
    getPropertyDetails,
  };
};

export default useProperty;
