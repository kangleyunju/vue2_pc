import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入ElementUI
import ElementUI from 'element-ui'
import '@/style/resetElement.scss'
import '@/style/iconfont.css'
//引入jsonp,通过this.$jsonp调用方法
import { VueJsonp } from 'vue-jsonp'
//添加事件管理者’passive’，来阻止’touchstart’事件，让页面更加流畅。 解决chrome下的warning问题
import "default-passive-events"
//引入公共方法
import global from './base/global'
//引入请求
import request from './base/global'
Vue.mixin(global).mixin(request)

Vue.use(ElementUI).use(VueJsonp)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
