import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/home/page/layout.vue'
Vue.use(VueRouter)
// 解决重复点击导航路由报错
const methodsArray = ['push', 'replace']
methodsArray.forEach((method) => {
	const methodGen = VueRouter.prototype[method]
	VueRouter.prototype[method] = function(location, onResolve, onReject) {
		if (onResolve || onReject) {
			return methodGen.call(this, location, onResolve, onReject)
		} else {
			return methodGen.call(this, location).catch(() => {})
		}
	}
})
const routes = [{
	path: "/",
	redirect: "/home/index"
}, {
	path: "/home",
	component: layout,
	meta: {
		title: '首页',
		icon: 'el-icon-s-home'
	},
	children: [{
		path: 'index',
		name: 'homeIndex',
		component: () => import('@/views/home/page/index.vue'),
		meta: {
			title: '首页'
		}
	}]
}, {
	path: "/canvas",
	component: layout,
	meta: {
		title: '画布',
		icon: 'el-icon-s-help'
	},
	children: [{
		path: 'tree',
		name: 'canvasTree',
		component: () => import('@/views/canvas/page/tree.vue'),
		meta: {
			title: '树'
		}
	}]
}, {
	path: "/diy",
	component: layout,
	meta: {
		title: '装修',
		icon: 'el-icon-s-help'
	},
	children: [{
		path: 'phoneList',
		name: 'diyPhoneList',
		component: () => import('@/views/diy/page/phoneList.vue'),
		meta: {
			title: '移动端列表'
		}
	}, {
		path: 'pcList',
		name: 'diyPcList',
		component: () => import('@/views/diy/page/pcList.vue'),
		meta: {
			title: '电脑端列表'
		}
	}]
}, {
	path: "/tool",
	component: layout,
	meta: {
		title: '工具',
		icon: 'el-icon-s-help'
	},
	children: [{
		path: 'video',
		name: 'toolVideo',
		component: () => import('@/views/tool/page/video.vue'),
		meta: {
			title: '视频'
		}
	}, {
		path: 'player',
		name: 'toolPlayer',
		component: () => import('@/views/tool/page/player.vue'),
		meta: {
			title: '直播'
		}
	}, {
		path: 'verify',
		name: 'toolVerify',
		component: () => import('@/views/tool/page/verify.vue'),
		meta: {
			title: '图片验证码'
		}
	},{
		path: 'editor',
		name: 'toolEditor',
		component: () => import('@/views/tool/page/editor.vue'),
		meta: {
			title: '富文本编辑器'
		}
	}]
}, {
	path: '/login',
	name: 'login',
	component: () => import('@/views/home/page/login.vue'),
	meta: {
		title: '登录'
	}
}, {
	path: '/diy/phone',
	name: 'diyPhone',
	component: () => import('@/views/diy/page/phone.vue'),
	meta: {
		title: '移动端装修'
	}
}, {
	path: '/diy/pc',
	name: 'diyPc',
	component: () => import('@/views/diy/page/pc.vue'),
	meta: {
		title: '电脑端装修'
	}
}]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})
export default router