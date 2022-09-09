<template>
	<div class="layoutContainer scrollBar" :class="{'collapse':collapse}">
		<Menu/>
		<div class="viewBox">
			<Header/>
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
		&.collapse{
			padding-left: 64px;
		}
		.viewBox{
			padding: 66px 16px 16px;
		}
	}
</style>
