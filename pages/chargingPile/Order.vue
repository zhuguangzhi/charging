<template>
	<uni-list>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" >
			<uni-list-chat 
				v-for="(item,index) in orderList" 
				:key="item.id" 
				:haveAvatar="false" 
				:title="item.stationName" 
				:note="item.createdTime"
				clickable
				@click="choseOrder(index)"
			>
			    <view class="chat-custom-right">
			        <text class="chat-custom-text">{{format.getOrderStatus(item.state)}}</text>
			    </view>
			 </uni-list-chat> 
			 <text v-show="showMsg" class="uniList-message">最多只能获取最近30条数据</text>
		</mescroll-uni>
	</uni-list>
</template>

<script>
	import {ApiBase,errorCheck,OrderApi} from '../../common/apis.js'
	import {routePush} from '@/common/baseFun.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import format from '@/utils/format.js'
	export default {
		// mixins: [MescrollMixin], 
		data() {
			return {
				orderList:[],
				format,
				mescroll: null, //mescroll实例对象
				upOption:{
					auto:false,
					use:false,
				},
				showMsg:true
			};
		},
		methods:{
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			async getData(){
				let res = await ApiBase(OrderApi.GetPayOrder({page:1,row:30}))
				if(errorCheck(res.result,res.error)){
					res.result.data.data.forEach(item=>{
						this.orderList.push(item)
					})
					this.mescroll.endBySize(res.result.data.data.length, res.result.data.total);
					this.showMsg=true
				}
				else
					this.mescroll.endErr();
			},
			downCallback(){
				this.orderList = []
				this.showMsg = false
				this.getData()
			},
			
			// 选择订单
			choseOrder(index){
				routePush(`/pages/chargingPile/ChargingOrder?orderId=${this.orderList[index].id}`)
			}
		}
	}
</script>

<style lang="less" scoped>
.uniList-message {
	display: block;
	width: 100vw;
	padding: 20rpx 0 40rpx 0;
	text-align: center;
	color: #999999;
	font-size: 12px;
}
</style>
