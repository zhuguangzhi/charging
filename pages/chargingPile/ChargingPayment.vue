<template>
	<view class="charging-payment">
		<!-- 端口信息 -->
		<view class="charging-payment-header">
			<text class="title">{{pileInfo.name}}充电桩</text>
			<text class="port">{{gunCode}}端口</text>
			<text class="port">地址：{{pileInfo.address}}</text>
			<view style="display: flex;flex-direction: column;" v-if="gunInfo.online==2">
				<image class="chargingImg" src="/static/Img/chargingImg/charging.png" mode=""></image>
				<view class="chargingMsg">
					设备未连接
				</view>
			</view>
			<view style="display: flex;flex-direction: column;" v-else>
				<image class="chargingImg" src="/static/Img/chargingImg/online.png" mode=""></image>
				<view class="chargingMsg">
					设备已连接
				</view>
			</view>
		</view>
		<!-- 支付金额 -->
		<view class="charging-payment-money">
			<text>充电金额</text>
			<text>（按时计费）</text>
			<view class="chose-money">
				<text @click="changeChose(index)" :class="currentMoneyIndex===index?'borderColor':''" v-for="(item,index) in moneyList" :key="index">
					{{item.cost/100}}元
				</text>
			</view>
		</view>
		<!-- 优惠券 -->
		<view @click="choseDiscount()" class="charging-payment-discount">
			<text>{{discount.id==null?'优惠券':discount.desc}}</text>
			<text>
				{{discountList.length}}张可用 >
			</text>
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
				  width:'calc(100% - 64rpx)'
				}"
				@click="confirmPayment()"
			>
				确认支付
			</u-button>
		</view>
		<u-popup class="charging-payment-discount-popup" :closeable="false" @close="cancelCoupon" @open="couponShow=true" :show="couponShow" mode="bottom" border-radius="14">
			<!-- <view style="height: 100%;">优惠券</view> -->
			<scroll-view scroll-y="true" style="height: 50vh; margin-top: 16rpx; overflow: hidden">
				<view style="padding: 16rpx">
					<CouponItem v-for="(item, index) in discountList" :key="index" :amount="item.money"
						:name="item.name" :availTo="item.couponExpired" @click="selectCouponClick(item)">
					</CouponItem>
				</view>
			</scroll-view>
			<u-button
				class="theme"
				:custom-style="{
				  marginTop: '16rpx',
				  marginLeft: '32rpx',
				  marginRight: '32rpx',
				  color: '#fff',
				  width:'calc(100% - 64rpx)'
				}"
				@click.stop="cancelCoupon()">
				取消使用优惠券
			</u-button>
		</u-popup>
	</view>
</template>

<script>
	import CouponItem from './components/coupon-item.vue';
	import {OrderApi,ApiBase,errorCheck,device} from '@/common/apis.js';
	import {getNowFormatDate,routePush} from '@/common/baseFun.js'
	export default {
		data() {
			return {
				couponShow:false,
				moneyList:[],
				currentMoneyIndex:0,//当前选中金额的index
				payChannel:'Wallet',//支付方式
				useMoneyInput:false,//选择其他金额的弹出框
				discount:{},//选择的优惠券
				discountList:[],//优惠券列表
				gunCode:'',
				pileCode:'',
				pileInfo:'',
				gunInfo:'',
			};
		},
		components:{
			CouponItem
		},
		onLoad(option) {
			// 获取到路由id
			this.gunCode = option.gunCode;
			this.pileCode = option.pileCode;
			
			this.getPayment()
			this.getPileInfo()
		},
		methods:{
			// 获取缴费金额
			async getPayment(){
				const res = await ApiBase(OrderApi.GetPayment({page:1,row:9999,tenantId:this.$config.tenantCode}))
				if(errorCheck(res.result,res.error)){
					this.moneyList = res.result.data.data
				}
			},
			// 获取桩信息
			async getPileInfo(){
				const res = await ApiBase(device.GetDevice({code:this.pileCode}))
				if(errorCheck(res.result,res.error)){
					console.log('res.result',res.result)
					this.pileInfo = res.result.data.data[0]
					this.gunInfo = res.result.data.data[0].deviceList.find(item=>item.code===this.gunCode)
				}
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
			changeChose(index){
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
			choseDiscount(){
				this.couponShow=true
			},
			cancelCoupon(){
				this.couponShow=false
			},
			// 确定支付
			async confirmPayment(){
				if(this.gunInfo.online == 2){
					uni.showToast({
						title:'该设备暂不可用',
						icon:"error",
						duration:1500
					})
					return false
				}
				uni.showLoading({
					title:'支付中...'
				})
				// let url = `/pages/chargingPile/ChargingOrder?orderId=1514229891838337025`
				// routePush(url)
				// return false;
				const res = await ApiBase(OrderApi.StartPayment({
					'appId':this.$config.appId,
					'merchantId':this.$config.merchantId,
					'type':7,
					'channel':"WeChat",
					'paySource':"WXH5",
					'couponId':"",
					'payable':this.moneyList[this.currentMoneyIndex].cost,
					'time':getNowFormatDate(),
					'pileCode':this.pileCode,
					'gunCode':this.gunCode,
				}))
				uni.hideLoading()
				if(errorCheck(res.result,res.error)){
					uni.getProvider({
						service:'payment',
						success(e) {
							let data = res.result.data.data
							uni.requestPayment({
								provider:e.provider[0],
								orderInfo:data.bill,
								timeStamp:data.data.timeStamp,
								nonceStr:data.data.nonceStr,
								package:data.data.packageValue,
								signType:data.data.signType,
								paySign:data.data.paySign,
								_debug:1,//调试专用
								complete:()=> {
									uni.showModal({
										content:'支付已完成',
										cancelText:'否',
										confirmText:"是",
										success:(res)=>{
											if(res.confirm){
												// 确定
												routePush(`/pages/chargingPile/Order`)
											}else{
												routePush('/pages/index/index')
											}
										}
									})
									
								}
							})
						}
					})
				}
				// uni.navigateTo({url:'/pages/chargingPile/ChargingOrder'})
			}
		}
	}
</script>

<style scoped lang="less">
.charging-payment{
	width: 100vw;
	background-color: #F5F5F5;
	&-confirm {
		width: 100%;
		height: 50px;
		padding: 16px;
		box-sizing: border-box;
		font-size: 14px;
		background-color: #FFFFFF;
	}
	&-header {
		padding: 18px 8px;
		font-size: 12px;
		color: #979797;
		background-color: #FFFFFF;
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
	&-type{
		margin: 8px 0;
		width: 100%;
		padding: 16px 8px;
		box-sizing: border-box;
		font-size: 12px;
		color: #979797;
		background-color: #FFFFFF;
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
			text {
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
}
</style>
