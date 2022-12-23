import axios from "axios";
import { toast } from "react-toastify";

class CallApi {
  async fetchData(url, data = null) {
    let baseUrl = process.env.NEXT_PUBLIC_API_URL + "/";
    let res = await axios.get(baseUrl + url, data);
    let response = res.data;
    return response;
  }

  async storeData(url, data) {
    let baseUrl = process.env.NEXT_PUBLIC_API_URL + "/";
    let res = await axios.post(baseUrl + url, data);
    let response = await res.data;
    return response;
  }

  async EditData(url) {
    let baseUrl = process.env.NEXT_PUBLIC_API_URL + "/";
    let res = await axios.get(baseUrl + url);
    let response = res.data;
    return response;
  }

  async updateData(url, data) {
    let baseUrl = process.env.NEXT_PUBLIC_API_URL + "/";
    let res = await axios.patch(baseUrl + url, data);
    let response = await res.data;
    if (response.error) {
      toast(response.Message, {
        style: { background: "red", color: "#fff" },
        autoClose: 1000,
        closeOnClick: true,
      });
      toast(response.message, {
        style: { background: "red", color: "#fff" },
        autoClose: 1000,
        closeOnClick: true,
      });
    } else {
      toast(response.Message, {
        style: { background: "green", color: "#fff" },
        autoClose: 1000,
        closeOnClick: true,
      });
    }

    return response;
  }

  // async deleteData(url, data) {
  //   let baseUrl = process.env.NEXT_PUBLIC_API_URL + "/";
  //   let res = await axios.delete(baseUrl + url, data);
  //   let response = await res.data;
  // }

  async deleteData(url, data) {
    let config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };

    let baseUrl = process.env.NEXT_PUBLIC_API_URL + "/";
    let res = await axios.delete(baseUrl + url, config);
    let response = await res.data;
    // console.log(response);
    // if (response.error) {
    //   toast(response.Message, { style: { background: "red", color: "#fff" }, autoClose: 1000, closeOnClick: true });
    //   toast(response.message, { style: { background: "red", color: "#fff" }, autoClose: 1000, closeOnClick: true });
    // } else {
    //   toast(response.Message, { style: { background: "green", color: "#fff" }, autoClose: 1000, closeOnClick: true });
    // }
  }
}

export default CallApi;

// ---------------------------

// import axios from "axios";
// import { toast } from "react-toastify";

// class CallApi {
//   async fetchData(url, data = null) {
//     let config = {
//       headers: {
//         authorization: localStorage.getItem("admin-token"),
//       },
//     };
//     console.log(localStorage.getItem("admin-token"));
//     let baseUrl = process.env.NEXT_PUBLIC_API_URL + "admin/";
//     let res = await axios.get(baseUrl + url, config);
//     console.log(res);
//     let response = res.data;
//     console.log(response);
//     return response.data;
//   }

//   async storeData(url, data) {
//     let config = {
//       headers: {
//         authorization: localStorage.getItem("admin-token"),
//       },
//     };
//     let baseUrl = process.env.NEXT_PUBLIC_API_URL + "admin/";
//     let res = await axios.post(baseUrl + url, data, config);
//     let response = await res.data;
//     if (response.error) {
//       toast(response.Message, { style: { background: "red", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//       toast(response.message, { style: { background: "red", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//     } else {
//       toast(response.Message, { style: { background: "green", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//     }
//     return response;
//   }

//   async EditData(url) {
//     let config = {
//       headers: {
//         authorization: localStorage.getItem("admin-token"),
//       },
//     };
//     let baseUrl = process.env.NEXT_PUBLIC_API_URL + "admin/";
//     let res = await axios.get(baseUrl + url, config);
//     let response = res.data;
//     return response.data;
//   }

//   async updateData(url, data) {
//     let config = {
//       headers: {
//         authorization: localStorage.getItem("admin-token"),
//       },
//     };

//     let baseUrl = process.env.NEXT_PUBLIC_API_URL + "admin/";
//     let res = await axios.patch(baseUrl + url, data, config);
//     let response = await res.data;
//     if (response.error) {
//       toast(response.Message, { style: { background: "red", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//       toast(response.message, { style: { background: "red", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//     } else {
//       toast(response.Message, { style: { background: "green", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//     }

//     return response;
//   }

//   async deleteData(url, data) {
//     let config = {
//       headers: {
//         authorization: localStorage.getItem("admin-token"),
//       },
//     };

//     let baseUrl = process.env.NEXT_PUBLIC_API_URL + "admin/";
//     let res = await axios.delete(baseUrl + url, config);
//     let response = await res.data;
//     console.log(response);
//     if (response.error) {
//       toast(response.Message, { style: { background: "red", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//       toast(response.message, { style: { background: "red", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//     } else {
//       toast(response.Message, { style: { background: "green", color: "#fff" }, autoClose: 1000, closeOnClick: true });
//     }
//   }
// }

// export default CallApi;
