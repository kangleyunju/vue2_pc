import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isCollapse:false,//是否折叠菜单
		isNight:false,//是否夜间模式
		isCheck:false,
		userInfo:{}
	},
	getters: {},
	mutations: {
		edit(state,data){
			state[data.name]=data.val
		}
	},
	actions: {}
})
