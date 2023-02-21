import axios from "axios";
import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (query) => {
    const url = "https://nodejs-asm3-be.glitch.me/api/auth/singup";
    return axiosClient.post(url, query);
  },
  postSignIng: (query) => {
    const url = "https://nodejs-asm3-be.glitch.me/api/auth/signin";
    // return axios({
    //   url: url,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   withCredentials: true,
    //   data: query,
    // });
    return axiosClient.post(url, query);
  },
  getSignIng: (query) => {
    const url = "https://nodejs-asm3-be.glitch.me/api/auth/signin";
    return axiosClient.get(url);
  },
  postLogout: () => {
    const url = "https://nodejs-asm3-be.glitch.me/api/auth/logout";
    return axiosClient.get(url);
  },
};

export default UserAPI;
