import React, { useEffect, useState } from "react";
import EditBlogTable from "../../components/blog/EditBlogTable";
import { useRouter } from "next/router";
import Api from "../../../service/Api.js";
let CallApi = new Api();

const Id = () => {
  const [isUpdated, setIsUpdated] = useState(0);
  const router = useRouter();
  const id = router.query.id;

  const [singleBlog, setSingleBlog] = useState({});
  const fetchSingleBlog = async () => {
    try {
      let res = await CallApi.EditData(`blog/${id}`);
      setSingleBlog(res);
      setIsUpdated(8);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [isUpdated, id]);

  return (
    <EditBlogTable
      singleBlog={singleBlog}
      id={id}
    />
  );
};

export default Id;
