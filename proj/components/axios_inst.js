import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import { navigate } from './RootNavigation'


// export const baseURL = 'http://192.168.43.123:8000/api/';
export const socketurl="192.168.0.108:8000"
var acess_="";

export const baseURL = 'http://192.168.0.108:8000/api/';

export const access_token= ()=>{
AsyncStorage.getItem("access_token").then(access_token=>{
	acess_=access_token
})
 return  acess_ 
}

export const refresh_token = async ()=>{
	return await AsyncStorage.getItem('refresh_token');
}

export const setRefreshToken=async (response)=>{
	return await AsyncStorage.setItem('access_token', response.data.access);
}
export const setAcessToken=async (response)=>{
	return await  AsyncStorage.setItem('refresh_token', response.data.refresh);
}

export const axiosInstance= axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization:  AsyncStorage.getItem("access_token") ?
			'JWT ' +  AsyncStorage.getItem("access_token") :
			null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

// export const axiosInstance= axios.create({
// 	baseURL: baseURL,
// 	timeout: 5000,
// 	headers: {
// 		Authorization:  AsyncStorage.getItem('access_token') ?
// 			'JWT ' +  AsyncStorage.getItem('access_token') :
// 			null,
// 		'Content-Type': 'application/json',
// 		accept: 'application/json',
// 	},
// });




axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		// console.log(error.response)
		if (typeof error.response === 'undefined') {
			Alert.alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			// window.location.href = '/login/';
			navigate('Login',{warning:"error status 401"})
			return Promise.reject(error);
		}

		if (
			// error.response.data.code === "token_not_valid" &&
			error.response.status === 401 
			// error.response.statusText === 'Unauthorized'
		) {  
				const  refreshToken= await AsyncStorage.getItem('refresh_token')
				 
			
				console.log("getting refresh token")
				if (refreshToken) {
					
					const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
	
					// exp date in token is expressed in seconds, while now() returns milliseconds:
					const now = Math.ceil(Date.now() / 1000);
	
					if (tokenParts.exp > now) {
						return axiosInstance
							.post('/token/refresh/', {
								refresh: refreshToken
							})
							.then((response) => {
								if(response.status===200){
								 console.log("pass refresh")
								 AsyncStorage.setItem('access_token', response.data.access);
								 AsyncStorage.setItem('refresh_token', response.data.refresh);
								//  setAcessToken(response);
								//  setRefreshToken(response);
								  axiosInstance.defaults.headers['Authorization'] =
									'JWT ' + response.data.access;
								  originalRequest.headers['Authorization'] =
									'JWT ' + response.data.access;
	                          
								return  axiosInstance(originalRequest);
							}
							
							})
							.catch((err) => {
								console.log(err);
							});
					} else {
						console.log('Refresh token is expired', tokenParts.exp, now);
						// window.location.href = '/login/'; 
						navigate('Login',{warning:"refresh token has expired"})
					}
				} else {
					Alert.alert('Refresh token not available.');
					// window.location.href = '/login/';
					navigate('Login',{warning:"refresh token not available"})
				}


			

			
		}

		// specific error handling done elsewhere
		console.log("elsewhere")
		return Promise.reject(error);
	}
);





// // alert("token expired login again")
// // 				   localStorage.removeItem('access_token');
// // 		           localStorage.removeItem('refresh_token');
// // 					window.location.href = '/login/';