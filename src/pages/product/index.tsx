import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
import Header from "../../components/Header";
import AllProductsTable from "../../components/product/AllProductsTable";
import Api from "../../../service/Api.js";
let CallApi = new Api();

function Product() {
  const { deleteSuccess, somethingWentWrong } = useContext(MiscellaneousContext);
  const [isUpdated, setIsUpdated] = useState(0);

  const deleteProduct = async (id: any) => {
    try {
      let res = await CallApi.deleteData(`product/${id}`);

      setIsUpdated(1);
      deleteSuccess();
      console.log("Product deleted success");
    } catch (error) {
      console.log(error);
      somethingWentWrong();
    }
  };

  const [products, setProducts] = useState([]);
  const fetchAllProduct = async () => {
    try {
      let res = await CallApi.fetchData(`product`);

      setProducts(res);
      setIsUpdated(5);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [isUpdated]);

  return (
    <>
      <Header pageTitle={"Product"} />
      <AllProductsTable
        products={products}
        deleteProduct={deleteProduct}
      />
    </>
  );
}

export default Product;
