import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface BlogObj {
  title: string;
  content: string;
  tags: string[];
}

const useBlog = () => {
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

  const addBlog = useCallback(async (data: BlogObj) => {
    try {
      const res = await axios.post(`${baseUrl}/blog/post`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("res", res);
      // return res;
    } catch (err) {
      console.log("error calling addblog", err);
    }
    // return res
  }, [token]);

  const deleteBlog = useCallback(async (blogPostId: number) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/blog/delete-post/:${blogPostId}`
      );
      console.log("res", res);
    } catch (err) {
      console.log("error deleting blog", err);
    }
    // return res
  }, []);

  const getBlog = async () => {
    try {
      const res = await axios.get(`${baseUrl}/blog/post`);
      console.log("res", res);
    } catch (err) {
      console.log("error", err);
    }
  };

  return {
    addBlog,
    deleteBlog,
    getBlog,
  };
};

export default useBlog;
