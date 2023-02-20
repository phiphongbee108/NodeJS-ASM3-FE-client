import axiosClient from './axiosClient';

const ChatRoomsAPI = {
	getMessageByRoomId: (roomId) => {
		const url = `/chatrooms/getById?roomId=${roomId}`;
		return axiosClient.get(url);
	},

	createNewRoom: () => {
		const url = `/chatrooms/createNewRoom`;
		return axiosClient.post(url);
	},

	addMessage: (body) => {
		const url = `/chatrooms/addMessage`;
		return axiosClient.put(url, body);
	},
};

export default ChatRoomsAPI;
