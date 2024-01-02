export const yingye = {
  id: 'yingye',
  title: {
    text: '营业额',
    left: 'center',
    top: '5%',
    textStyle: {
      fontSize: 20,
      fontFamily: '微软雅黑'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: ['上海', '北京', '成都', '深圳', '厦门', '重庆','福州','温州','郑州','沈阳']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [45, 35, 29, 10, 33, 18,13, 28,13,9],
    type: 'bar',
    showBackground: true,
    realtimeSort: true, // 对数据进行排序
    label: {
      show: true,
      position: 'inside',
      formatter: function(param) {
        return param.value
      }
    },
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.1)'
    }
  }]
}