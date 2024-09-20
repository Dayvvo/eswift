import axios from "axios";
import { useCallback } from "react";

interface BlogObj {
  title: string;
  content: string;
  tags: string[];
}

const useBlog = () => {

  const baseUrl = 'http://localhost:5500/api';
  // const baseUrl = `${process.env.BACKEND_URL}/api`;

  const addBlog = useCallback(async(data:BlogObj) => {
    try {
      const res = await axios.post(`${baseUrl}/blog/post`, {data});
      console.log('res', res)
    }
    catch (err) {
      console.log('error calling addblog', err);
    }
    // return res
  }, [])

  const deleteBlog = useCallback(async(blogPostId:number) => {
    try {
      const res = await axios.delete(`${baseUrl}/blog/delete-post/:${blogPostId}`);
      console.log('res', res)
    }
    catch (err) {
      console.log('error deleting blog', err);
    }
    // return res
  }, [])

  const getBlog = async () => {
    try {
      const res = await axios.get(`${baseUrl}/blog/post`);
      console.log('res', res);
    }
    catch (err) {
      console.log('error', err)
    }
  }

  return {
    addBlog,
    deleteBlog,
    getBlog,
  }
}

export default useBlog;