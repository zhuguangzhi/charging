<template>
	<view class="charging-payment">
		<!-- 端口信息 -->
		<view class="charging-payment-header">
			<text class="title">充电桩：{{ pileInfo.name || "" }}</text>
			<text class="port">充电枪： {{ gunInfo.name || "" }}</text>
			<text class="port">地址：{{ pileInfo.address || "" }}</text>
			<view class="chargingBox">
				<view @click="bindPickerChange(index)"
					  :class="{
						  borderColor:pickerIndex === index,
						  disabledCharger:item.online!=1,
						  occupyCharger:item.status!=0
						}"
					  class="chargingItem"
					  v-for="(item, index) in gunList" :key="index">
					  <text>{{ formatName(item.name) }}</text>
					  <text class="chargingItem_state">{{getChargerState(item)}}</text>
				</view>
			</view>
	<!-- 		<view style="display: flex;flex-direction: column;" v-if="gunInfo.online == 2">
				<image class="chargingImg" src="/static/Img/chargingImg/charging.png" mode=""></image>
				<view class="chargingMsg">设备未连接</view>
			</view>
			<view style="display: flex;flex-direction: column;" v-else-if="gunInfo.online == 1">
				<image class="chargingImg" src="/static/Img/chargingImg/online.png" mode=""></image>
				<view class="chargingMsg">设备已连接</view>
			</view>
			<view style="display: flex;flex-direction: column;" v-else>
				<image class="chargingImg" src="/static/Img/chargingImg/charging.png" mode=""></image>
				<view class="chargingMsg">未选择设备</view>
			</view> -->
		</view>
		
		<!-- 支付金额 -->
		<view class="charging-payment-money">
			<text>充电金额</text>
			<text>（按时计费）</text>
			<view class="chose-money">
				<text @click="changeChose(index)" :class="currentMoneyIndex === index ? 'borderColor' : ''" v-for="(item, index) in moneyList" :key="index">
					{{ item.cost / 100 }}元
				</text>
			</view>
		</view>
<!-- 		<view @click="showPicker=true" class="charging-payment-discount">
			<text>充电枪</text>
			<picker mode="selector" :show="showPicker" @change="bindPickerChange" :value="pickerIndex" :range="gunList.map(item=>item.name)">
				<text>{{gunList[pickerIndex].name}}</text>
			</picker>
		</view> -->
		<!-- 优惠券 -->
		<view @click="choseDiscount()" class="charging-payment-discount">
			<text>{{ discount.id == null ? '优惠券' : discount.desc }}</text>
			<text>{{ discountList.length }}张可用 ></text>
		</view>
		<view class="charging-payment-discount">
			<text style="white-space: nowrap;">收费规则</text>
			<text>{{ pileInfo.rule.memo }}</text>
		</view>
		<!-- 支付方式 -->
		<!-- <view class="charging-payment-type">
			<view @click="changeChose('payType',0)"  class="walletPay">
				<image class="payIcon" src="../../static/assert/dialogicon2.png" mode="" />
				<text>钱包支付</text>
				<icon :style="{display:paymentType===0?'block':''}" class="selectIcon" type="success_no_circle" size="14"/>
			</view>
			<view @click="changeChose('payType',1)"  class="weChatPay">
				<image class="payIcon" src="../../static/assert/dialogicon2.png" mode="" />
				<text>微信支付</text>
				<icon :style="{display:paymentType===1?'block':''}" class="selectIcon" type="success_no_circle" size="14"/>
			</view>
		</view> -->

		<!-- 确认按钮 -->
		<view class="charging-payment-confirm">
			<u-button
				class="theme"
				:custom-style="{
					marginTop: '16rpx',
					marginLeft: '32rpx',
					marginRight: '32rpx',
					width: 'calc(100% - 64rpx)'
				}"
				@click="confirmPayment()"
			>
				确认支付
			</u-button>
		</view>
		<u-popup class="charging-payment-discount-popup" :closeable="false" @close="cancelCoupon" @open="couponShow = true" :show="couponShow" mode="bottom" border-radius="14">
			<view v-if="discountList.length===0" style="height: 20vh;text-align: center;padding-top: 60px;">暂无优惠券</view>
			<scroll-view v-else scroll-y="true" style="height: 50vh; margin-top: 16rpx; overflow: hidden">
				<view style="padding: 16rpx">
					<CouponItem
						v-for="(item, index) in discountList"
						:key="index"
						:amount="item.money"
						:name="item.name"
						:availTo="item.couponExpired"
						@click="selectCouponClick(item)"
					></CouponItem>
				</view>
			</scroll-view>
			<u-button
				class="theme"
				:custom-style="{
					marginTop: '16rpx',
					marginLeft: '32rpx',
					marginRight: '32rpx',
					color: '#fff',
					width: 'calc(100% - 64rpx)'
				}"
				@click.stop="cancelCoupon()"
			>
				取消使用优惠券
			</u-button>
		</u-popup>
				
	</view>
