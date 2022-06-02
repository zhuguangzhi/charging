<template>
	<view class="nodata">
	    <image class="nodata-icon" mode="aspectFit" :src="icon"></image>
	    <view class="nodata-desc">{{title}}</view>
		<slot>
			<view class="operation" @click="handleClick" v-if="btnTitle">
				{{btnTitle}}
			</view>
		</slot>
	</view>
</template>

<script>

	export default {
		name: 'HbEmpty',
		props: {
			icon: {
				type: String,
				default: '../../../../static/Img/empty.png'
			},
			title: {
				type: String,
				default: '暂无数据'
			},
			btnTitle: String
		},
		data() {
			return {
			
			}
		},
		created() {
			
		},
		methods: {
			handleClick() {
				this.$emit('click')
			} 
		}
	}
</script>

<style>
	.nodata {
	  flex: 1;
	  width: 100%;
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  position: relative;
	}
	
	.nodata-icon {
	  width: 290rpx;
	}
	
	.nodata-desc {
	  margin-top: 32rpx;
	  font-size:24rpx;
	  font-family:PingFangSC-Regular,PingFang SC;
	  font-weight:400;
	  color:rgba(165,165,165,1);
	  text-align: center
	}
	
	.operation {
		min-width: 222rpx;
		height: 64rpx;
		border-radius: 32rpx;
		border: 2rpx solid #333333;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 60rpx;
		padding-right: 60rpx;
		margin-top: 40rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}

</style>
