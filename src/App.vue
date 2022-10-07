<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		watch:{
			$route(n){
				this.setPageTitle(n.meta.title)
			}
		},
		methods: {
			setPageTitle(name){
				document.title=name||this.baseName
			}
		},
		mounted() {
			this.setPageTitle()
		}
	}
</script>
<style lang="scss">
	:root{
		--color-primary: #5275FB;
		--color-danger: #F56C6C;
	}
	body {
		color: #333333;
		margin: 0;
		padding: 0;
		font-size: 14px;
		background-color: #eee;
	}
	h1,h2,h3,h4,h5,h5,ul,li{
		margin: 0;
	}
	//禁止复制
	.noCopy {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		-khtml-user-select: none;
		user-select: none;
	}
	
	.xzw_word1 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.xzw_word2 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.pageMain{
		padding: 16px;
		margin: 16px;
		background-color: #fff;
		border-radius: 4px;
		.pageTitle{
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 16px;
		}
		.searchBox{
		}
		.el-table{
			margin: 16px 0;
			.el-button.delText:hover{
				color: #ff3e18;
			}
		}
	}

	//滚动条样式
	::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}
	//内条
	::-webkit-scrollbar-thumb {
		background-color: #ccc;
		border-radius: 10px;
	}
	//外条
	::-webkit-scrollbar-track {
		background-color: #eee;
	}
</style>
