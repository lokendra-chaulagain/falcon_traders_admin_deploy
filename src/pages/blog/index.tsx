import React, { useContext, useEffect, useState } from "react";
import BlogTable from "../../components/blog/BlogTable";
import Header from "../../components/Header";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
import Api from "../../../service/Api.js";
let CallApi = new Api();

function Blog() {
  const { deleteSuccess, somethingWentWrong } = useContext(MiscellaneousContext);
  const [isUpdated, setIsUpdated] = useState(0);
  const [blogs, setBlogs] = useState([]);

  const fetchAllBlogs = async () => {
    try {
      let res = await CallApi.fetchData(`blog`);

      setBlogs(res);
      setIsUpdated(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, [isUpdated]);

  const deleteBlog = async (id: any) => {
    try {
      let res = await CallApi.deleteData(`blog/${id}`);
      setIsUpdated(4);
      deleteSuccess();
      console.log("Review deleted success");
    } catch (error) {
      console.log(error);
      somethingWentWrong();
    }
  };

  return (
    <>
      <Header pageTitle={"Blogs"} />
      <BlogTable
        blogs={blogs}
        deleteBlog={deleteBlog}
      />
    </>
  );
}

export default Blog;
