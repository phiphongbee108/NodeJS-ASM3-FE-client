import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "https://nodejs-asm3-be.glitch.me/api/product";
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `https://nodejs-asm3-be.glitch.me/api/product/getproduct/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/products/pagination${query}`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;
