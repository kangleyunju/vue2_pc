<template>
	<div id="app" :class="{'dark':isNight}">
		<router-view />
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		methods: {
			init() {
				// console.log('当前环境：'+process.env.NODE_ENV) 
				if (this.getStorage('isCollapse') == 1) {
					this.$store.commit('edit', { name: 'isCollapse', val: true })
				}
				if (this.getStorage('isNight') == 1) {
					this.$store.commit('edit', { name: 'isNight', val: true })
				}
				if (this.getStorage('userInfo') && this.$cookies.get('token')) {
					this.$store.commit('edit', { name: 'userInfo', val: this.getStorage('userInfo') })
				}
			}
		},
		mounted() {
			this.init()
		}
	}
</script>
<style lang="scss">
	#app {
		--color-primary: #5275FB;
		--color-primary-light: #7ca4fb;
		--color-danger: #f53f3f;
		--bgColor: #fff;
		--textColor: #333;
		--borderColor: #e6e6e6;
		--hoverBg: #f2f2f2;
		overflow: hidden;
		&.dark {
			--bgColor: #141414;
			--textColor: #fff;
			--borderColor: #141414;
			--hoverBg: #252525;
		}
	}
	body {
		margin: 0;
		padding: 0;
		font-size: 14px;
		overflow: hidden;
	}
	h1, h2, h3, h4, h5, h5, ul, li {
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
	.xzw_center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	//页面进度条颜色
	#nprogress {
		.bar {
			background: #5275FB !important;
		}
		.spinner-icon {
			border-top-color: #5275FB !important;
			border-left-color: #5275FB !important;
		}
	}
	//页面变灰
	.grayscale {
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
	}
	//页面
	.pageMain {
		padding: 0 24px;
		margin: 16px;
		background-color: #fff;
		border-radius: 4px;
		min-height: calc(100vh - 82px);
		box-sizing: border-box;
		.pageTitle {
			font-size: 18px;
			font-weight: bold;
			line-height: 56px;
			border-bottom: 1px solid #eee;
		}
		.searchBox {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 16px;
			.searchInput {
				width: 300px;
				margin-right: 16px;
			}
		}
		.pageContent {
			padding: 16px 0;
		}
		.el-table {
			.el-button.delText:hover {
				color: #ff3e18;
			}
		}
	}
	//谷歌滚动条样式
	::-webkit-scrollbar {
		height: 6px;
		width: 6px;
	}
	//内条
	::-webkit-scrollbar-thumb {
		background: #d7d7d7;
		border-radius: 10px;
	}
	//外条
	::-webkit-scrollbar-track {
		background-color: #f2f2f2;
	}
	//火狐滚动条样式
	* {
		scrollbar-color: #d7d7d7 #f2f2f2; //滑块颜色  滚动条背景颜色
		scrollbar-width: thin; // 滚动条宽度有三种：thin、auto、none
	}
	//使图片清晰
	.clearImg {
		image-rendering: -webkit-optimize-contrast;
	}
</style>