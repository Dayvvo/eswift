import React, { useCallback } from "react";
import { useApiUrl } from "./useApi";

const useUser = () => {
  const client = useApiUrl();

  type AddUserProps = {
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    phoneNumber?: string;
    address?: string;
  };

  const getUser = useCallback(() => {
    const req = client
      .get("/user/users")
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        throw new err();
      });
    return req;
  }, []);

  const getUserById = useCallback(async (userId: string) => {
    try {
      const req = await client.get(`/user/users/${userId}`);
      return req;
    } catch (err: any) {
      throw new err();
    }
  }, []);

  const addUser = useCallback(async (data: AddUserProps) => {
    try {
      const req = await client.post("/user/add-user", data);
      return req;
    } catch (err: any) {
      throw new err();
    }
  }, []);
  const updateUser = useCallback(async (data: AddUserProps) => {
    try {
      const req = await client.put("/user/profile", data);
      return req;
    } catch (err: any) {
      throw new err();
    }
  }, []);

  return {
    getUser,
    getUserById,
    addUser,
    updateUser,
  };
};

export default useUser;
