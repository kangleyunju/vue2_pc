export const ganran = {
	id: 'ganran',
	title: {
		text: '感染人数',
		left: 'center',
		top: '5%',
		textStyle: {
			fontSize: 20,
			fontFamily: '微软雅黑'
		}
	},
	//工具栏
	toolbox: {
		show: false,
		feature: {
			mark: { show: true },
			dataView: { show: true, readOnly: false },
			restore: { show: true },
			saveAsImage: { show: true }
		}
	},
	//hover
	tooltip: {
		trigger: 'item',
		formatter: ((params) => {
			const data = params.data
			return `${data.name}：${data.value}人<br/> 占比：${data.percent}`
		})
	},
	//标签栏
	legend: {
		orient: 'vertical',
		left: 10,
    top:10,
		show: true
	},
	series: [{
		name: '百分比',
		type: 'pie',
		radius: '70%',
		top: '10%',
		bottom: '0%',
		data: [{ name: '阳性', value: 350, percent: '35%' }, { name: '阴性', value: 250, percent: '25%' }, { name: '无症状', value: 400, percent: '40%' }],
		label: {
			position: 'inner',
			fontSize: 14,
			formatter: ((params) => {
				const data = params.data
				return `${data.name}：${data.percent}`
			})
		}
	}]
}