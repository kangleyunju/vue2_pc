<template>
  <div class="datePickerContainer pageMain">
    <div class="pageTitle">日期间隔计算</div>
    <div class="searchBox">
      <el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="getDiff"/>
      <div class="day" v-if="number>0">间隔天数<span>{{number}}</span>天</div>
    </div>
  </div>
</template>
<script>
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
    created() {
      this.getDiff(['2020-04-09',this.changeTime().slice(0,10)])
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
  }
</style>
