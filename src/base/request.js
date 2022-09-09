import axios from 'axios'

console.log('当前环境:',process.env.NODE_ENV)

const service = axios.create({
	baseURL: 'https://www.yizhibo.com'||'/api',
	timeout: 1000 * 30
})

// 请求拦截器
service.interceptors.request.use(config => {
	return config
}, error => {
	Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
	return response.data
}, error => {
	return error
})

export default service
