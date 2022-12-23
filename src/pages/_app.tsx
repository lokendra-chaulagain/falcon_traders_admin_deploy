import type { AppProps } from "next/app";
import "../../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftAppBar from "../components/LeftBar";
import Topbar from "../components/Topbar";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { MiscellaneousContextProvider } from "../../context/MiscellaneousContext";
import LoginBox from "../components/LoginBox";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap");
  }, []);

  const [accessToken, setAccessToken] = useState<any>(null);
  useEffect(() => {
    if (typeof window != "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken)
      setAccessToken(accessToken);
    }
  }, []);



  return (
    <>
      <MiscellaneousContextProvider>
        {accessToken ? (
          <div className="customBg h100">
            <Topbar />
            <div className="row">
              <div className=" col-2 customLeftBar">
                <LeftAppBar />
              </div>

              <div className="col-10 right_side_bg">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        ) : (
          <LoginBox />
        )}
      </MiscellaneousContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default MyApp;