</template>

<script>
import CouponItem from './components/coupon-item.vue';
import { OrderApi, ApiBase, errorCheck, device } from '@/common/apis.js';
import { getNowFormatDate, routePush, urlParamHash, delayed } from '@/common/baseFun.js';
export default {
	data() {
		return {
			couponShow: false,
			moneyList: [],
			currentMoneyIndex: 0, //当前选中金额的index
			payChannel: 'Wallet', //支付方式
			useMoneyInput: false, //选择其他金额的弹出框
			discount: {}, //选择的优惠券
			discountList: [], //优惠券列表
			// gunCode: '',
			pileCode: '',
			pileInfo: null,
			gunInfo: null,
			pickerIndex:-1,
			gunList:[],//枪列表
			showPicker:false
		};
	},
	components: {
		CouponItem
	},
	onLoad(option_) {
		if (option_.q) {
			// 小程序二维码生成方案
			this.type == 'out';
			// 获取到二维码原始链接内容
			const q = decodeURIComponent(option_.q);
			// 用户扫码时间戳
			const scancode_time = parseInt(option_.scancode_time);

			const option = urlParamHash(q);
			// 获取到路由id
			// this.gunCode = option.gunCode;
			this.pileCode = option.pileCode;
		} else {
			// 获取到路由id
			// this.gunCode = option_.gunCode;
			this.pileCode = option_.pileCode;
		}
		this.getData();
		// this.getPayment();
		// this.getPileInfo();
	},
	methods: {
		getChargerState(info) {
			if(info.online==2) {
				return "离线"
			}
			else if(info.status!=0) {
				return "占用"
			}
			else {
				return "可用"
			}
		},
 		bindPickerChange(index) {
			const gun = this.gunList[index]
			console.log('gun',gun)
			if(gun.online!=1 || gun.status!=0) {
				uni.showToast({
					title: '该设备暂不可用',
					icon:"error",
					mask: false
				});
				return false
			}
			this.pickerIndex = index
			this.gunInfo = gun
		},
		async getData() {
			if (this.$store.state.account.loginState == 2) {
				// this.getPayment();
				this.getPileInfo();
				return;
			}
			uni.showLoading({
				title: '数据获取中',
				mask: false
			});
			await delayed(1000);
			this.getData();
		},
		// 获取缴费金额
		async getPayment() {
			const res = await ApiBase(OrderApi.GetPayment({ page: 1, row: 9999, tenantId: this.pileInfo.tenantId }));
			if (errorCheck(res.result, res.error)) {
				this.moneyList = res.result.data.data;
			}
			uni.hideLoading();
		},
		// 获取桩信息
		async getPileInfo() {
			const res = await ApiBase(device.GetDevice({ code: this.pileCode }));
			if (errorCheck(res.result, res.error)) {
				console.log('res.result', res.result);
				this.pileInfo = res.result.data.data[0];
				this.gunList = this.pileInfo.deviceList
				//  找到可用的枪
				for(let index=0;index<this.gunList.length;index++) {
					let item = this.gunList[index]
					if(item.online==1 && item.status==0) {
						this.gunInfo = item
						this.pickerIndex = index
						break;
					}
				}
				// this.gunInfo = res.result.data.data[0]?.deviceList.find(item => item.code === this.gunCode);
				await this.getPayment()
			}
			uni.hideLoading();
		},
		payClick(channel) {
			if (this.pay <= 0) {
				if (channel == 'Wallet') {
					this.payChannel = channel;
				}
			} else {
				this.payChannel = channel;
			}
		},
		// 改变选择的金额或支付方式
		changeChose(index) {
			this.currentMoneyIndex = index;
			// switch(type){
			// 	case 'payType':
			// 		this.paymentType = index;
			// 		break;
			// 	case 'money':
			// 		this.currentMoneyIndex = index;
			// 		break;
			// }
		},
		// 选择优惠券
		choseDiscount() {
			this.couponShow = true;
		},
		cancelCoupon() {
			this.couponShow = false;
		},
		// 确定支付
		async confirmPayment() {
			if(!this.gunInfo?.code) {
				uni.showToast({
					title: '请选择充电枪',
					icon: 'error',
					duration: 1500
				});
				return false;
			}
			if (this.gunInfo.online == 2) {
				uni.showToast({
					title: '该设备暂不可用',
					icon: 'error',
					duration: 1500
				});
				return false;
			}
			uni.showLoading({
				title: '支付中...'
			});
			// let url = `/pages/chargingPile/ChargingOrder?orderId=1514229891838337025`
			// routePush(url)
			// return false;
			const res = await ApiBase(
				OrderApi.StartPayment({
					appId: this.pileInfo.wxPayMerchant.appId,
					merchantId: this.pileInfo.wxPayMerchant.id,
					type: 7,
					channel: 'WeChat',
					paySource: 'WXH5',
					couponId: '',
					payable: this.moneyList[this.currentMoneyIndex].cost,
					time: getNowFormatDate(),
					pileCode: this.pileCode,
					gunCode: this.gunInfo.code
				})
			);
			uni.hideLoading();
			if (errorCheck(res.result, res.error)) {
				uni.getProvider({
					service: 'payment',
					success(e) {
						let data = res.result.data.data;
						uni.requestPayment({
							provider: e.provider[0],
							orderInfo: data.bill,
							timeStamp: data.data.timeStamp,
							nonceStr: data.data.nonceStr,
							package: data.data.packageValue,
							signType: data.data.signType,
							paySign: data.data.paySign,
							_debug: 1, //调试专用
							complete: () => {
								uni.showModal({
									content: '支付已完成',
									cancelText: '否',
									confirmText: '是',
									success: res => {
										if (res.confirm) {
											// 确定
											routePush(`/pages/chargingPile/Order`,'reLaunch');
										} else {
											routePush('/pages/index/index','reLaunch');
										}
									}
								});
							}
						});
					}
				});
			}
			// uni.navigateTo({url:'/pages/chargingPile/ChargingOrder'})
		},
		//  格式化名称
		formatName(name) {
			// 使用 lastIndexOf 查找最后一个下划线的位置
			const lastUnderscoreIndex = name.lastIndexOf("_");
			
			// 如果找到了下划线，就截取它之后的部分，否则返回原始字符串
			return lastUnderscoreIndex !== -1 ? name.slice(lastUnderscoreIndex + 1) : name;

		}
	}
};
</script>

