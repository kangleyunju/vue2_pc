<template>
  <div class="testContainer pageMain">
    <div class="searchBox">
      <el-select v-model="value" placeholder="请选择" @change="change">
        <el-option v-for="item in array" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="pageContent">
      <el-table :data="tableData" border v-if="show" v-loading="loading" :row-class-name="rowClassName" :header-row-class-name="rowClassName">
        <el-table-column prop="date" label="序号" width="60" type="index" align="center" fixed></el-table-column>
        <el-table-column :prop="item.prop" :label="item.label" min-width="180" v-for="(item,index) in columnProp" :key="index"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import sortable from 'sortablejs'
  export default {
    data() {
      return {
        show: true,
        columnProp: [{
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
        array: [{
          value: '1',
          label: '可以拖拽'
        }, {
          value: '2',
          label: '不可以拖拽'
        }],
        el: null,
        loading: false,
        aa: null,
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
      initRow() {
        const el = document.querySelector('.el-table__body-wrapper > table > tbody')
        sortable.create(el, {
          filter: '.noMove',
          handle: '.el-table__row',
          animation: 200,
          onEnd: (e) => {}
        })
      },
      initColumn() {
        let that = this
        const el = document.querySelector('.el-table__header-wrapper tr')
        sortable.create(el, {
          filter: '.noMove',
          animation: 200,
          delay: 0,
          onEnd: (e) => {
            // 拖动列这里使用了深拷贝,否则排序会出错
            let columnProp = this.deepCopy(this.columnProp)
            columnProp.splice(e.oldIndex - 1, 1, ...columnProp.splice(e.newIndex - 1, 1, columnProp[e.oldIndex - 1]))
            this.columnProp = []
            this.$nextTick(() => {
              this.columnProp = columnProp
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
