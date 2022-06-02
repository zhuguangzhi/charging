export default {
	namespaced: true,
	state:{
		pileInfo:null
	},
	mutations:{
		setPileInfo(state,payload){
			state.pileInfo = payload
		}
	},
	getter:{
		getPileInfo(state){
			return state.pileInfo
		}
	}
}