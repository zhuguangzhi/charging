import Vue from 'vue'
/**
 * SERVICE_NONE = 0; —-无
 * SERVICE_WALLET = 1; —-钱包充值
 * SERVICE_PLAN = 2; —-套餐购买/续费
 * SERVICE_TICKET = 3; —-优惠券领取/发放
 * SERVICE_CARD = 4; —-储值卡充值
 * SERVICE_CHARGE = 10; —-充电（通用）
 * SERVICE_DC = 11; —-充电（汽车直流快充）
 * SERVICE_AC = 12; —-充电（汽车交流慢充）
 * SERVICE_BC = 13; —-充电（电单车充电）
 * SERVICE_PB = 14; —-充电（充电宝）
 * SERVICE_PREPAID_METER = 15; —-预付费电表
 * SERVICE_PARK = 20; —-停车（通用）
 * SERVICE_PARALLEL_PARK = 21; —-停车（路边）
 * SERVICE_PARKING_LOT = 22; —-停车（停车场）
 * SERVICE_METER = 30; —-表类
 * SERVICE_WATER_METER = 31; —-水表
 * SERVICE_ELETRIC_METER = 32; —-电表
 * SERVICE_GAS_METER = 33; —-气表
 * SERVICE_VIDEO = 40; —-视频
 * SERVICE_EV = 50; —-车辆监控
 * SERVICE_EV_CAR = 51; —-车辆监控（电动汽车）
 * SERVICE_GAS_CAR = 52; —-车辆监控（燃油车）
 * SERVICE_BIKE = 53; —-车辆监控（单车）
 * SERVICE_TIMESHARE = 60; —-分时租赁
 * SERVICE_TS_CAR = 61; —-分时租赁（汽车）
 * SERVICE_TS_BIKE = 62; —-分时租赁（单车）
 * SERVICE_TS_PB = 63; —-分时租赁(充电宝)
 * SERVICE_ECOMMERCE = 70; —-电子商务
 * SERVICE_B2C = 71; —-B2C业务,商城业务
 * SERVICE_B2B = 72; —-B2B业务,批发商城
 * SERVICE_C2C = 73; —-C2C业务,跳蚤市场
 * SERVICE_O2O = 710: —-线上下单，线下服务，用于餐饮等业务
 * SERVICE_TAKEOUT = 711; —-外卖业务
 * SERVICE_GROUP_PURCHASE = 712; —-团购/拼购业务
 * SERVICE_SHOP = 713; —-线下收银
 * SERVICE_AUTOMAT = 714; —-自动贩卖
 */
const service = [{
		key: 0,
		value: '无'
	},
	{
		key: 1,
		value: '钱包充值'
	},
	{
		key: 2,
		value: '套餐购买/续费'
	},
	{
		key: 3,
		value: '优惠券领取/发放'
	},
	{
		key: 4,
		value: '储值卡充值'
	},
	{
		key: 10,
		value: '充电（通用）'
	},
	{
		key: 11,
		value: '充电（汽车直流快充）'
	},
	{
		key: 12,
		value: '充电（汽车交流慢充）'
	},
	{
		key: 13,
		value: '充电（电单车充电）'
	},
	{
		key: 14,
		value: '充充电（充电宝）'
	},
	{
		key: 15,
		value: '预付费电表'
	},
	{
		key: 20,
		value: '停车（通用）'
	},
	{
		key: 21,
		value: '停车（路边）'
	},
	{
		key: 22,
		value: '停车（停车场）'
	},
	{
		key: 15,
		value: '预付费电表'
	},
]

// RECEIPT_STATE_NO = 0; //未开票
// RECEIPT_STATE_PENDING = 1; //等待开票
// RECEIPT_STATE_PROCEEDING = 2; //出票中
// RECEIPT_STATE_SUCCESS = 3; //出票成功
// RECEIPT_STATE_FAILED = 4; //出票失败
// 开票状态
const invoiceState = [{
		key: 0,
		value: '未开票'
	},
	{
		key: 1,
		value: '等待开票'
	},
	{
		key: 2,
		value: '出票中'
	},
	{
		key: 3,
		value: '出票成功'
	},
	{
		key: 4,
		value: '出票失败'
	},
]

// 0：’已支付’;
// 1：’已退款’;
// 2：’已完成’;
// 3：’退款中’;
// 4：’充电中’;
// 5：’退款失败’;
// 6：’等待开始’;
// 7：’等待结束’;
// 8：’充电完成’;
// 账单状态
const paymentState = [{
		key: 0,
		value: '已支付'
	},
	{
		key: 1,
		value: '已退款'
	},
	{
		key: 2,
		value: '已完成'
	},
	{
		key: 3,
		value: '退款中'
	},
	{
		key: 4,
		value: '-'
	},
	{
		key: 5,
		value: '-'
	},
	{
		key: 6,
		value: '等待开始'
	},
	{
		key: 7,
		value: '等待结束'
	},
	{
		key: 8,
		value: '-'
	},
]

