import React, { useEffect, useState } from "react";
import AddProductTable from "../../components/product/AddProductTable";
import Api from "../../../service/Api.js";
let CallApi = new Api();

export default function create() {
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

  useEffect(() => {
    fetchAll();
  }, [isUpdated]);

  return (
    <>
      <AddProductTable
        categories={categories}
        colors={colors}
        sizes={sizes}
        setIsUpdated={setIsUpdated}
      />
    </>
  );
}
