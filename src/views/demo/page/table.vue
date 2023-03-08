<template>
  <div class="testContainer pageMain" v-loading="loading" element-loading-text="拼命加载中">
    <div class="pageTitle">el-table行列拖动</div>
    <div class="searchBox">
      <el-select v-model="value" placeholder="请选择" @change="change">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="pageContent">
      <myTable :tableColumns="tableColumns" :tableData="tableData" :showPage="false" :rowClassName="rowClassName" :headerRowClassName="rowClassName" />
    </div>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import sortable from 'sortablejs'
  export default {
    data() {
      return {
        tableColumns: [{
          label: '姓名',
          prop: 'name'
        }, {
          label: '生日',
          prop: 'birthday'
        }, {
          label: '地址',
          prop: 'address'
        }],
        tableData: [],
        value: '1',
        options: [{
          value: '1',
          label: '可以拖拽'
        }, {
          value: '2',
          label: '不可以拖拽'
        }],
        loading: false,
        rowClassName: ''
      }
    },
    methods: {
      confirm(e) {
        console.log(e)
      },
      change() {
        this.rowClassName = this.value == 2 ? 'noMove' : ''
      },
      getList() {
        this.loading = true
        setTimeout(() => {
          this.tableData = [{
            name: '张三',
            birthday: '1990-05-02',
            address: '上海市普陀区金沙江路 1111 弄'
          }, {
            name: '李四',
            birthday: '2000-05-02',
            address: '上海市普陀区金沙江路 2222 弄'
          }, {
            name: '王五',
            birthday: '2016-05-02',
            address: '上海市普陀区金沙江路 3333 弄'
          }, {
            name: '赵六',
            birthday: '2022-05-02',
            address: '上海市普陀区金沙江路 4444 弄'
          }]
          this.initRow()
          this.initColumn()
          this.loading = false
        }, 1000)
      },
      //横向拖动
      initRow() {
        const el = document.querySelector('.el-table__body-wrapper > table > tbody')
        sortable.create(el, {
          filter: '.noMove',
          handle: '.el-table__row',
          animation: 200,
          onEnd: (e) => {
            let tableData = this.deepCopy(this.tableData)
            tableData.splice(e.oldIndex, 1, ...tableData.splice(e.newIndex, 1, tableData[e.oldIndex]))
            this.tableData = []
            this.$nextTick(() => {
              this.tableData = tableData
            })
          }
        })
      },
      //纵向拖动
      initColumn() {
        let that = this
        const el = document.querySelector('.el-table__header-wrapper tr')
        sortable.create(el, {
          filter: '.noMove',
          animation: 200,
          delay: 0,
          onEnd: (e) => {
            // 拖动列这里使用了深拷贝,否则排序会出错
            let tableColumns = this.deepCopy(this.tableColumns)
            //这里-1是因为前面有个序号
            tableColumns.splice(e.oldIndex - 1, 1, ...tableColumns.splice(e.newIndex - 1, 1, tableColumns[e.oldIndex - 1]))
            this.tableColumns = []
            this.$nextTick(() => {
              this.tableColumns = tableColumns
            })
          }
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>
<style lang="scss">
  .testContainer {}
</style>
