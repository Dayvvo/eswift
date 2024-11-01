

import { useCallback, useEffect, useState } from "react";
import httpClient from "./useApi";

const useUpload = () => {
  const [token, setToken] = useState("");

  // console.log(token);

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      setToken(parsedData.token);
    }

  }, []);

  const { post } = httpClient({ token });

  const uploadSingle = useCallback(
    async (file: File) => {
        const res = await post(`/upload/images`, {file});
        return res;
      // return res
    },
    [token]
  );
  
  const uploadMultiple = useCallback(
    async (files:File[]) => {
        const res = await post(`/upload/images`, {files});
      return res
    },
    [token]
  );

  return {
    uploadSingle,
    uploadMultiple
  };
};

export default useUpload;
