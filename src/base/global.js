import elPage from "@/components/elPage"
import sortable from 'vuedraggable'//拖拽
import svgIcon from '@/components/svgIcon.vue'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/svg', false, /\.svg$/)
requireAll(req);// 加载目录下的所有 svg 文件

export default {
	data() {
		return {
			isApi:false,
			baseName:'vue2_pc',
			phoneUrl:"https://static-2503170c-6f74-4217-ac1a-43133fb6d1b4.bspapp.com/wap/#/pages/index/index"
		}
	},
	components:{
		elPage,
		sortable,
		svgIcon
	},
	computed: {

	},
	methods: {
		//二次确认封装
		handleDelete(content='确定删除吗？',title='提示',confirmText='确定',cancelText='取消'){
			return new Promise((resolve,reject)=>{
				this.$confirm(content, title, {
					confirmButtonText: confirmText,
					cancelButtonText: cancelText,
					type: 'warning',
					iconClass:'el-icon-warning-outline'
				}).then(() => {
					resolve()
				}).catch((err) => {

				})
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
		                var filePath = '_doc/uniapp_temp/' + fileName
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
		}
	}
}
