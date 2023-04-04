export const shipin = {
	id: 'shipin',
	title: {
		text: '视频平台用户数',
		left: 'center',
		top: '5%',
		textStyle: {
			fontSize: 20,
			fontFamily: '微软雅黑'
		}
	},
	legend: {
		orient: 'vertical',
		left: 10,
		top:10,
		show: true,
    color:'#fa0'
	},
	tooltip: {
		trigger: 'item'
	},
	series: [{
		name: '用户数',
		type: 'pie',
		radius: [50, 100],
		center: ['50%', '60%'],
		roseType: 'area',
		itemStyle: {
			borderRadius: 8
		},
		data: [{ value: 120, name: '腾讯视频' }, { value: 140, name: '芒果TV' }, { value: 150, name: '优酷' }, { value: 160, name: '爱奇艺' }, { value: 170, name: 'B站' }]
	}]
}