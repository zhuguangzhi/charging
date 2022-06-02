import Request from '@/utils/luch-request/index.js' /* 引入  luch-request*/
import Vue from 'vue'
import store from '@/store/index.js'

const http = new Request();

Vue.prototype.http = http

// // 添加请求拦截器，在发送请求之前做些什么--------------------------------------------
// http.interceptors.request.use(function(config) {
// 	console.log("请求：", config);
// 	// 显示loading
// 	return config
// }, function(error) {
// 	// 请求错误时弹框提示，或做些其他事
// 	return Promise.reject(error)
// });


// // 添加响应拦截器----------------------------------------------------------------
// http.interceptors.response.use(function(response) {
	// 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
	// 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
	//console.log('@@@@@@@@@@@'+response.data.error)
	// if (response.data.error) {
	// 	if(response.config.url.indexOf("user/api/profile") != -1 && response.data.error == 257 ){
			
	// 	}
	// 	else if (response.data.error == 257 || response.data.error == 1610) { //未登录 登录失效
	// 		uni.showToast({
	// 			icon:'none',
	// 			title:'请重新登录'
	// 		})
	// 		uni.redirectTo({
	// 			url: '/pages/login/index'
	// 		})
	// 		/* 
	// 		// Vue.$store.commit('loginout')
	// 		Vue.prototype.$store.commit('loginout') */
			
	// 	}
	// }

	// return response
// }, function(error) {
	// if (error.statusCode == 401) {
	// 	//token过期 重新登录
	// 	// Vue.$store.commit('loginout')
	// 	Vue.prototype.$store.commit('loginout')
	// 	uni.redirectTo({
	// 		url: '../login/login',
	// 	})
	// }
	// 对响应错误做点什么
// 	return Promise.reject(error)
// })

// // 封装数据返回失败提示函数---------------------------------------------------------------------------
// function errorState(response) {
// 	// 隐藏loading
// 	// 如果http状态码正常，则直接返回数据
// 	if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
// 		// 如果不需要除了data之外的数据，可以直接 return response.data
// 		return response
// 	} else {
// 		// alert('数据获取错误')
// 		return response
// 	}
// }
// // 封装数据返回成功提示函数---------------------------------------------------------------------------
// function successState(res) {
// 	console.log("响应数据：", res);
// 	// 隐藏loading
// 	// 统一判断后端返回的错误码(错误码与后台协商而定)
// 	if (res.error === 0) {
// 		// alert('success')
// 		return res
// 	} else {
// 		// alert(res.err)
// 	}
// }

// 封装luch-request--------------------------------------------------------------------------------------

function apiRequest(method, url, params, token) {
	// console.log("Vue.prototype.$store.state.account.token", Vue.prototype.$store.state)
	// let headers = {"Content-Type": " application/json"}
	let headers = {}
	if (!token) {
		/* 输出一下*/
		if (store.state.account.token) {
			/* params存在加上token,就加上token*/
			// if (params) {
			// 	params.token = store.state.account.token
			// } else {
			// 	params = {
			// 		token: store.state.account.token
			// 	}
			// }
			headers.token = store.state.account.token
		}
	} else {
	}
	return new Promise((resolve, reject) => {
		uni.request({
		    url: url,
			method: method,
		    data: params,
		    header: headers,
			timeout: 10000,
		    success: (res) => {
				// console.log("res", JSON.stringify(res))
		        resolve(res)
		    },
			fail: (res) => {
				reject(res)
			}
		})
	})
	
	// 处理微信公众号上请求提格式化错误问题
	// #ifdef H5
	// if (method !== 'GET') {
	// 	params = JSON.stringify(params)
	// }
	// params = JSON.stringify(params)
	// #endif

	// let httpDefault = {
	// 	baseURL: null,
	// 	method: method,
	// 	url: url,
	// 	// `params` 是即将与请求一起发送的 URL 参数
	// 	// `data` 是作为请求主体被发送的数据
	// 	params: (method === 'GET') ? params : null,
	// 	data: (method === 'POST' || method === 'PUT' || method === 'DELETE') ? params : null,
	// 	timeout: 10000,
	// 	header: headers
	// }

	// return new Promise((resolve, reject) => {
	// 	http.request(httpDefault)
	// 		// 此处的.then属于luch-request
	// 		.then((res) => {
	// 			// successState(res)
	// 			resolve(res)
	// 		}).catch((response) => {
	// 			console.log('response', response)
	// 			// errorState(response)
	// 			reject(response)
	// 		})
	// })
}

export default {
	get: (url, params, token) => apiRequest('GET', url, params, token),
	post: (url, params, token) => apiRequest('POST', url, params, token),
	put: (url, params, token) => apiRequest('PUT', url, params, token),
	delete: (url, params, token) => apiRequest('DELETE', url, params, token)
}
