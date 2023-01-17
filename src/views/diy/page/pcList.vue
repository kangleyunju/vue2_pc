<template>
	<div class="pcListContainer pageMain" v-loading="loading">
		<div class="searchBox">
			<el-input placeholder="请输入模板名称" v-model="keyword" class="searchInput" clearable>
				<el-button slot="append" icon="el-icon-search" type="primary" @click="getDiyList"></el-button>
			</el-input>
			<el-button type="primary" @click="addItem">新建</el-button>
		</div>
		<div class="pageContent">
      <myTable :tableColumns="tableColumns" :tableData="list" :total="total" :pageNum="pageNum" :pageSize="pageSize" @change="pageChange">
        <el-table-column slot="operation" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
						<el-button type="text" size="small" @click="editItem(scope.row.id)">编辑</el-button>
						<el-button type="text" size="small" class="delText" @click="delItem(scope.row.id,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </myTable>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				keyword: '',
				total: 0,
				pageNum: 1,
				pageSize: 1,
				list: [],
				loading: false,
        tableColumns:[{
          label:'名称',
          prop:'name',
          minWidth:160
        },{
          label:'页面标题',
          prop:'title',
          minWidth:160,
          showTooltip:true
        },{
          label:'页面路径',
          prop:'path',
          minWidth:160
        },{
          label:'创建时间',
          prop:'createTime',
          minWidth:160
        },{
          label:'编辑时间',
          prop:'editTime',
          minWidth:160
        },{
          label:'操作人员',
          prop:'person',
          minWidth:160
        },{
            slot: 'operation'
        }]
			}
		},
		methods: {
			getDiyList() {
				this.loading = true
				setTimeout(() => {
					let list = [{
						id: 1,
						name: "模板名称1",
						title: "页面标题",
						path: "/index/index",
						createTime: "2020-09-09 16:34:00",
						editTime: "2020-09-09 16:34:00",
						person: "小明"
					},{
						id: 2,
						name: "模板名称2",
						title: "页面标题页面标题页面标题页面标题",
						path: "/index/index",
						createTime: "2020-09-09 16:34:00",
						editTime: "2020-09-09 16:34:00",
						person: "小明2"
					},{
						id: 3,
						name: "模板名称3",
						title: "页面标题",
						path: "/index/index",
						createTime: "2020-09-09 16:34:00",
						editTime: "2020-09-09 16:34:00",
						person: "小明"
					}]
					this.total = list.length
          this.list=list.filter((item,index)=>{return index<this.pageSize})
					this.loading = false
				}, 1000)
			},
			addItem() {
				this.$router.push("/diy/phone?")
			},
			editItem(id) {
				this.$router.push("/diy/phone?id=" + id)
			},
			delItem(id, index) {
				this.handleDelete().then(() => {
					this.list.splice(index, 1)
				})
			},
			pageChange(e) {
        this.pageNum=e.pageNum
        this.pageSize=e.pageSize
        this.getDiyList()
			}
		},
		created() {
			this.getDiyList()
		}
	}
</script>
<style lang="scss">
	.pcListContainer {}
</style>
