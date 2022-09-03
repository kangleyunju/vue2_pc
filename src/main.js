import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入ElementUI
import ElementUI from 'element-ui'
import '@/style/resetElement.scss'
Vue.use(ElementUI)

//全局引入播放器
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
