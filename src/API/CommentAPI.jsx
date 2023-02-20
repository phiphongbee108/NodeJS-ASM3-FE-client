import axiosClient from './axiosClient';

const CommentAPI = {
	getCommentProduct: (query) => {
		const url = `/comment/${query}`;
		return axiosClient.get(url);
	},

	postCommentProduct: (query) => {
		const url = `/comment/send${query}`;
		return axiosClient.post(url);
	},
};

export default CommentAPI;
