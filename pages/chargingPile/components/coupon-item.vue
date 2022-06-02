<template>
	<view class="coupon-item-components">
		<view class="coupon" @click="click()">
			<view class="coupon-left">
				<view class="coupon-amount">
					￥<text>{{ amount }}</text>元
				</view>
				<view class="left-left-corner"></view>
				<view class="left-right-corners">
					<view v-for="(item, index) in 15" :key="index"></view>
				</view>
			</view>
			<view class="coupon-right">
				<view>{{ name }}</view>
				<view>
					<view>有效期至： {{ availTo }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "couponItem",
		data() {
			return {
				showAlert: false,
			}
		},
		props: {
			amount: {
				type: String,
				default: '20'
			},
			name: {
				type: String,
				default: '测试优惠券'
			},
			// availFrom: {
			// 	type: String,
			// 	default: '2021-09-02'
			// },
			availTo: {
				type: String,
				default: '2022-09-02'
			}
		},
		methods: {
			xqClick() {
				this.$emit('xqClick')
			},
			click() {
				this.$emit('click')
			}
		},
	}
</script>

<style scoped lang="scss">
	.coupon-item-components {
		width: 100%;
		height: 200rpx;
		.coupon {
			border-radius: 12rpx;
			overflow: hidden;
			height: 180rpx;
			background-color: wheat;
			display: flex;

			.coupon-left {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				// flex: 0.30;
				flex: 0.40;
				color: white;
				// font-size: 40rpx;
				font-size: 35rpx;
				background-color: #5A93FA;
				white-space:nowrap;
				overflow: hidden;

				.coupon-amount {
					text {
						// font-size: 60rpx;
						font-size: 50rpx;
					}
				}

				.left-left-corner {
					top: 50%;
					margin-top: -20rpx;
					left: -20rpx;
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					background-color: #f5f5f5;
					border-radius: 20rpx;
				}

				.left-right-corners {
					position: absolute;
					right: -10rpx;
					top: -10rpx;

					text {
						width: 20rpx;
						height: 20rpx;
						border-radius: 10rpx;
						background-color: #5A93FA;
					}
				}
			}

			.coupon-right {
				flex: 0.70;
				background-color: white;
				display: flex;
				flex-direction: column;
				position: relative;

				// align-items: center;
				// img {
				// 	position: absolute;
				// 	width: 100rpx;
				// 	right: 0;
				// }

				view:nth-of-type(1) {
					margin-top: 12rpx;
					margin-left: 20rpx;
					width: 85%;
					flex: 0.40;
					border-bottom: 1px solid rgb(245, 245, 245);
					line-height: 60rpx;
				}

				view:nth-of-type(2) {
					font-size: 26rpx;
					display: flex;
					flex-direction: column;
					text-align: left;
					color: #999;
					font-size: 24rpx;
					flex: 0.60;
					padding-left: 20rpx;
					justify-content: center;

					text:nth-of-type(1) {}

					text:nth-of-type(2) {
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
	}
</style>
