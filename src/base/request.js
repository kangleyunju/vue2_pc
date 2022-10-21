import axios from 'axios'
export function request(config) {
	const service = axios.create({
		baseURL: 'https://www.yizhibo.com' || '/api',
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
	return service(config).then(res => {
		resolve(res)
	}).catch(err => {
		reject(err)
	})
}
