<template>
  <div class="datePickerContainer pageMain">
    <div class="pageTitle">el-date-picker日期间隔计算</div>
    <div class="searchBox">
      <el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="getDiff"/>
      <div class="day" v-if="dateArr">间隔天数<span>{{number}}</span>天</div>
    </div>
    <div class="echart" id="duihua"></div>
  </div>
</template>
<script>
  import { duihua } from '@/views/echarts/page/duihua'
  export default {
    data() {
      return {
        number:0,
        dateArr: []
      }
    },
    methods: {
      getDiff(e){
        this.dateArr=e
        this.number=this.dateArr?this.dayDiff(this.dateArr[0],this.dateArr[1]):0
      }
    },
    mounted() {
      console.log(this.options)
      this.getDiff(['2020-04-09',this.changeTime().slice(0,10)])

        let echarts = this.$echarts.init(document.getElementById('duihua'))
        echarts.setOption(duihua)
        window.addEventListener('resize', echarts.resize)
      
    }
  }
</script>
<style lang="scss">
  .datePickerContainer {
    .searchBox{
      .day{
        margin-left: 16px;
        span{
          color: var(--color-primary);
          font-weight:bold;
          padding: 0 4px;
        }
      }
    }
    .echart{
      margin-top: 20px;
      height: 400px;
      width: 600px;
    }
  }
</style>
