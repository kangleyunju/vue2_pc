import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入ElementUI
import ElementUI from 'element-ui'
import '@/style/resetElement.scss'
//引入jsonp,通过this.$jsonp调用方法
import { VueJsonp } from 'vue-jsonp'

Vue.use(ElementUI).use(VueJsonp)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
