export const yingye = {
	id: 'yingye',
	title: {
		text: '营业额',
		left: 'center',
		top: '5%',
		textStyle: {
			color: '#333333',
			fontSize: 20,
			fontFamily: '微软雅黑'
		}
	},
	tooltip: {
		trigger: 'item'
	},
	xAxis: {
		type: 'category',
		data: ['一季度', '二季度', '三季度', '四季度', ]
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [120, 200, 150, 80],
		type: 'bar',
		showBackground: true,
		backgroundStyle: {
			color: 'rgba(180, 180, 180, 0.1)'
		}
	}]
}