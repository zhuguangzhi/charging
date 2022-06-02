<template>
	<view class="charging-order">
		<!-- 大背景 -->
		<view class="charging-order-bg theme"></view>
		<view class="charging-order-card">
			<!-- 充电特效 -->
			<view class="charging-order-card-circle">
				<view class="out-circle"></view>
				<view class="in-circle">
					<image class="in-circle-image" src="../../static/Img/chargingImg/lightning.png" mode=""></image>
					{{format.getOrderStatus(orderInfo?orderInfo.state:6)}}
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="charging-order-card-details">
				<p>
					<text>订单号：</text>
					<text>{{orderId}}</text>
				</p>
				<p>
					<text>充电时间：</text>
					<text>{{orderInfo.createdSourceTime || '--'}}</text>
				</p>
				<p>
					<text>充电桩编号：</text>
					<text>{{orderInfo.pileDevCode}}</text>
				</p>
				<p>
					<text>充电枪编号：</text>
					<text>{{orderInfo.gunDevCode}}</text>
				</p>
				<p>
					<text>充电时长：</text>
					<text>{{computedTime}}</text>
				</p>
				<p>
					<text>充电电量：</text>
					<text>{{orderInfo.electricity}}度</text>
				</p>
			</view>
			<!-- 金额 -->
			<view class="charging-order-card-money">
				<view class="charging-order-card-money-pay">
					<text class="borderColor">
						{{orderInfo.pay/100}}元
					</text>
					<text>
						支付金额
					</text>
				</view>
				<view class="charging-order-card-money-pay">
					<text class="borderColor">
						{{orderInfo.amount/100}}元
					</text>
					<text>
						消费金额
					</text>
				</view>
				<view v-if="orderInfo.state!=0 && orderInfo.state!=1" class="charging-order-card-money-pay">
					<text class="borderColor">
						{{computedRefundAmount}}元
					</text>
					<text>
						退款金额
					</text>
				</view>
			</view>
		</view>
		<!-- <u-button
			v-if="orderInfo.state==0"
			class="theme"
			:custom-style="{
			  marginTop: '16rpx',
			  marginLeft: '32rpx',
			  marginRight: '32rpx',
			  color: '#fff',
			  width:'calc(100% - 64rpx)'
			}"
			@click="pay()"
		>
			支付
		</u-button> -->
		<u-button
			v-if="orderInfo.state==1"
			class="theme"
			:custom-style="{
			  marginTop: '16rpx',
			  marginLeft: '32rpx',
			  marginRight: '32rpx',
			  color: '#fff',
			  width:'calc(100% - 64rpx)'
			}"
			@click="cancleCharging()"
		>
			停止充电
		</u-button>
		<u-button
			v-else
			class="theme"
			:custom-style="{
			  marginTop: '16rpx',
			  marginLeft: '32rpx',
			  marginRight: '32rpx',
			  color: '#fff',
			  width:'calc(100% - 64rpx)'
			}"
			@click="reBack()"
		>
			返回首页
		</u-button>
	</view>
</template>

<script>
	import {OrderApi,ApiBase,errorCheck,device} from '@/common/apis.js';
	import {routePush} from '@/common/baseFun.js'
	import utils from '@/utils/utils.js'
	import format from '@/utils/format.js'
	export default {
		data() {
			return {
				orderId:'',
				orderInfo:null,
				time:null,
				format
			};
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.getOrderInfo()
		},
		computed:{
			computedTime(){
				if(this.orderInfo){
					if(this.orderInfo.state==1){
						// 充电中
						return utils.getTime(this.orderInfo.createdSourceTime||0)
					}
					// 已完成充电
					return utils.getTime2Time(this.orderInfo.closeTime,this.orderInfo.createdSourceTime)
				}else {
					return '0分钟'
				}
			},
			computedRefundAmount(){
				let sum = 0;
				if(!this.orderInfo) return 0
				this.orderInfo.billList.forEach(item=>{
					if(item.refundRecord){
						sum+= Number(item.refundRecord.refund)
					}
				})
				return sum/100
			}
		},
		methods:{
			// 查订单详情
			async getOrderInfo(){
				let res = await ApiBase(OrderApi.GetPaymentInfoId({id:this.orderId}))
				if(errorCheck(res.result,res.error)) {
					this.orderInfo = res.result.data.data
				}
			},
			// 停止充电
			cancleCharging(){
				uni.showModal({
					content:'确定终止充电吗？',
					success: async(e) => {
						if(e.confirm){
							const res = await ApiBase(OrderApi.EndPayment({id:this.orderId}))
							if(errorCheck(res.result,res.error)){
								uni.showToast({
									title: '终止成功'
								});
								routePush('/pages/index/index')
							}
						}
					}
				})
				
			},
			// 返回首页
			reBack(){
				routePush('/pages/index/index','redirectTo')
			}
			
		}
	}
</script>

<style scoped lang="less">
.charging-order {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100vw;
	background-color: #F5F5F5;
	// font-size: 14px;
	&-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 260rpx;
		// background-color: var(--color);
	}
	&-card {
		margin-top: 40rpx;
		margin-left: 37.5rpx;
		margin-right: 37.5rpx;
		position: relative;
		background-color: #FFFFFF;
		box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
		border-radius: 6rpx;
		padding: 8px;
		box-sizing: border-box;
		&-circle {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx 0 30rpx 0;
			.out-circle {
				position: absolute;
				width: 220rpx;
				height: 220rpx;
				// background-image: linear-gradient(to bottom, #33126B , #2EC1C9);
				background-image: linear-gradient(to bottom, #2EC1C9,#AC8FC3);
				// background-image: linear-gradient(to bottom, #F9D7E2,#AFEBE8);
				border-radius: 220rpx;
				-webkit-transform: rotate(360deg);
				animation: rotation 4s ease infinite;
			}
			@-webkit-keyframes rotation{
			    from {-webkit-transform: rotate(0deg);}
			    to {-webkit-transform: rotate(360deg);}
			}
			.in-circle {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				z-index: 3;
				width: 190rpx;
				height: 190rpx;
				border-radius: 190rpx;
				background-color: #FFFFFF;
				&-image {
					position: absolute;
					width: 50%;
					height: 50%;
					z-index: -1;
				}
			}
		}
		&-details {
			color: #666666;
			p {
				padding: 8px;
			}
		}
		&-money {
			margin: 16px auto;
			width: 85%;
			border-top: 1px solid #999999;
			padding: 8px 16px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&-pay{
				margin-top: 16px;
				text {
					display: block;
					text-align: center;
				}
				// .num {
				// 	// color: var(--color)!important;
				// }
			}
			
		}
	}
	&-cancle {
		height: 50px;
		margin: 50rpx 37.5rpx;
		button {
			background-color: #000000;
		}
	}
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
