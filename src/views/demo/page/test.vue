<template>
	<div class="testContainer pageMain">
		<div class="pageTitle">el-select无限下拉</div>
		<div class="searchBox">
			<el-select v-model="keyword" placeholder="请输入" @change="confirm" v-loadmore="loadmore" size="medium" filterable remote :loading="loading" :remote-method="getList">
				<el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.id" />
			</el-select>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				pages: 1,
				list: [],//总数组
				options: [],//分页数组
				loading: false,
				keyword: ''
			}
		},
		methods: {
			//触底加载更多
			loadmore() {
				if (this.pageNum < this.pages) {
					this.pageNum++
					this.getList()
				}
			},
			confirm(e) {
				console.log(e)
			},
			getList(e) {
				if (e) {
					this.pageNum = 1
					this.keyword = e
					this.options = []
				}
				if(this.page==1){
					this.loading=true
				}
				setTimeout(() => {
					let result = this.list.filter(item => { return item.label.indexOf(this.keyword) > -1 })
					this.pages = result.length / 10 + 1
					this.options = this.options.concat(result.slice((this.pageNum - 1) * 10, this.pageNum * 10))
					this.loading=false
				}, 500)
			}
		},
		created() {
			for (let i = 1; i <= 100; i++) {
				this.list.push({ label: '张三' + i, id: i })
			}
			this.getList()
		}
	}
</script>
<style lang="scss">
	.testContainer {}
</style>
