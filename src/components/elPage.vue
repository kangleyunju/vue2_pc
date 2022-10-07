<template>
	<div class="elPageContainer">
		<el-pagination  @size-change="sizeChange" @current-change="pageChange" :current-page="page" :page-sizes="pageSizes" :page-size="pageSize" :total="total" :layout="layout"/>
	</div>
</template>
<script>
	/**
	* @name 分页
	* @author xie
	* @property {Number} page 页码 
	* @property {Number} total 总条数
	* @property {Number} pageSize 每页大小
	*/
	export default ({
		props:{
			page:{ 
				type: [Number,String], 
				default: ''
			},
			total: { 
				type: [Number,String], 
				default: ''
			},
			pageSize:{
				type: [Number,String],
				default: 10
			}
		},
		data() {
			return {
				pageSizes:[10,20,50],
				layout:'total, sizes, prev, pager, next, jumper'
			}
		},
		methods: {
			pageChange(e){
				this.$emit('change',{
					page:e,
					pageSize:this.pageSize
				})
			},
			sizeChange(e){
				this.$emit('change',{
					page:1,
					pageSize:e
				})
			}
		}
	})
</script>
<style lang="scss">
	.elPageContainer {
		text-align: center;
	}
</style>
