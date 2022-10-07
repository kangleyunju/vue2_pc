<template>
	<div class="phoneListContainer pageMain">
		<div class="searchBox">
			<el-button type="primary" size="medium" @click="addItem">新建</el-button>
		</div>
		<el-table :data="list" border>
			<el-table-column prop="id" label="ID" align="center" min-width="80"></el-table-column>
			<el-table-column prop="name" label="名称" align="center" min-width="100"></el-table-column>
			<el-table-column prop="title" label="页面标题" align="center" min-width="100"></el-table-column>
			<el-table-column prop="path" label="页面路径" align="center" min-width="100"></el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="140" align="center"/>
			<el-table-column prop="editTime" label="编辑时间" min-width="140" align="center"/>
			<el-table-column prop="person" label="操作人员" min-width="100" align="center"/>
			<el-table-column fixed="right" label="操作" min-width="100" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="editItem(scope.row.id)">编辑</el-button>
					<el-button type="text" size="small" class="delText" @click="delItem(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<elPage @change="pageChange" :total="total" :page="page" :pageSize="pageSize"/>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				total:0,
				page:1,
				pageSize:10,
				list: [{
					id:1,
					name: "模板名称",
					title:"页面标题",
					path:"/index/index",
					createTime:"2020-09-09 16:34:00",
					editTime:"2020-09-09 16:34:00",
					person:"小明"
				}]
			}
		},
		methods: {
			getDiyList() {
				this.total=this.list.length
			},
			addItem(){
				this.$router.push("/diy/phone?")
			},
			editItem(id){
				this.$router.push("/diy/phone?id="+id)
			},
			delItem(id,index){
				this.handleDelete().then(()=>{
					this.list.splice(index,1)
					this.getDiyList()
				})
			},
			pageChange(e){
				console.log(e)
			}
		},
		created() {
			this.getDiyList()
		}
	}
</script>
<style lang="scss">
	.phoneListContainer {

	}
</style>
