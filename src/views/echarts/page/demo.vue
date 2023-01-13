<template>
  <div class="echartsContainer pageMain">
    <div class="cont" v-for="(item,index) in options" :key="index">
      <div class="echart" :id="item.title.text"></div>
    </div>
  </div>
</template>
<script>
  import 'echarts-gl';
  export default {
    data() {
      return {
        options: [{
          title: {
            text: '感染人数占比',
            left: 'center',
            top: '5%',
            textStyle: {
              color: '#333333',
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
            formatter: '{b} : {c}%'
          },
          //标签栏
          legend: {
            orient: 'vertical',
            left: 'left',
            show: true
          },
          series: [{
            name: '百分比',
            type: 'pie',
            radius: '50%',
            top: '0%',
            data: [{ value: 40, name: '阳性' }, { value: 35, name: '阴性' }, { value: 25, name: '无症状' }],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }, {
          title: {
            text: '视频平台用户数',
            left: 'center',
            top: '5%',
            textStyle: {
              color: '#333333',
              fontSize: 20,
              fontFamily: '微软雅黑'
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            show: true
          },
          tooltip: {
            trigger: 'item'
          },
          series: [{
            name: '用户数',
            type: 'pie',
            radius: [50, 120],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [{ value: 120, name: '腾讯视频' }, { value: 140, name: '芒果TV' }, { value: 150, name: '优酷' }, { value: 160, name: '爱奇艺' }, { value: 170, name: 'B站' }]
          }]
        }, {
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
        }, {
          title: {
            text: '粉丝人数',
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
          legend: {
            orient: 'vertical',
            left: 'left',
            top:'bottom',
            show: true
          },
          series: [{
            name: '人数',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
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
        }, {
          title: {
            text: '地球',
            left: 'center',
            top: '5%',
            show:false,
            textStyle: {
              color: '#ffffff',
              fontSize: 20,
              fontFamily: '微软雅黑'
            }
          },
          backgroundColor: '#000',
          globe: {
            baseTexture: require('@/assets/echarts/earth.jpg'),
            heightTexture: require('@/assets/echarts/bathymetry.jpg'),
            displacementScale: 0.1,
            shading: 'lambert',
            environment: require('@/assets/echarts/starfield.jpg'),
            light: {
              ambient: {
                intensity: 0.1
              },
              main: {
                intensity: 1.5
              }
            },
            layers: [{
              type: 'blend',
              blendTo: 'emission',
              texture: require('@/assets/echarts/night.jpg')
            }, {
              type: 'overlay',
              texture: require('@/assets/echarts/clouds.png'),
              shading: 'lambert',
              distance: 5
            }]
          },
          series: []
        }, {
          title: {
            text: '近60年各国GDP（Top10）',
            left: 'center',
            top: '5%',
            textStyle: {
              color: '#333333',
              fontSize: 20,
              fontFamily: '微软雅黑'
            }
          },
          grid: {
            top: 80,
            right: 180
          },
          xAxis: {
            max: 'dataMax'
          },
          yAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E', 'F'],
            inverse: true, // 反向坐标轴
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 5 // only the largest 3 bars will be displayed
          },
          series: [{
            realtimeSort: true, // 对数据进行排序
            name: 'X11',
            type: 'bar',
            // 需要修改这里的data值，给一个数组，随便给几个值
            data: [300, 200, 400, 500, 100, 600],
            label: {
              show: true,
              position: 'right',
              valueAnimation: true // 柱子右侧的数字动态变化
            }
          }],
          animationDuration: 1000,
          animationDurationUpdate: 1000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        }, {
          title: {
            text: '对话次数',
            left: 'center',
            top: '5%',
            textStyle: {
              color: '#333333',
              fontSize: 20,
              fontFamily: '微软雅黑'
            }
          },
          grid: {
            left: '10%',
            right: '10%',
            top:'25%',
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
              top:'14%'
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
            boundaryGap: false,
            data: ['2020.4', '2020.5', '2020.6', '2020.7', '2020.8', '2020.9', '2020.10', '2020.11', '2020.12', '2021.1', '2021.2', '2021.3', '2021.4', '2021.5', '2021.6', '2021.7', '2021.8', '2021.9', '2021.10', '2021.11', '2021.12', '2022.1', '2022.2', '2022.3', '2022.4', '2022.5', '2022.6', '2022.7', '2022.8', '2022.9', '2022.10', '2022.11', '2022.12', '2023.1']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '当月次数',
            type: 'line',
            data: [12, 7, 9, 22, 18, 7, 15, 9, 19, 9, 3, 14, 13, 10, 7, 9, 12, 14, 24, 21, 9, 11, 12, 13, 20, 15, 19, 18, 19, 19, 23, 27, 24, 3]
          }]
        }]
      }
    },
    mounted() {
      this.getLoadEcharts()
    },
    methods: {
      getLoadEcharts() {
        this.options.forEach(item => {
          let echarts = this.$echarts.init(document.getElementById(item.title.text), '')
          echarts.setOption(item)
        })
      }
    }
  }
</script>
<style lang="scss">
  .echartsContainer {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: auto;
    .cont {
      width: 500px;
      height: 400px;
      .echart {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
