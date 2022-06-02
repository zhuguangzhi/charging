<template>
	<view class="chargingItem">
		<view class="charging-pile" @click="toPayment(index)" v-for="(pile,index) in pileList" :key="pile.id" >
			<view class="charging-pile-rate">
				<!-- <cicle :borderWidth="16" :percent="Math.floor(pile.idleGun/pile.deviceList.length)*100" :width="180" activeColor="#66D9EF">
					{{Math.floor(pile.idleGun/pile.deviceList.length)*100}}%
				</cicle> -->

				<circle :percent="Math.floor(pile.idleGun/pile.deviceList.length)*100" :width="110"></circle>
			</view>
			<view class="charging-pile-info">
				<!-- 标题 -->
				<view class="charging-pile-info-header">
					<view class="charging-pile-info-header-title">
						<text>{{pile.name}}</text>
						<!-- <text>号直流</text>
						<text>({{"3301080064101"}})</text> -->
					</view>
					<text v-if="pile.type===14" class="charging-pile-info-header-icon">{{'快'}}</text>
					<text v-else-if="pile.type===12" style="background-color: #FAC018;" class="charging-pile-info-header-icon">{{'慢'}}</text>
				</view>
				<!-- 充电枪 -->
				<text class="charging-pile-info-gun">
					可用充电枪数：{{pile.idleGun}}
				</text>
				<!-- 功率 -->
				<view class="charging-pile-info-power">
					<text>
						{{pile.minPower}}kW-{{pile.maxPower}}kW
						<!-- (近期最大{{'106'}}kW) -->
					</text>
					<text>
						{{pile.minVoltage}}V-{{pile.maxVoltage}}V
						<!-- ({{'12'}}V) -->
					</text>
				</view>
				<!-- 标识 -->
				<view class="charging-pile-info-sign">
					<text v-for="(tag,index) in pile.tag.replace(/^(\s|,)+|(\s|,)+$/g, '').split(',')" :key="index">
						{{tag}}
					</text>
					<!-- <text>{{'国标2011'}} {{'国标2015'}}</text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cicle from '@/components/circle/circle.vue'
	import store from '@/store/index.js'
	export default{
		props:{
			pileList:{
				type:Array,
				default:()=>[]
			}
		},
		components:{
			cicle
		},
		data(){
			return{
				ballInfo:{
					ballType:'all',
					ballSize:80,
					waveColor:'#FFFFFF',
					ballPadding:'5px',
				}
			}
		},
		methods:{
			toPayment(index){
				store.commit('pile/setPileInfo',this.pileList[index])
				uni.navigateTo({
				    url: `/pages/chargingPile/ChargingPileDetail/ChargingPileDetail`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.chargingItem {
		width: 100%;
		.charging-pile {
			width: 100%;
			border-top: 1px solid #999999!important;
			display: flex;
			flex-direction: row!important;
			align-items: center;
			justify-content: center;
			padding: 8px 0 0 0;
			&-rate {
				width: 120px;
				// height: 200rpx;
				border-right: 1px solid #999999;
				
			}
			&-info {
				padding: 0 16px;
				flex: 1;
				font-size: 12px;
				&-header {
					color: #666666;
					position: relative;
					&-title {
						vertical-align: bottom;
						display: inline-block;
						text:first-child {
							color: #000000;
							font-size: 14px;
							font-weight: bold;
						}
					}
					&-icon {
						position: absolute;
						right: 0;
						display: inline-block;
						color: #FFFFFF;
						vertical-align: bottom;
						font-size: 12px;
						padding: 0 8px;
						border-radius: 4px;
						background-color: red;
					}
				}
				&-gun {
					display: inherit;
					padding: 8px;
					background-color: #F1F2F3;
					margin: 8px 0;
				}
				&-power {
					text {
						margin-bottom: 8px;
					}
				}
				&-sign {
					margin-bottom: 8px;
					display: flex;
					flex-direction: row;
					align-items: center;
					text {
						display: inline-block;
						padding-right: 8px;
						border-right: 1px solid #999999;
					}
					text:last-child {
						padding-left: 8px;
						border: none;
					}
				}
			}
		}
	}
</style>
