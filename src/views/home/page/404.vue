<template>
	<div class="errorContainer xzw_center">
		<div class="inBox">
			<div>404</div>
			<p>雾霾太大，连页面都看不见了！</p>
			<el-button @click="$router.push('/')" type="primary">回到首页</el-button>
		</div>
	</div>
</template>
<style lang="scss">
	.errorContainer {
		background-color: #fff;
		height: 100vh;
		.inBox {
			width: 1000px;
			height: 700px;
			background-image: url("@/assets/home/404.png");
			background-repeat: no-repeat;
			background-size: 100%;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			div{
				color: var(--color-primary);
				font-size: 50px;
			}
			p{
				font-size: 20px;
			}
		}
	}
</style>
