import request from '@/base/request'

export function getVideoList(params) {
	return request({
		url: '/www/web/asyn_index',
		method: 'get',
		params
	})
}