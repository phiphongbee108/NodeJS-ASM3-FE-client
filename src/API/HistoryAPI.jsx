import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: (query) => {
    const url = `https://oval-legend-web.glitch.me/api/user/order/user/${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id, detail) => {
    const url = `https://oval-legend-web.glitch.me/api/user/order/user/find/${id}/${detail}`;
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
