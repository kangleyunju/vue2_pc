import { mapState } from 'vuex'
import sortable from 'vuedraggable' //拖拽
import axios from 'axios'
import VueCookies from 'vue-cookies'
// 注册所有 svg 文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/svg', false, /\.svg$/)
requireAll(req);
export default {
	data() {
		return {
			isApi: false,
			baseName: 'vue2_pc',
			phoneUrl: "https://static-mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.next.bspapp.com/node_uni/#/pages/index/index"
		}
	},
	components: {
		sortable
	},
	computed: {
		...mapState({
			isCollapse: state => state.isCollapse,
			isNight: state => state.isNight,
			userInfo: state => state.userInfo
		})
	},
	methods: {
		//二次确认封装
		handleDelete(content = '确定删除吗？', title = '提示', confirmText = '确定', cancelText = '取消') {
			return new Promise((resolve, reject) => {
				this.$confirm(content, title, {
					confirmButtonText: confirmText,
					cancelButtonText: cancelText,
					type: 'warning',
				}).then(() => {
					resolve()
				}).catch((err) => {})
			})
		},
		fileToBase64(file) {
			return new Promise(function(resolve, reject) {
				let reader = new FileReader()
				let url = ""
				reader.readAsDataURL(file)
				reader.onload = function() {
					url = reader.result
				}
				reader.onerror = function(error) {
					reject(error)
				}
				reader.onloadend = function() {
					resolve(url)
				}
			})
		},
		pathToBase64(path) {
			return new Promise(function(resolve, reject) {
				if (typeof window === 'object' && 'document' in window) {
					if (typeof FileReader === 'function') {
						var xhr = new XMLHttpRequest()
						xhr.open('GET', path, true)
						xhr.responseType = 'blob'
						xhr.onload = function() {
							if (this.status === 200) {
								let fileReader = new FileReader()
								fileReader.onload = function(e) {
									resolve(e.target.result)
								}
								fileReader.onerror = reject
								fileReader.readAsDataURL(this.response)
							}
						}
						xhr.onerror = reject
						xhr.send()
						return
					}
					var canvas = document.createElement('canvas')
					var c2x = canvas.getContext('2d')
					var img = new Image
					img.onload = function() {
						canvas.width = img.width
						canvas.height = img.height
						c2x.drawImage(img, 0, 0)
						resolve(canvas.toDataURL())
						canvas.height = canvas.width = 0
					}
					img.onerror = reject
					img.src = path
					return
				}
				if (typeof plus === 'object') {
					plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function(entry) {
						entry.file(function(file) {
							var fileReader = new plus.io.FileReader()
							fileReader.onload = function(data) {
								resolve(data.target.result)
							}
							fileReader.onerror = function(error) {
								reject(error)
							}
							fileReader.readAsDataURL(file)
						}, function(error) {
							reject(error)
						})
					}, function(error) {
						reject(error)
					})
					return
				}
				if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
					wx.getFileSystemManager().readFile({
						filePath: path,
						encoding: 'base64',
						success: function(res) {
							resolve('data:image/png;base64,' + res.data)
						},
						fail: function(error) {
							reject(error)
						}
					})
					return
				}
				reject(new Error('not support'))
			})
		},
		base64ToPath(base64) {
			return new Promise(function(resolve, reject) {
				if (typeof window === 'object' && 'document' in window) {
					base64 = base64.split(',')
					var type = base64[0].match(/:(.*?);/)[1]
					var str = atob(base64[1])
					var n = str.length
					var array = new Uint8Array(n)
					while (n--) {
						array[n] = str.charCodeAt(n)
					}
					return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })))
				}
				var extName = base64.match(/data\:\S+\/(\S+);/)
				if (extName) {
					extName = extName[1]
				} else {
					reject(new Error('base64 error'))
				}
				var fileName = Date.now() + '.' + extName
				if (typeof plus === 'object') {
					var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
					bitmap.loadBase64Data(base64, function() {
						var filePath = '_doc/_temp/' + fileName
						bitmap.save(filePath, {}, function() {
							bitmap.clear()
							resolve(filePath)
						}, function(error) {
							bitmap.clear()
							reject(error)
						})
					}, function(error) {
						bitmap.clear()
						reject(error)
					})
					return
				}
				if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
					var filePath = wx.env.USER_DATA_PATH + '/' + fileName
					wx.getFileSystemManager().writeFile({
						filePath: filePath,
						data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
						encoding: 'base64',
						success: function() {
							resolve(filePath)
						},
						fail: function(error) {
							reject(error)
						}
					})
					return
				}
				reject(new Error('not support'))
			})
		},
		//生成随机token,max位数
		createToken(max = 10) {
			let token = ''
			for (let i = 1; i <= max; i++) {
				const n = Math.floor(Math.random() * 16.0).toString(16)
				token += n
			}
			return token
		},
		// 下载文件, path路径,name文件名
		downloadFile(path, name) {
			const x = new XMLHttpRequest()
			x.open('GET', path, true)
			x.responseType = 'blob'
			x.onload = function() {
				const url = window.URL.createObjectURL(x.response)
				const a = document.createElement('a')
				a.href = url
				a.download = name
				a.click()
			}
			x.send()
		},
		//请求
		request(config) {
			const service = axios.create({
				baseURL: process.env.VUE_APP_API_URL,
				timeout: 1000 * 30, //超时时间
				withCredentials: false //默认false,true由后端写入cookie,false前端处理
			})
			// 请求拦截器
			service.interceptors.request.use(res => {
				const token = VueCookies.get('x-token')
				if (config.baseURL) {
					res.baseURL = config.baseURL
				}
				if (token) {
					res['token'] = token
				}
				return res
			}, err => {
				console.log('请求拦截失败', err)
				return err
			})
			// 响应拦截器
			service.interceptors.response.use(res => {
				return res.data
			}, err => {
				console.log('响应拦截失败', err)
				return err
			})
			return service({
				method: config.method || 'get',
				url: config.url || '',
				params: config.params
			})
		},
		//深拷贝
		deepCopy(obj) {
			return JSON.parse(JSON.stringify(obj))
		},
		//添加缓存
		setStorage(key, obj) {
			localStorage.setItem(key, JSON.stringify(obj))
		},
		//获取缓存
		getStorage(key) {
			return JSON.parse(localStorage.getItem(key))
		},
		//删除缓存
		removeStorage(key) {
			localStorage.removeItem(key)
		},
		//两个日期间隔天数
		dayDiff(date1, date2) {
			if (date1 && date2) {
				return Math.ceil(Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) / 86400000)
			}
		},
		changeTime() {
			let year = new Date().getFullYear()
			let month = new Date().getMonth() + 1
			let day = new Date().getDate()
			let hour = new Date().getHours()
			let minute = new Date().getMinutes()
			let second = new Date().getSeconds()
			month = month > 9 ? month : '0' + month
			day = day > 9 ? day : '0' + day
			hour = hour > 9 ? hour : '0' + hour
			minute = minute > 9 ? minute : '0' + minute
			second = second > 9 ? second : '0' + second
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
		},
		//16进制转rgba
		hexToRgba(hex, opacity = 0.1) {
			return ('rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')')
		},
		//车牌号验证方法
		isVehicleNumber(number) {
			var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
			var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
			if (number.length == 7) {
				return creg.test(number)
			} else if (number.length == 8) {
				return xreg.test(number)
			} else {
				return false
			}
		}
	}
}