import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		collapse:false
	},
	getters: {},
	mutations: {
		edit(state,data){
			state[data.name]=data.val
		}
	},
	actions: {}
})
