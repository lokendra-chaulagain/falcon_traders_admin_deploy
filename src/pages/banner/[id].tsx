import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EditBannerDialog from "../../components/category/EditBannerDialog";
import Api from "../../../service/Api.js";
let CallApi = new Api();

const Id = () => {
  const [isUpdated, setIsUpdated] = useState(0);
  const router = useRouter();
  const id = router.query.id;

  const [singleBanner, setSingleBanner] = useState({});
  const fetchSingleBanner = async (id: any) => {
    try {
      let res = await CallApi.EditData(`banner/${id}`);
      setSingleBanner(res);
      setIsUpdated(1);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(singleBanner);

  useEffect(() => {
    fetchSingleBanner(id);
  }, [isUpdated, id]);

  return (
    <EditBannerDialog
      singleBanner={singleBanner}
      setIsUpdated={setIsUpdated}
      id={id}
    />
  );
};

export default Id;
