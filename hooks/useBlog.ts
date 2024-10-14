import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import httpClient from "./useApi";

interface BlogObj {
  title: string;
  header_image: string;
  introduction: string;
  body: string;
  body_image: string;
  // tags: string[];
}

interface BlogResponse {
  data: {
    data: any;
  };
}

const useBlog = () => {
  const baseUrl = "http://localhost:5500/api";
  const [token, setToken] = useState("");

  console.log(token);

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      // console.log(parsedData);
      setToken(parsedData.token);
    }

    // console.log("storedToken", userData);
  }, []);

  const { query, post, delete: deleteRequest } = httpClient({ token });

  const addBlog = useCallback(
    async (data: BlogObj) => {
      try {
        const res = await post(`${baseUrl}/blog/post`, data);
        // console.log("res", res);
        return res;
      } catch (err: any) {
        // console.log("error calling addblog", err);
        throw new err();
      }
      // return res
    },
    [token]
  );

  const deleteBlog = useCallback(
    async (blogPostId: any) => {
      try {
        const res = await deleteRequest(
          `${baseUrl}/blog/delete-post/${blogPostId}`
        );
        return res;
        // console.log("res", res);
      } catch (err: any) {
        // console.log("error deleting blog", err);
        throw new err();
      }
      // return res
    },
    [token]
  );

  const getBlog = async () => {
    try {
      const res = await query(`${baseUrl}/blog/post`);
      return res as BlogResponse;
    } catch (err: any) {
      // console.log("error", err);
      throw new err();
    }
  };

  return {
    addBlog,
    deleteBlog,
    getBlog,
  };
};

export default useBlog;
