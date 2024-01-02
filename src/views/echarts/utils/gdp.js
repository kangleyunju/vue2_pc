// 国家名 | 英文国家名 | 年 | GDP(美元) | GDP(万亿美元) | 人口 | 人均GDP
const defaultData = [
	['美国', 'america', 1960, 543299993600, 5433, 180671000, 3007],
	['英国', 'britain', 1960, 73233965056, 732.34, 52400000, 1397],
	['法国', 'france', 1960, 62225477632, 622.25, 46621700, 1334],
	['中国', 'china', 1960, 59716468736, 597.16, 667070000, 89],
	['日本', 'japan', 1960, 44307341312, 443.07, 93216000, 475],
	['加拿大', 'canada', 1960, 40461721600, 404.62, 17909000, 2259],
	['意大利', 'italy', 1960, 40385290240, 403.85, 50199700, 804],
	['印度', 'india', 1960, 37029883904, 370.3, 450548000, 82],
	['澳大利亚', 'australia', 1960, 18577668096, 185.78, 10276500, 1810],
	['瑞典', 'sweden', 1960, 15822584832, 158.23, 7484660, 2114],
	['巴西', 'brazil', 1960, 15165570048, 151.66, 72179200, 210],
	['土耳其', 'turkey', 1960, 13995067392, 139.95, 27472300, 509],
	['墨西哥', 'mexico', 1960, 13040000000, 130.4, 37771900, 345],
	['荷兰', 'netherlands', 1960, 12276733952, 122.77, 11486600, 1068],
	['西班牙', 'spain', 1960, 12072126464, 120.72, 30455000, 396]
]
const colors = {
	america: "#424172",
	australia: "#ff9933",
	brazil: "#009b3a",
	britain: "#00247d",
	canada: "#8f413b",
	china: "#de2910",
	france: "#002395",
	india: "#ff9933",
	italy: "#009246",
	japan: "#c8c8c8",
	mexico: "#dc143c",
	netherlands: "#d5701d",
	spain: "#ffc400",
	sweden: "#005293",
	turkey: "#ef2b2d",
}
//设置国旗
let rich = JSON.parse(JSON.stringify(colors))
for (let index in rich) {
	rich[index] = {
		height: 27,
		width: 40,
		backgroundColor: {
			image: require(`@/assets/home/face.png`)
		}
	}
}
export const gdp = {
	id: 'gdp',
	title: {
		text: '近60年各国GDP（Top10）',
		left: 'center',
		top: '5%',
		textStyle: {
			fontSize: 20,
			fontFamily: '微软雅黑'
		}
	},
	grid: {
		top: 80,
		right: 180
	},
	graphic: {
		elements: [{
			type: 'text',
			right: 40,
			bottom: 80,
			style: {
				text: 1960,
				font: 'bolder 80px monospace',
				fill: 'rgba(100, 100, 100, 0.5)'
			},
			z: 100
		}]
	},
	xAxis: {
		max: 'dataMax'
	},
	yAxis: {
		type: 'category',
		inverse: true, // 反向坐标轴,大数字在上
		animationDuration: 400,
		animationDurationUpdate: 400,
		max: 9, //y轴最多显示个数
		axisLabel: {
			textStyle: {
				color: "#86909C"
			}
		}
	},
	series: [{
		realtimeSort: true, // 对数据进行排序
		name: 'gdp',
		type: 'bar',
		data: defaultData,
		barWidth: 27,
		encode: {
			x: 4, // 这里的4表示使用第5列的数据，即GDP，单位万亿
			y: 0 // 这里的0表示使用第1列的数据，即中文国家名
		},
		itemStyle: {
			color: function(params) {
				// 单独设置每个柱子的颜色，需要使用函数
				return colors[params.value[1]]
			}
		},
		label: {
			show: true,
			position: 'right',
			valueAnimation: true, // 柱子右侧的数字动态变化
			formatter: function(param) {
				return `{${param.value[1]}|} ` + param.value[4]
			},
			rich: rich
		}
	}],
	animationDuration: 1000,
	animationDurationUpdate: 1000,
	animationEasing: 'linear',
	animationEasingUpdate: 'linear'
}