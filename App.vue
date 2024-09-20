<script>
import store from '@/store/index.js';
import { login, ApiBase, errorCheck } from '@/common/apis.js';
import { routePush } from '@/common/baseFun.js';
export default {
	async onLaunch() {
		// #ifdef MP-WEIXIN
		await this.login();
		// #endif
	},
	methods: {
		// 登录
		async login() {
			uni.showLoading({ title: '加载中' });
			const [uniError, uniData] = await uni.login();
			const res = await ApiBase(
				login.userLogin({
					code: uniData.code,
					// merchantId: this.$config.merchantId,
					// tenantCode: this.$config.tenantCode
				})
			);
			if (!errorCheck(res.result, res.error)) {
				uni.hideLoading();
				return;
			}
			store.commit('account/login', res.result.data.data);
			// if (res.result.data.data.user && res.result.data.data.user.phone) {
			// 	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			// 	let curRoute = routes[routes.length - 1].route; // 获取当前页面路由，也就是最后一个打开的页面路由
			// 	if (curRoute === 'pages/login/index') routePush('/pages/index/index', 'redirectTo', false);
			// }
			uni.hideLoading();
		},
		// h5登录
		H5Login(name = 'code') {
			// 当前网页的url，供微信重定向使用
			let loc_href = window.location.href;

			// 对当前页面的url进行微信要求的urlEncode 处理
			loc_href = encodeURIComponent(loc_href);

			// 构造获取code的链接
			let merchantId = this.$config.h5AppId;

			// 企业微信应用的CorpID 或者 微信公众号的appid
			let wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize
				?appid=${this.$config.h5AppId}&redirect\_uri=${loc_href}
				&response_type=code&scope=snsapi_base
				&state=STATE#wechat_redirect`;
			console.log((location.href = wxUrl));
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-ui/index.scss';
// #ifdef APP
@import './AppTheme.scss';
// #endif
</style>
