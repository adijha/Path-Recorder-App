import axios from 'axios';
import { AsyncStorage } from 'react-native';

let url;
// if (__DEV__) {
// url = 'https://17e1e534.ngrok.io';
// } else {
url = 'https://path-track-app.herokuapp.com';
// }

const instance = axios.create({
	baseURL: url
});

instance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default instance;
