import App from './App'

// 配置
import config from './common/config.js'
Vue.prototype.$config = config


// 主题

// #ifdef MP-WEIXIN || H5
import './static/theme.less'
// #endif

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

/* 引入vuex */
import store from './store/index.js'
Vue.prototype.$store = store
Vue.prototype.$store = store

// #ifdef H5
// 在页面加载时读取sessionStorage里的状态信息
try{
	console.log("加载store", sessionStorage.getItem("store"))
	if (sessionStorage.getItem("store")) {
		Vue.prototype.$store.replaceState(Object.assign({}, Vue.prototype.$store.state, JSON.parse(sessionStorage.getItem("store"))))
	}
}catch(e){
	console.error("加载store异常", e)
}
// 在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload",() => {
	console.log("保存store")
	sessionStorage.setItem("store", JSON.stringify(Vue.prototype.$store.state))
})
// #endif


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif