<template>
	<view class="charging">
		<map class="map" id="map" :longitude="lon" :latitude="lat" :markers="marks" @markertap="markertap()" ></map>
		<!-- #ifdef H5 || MP-WEIXIN -->
		<view class="charging-scan theme" @click="onScanCode()">
			<image class="charging-scan-image" src="../../static/Img/scan.png" mode=""></image>
			<text>扫码充电</text>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<cover-view style="height: 100%;display: flex;align-items: center;justify-content: center;" class="charging-scan theme" @click="onScanCode()">
			<cover-image style="display: inline-block;" class="charging-scan-image" src="../../static/Img/scan.png" />
			<!-- <cover-view style="display: inline-block;">扫码充电</cover-view> -->
			<!-- <div style="height: 100%;display: flex;align-items: center;justify-content: center;">
				
			</div> -->
		</cover-view>
		
		
		<!-- #endif -->
		<!-- 停车场 -->
		<u-popup class="charging-payment-discount-popup" :closeable="false" @close="couponShow=false" @open="couponShow=true" :show="couponShow" mode="bottom" border-radius="14">
			<view class="map-road-details">
				<view class="map-road-details-name">
					<!-- {{ station.name }} -->
					XXX充电站
				</view>
				<view class="map-road-details-rule">
					<!-- <text>{{ station.rule ? station.rule.memo || station.rule.name : '暂无收费规则' }}</text> -->
					<text>30分钟(含)内免费,30分钟以上１小时(含)以内收费5元,超过1小时以每增加1小时加收1元,不足1小时按1小时计费</text>
				</view>
				<view class="map-road-details-distance">
					<!-- 距离您{{ this.format.m2Km(station.distance || 0) }} -->
					距离您 2.3 公里
				</view>
				<view class="map-road-details-info">
					点击下方站点可进行充电
				</view>
				<view class="map-road-details-total">
					<!-- <text>充电枪数：{{ station.total || 0 }}</text>
					<text style="margin-left: 16rpx;">剩余充电枪数：{{ station.idle || 0 }}</text> -->
					<text>充电桩数：20</text>
					<text style="margin-left: 16rpx;">可用充电桩数：18</text>
				</view>
				<scroll-view scroll-y="true" style="max-height: 50vh;padding-top: 8px;">
					<ChargingPileItem/>
				</scroll-view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import QQMapWX from '../../lib/qqmap-wx-jssdk.min.js'
	import ChargingPileItem from './components/ChargingPileItem.vue'
	import {station,ApiBase,errorCheck} from '../../common/apis.js'
	export default {
		components:{
			ChargingPileItem
		},
		data() {
			return {
				couponShow:true,
				amap:null,//高德实例
				lon:"",
				lat:"",
				marks:[],
				interval:"",//定时
				stationList:[],
				station: {},
			}
		},
		onLoad() {
			this.initAMap();
			this.getStation()
			// 获取地理位置
			uni.getLocation({
			    type: 'wgs84',
				isHighAccuracy:true,
				highAccuracyExpireTime:3000,
			    success: (res)=> {
					this.lon = res.longitude;
					this.lat = res.latitude;
					this.marks.push({
						id:1,
						iconPath: "../../static/Img/position.png",
						latitude: res.latitude,
						longitude: res.longitude,
						height: 28,
						width: 28,
					})
			    }
			});
		},
		
		methods: {
			// 地图初始化
			initAMap(){
				this.amap = new QQMapWX({key:'SVEBZ-25UKD-QS44X-HDHT6-JZLKQ-CHFMG'})
			
			},
			// 扫码
			onScanCode(){
				uni.scanCode({
					onlyFromCamera:true,
					scanType:['qrCode'],
					success:(e)=>{
						console.log('扫码结果',e)
					}
				})
			},
			// 获取充电站
			async getStation(){
				const res = await ApiBase(station.GetStation({page:1,row:1}))
				const result= res.result
				if(errorCheck(result,res.error)){
					console.log('充电站点',result)
				}
				// if (result.data.code == 0) {
				// 	let markers = []
				// 	for (let i = 0; i < result.data.data.length; i++) {
				// 		let cionPath = "https://static.hcqzhtc.com/haroad5.png"
				// 		if (result.data.data[i].idle > 99) {
				// 			cionPath = "https://static.hcqzhtc.com/icon/road99+.png"
				// 		} else if (result.data.data[i].idle > 0 && result.data.data[i].idle <= 99) {
				// 			cionPath = "https://static.hcqzhtc.com/icon/road" + result.data.data[i].idle + ".png"
				// 		}
				// 		markers.push({
				// 			id: i,
				// 			station: result.data.data[i],
				// 			latitude: result.data.data[i].latitude,
				// 			longitude: result.data.data[i].longitude,
				// 			width: 30,
				// 			height: 30,
				// 			// iconPath: "https://www.zysmartparking.com/imageUrl/images/haroad5.png",
				// 			// iconPath: this.$config.stationIconPath || "https://static.hcqzhtc.com/haroad5.png",
				// 			iconPath: cionPath
				// 		})
				// 	}
				// 	console.log("获取点", markers)
				// 	this.markers = markers
				// } else {
				// 	uni.showToast({title: result.data.msg, duration: 2000, icon: 'none'})
				// }
			},
			// 点击充电站
			markertap(){
				this.couponShow = true
				// this.$refs.popup.open()
			}
		},
		beforeDestroy() {
			clearInterval(this.interval)
		}
	}
</script>

<style scoped lang="less">
	.charging {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		// #ifdef H5
		height: calc(100vh - 44px)!important;
		// #endif
		.map {
			width: 100%;
			height: 100%;
		}
		&-scan {
			position: absolute;
			bottom: 120rpx;
			width: 60%;
			height: 70rpx;
			margin: 0 auto;
			border-radius: 70rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			opacity: 0.7;
			&-image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 8px;
			}
		}
		.map-road-details{
			padding: 16rpx;
			&-name{
				line-height: 56rpx;
				font-size: 32rpx;
				font-weight: 600;
			}
			&-rule, &-distance, &-info{
				font-size: 28rpx;
				color: rgb(133, 133, 133);
				overflow: hidden;
				text-overflow: ellipsis;
			}
			&-total{
				display: flex;
				flex-direction: row;
				font-size: 32rpx;
				margin-top: 16rpx;
			}
			&-content{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				width: 100%;
			}
		}
	}
</style>
