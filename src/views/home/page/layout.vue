<template>
	<div class="layoutContainer" :class="{'collapse':isCollapse}">
		<Menu/>
		<Header/>
		<div class="viewBox">
			<router-view/>
		</div>
	</div>
</template>
<script>
	import Menu from '@/views/home/components/menu'
	import Header from '@/views/home/components/header'
	export default {
		components: {
			Menu,
			Header
		},
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
	.layoutContainer{
		display: flex;
		padding-left: 200px;
		min-width: 1000px;
		min-height: 500px;
		transition: all 0.3s;
		height: 100vh;
		background-color: #eee;
		&.collapse{
			padding-left: 64px;
		}
		.viewBox{
			width: 100%;
			height: 100%;
			padding: 48px 0 0;
			box-sizing: border-box;
			overflow-x: auto;
		}
	}
</style>
