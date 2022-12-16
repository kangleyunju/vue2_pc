import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/home/page/layout.vue'
import VueCookies from 'vue-cookies'
import store from '@/store'
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
		icon: 'el-icon-c-scale-to-original'
	},
	children: [{
		path: 'tree',
		name: 'canvasTree',
		component: () => import('@/views/canvas/page/tree.vue'),
		meta: {
			title: '树'
		}
	}, {
		path: 'galaxy',
		name: 'canvasGalaxy',
		component: () => import('@/views/canvas/page/galaxy.vue'),
		meta: {
			title: '银河'
		}
	}]
}, {
	path: "/diy",
	component: layout,
	meta: {
		title: '装修',
		icon: 'el-icon-s-open'
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
	path: "/echarts",
	component: layout,
	meta: {
		title: '图表',
		icon: 'el-icon-pie-chart'
	},
	children: [{
		path: 'demo',
		name: 'echartsDemo',
		component: () => import('@/views/echarts/page/demo.vue'),
		meta: {
			title: '移动端列表'
		}
	}]
}, {
	path: "/tool",
	component: layout,
	meta: {
		title: '工具',
		icon: 'el-icon-tool'
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
			title: '视频播放器'
		}
	}, {
		path: 'verify',
		name: 'toolVerify',
		component: () => import('@/views/tool/page/verify.vue'),
		meta: {
			title: '图片验证码'
		}
	}, {
		path: 'gif',
		name: 'toolGif',
		component: () => import('@/views/tool/page/gif.vue'),
		meta: {
			title: '今天吃什么'
		}
	}, {
		path: 'editor',
		name: 'toolEditor',
		component: () => import('@/views/tool/page/editor.vue'),
		meta: {
			title: '富文本编辑器'
		}
	}, {
		path: 'map',
		name: 'toolMap',
		component: () => import('@/views/tool/page/map.vue'),
		meta: {
			title: '腾讯地图'
		}
	}]
}, {
	path: "/user",
	component: layout,
	meta: {
		title: '用户',
		icon: 'el-icon-user-solid'
	},
	children: [{
		path: 'info',
		name: 'userInfo',
		component: () => import('@/views/user/page/info.vue'),
		meta: {
			title: '个人中心'
		}
	}]
}, {
	path: "/demo",
	component: layout,
	meta: {
		title: '例子',
		icon: 'el-icon-eleme'
	},
	children: [{
		path: 'test',
		name: 'demoTest',
		component: () => import('@/views/demo/page/test.vue'),
		meta: {
			title: '例子'
		}
	}]
}, {
	path: "/system",
	component: layout,
	meta: {
		title: '系统',
		icon: 'el-icon-s-tools'
	},
	children: [{
		path: 'set',
		name: 'systemSet',
		component: () => import('@/views/system/page/set.vue'),
		meta: {
			title: '设置'
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
	path: '/demo',
	name: 'demo',
	component: () => import('@/views/home/page/demo.vue'),
	meta: {
		title: 'demo'
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
}, {
	path: "/:catchAll(.*)",
	name: '404',
	component: () => import('@/views/home/page/404.vue'),
	meta: {
		title: '找不到页面'
	}
}]
const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	scrollBehavior: () => ({
		y: 0
	}),
	routes
})
router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	//token和用户信息同时存在才跳转,否则跳到登录
	if (VueCookies.get('token') && localStorage.getItem('userInfo')) {
		next()
	} else {
		localStorage.removeItem('userInfo')
		VueCookies.remove('token')
		if (to.path == '/login') {
			next()
		} else {
			next('/login')
		}
	}
})
export default router
