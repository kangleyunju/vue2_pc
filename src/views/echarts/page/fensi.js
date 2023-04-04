export const fensi = {
	id: 'fensi',
	title: {
		text: '粉丝人数',
		left: 'center',
		top: '5%',
		textStyle: {
			fontSize: 20,
			fontFamily: '微软雅黑'
		}
	},
	tooltip: {
		trigger: 'item',
		show: true,
	},
	color: ["#4ED9E9", "#4ACDDC", "#00B9CE", "#00A4B6", "#008F9F"],
	legend: {
		orient: 'vertical',
		left: 'left',
		show: true,
		left: 10,
		bottom:10,
	},
	series: [{
		name: '人数',
		type: 'funnel',
		left: '10%',
		top: 60,
		bottom: 20,
		width: '80%',
		minSize: '20%',
		maxSize: '100%',
		sort: 'descending',
		gap: 2,
		label: {
			show: true,
			position: 'inside'
		},
		labelLine: {
			length: 10,
			lineStyle: {
				width: 1,
				type: 'solid'
			}
		},
		itemStyle: {
			borderColor: '#fff',
			borderWidth: 1
		},
		emphasis: {
			label: {
				fontSize: 20
			}
		},
		data: [{ value: 60, name: '叶问' }, { value: 40, name: '成龙' }, { value: 20, name: '李小龙' }, { value: 80, name: '释小龙' }, { value: 100, name: '邹兆龙' }]
	}]
}