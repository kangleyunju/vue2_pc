<template>
  <div class="headerContainer" :class="{'collapse':collapse}">
	<div class="left">
		<i :class="collapse?'el-icon-s-fold':'el-icon-s-unfold'" @click="changeCollapse"/>
	</div>
	<div class="right"></div>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		components:{
			
		},
		computed: {
			...mapState({
				collapse: state => state.collapse,
			})
		},
		data() {
			return {

			}
		},
		methods: {
			changeCollapse(){
				this.$store.commit('edit',{name:'collapse',val:this.collapse?false:true})
			}
		},
		created() {

		}
	}
</script>
<style lang="scss">
	.headerContainer{
		height: 50px;
		background-color: #fff;
		position: fixed;
		top:0;
		right: 0;
		left: 200px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		box-sizing: border-box;
		border-bottom: solid 1px #e6e6e6;
		transition: all 0.3s;
		&.collapse{
			left: 64px;
		}
		.left{
			font-size: 20px;
			cursor: pointer;
			&:hover{
				color: #5275FB;
			}
		}
	}
</style>