
	import Vue from 'vue'
	import Vuex from 'vuex'
	import modules from './modules'
	
	Vue.use(Vuex)
	
	export default new Vuex.Store({
		state: {
			//存储token
			Authorization: uni.getStorage({key:'Authorization'}) ? uni.getStorage({key:'Authorization'}) : ''
		},
		mutations: {
		},
		actions: {
		},
		modules
	})

