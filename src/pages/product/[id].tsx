import React, { useEffect, useState } from "react";
import EditProductTable from "../../components/product/EditProductTable";
import axios from "axios";
import { useRouter } from "next/router";
import Api from "../../../service/Api.js";
let CallApi = new Api();

const Id = () => {
  const router = useRouter();
  const id = router.query.id;
  const [isUpdated, setIsUpdated] = useState(0);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const fetchAll = async () => {
    try {
      const res1 = await CallApi.fetchData(`category`);
      const res2 = await CallApi.fetchData(`color`);
      const res3 = await CallApi.fetchData(`size`);
      setCategories(res1);
      setColors(res2);
      setSizes(res3);
    } catch (error) {
      console.log(error);
    }
  };

  const [singleProduct, setSingleProduct] = useState({});
  const fetchSingleProduct = async () => {
    try {
      let res = await CallApi.EditData(`product/${id}`);
      setSingleProduct(res);
      setIsUpdated(8);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    fetchAll();
  }, [isUpdated, id]);

  return (
    <>
      <EditProductTable
        categories={categories}
        colors={colors}
        sizes={sizes}
        setIsUpdated={setIsUpdated}
        singleProduct={singleProduct}
      />
    </>
  );
};

export default Id;
