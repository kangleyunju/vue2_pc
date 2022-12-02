import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入ElementUI
import ElementUI from 'element-ui'
import '@/style/resetElement.scss'
//引入自定义icon
import '@/style/iconfont.css'
//引入jsonp,通过this.$jsonp调用方法
import { VueJsonp } from 'vue-jsonp'
//添加事件管理者’passive’，来阻止’touchstart’事件，让页面更加流畅。 解决chrome下的warning问题
// import "default-passive-events"
//引入公共方法
import global from '@/base/global'
//引入cookie
import VueCookies from 'vue-cookies'
//全局注册components下的组件
const requireComponent = require.context('./components', true, /.vue$/)
requireComponent.keys().forEach((componentName) => {
	// console.log(componentName)
	// 获取组件配置
	// const componentConfig = requireComponent(componentName)
	componentName = componentName.match(/\/(\S*).vue/)[1]
	// componentName = componentName.match(/\/(\S*).vue/)[1]
	
	console.log(componentName)
	// Vue.component(componentName,componentConfig.default)
})
Vue.use(ElementUI).use(VueJsonp).use(VueCookies).mixin(global)
Vue.config.productionTip = false
new Vue({
	router,
	store,
	render: function(h) { return h(App) }
}).$mount('#app')
