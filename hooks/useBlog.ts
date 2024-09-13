import axios from "axios";
import { useCallback } from "react";

interface BlogObj {
  title: string;
  content: string;
  tags: string[];
}

const useBlog = () => {

  const addBlog = useCallback(async(data:BlogObj) => {
    const res = await axios.post('http://localhost:5500/blog/post', {data});
    console.log('res', res)
    // return res
  }, [])

  return {
    addBlog,
  }
}

export default useBlog;