<template>
	<view>
		<!-- #ifdef MP-WEIXIN || H5 -->
		<view>
			<view>
				<view class="header"><image src="/static/Img/weChat.png"></image></view>
				<view class="content">
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class="bottom" type="primary" open-type="getPhoneNumber" withCredentials="true" lang="zh_CN" @getphonenumber="getPhoneNumber">授权登录</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
import { login, ApiBase, errorCheck } from '../../common/apis.js';
import store from '@/store/index.js';
import { routePush } from '@/common/baseFun.js';
// #ifdef H5
import jweixin from '../../lib/jweixin.min.js';
// #endif
export default {
	data() {
		return {
			// loginInfo:null,
		};
	},

	methods: {
		async getPhoneNumber(phone) {
			// if(this.loginInfo==null){
			// 	uni.showToast({
			// 		title:'登录失败，请重试',
			// 		icon:'none'
			// 	})
			// 	this.login()
			// 	return false
			// }
			if (phone.detail.errMsg === 'getPhoneNumber:fail user deny') {
				return false;
			}
			const res = await ApiBase(
				login.GetUserPhone({
					sessionKey: store.state.account.user.sessionKey,
					// merchantId: this.$config.merchantId,
					encryptedData: phone.detail.encryptedData,
					iv: phone.detail.iv,
					// tenantCode: this.$config.tenantCode
				}),
				{ showLoading: true }
			);
			store.commit('account/login', res.result.data.data);
			// uni.navigateBack({ delta: 1 });
			routePush('/pages/index/index', 'redirectTo', false);
		}
	}
};
</script>

<style scoped>
.header {
	margin: 90rpx 0 90rpx 50rpx;
	border-bottom: 1px solid #ccc;
	text-align: center;
	width: 650rpx;
	height: 300rpx;
	line-height: 450rpx;
}

.header image {
	width: 200rpx;
	height: 200rpx;
}

.content {
	margin-left: 50rpx;
	margin-bottom: 90rpx;
}

.content text {
	display: block;
	color: #9d9d9d;
	margin-top: 40rpx;
}

.bottom {
	border-radius: 80rpx;
	margin: 70rpx 50rpx;
	font-size: 35rpx;
	background-color: #1aad19;
}
</style>
