import store from "@/store/index.js"
export const routePush = (url, type = 'navigateTo', checkToken = true) => {
	let token = store.state.account.token
	// 校验token
	if (checkToken && !token) {
		// 校验失败
		uni.redirectTo({
			url: '/pages/login/index'
		});
		return false
	}
	if (type === 'redirectTo') uni.redirectTo({
		url: url
	})
	else if (type === 'navigateTo') uni.navigateTo({
		url: url
	})
	else if (type === 'reLaunch') uni.reLaunch({
		url: url
	})
	else if (type === 'navigateBack') uni.navigateBack({
		url: url
	})
	else if (type === 'preloadPage') uni.preloadPage({
		url: url
	})

}
export const getNowFormatDate = () => {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

// 同步等待
export const delayed = (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			resolve()
		}, time)
	})
}
// URL参数转对象
export const urlParamHash = (url) => {

	var params = {}

	var h

	var hash = url.slice(url.indexOf('?') + 1).split('&')

	for (var i = 0; i < hash.length; i++) {

		h = hash[i].split('=') //

		params[h[0]] = h[1]

	}

	return params
}
