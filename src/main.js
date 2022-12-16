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
//引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

//全局注册components下的组件
const requireComponent = require.context('./components', true, /.vue$/)
requireComponent.keys().forEach((componentName) => {
	const componentConfig = requireComponent(componentName)
	//以最后一级的名称作为组件名
	componentName = componentName.replace(componentName.match(/.(\S*)\//)[1],'').match(/.\/(\S*).vue/)[1]
	Vue.component(componentName,componentConfig.default)
})

//全局注册directive下的指令
const requireDirective = require.context('./directive', true, /.js$/)
requireDirective.keys().forEach((directiveName) => {
	const directiveConfig = requireDirective(directiveName)
	directiveName = directiveName.match(/.\/(\S*).js/)[1]
	Vue.directive(directiveName,directiveConfig.default[directiveName])
})

Vue.use(ElementUI).use(VueJsonp).use(VueCookies).mixin(global)
Vue.config.productionTip = false
new Vue({
	router,
	store,
	render: function(h) { return h(App) }
}).$mount('#app')
