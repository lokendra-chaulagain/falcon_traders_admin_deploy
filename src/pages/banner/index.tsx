import React, { useEffect, useState, useContext } from "react";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
import BannerTable from "../../components/banner/BannerTable";
import Header from "../../components/Header";
import Api from "../../../service/Api.js";
let CallApi = new Api();

export default function Banner() {
  const { deleteSuccess, somethingWentWrong } = useContext(MiscellaneousContext);
  const [isUpdated, setIsUpdated] = useState(0);
  const [banners, setBanners] = useState([]);

  const fetchAllBanner = async () => {
    try {
      let res = await CallApi.fetchData(`banner`);
      res && setBanners(res);
      setIsUpdated(1);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchAllBanner();
  }, [isUpdated]);

  const deleteBanner = async (id: any) => {
    try {
      let res = await CallApi.deleteData(`banner/${id}`);
      setIsUpdated(2);
      deleteSuccess();
      console.log("Delete success");
    } catch (error) {
      console.log(error);
      somethingWentWrong();
    }
  };

  return (
    <>
      <Header pageTitle={"Banner"} />
      <BannerTable
        setIsUpdated={setIsUpdated}
        banners={banners}
        deleteBanner={deleteBanner}
      />
    </>
  );
}