// 支付方式
const gatewayOptions = [{
		key: "alipay",
		value: "支付宝"
	},
	{
		key: "wechat",
		value: "微信"
	},
	{
		key: "abc",
		value: "农行"
	},
	{
		key: "hxb",
		value: "华夏银行"
	},
	{
		key: "userpay",
		value: "钱包"
	},
	{
		key: "cardpay",
		value: "储值卡"
	},
	{
		key: "cash",
		value: "现金"
	},
	{
		key: "sgcc",
		value: "国网"
	},
	{
		key: "ckej",
		value: "城客e家"
	},
	{
		key: "heemoney",
		value: "洪城一卡通"
	},
	{
		key: "ums",
		value: "银联商务"
	},
	{
		key: "open",
		value: "第三方"
	}
]

// 订单状态
const pdrStateOptions = [{
		key: 1,
		value: "停车中"
	},
	{
		key: 2,
		value: "已完成"
	},
	{
		key: 3,
		value: "等待取证"
	},
	{
		key: 4,
		value: "等待入场"
	},
	{
		key: 5,
		value: "等待出场"
	},
	{
		key: 6,
		value: "待付款"
	},
	{
		key: 7,
		value: "已关闭"
	},
	{
		key: 8,
		value: "欠费"
	},
	{
		key: 9,
		value: "退款中"
	},
	{
		key: 255,
		value: "异常"
	}
]

// 共享车位审核
const checkState = [{
		key: 1,
		value: "审核中"
	},
	{
		key: 2,
		value: "审核通过"
	},
	{
		key: 3,
		value: "审核失败"
	}
]

// 车牌颜色
const color = [{
		key: 'blue',
		value: "蓝牌"
	},
	{
		key: 'green',
		value: "绿牌"
	},
	{
		key: 'yellow',
		value: "黄牌"
	},
	{
		key: 'black',
		value: "黑牌"
	},
	{
		key: 'white',
		value: "白牌"
	}
]

// 认证状态 0；待审核，1：审核通过，2：审核失败
const authState = [{
		key: '审核中',
		value: 0
	},
	{
		key: '认证通过',
		value: 1
	},
	{
		key: '认证失败',
		value: 2
	}
]

/**
 * 通过Key获取Value
 * @param {*} key
 * @param {*} defVal 默认值
 */
const getValueByKey = (data, key, defVal) => {
	for (let i = 0; i < data.length; i++) {
		const item = data[i]
		if (item.key == key) {
			return item.value
		}
	}
	return defVal || ''
}
// 通过Value获取Key
const getKeyByValue = (data, value, defVal) => {
	for (let i = 0; i < data.length; i++) {
		const item = data[i]
		if (item.value == value) {
			return item.key
		}
	}
	return defVal || ''
}

// 停车时间格式化
const durationFormat = (duration) => {
	let time = "";
	// 天
	if (Math.floor(duration / 86400) > 0) {
		time = time + Math.floor(duration / 86400) + "天"
	}
	// 小时
	if (Math.floor((duration % 86400) / 3600) > 0) {
		time = time + Math.floor((duration % 86400) / 3600) + "小时"
	}
	// 分钟
	if ((Math.floor(((duration % 86400) % 3600) / 60)) > 0) {
		time = time + (Math.floor(((duration % 86400) % 3600) / 60)) + "分钟"
	}
	// 秒
	if ((((duration % 86400) % 3600) % 60) > 0) {
		time = time + (((duration % 86400) % 3600) % 60) + "秒"
	}
	return time;
}

// timeZEROformat 时间为0的格式化
const timeZeroFormat = (time) => {
	if (time && time != "1970-01-01 08:00:00") {
		return time
	}
	return ''
}

// 枪使用状态
const gunStatus = [{
		key: 0,
		label: '空闲'
	},
	{
		key: 1,
		label: '充电中'
	},
	{
		key: 2,
		label: '充电结束'
	},
	{
		key: 3,
		label: '车端暂停充电'
	},
]
// 获取枪状态
const getGunStatus = (key) => {
	return gunStatus.find(item => item.key === key).label
}
// 订单状态
const orderStatus = [{
		key: 0,
		label: '等待支付'
	},
	{
		key: 1,
		label: '充电中'
	},
	{
		key: 2,
		label: '充电完成'
	},
	{
		key: 3,
		label: '用户终止充电'
	},
	{
		key: 4,
		label: '拔枪终止充电'
	},
	{
		key: 5,
		label: '设备请求超时'
	},
	{
		key: 6,
		label: '订单关闭'
	},
	{
		key: 7,
		label: '未插枪'
	},
	{
		key: 8,
		label: '车端未启动充电'
	},
	{
		key: 9,
		label: '急停按钮触发'
	},
	{
		key: 10,
		label: '管理员终止充电'
	},
	{
		key: 11,
		label: '刷卡终止充电'
	},
]

const getOrderStatus = (status) => {
	// console.log('----status',status,orderStatus.find(item=>item.key===status).label)
	if (!isNaN(status))
		return orderStatus.find(item => item.key === status).label
}

export default {
	getValueByKey,
	getKeyByValue,
	service,
	invoiceState, // 开票状态
	paymentState, // 账单状态
	gatewayOptions, // 支付方式
	pdrStateOptions, // 订单状态
	durationFormat, // 时长格式化
	checkState, // 共享车位审核状态
	color, // 车牌颜色
	authState, // 认证状态
	timeZeroFormat, // 时间为0格式化
	getGunStatus, //充电枪状态
	getOrderStatus, //订单状态
}