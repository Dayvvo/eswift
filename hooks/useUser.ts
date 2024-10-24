import React, { useCallback } from "react";
import { useApiUrl } from "./useApi";

const useUser = () => {
  const client = useApiUrl();

  type AddUserProps = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
  }

  const getUser = useCallback(() => {
    const req = client
      .query("/user/users")
      .then((res: any) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    return req;
  }, []);

  const getUserById = useCallback(async (userId:string) => {
    try {
      const req = await client.query(`/user/users/${userId}`)
      return req;
    }
    catch (err) {
      console.log('err', err)
    }
  }, [])

  const addUser = useCallback(async(data:AddUserProps) => {
    try {
      const req = await client.post('/user/add-user', data);
      return req;
    }
    catch (err) {
      console.log('err', err)
    }
  }, [])
  
  return {
    getUser,
    getUserById,
    addUser,
  };
};

export default useUser;
