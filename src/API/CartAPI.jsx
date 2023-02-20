import axiosClient from "./axiosClient";

const CartAPI = {
  getCarts: (query) => {
    const url = `https://oval-legend-web.glitch.me/api/user/cart/${query}`;
    return axiosClient.get(url);
  },

  postAddToCart: (query, post) => {
    const url = `https://oval-legend-web.glitch.me/api/user/cart/postcart/${query}`;
    return axiosClient.post(url, post);
  },

  deleteToCart: (query, post) => {
    const url = `https://oval-legend-web.glitch.me/api/user/cart/deletecart/${query}`;
    return axiosClient.post(url, post);
  },
  putToCart: (query, post) => {
    const url = `https://oval-legend-web.glitch.me/api/user/cart/updatedcart/${query}`;
    return axiosClient.put(url, post);
  },
};

export default CartAPI;
