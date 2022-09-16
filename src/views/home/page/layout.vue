<template>
	<div class="layoutContainer scrollBar" :class="{'collapse':collapse}">
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
	import { mapState } from 'vuex'
	export default {
		components: {
			Menu,
			Header
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				collapse: state => state.collapse,
			})
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
		min-width: 1200px;
		transition: all 0.3s;
		height: 100vh;
		&.collapse{
			padding-left: 64px;
		}
		.viewBox{
			width: 100%;
			height: 100%;
			padding: 50px 0 0;
			box-sizing: border-box;
		}
	}
</style>
