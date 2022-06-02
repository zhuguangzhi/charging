import store from '@/store/index.js'

// 确保登录完成后查询
const loginHttp = async (fun, total) => {
	if (!total) {
		total = 10
	}
	if (store.state.account.loginState == 2) {
		return await httpUtil(fun)
	} else {
		await delayed(1000)
		total--
		if (total > 0) {
			return await loginHttp(fun, total)
		} else {
			return {
				'code': -1,
				'msg': '登录超时，请登录后在进行操作'
			}
		}
	}
}

// 请求工具，主要作用请求中的异常统一处理
const httpUtil = async (fun) => {
	try {
		// 执行查询方法
		return await fun()
	} catch (e) {
		// console.log('错误', e)
		let errmsg = undefined
		if (e.data) {
			if (e.data.code) {
				return e.data.code
			}
			if (e.data.message) {
				errmsg = e.data.message
			}
			if (e.data.status) {
				errmsg = e.data.status
			}
		} else {
			if (!errmsg) {
				errmsg = e
			}
		}
		return {
			'code': -1,
			'msg': errmsg
		}
	}
}

// 同步等待
const delayed = (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			resolve()
		}, time)
	})
}

// 字符串替换
const replaceStr = (str, start, end) => {
	if (!start) {
		start = 0
	}
	if (!end) {
		end = -1
	}
	// 字符串长度
	const strLength = str.length
	let startStr = ''
	let endStr = ''
	if (end != -1) {
		startStr = str.substring(0, start)
		endStr = str.substring(end)
	} else {
		startStr = str.substring(0, start)
	}
	// 应该补字符的长度
	const length = strLength - startStr.length - endStr.length
	let strAdd = ''
	for (let i = 0; i < length; i++) {
		strAdd += '*'
	}
	return startStr + strAdd + endStr
}

// URL参数转对象
const urlParamHash = (url) => {

	var params = {}

	var h

	var hash = url.slice(url.indexOf('?') + 1).split('&')

	for (var i = 0; i < hash.length; i++) {

		h = hash[i].split('=') //

		params[h[0]] = h[1]

	}

	return params
}

// 获取url中的id
const urlParamId = (url) =>{
	var hash = url.slice(url.lastIndexOf('?') + 1).split('=')
	return hash[1]
}

// 匹配车牌中文
const platesKey = [
  {key:'beijing',label:'京'},
	{key:'jin',label:'津'},
	{key:'hu',label:'沪'},
	{key:'yu',label:'渝'},
	{key:'chuan',label:'川'},
	{key:'xin',label:'新'},
	{key:'zang',label:'藏'},
	{key:'guilin',label:'桂'},
	{key:'guizhou',label:'贵'},
	{key:'yun',label:'云'},
	{key:'hei',label:'黑'},
	{key:'jilin',label:'吉'},
	{key:'liao',label:'辽'},
	{key:'shanxi',label:'晋'},
	{key:'hebei',label:'冀'},
	{key:'qing',label:'青'},
	{key:'lu',label:'鲁'},
	{key:'henan',label:'豫'},
	{key:'su',label:'苏'},
	{key:'wan',label:'皖'},
	{key:'zhe',label:'浙'},
	{key:'min',label:'闽'},
	{key:'gan',label:'赣'},
	{key:'xaing',label:'湘'},
	{key:'e',label:'鄂'},
	{key:'yue',label:'粤'},
	{key:'qiong',label:'琼'},
	{key:'gansu',label:'甘'},
	{key:'shan',label:'陕'},
	{key:'meng',label:'蒙'},
	{key:'gang',label:'港'},
	{key:'ao',label:'澳'},
	{key:'tai',label:'台'},
	{key:'shi',label:'使'},
	{key:'ling',label:'领'},
	{key:'jing',label:'警'},
	{key:'xue',label:'学'},
]
// 改变重定向后的字母为汉字
const getParams = function(url,platesKey){
  if(url.lastIndexOf('plate') > -1){
    let params =  url.slice(url.lastIndexOf('plate')).split('&')
    let myPlate
    let myColor
    for(let i = 0; i < params.length; i++){
      myPlate = params[0].split('=')[1]
      myColor = params[1].split('=')[1].slice(0,params[1].split('=')[1].length - 2)
    }
    if(myColor != 'green'){
      let provinces = myPlate.slice(myPlate.length - 6,myPlate.length)
      myPlate = myPlate.slice(0,myPlate.lastIndexOf(provinces))
      for(let j = 0;j<platesKey.length;j++){
        if(myPlate == platesKey[j].key){
          return url.replace(myPlate,platesKey[j].label)
        }
      }
    }else{
      let provinces = myPlate.slice(myPlate.length - 7,myPlate.length)
      myPlate = myPlate.slice(0,myPlate.lastIndexOf(provinces))
      for(let j = 0;j<platesKey.length;j++){
        if(myPlate == platesKey[j].key){
          return url.replace(myPlate,platesKey[j].label)
        }
      }
    }
  }
}

// 获取经过多长时间
const getTime = function(oldtime) {
	if(!oldtime) return
	var date1 = new Date(oldtime)
	var s2= Date.parse(new Date());
	var s1 = date1.getTime()
	var total = (s2 - s1)/1000;
	var day = parseInt(total / (246060));//计算整数天数
	var afterDay = total - day*24*60*60;//取得算出来天数后剩余的秒数
	var hour = parseInt(afterDay/(60*60));//计算整数小时百数
	
	var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
	var min = parseInt(afterHour/60);//计算整数分
	
	var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后度剩余的秒数
	
	if(day){
		return  day + "天" + hour + "时" + min + "分" + afterMin + "秒"
	}
	if(hour){
		return hour + "时" + min + "分" + afterMin + "秒"
	}
	if(min){
		return  min + "分" + afterMin + "秒"
	}
	if(afterMin){
		return  afterMin + "秒"
	}
	// let h = 0
	// h = Math.floor(time/60)
	// let m = time - h*60
	// if(h>0)	return `${h}时${m}分`
	// else 	return `${m}分钟`
}

// 获取两个时间之间的时间差
const getTime2Time = function(date1,date2){
	const time1 = new Date(date1).getTime()
	const time2 = new Date(date2).getTime()
	let time = Math.abs(time1 - time2)
	let day = parseInt(time/(24*60*60*1000))
	let hour = parseInt(time%(24*60*60*1000)/(60*60*1000))
	let min = parseInt(time%(60*60*1000)/(60*1000))
	let seconds = parseInt(time%(60*1000)/1000)
	return `${day}天 ${hour}时${min}分${seconds}秒`
}

export default {
	delayed,
	replaceStr,
	loginHttp,
	httpUtil,
	urlParamHash,
	urlParamId,
	getParams,
	platesKey,
	getTime,
	getTime2Time
}
