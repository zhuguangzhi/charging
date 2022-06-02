let config = {
/** ---------------------------基础信息---------------------------- */
	// baseUrl: "https://webapi.hcqzhtc.com",
	// baseUrl: "http://webapi.web.xyhwgs.cn",
	baseUrl: "https://chargingpile.park.alinkx.com/api",
	wxLoginUrl : "http://123.60.28.143:15000", // 登录跳转地址
	
	// appId : "wxa15d1107da4987fb",// 小程序Appid
	// h5AppId : "wxa15d1107da4987fb", // H5AppId
	appId : "wx175c8821dfa10c1f",// 小程序Appid
	h5AppId : "wx22b74bb5b0b68d38", // H5AppId
	apAppId: "", // 支付宝的appId
	tenantCode:"CP99AD99",//商户Id
	merchantId:"1518135852366610432",//微信商户Id
	
	payCallback : "http://gzh.web.xyhwgs.cn/wx",
	
	// 标题
	center:[118.354747,34.369585] , // 地图中心点
	unitName : "新沂市智慧停车", // 收费公司名称
	logo: 'https://files.catbox.moe/jn2k0x.png',
	name:`<div style="text-align: center;">
	    <p style="font-size:16px;margin-bottom:0.20rem;">新沂好停车</p>
	    <p style="font-size:16px;margin-bottom:0.20rem;">为新沂市公众提供便捷化停车出行服务</p>
	    <p style="font-size:16px;margin-bottom:0.20rem;">智慧停车，服务为民。</p>
	    <p style="font-size:16px;margin-bottom:0.20rem;">共创共建，秀美新沂。</p>
	</div>
	`,
	
	content : ``,
	phone : '0516—88951987', // 联系方式
	serverTime : `<p style="text-align:center">服务时间：08:30--17:30</p>` ,// 工作时间
	version:`<p style="text-align:center">版本号 : 2.2.3</p>`, //  版本号
	
	gzBank: false,
	gzBankQuick: false,
	wallet: true,
	weChat: true,
	
	rechargeInfo:"",
	// 无感支付页面公告
	inductivePayInfo : "",
	// 关注公众号链接
	wxChartLink : "",
	
	// 充电桩详情背景图
	chargingDetailsImgs:[
		'/static/chargingPileImg/img2.jpeg',
		'/static/chargingPileImg/img3.jpeg',
		'/static/chargingPileImg/img4.jpeg',
	]
}

// // #ifdef H5
// config = window.$$config
// // #endif

export default config;