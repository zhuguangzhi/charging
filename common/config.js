let config = {
	/** ---------------------------基础信息---------------------------- */
	// baseUrl: "https://webapi.hcqzhtc.com",
	// baseUrl: "http://webapi.web.xyhwgs.cn",
	baseUrl: "https://156chargingpile.citypark.jdggzygs.com",
	staticUrl: 'https://static.hcqzhtc.com', //静态资源
	// wxLoginUrl : "http://123.60.28.143:15000", // 登录跳转地址

	// appId : "wxa15d1107da4987fb",// 小程序Appid
	// h5AppId : "wxa15d1107da4987fb", // H5AppId
	appId: "wx37227b9da3af9c53", // 小程序Appid
	h5AppId: "wx22b74bb5b0b68d38", // H5AppId
	apAppId: "", // 支付宝的appId
	// tenantCode: "CP8SQ3RC", //商户Id
	tenantCode: "CP99AD99", //商户Id
	merchantId: "1658422091037720576", //微信商户Id

	// payCallback: "http://gzh.web.xyhwgs.cn/wx",

	// 标题
	center: [119.281195,29.474964], // 地图中心点（目前：建德市政府）

	// 充电桩详情背景图
	chargingDetailsImgs: [
		'/static/chargingPileImg/img1.jpg',
		// '/static/chargingPileImg/img3.jpeg',
		// '/static/chargingPileImg/img4.jpeg',
	]
}

// // #ifdef H5
// config = window.$$config
// // #endif

export default config;