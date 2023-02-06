<template>
  <div class="myTableContainer">
    <el-table border :data="tableData" ref="table" @selection-change="selectioChange" :row-key="getRowKey" :row-class-name="rowClassName" :header-row-class-name="headerRowClassName">
      <el-table-column v-if="showSelect" width="40" type="selection" reserve-selection fixed="left"></el-table-column>
      <el-table-column v-if="showOrder" type="index" label="序号" width="50" align="center" fixed="left">
        <template slot-scope="scope">
          {{scope.$index+1+(pageNum-1)*pageSize}}
        </template>
      </el-table-column>
      <template v-for="(item, index) in tableColumns">
        <slot v-if="item.slot" :name="item.slot"></slot>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :fixed="item.fixed"
          :label="item.label"
          :min-width="item.minWidth"
          :width="item.width"
          :align="item.align||'left'"
          :show-overflow-tooltip="item.showTooltip"
        >
        </el-table-column>
      </template>
    </el-table>
    <el-pagination v-if="showPage" @size-change="sizeChange" @current-change="pageChange" :hide-on-single-page="true" :current-page="pageNum" :page-sizes="pageSizes" :page-size="pageSize" :total="total" :layout="layout"/>
  </div>
</template>
<script>
  export default {
    name: 'myTable',
    props: {
      //是否显示全选
      showSelect: {
        type: Boolean,
        default: false
      },
      //是否显示序号
      showOrder: {
        type: Boolean,
        default: true
      },
      //是否显示分页
      showPage:{
        type: Boolean,
        default: true
      },
      pageNum: {
        type: [Number],
        default: 1
      },
      pageSize: {
        type: [Number],
        default: 10
      },
      total:{
        type: [Number],
        default: 1
      },
      // 表头数据
      tableColumns: {
        type: Array,
        default: () => []
      },
      //表格数据
      tableData:{
        type: Array,
        default: () => []
      },
      pageSizes:{
        type: Array,
        default:() => [10,20,50]
      },
      layout:{
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      headerRowClassName:{
        type: String,
        default: 'headerRowClassName'
      },
      rowClassName:{
        type: String,
        default: 'rowClassName'
      }
    },
		methods: {
      // 勾选
      selectioChange(e){
        this.$emit('selectioChange',e)
      },
      //默认每条根据id标识
      getRowKey(e){
        return e.id
      },
			pageChange(e){
				this.$emit('pageChange',{
					pageNum:e,
					pageSize:this.pageSize
				})
			},
			sizeChange(e){
				this.$emit('pageChange',{
					pageNum:1,
					pageSize:e
				})
			}
		}
  }
</script>
<style lang="scss">
  .myTableContainer {

  }
</style>
