<template>
	<view class="pile-deatile">
		<image class="pile-deatile-back" @click="back" src="../../../static/Img/arrowLeft.svg" mode=""></image>
		<!-- #ifdef MP-WEIXIN -->
		<swiper style="height: 500rpx!important;" indicator-active-color="#FFFFFF" :circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in imgList" :key="index"><image style="width: 100%; height: 100%;" :src="item" mode="aspectFill"></image></swiper-item>
		</swiper>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<swiper style="height: 240px!important;" indicator-active-color="#FFFFFF" :circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in imgList" :key="index"><image style="width: 100%; height: 100%;" mode="aspectFill"></image></swiper-item>
		</swiper>
		<!-- #endif -->
		<!-- 充电桩详情 -->
		<scroll-view :scroll-y="true" class="pile-deatile-info">
			<!-- 枪个数 -->
			<view class="pile-deatile-info-pile">
				<text class="pile-deatile-info-pile-total">
					<text class="pile-deatile-info-pile-icon">总</text>
					{{ pileInfo.deviceList.length }}枪
				</text>
				<text class="pile-deatile-info-pile-idle">
					<text style="background-color: #007AFF;" class="pile-deatile-info-pile-icon">可</text>
					{{ pileInfo.idleGun }}枪
				</text>
			</view>
			<!-- 收费规则 -->
			<view class="pile-deatile-info-rule">
				<text class="pile-deatile-info-rule-title">规则描述</text>
				<text style="display: block;" class="pile-deatile-info-rule-desc">{{ rule.memo || '暂无描述' }}</text>
			</view>
			<!-- <view class="pile-deatile-info-rule" v-for="item in 6" :key="item">
				<view class="pile-deatile-info-rule-free">
					<text>免费时长：0时</text>
					<text>免费电量：0度</text>
				</view>
				<veiw class="pile-deatile-info-rule-item">
					<text style="font-size: 16px;color: #666666;">规则1：0点到6点收费</text>
					<view class="pile-deatile-info-rule-item-time">
						<text>开始时间：00：00</text>
						<text>结束时间：06：00</text>
						<text>收费：200 分/时</text>
						<text>服务费：200 分/时</text>
					</view>
				</veiw>
			</view> -->
		</scroll-view>
		<!-- 充电枪详情 -->
		<!-- <scroll-view class="pile-deatile"></scroll-view> -->
		<scroll-view scroll-y="true" class="pile-deatile-gun">
			<view class="pile-deatile-gun-item" v-for="item in pileInfo.deviceList" :key="item.id">
				<view class="pile-deatile-gun-item-info">
					<text style="color: #000000;font-size: 16px;">充电枪：{{ item.name }}</text>
					<text>充电枪编号：{{ item.code }}</text>
					<text>
						所在泊位：
						<text v-for="berth in item.berthList" :key="berth.id">{{ berth.name }}</text>
					</text>
					<view class="pile-deatile-gun-item-info-sign">
						<text>{{ item.type == 15 ? '快充' : '慢充' }}</text>
					</view>
				</view>
				<view class="pile-deatile-gun-item-status">
					<image style="width: 15px;height: 15px;vertical-align: middle;margin-right: 4px;" src="../../../static/Img/chargingImg/chargingStatus.png" mode=""></image>
					<text>{{ format.getGunStatus(item.status) }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import store from '@/store/index.js';
import format from '@/utils/format.js';
import { routePush } from '@/common/baseFun.js';
import { ApiBase, errorCheck, device } from '@/common/apis.js';
export default {
	data() {
		return {
			imgList: this.$config.chargingDetailsImgs,
			pileInfo: null,
			format,
			rule: null
		};
	},
	created() {
		this.pileInfo = store.state.pile.pileInfo;
		this.getPayRule();
	},
	methods: {
		// 返回
		back() {
			routePush(-1, 'navigateBack');
		},
		async getPayRule() {
			if (!this.pileInfo.ruleId) return false;
			const res = await ApiBase(device.GetPayRule({ id: this.pileInfo.ruleId }));
			if (errorCheck(res.result, res.error)) {
				this.rule = res.result.data.data;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.pile-deatile {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	background-color: #eeeeee;
	&-back {
		position: fixed;
		top: 64px;
		left: 20px;
		width: 20px;
		height: 15px;
		z-index: 99;
	}
	&-info {
		background-color: #ffffff;
		width: 100vw;
		max-height: 400rpx;
		padding: 16px 8px;
		box-sizing: border-box;
		&-pile {
			font-size: 14px;
			display: flex;
			align-items: center;
			&-total,
			&-idle {
				display: flex;
				height: 30px;
				line-height: 20px;
			}
			&-total {
				color: #e64340;
				margin-right: 60rpx;
			}
			&-idle {
				color: #000000;
			}
			&-icon {
				display: inline-block;
				background-color: #e64340;
				width: 20px;
				height: 20px;
				border-radius: 20px;
				margin: auto 8px auto 0;
				font-size: 10px;
				color: #ffffff;
				text-align: center;
			}
		}

		&-rule {
			font-size: 16px;
			color: #999999;
			padding: 0 16px;
			box-sizing: border-box;
			text {
				display: inline-block;
				padding: 4px 0;
			}
			&-title {
				font-size: 16px;
				color: #333333;
			}
			&-desc {
				font-size: 14px;
				color: #999992;
			}

			&-free {
				display: flex;
				justify-content: space-between;
			}
			&-item {
				text {
					padding: 2px 0;
				}
				&-time {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					text {
						display: block !important;
						width: 50%;
					}
				}
			}
		}
	}
	&-gun {
		flex: 1;
		width: 100%;
		height: 100rpx;
		background-color: #ffffff;
		margin-top: 16px;
		font-size: 14px;
		color: #999999;
		&-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 8px;
			border: 1px solid #eeeeee;

			&-info {
				display: flex;
				flex-direction: column;
				text {
					display: iblock;
					padding: 4px;
				}

				&-sign {
					display: flex;
					align-items: center;
					padding: 8px;
					text {
						display: inline-block;
						padding: 4px 8px;
						font-size: 12px;
						background-color: #eeeeee;
						margin-right: 8px;
					}
				}
			}
			&-status {
				white-space: nowrap;
				margin-right: 30rpx;
				padding: 4px 8px;
				color: #666666;
				box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
			}
		}
	}
}
</style>
