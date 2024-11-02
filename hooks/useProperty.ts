import { useCallback, useEffect, useState } from "react";
import httpClient from "./useApi";
import { R } from "@/utils/types";

interface PropertyObj {
  title: string;
  description: string;
  address: string;
  price: {
    mode:string,
    amount:string
  };
  category: string;
  features: string[];
  images: string[];
  documents:R[]
}

interface PropertyResponse {
  data: any;
}
interface VerificationProps {
  verification: string;
}
const useProperty = () => {
  const baseUrl = "http://localhost:5500/api";
  const [token, setToken] = useState("");

  // console.log(token);

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      // console.log(parsedData);
      setToken(parsedData.token);
    }

    // console.log("storedToken", userData);
  }, []);

  const {
    query,
    post,
    putMutation,
    delete: delProperty,
  } = httpClient({ token });

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
  const deleteProperty = useCallback(
    async (id: string) => {
      try {
        const res = await delProperty(`/property/${id}`);
        return res as any;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    [token]
  );
  const getAdminProperty = async (inputValue: string, page: any) => {
    try {
      const res = await query(
        `${baseUrl}/property/admin?keyword=${inputValue}&pageNumber=${page}`
      );
      return res as PropertyResponse;
    } catch (err: any) {
      throw new err();
    }
    // return res
  };
  const propertyCreator = useCallback(
    async (userId: string) => {
      try {
        const res = await query(`${baseUrl}/user/users/${userId}`);
        return res as any;
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
    propertyCreator,
    verifyProperty,
    addProperty,
    getAdminProperty,
    getPropertyDetails,
    deleteProperty,
  };
};

export default useProperty;
