import config from './config.js'
import Http from './request.js'

/* const BaseUrl = config.baseUrl + '/user/api' 线上地址 */
const BaseUrl = config.baseUrl + '/api/v1'
/**
 * api请求处理方法,封装返回数据格式
 */
export const ApiFormat = async (fun) => {
	try {
		const result = await fun
		return {
			result: result,
			error: null
		}
	} catch (error) {
		return {
			result: null,
			error: error
		}
	}
}

/**
 * api基础请求封装，loading,错误提示,异常处理
 */
export const ApiBase = async (fun, {
	showLoading = false,
	loadingText = '加载中',
	showError = true
} = {}) => {

	// loadingKey
	const loadingKey = Math.random().toString(36).slice(-8) + new Date().getTime()
	try {
		if (showLoading) uni.showLoading({
			title: loadingText
		})

		// 发起请求
		const {
			result,
			error
		} = await ApiFormat(fun)
		showLoading && uni.hideLoading()
		if (error && showError) {
			uni.showToast({
				title: error.message || '请求异常',
				duration: 2000,
				icon: 'none'
			})
			return {
				result,
				error
			}
		}

		// if (result.code != 0 && showError) {
		//   message.error({ content: result.msg || '其他异常', key: loadingKey })
		//   return { result, error } as ApiResult
		// }
		return {
			result,
			error
		}
	} catch (error) {
		if (showError) {
			uni.showToast({
				title: error.message || '请求处理异常',
				duration: 2000,
				icon: 'none'
			})
		} else {
			if (loading) loading();
			loading = null
		}
		return {
			result: null,
			error
		}

	}
}

//错误校验
export const errorCheck = (result, error) => {
	if (!result || result.data.code !== 0) {
		if ([-1, -2, -3, -4, -5, 1610].indexOf(result.data.code) !== -1) {
			uni.showToast({
				title: '请重新登录',
				duration: 2000,
				icon: 'none'
			})
			uni.reLaunch({
				url: '/pages/login/index'
			});
			return false;
		}
		uni.showToast({
			title: result.data.msg,
			duration: 2000,
			icon: 'none'
		})
		return false;
	}
	return true;
}

export const login = {
	userLogin: p => Http.post(`${BaseUrl}/users/miniapp/login`, p),
	GetUserPhone: p => Http.get(`${BaseUrl}/users/phone`, p),
	// 查询支付的商户信息 tenantCode:商户唯一编号 payTenantType:要查询的支付商户类型 1.微信小程序 2.微信公众号 3.支付宝小程序 4.支付宝生活号
	GetPayTenantInfo:p => Http.get(`${BaseUrl}/user/pile-order/pay_tenant`, p),
}
/*------------------------------充电站------------------------------------------------*/
export const station = {
	// 获取所有充电站
	GetStation: p => Http.get(`${BaseUrl}/user/station/pages`, p),
	// 获取指定充电站
	GetIdStation: p => Http.get(`${BaseUrl}/user/station/${p.id}`),
}
/*------------------------------充电设备------------------------------------------------*/
export const device = {
	// 获取设备所有
	GetDevice: p => Http.get(`${BaseUrl}/user/device/pages`, p),
	// 获取指定设备
	GetDeviceId: p => Http.get(`${BaseUrl}/user/device/${p.id}`, p),
	// 获取收费规则
	GetPayRule: p => Http.get(`${BaseUrl}/user/rule/${p.id}`, p)
}
/*------------------------------订单------------------------------------------------*/
export const OrderApi = {
	// 获取预交费
	GetPayment: p => Http.get(`${BaseUrl}/user/payment/pages`, p),
	StartPayment: p => Http.post(`${BaseUrl}/user/pile-order/start/payment`, p),
	EndPayment: p => Http.post(`${BaseUrl}/user/pile-order/stops-recharge/${p.id}`, p),
	// 根据id查充电桩订单详情
	GetPaymentInfoId: p => Http.get(`${BaseUrl}/user/pile-order/${p.id}`, p),
	// 查所有充电桩订单
	GetPayOrder: p => Http.get(`${BaseUrl}/user/pile-order/pages`, p),
}