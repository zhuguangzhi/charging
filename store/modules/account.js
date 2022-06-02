export default {
	namespaced: true,
	state: {
		// 登录状态， 0：未登录 1：登录中 2：已登录
		loginState: 0,
		loginCode: undefined, // 登录code,使用微信H5登录的时候code相同则不在重新登录
		user: undefined,
		token: undefined,
		sessionKey: undefined, // 小程序会话密钥
		tenantId: undefined,
		balance: 0, // 用户余额,
		recharge: {
			select:0,
			customMoney: 10,
			payChannel: 'WeChat'
		}
	},
	getters: {
		user: state => {
			return state.user
		},
		q: state => state.token,
		tenantId: state => state.tenantId,
		sessionKey: state => state.sessionKey,
	},
	mutations: {
		login(state, user) {
			if (user.token) {
				state.token = user.token
			}
			if (user.sessionKey) {
				state.sessionKey = user.sessionKey
			}
			if (user.code) {
				state.loginCode = user.code
			}
			// #ifdef APP-PLUS
			state.user = user.users || user
			// #endif
			// #ifndef APP-PLUS
			state.user = user
			// #endif
			state.loginState = 2
		},
		loginOut(state) {
			state.user = undefined
			state.token = undefined
			state.sessionKey = undefined
			state.user = undefined
			state.loginState = 0
		},
		setBalance(state, balance) {
			state.balance = balance
		},
		setRecharge(state,info){
			if(info.select != undefined){
				state.recharge.select = info.select
			}
			if(info.customMoney != undefined){
				state.recharge.customMoney = info.customMoney
			}
			if(info.payChannel != undefined){
				state.recharge.payChannel = info.payChannel
			}
		}
	}
}