<style scoped lang="less">
.charging-payment {
	width: 100vw;
	background-color: #f5f5f5;
	&-confirm {
		width: 100%;
		height: 50px;
		padding: 16px;
		box-sizing: border-box;
		font-size: 14px;
		background-color: #ffffff;
	}
	&-header {
		padding: 18px 8px;
		font-size: 12px;
		color: #979797;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		text {
			display: block;
			margin-bottom: 8px;
		}
		.title {
			font-size: 14px;
		}
		.chargingImg {
			margin: 0 auto;
			width: 150rpx;
			height: 150rpx;
		}
		.chargingMsg {
			display: block;
			text-align: center;
			margin-top: 20rpx;
			font-size: 14px;
		}
	}
	&-money,
	&-discount,
	&-type {
		margin: 8px 0;
		width: 100%;
		padding: 16px 8px;
		box-sizing: border-box;
		font-size: 12px;
		color: #979797;
		background-color: #ffffff;
		text:first-child {
			color: #000000;
		}
		.chose-money {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			// justify-content: space-between;
			text{
				display: inline-block;
				width: 30%;
				border: 2px solid #979797;
				border-radius: 5px;
				margin-top: 8px;
				text-align: center;
				height: 80rpx;
				box-sizing: border-box;
				line-height: 80rpx;
				font-size: 14px;
				color: #979797;
				margin: 1.65% 1.65%;
			}
		}
	}
	&-discount {
		display: flex;
		justify-content: space-between;
		text:last-child {
			padding: 0 16px;
		}
	}
	&-type {
		padding: 0 8px;
		font-size: 14px;
		.walletPay,
		.weChatPay {
			position: relative;
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			line-height: 40px;
			.payIcon {
				width: 30rpx;
				height: 30rpx;
				vertical-align: middle;
				margin-right: 8px;
			}
			.selectIcon {
				position: absolute;
				right: 8px;
				font-size: 14px;
				display: none;
			}
		}
		.walletPay {
			border-bottom: 1px solid #cccccc;
		}
	}

	// .chose-money-select {
	// 	border-color: var(--color)!important;
	// 	color: var(--color)!important;
	// }
	.paymentBtn {
		margin: 16px;
		border: none;
		// background-color: var(--color);
		// color: var(--fontColor);
		font-size: 14px;
		padding: 8px 0;
	}
	.chargingBox {
		display: grid;
		grid-template-columns: repeat(3,1fr);
		grid-column-gap: 10px;
		grid-row-gap: 10px;
		.chargingItem {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			border: 2px solid #979797;
			border-radius: 5px;
			box-sizing: border-box;
			font-size: 16px;
			color: #979797;
			&_state {
				position: absolute;
				bottom: -10rpx;
				right: 16rpx;
				font-size: 12px;
			}
		}
	}
	
	.disabledCharger {
		border-color: #C4C6C9 !important;
		background-color: #C4C6C9;
		text {
			color: white!important;
		}
	}
	.occupyCharger {
		border-color: #F9AE3D !important;
		text {
			color: #F9AE3D!important;
		}
	}
}
</style>
