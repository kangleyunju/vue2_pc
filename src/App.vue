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
		methods: {

		},
		created() {

		}
	}
</script>
<style lang="scss">
	body {
		color: #333333;
		margin: 0;
		padding: 0;
		font-size: 14px;
		background-color: #f8f8f8;
	}
	//禁止复制
	.noCopy {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		-khtml-user-select: none;
		user-select: none;
	}
	
	.zd_word1 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.zd_word2 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
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
