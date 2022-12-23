<template>
  <div class="echartsContainer pageMain">
    <div class="cont" v-for="(item,index) in options" :key="index">
      <div class="echart" :id="item.id"></div>
    </div>
  </div>
</template>
<script>
  import 'echarts-gl';
  export default {
    data() {
      return {
        options: [{
          id: 'ganran',
          title: {
            text: '感染人数占比',
            left: 'center',
            top: '5%'
          },
          toolbox: {
            show: false,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}%'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
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
          id: 'shiping',
          title: {
            text: '视频平台用户数',
            left: 'center',
            top: '5%'
          },
          legend: {
            top: 'bottom'
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
          id: 'yingye',
          title: {
            text: '营业额',
            left: 'center',
            top: '5%'
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
          id: 'fensi',
          title: {
            text: '粉丝人数',
            top: '5%'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: 'bottom'
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
          id: 'diqiu',
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
          id: 'gdp',
          title: {
            text: '近60年各国GDP（Top10）',
            textStyle: {
              color: 'orange',
              fontSize: 20,
              fontFamily: '微软雅黑' // '华文彩云'
            },
            left: 'center',
            top: 30
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
            data: ['A', 'B', 'C', 'D', 'E','F'],
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
        }]
      }
    },
    mounted() {
      this.getLoadEcharts()
    },
    methods: {
      getLoadEcharts() {
        this.options.forEach(item => {
          let echarts = this.$echarts.init(document.getElementById(item.id), '')
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
    flex-wrap: wrap;
    overflow-y: auto;
    align-content: flex-start;
    background-image: url("../../../assets/home/404.png");
    background-repeat: no-repeat;
    .cont {
      width: 400px;
      height: 400px;
      .echart {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
