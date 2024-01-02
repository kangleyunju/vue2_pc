export const duihua = {
  id: 'duihua',
  title: {
    text: '对话次数',
    left: 'center',
    top: '5%',
    textStyle: {
      fontSize: 20,
      fontFamily: '微软雅黑'
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    top: '25%',
    bottom: '16%',
    containLabel: false
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#86909C', // 显示竖线颜色
        type: 'dashed'
      }
    },
    backgroundColor: 'rgba(0,0,0,0)', // tooltip背景色
    borderColor: 'rgba(204,204,204,0)', // tooltip边框颜色
    borderWidth: 1,
    borderRadius: 4,
    width: 300,
    formatter: function(param) {
      return `<div style="background: rgba(204,204,204,0.1);border-radius:4px;padding:8px;backdrop-filter: blur(5px);box-shadow: 0px 0px 16px 0px rgba(29,48,92,0.15);">
				<h2 style="color:#1D2129;font-size:12px;">${param[0].axisValue}</h2>
				<div  style="background:#ffffff;border-radius:6px;margin:4px;padding:4px 8px;color:#000000;margint-bottom:30px">
					<b style="display:inline-block;width:8px;height:8px;border-radius:6px;background-color:${param[0].color}"></b>
					<span style="color:#4E5969;">${param[0].seriesName} </span>
					<span style="float:right;color:#1D2129;font-size:12px;">${param[0].value}</span>
				</div>
			</div>`
    }
  },
  legend: {
    data: ['当月次数'],
    left: 'center',
    show: false,
    top: '14%'
  },
  dataZoom: [{
    type: 'inside',
    filterMode: 'none',
    start: 0,
    end: 100
  }, {
    type: 'slider',
    backgroundColor: '#F7F8FA',
    borderColor: '#ffffff',
    fillerColor: 'rgba(22,93,255,0.1)',
    dataBackground: {
      lineStyle: {
        color: '#C9CDD4',
        width: 1,
        opacity: 0.6
      },
      areaStyle: {
        color: '#F7F8FA',
        opacity: 1
      }
    },
    handleStyle: {
      color: '#5275FB'
    },
    textStyle: {
      color: '#5275FB'
    }
  }],
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: ['2020.4', '2020.5', '2020.6', '2020.7', '2020.8', '2020.9', '2020.10', '2020.11', '2020.12', '2021.1', '2021.2', '2021.3', '2021.4', '2021.5', '2021.6', '2021.7', '2021.8', '2021.9', '2021.10', '2021.11', '2021.12', '2022.1', '2022.2', '2022.3', '2022.4', '2022.5', '2022.6', '2022.7', '2022.8', '2022.9', '2022.10', '2022.11', '2022.12', '2023.1', '2023.2','2023.3']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: '当月次数',
    type: 'line',
    data: [12, 7, 9, 22, 18, 7, 15, 9, 19, 9, 3, 14, 13, 10, 7, 9, 12, 14, 24, 21, 9, 11, 12, 13, 20, 15, 19, 18, 19, 19, 23, 27, 24, 23, 9,19]
  }]
}