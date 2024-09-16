import axios from "axios";
import { useCallback } from "react";

interface BlogObj {
  title: string;
  content: string;
  tags: string[];
}

const useBlog = () => {

  const addBlog = useCallback(async(data:BlogObj) => {
    try {
      const res = await axios.post('http://localhost:5500/api/blog/post', {data});
      console.log('res', res)
    }
    catch (err) {
      console.log('error calling addblog', err);
    }
    // return res
  }, [])

  return {
    addBlog,
  }
}

export default useBlog;