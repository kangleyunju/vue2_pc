<template>
  <div class="headerContainer" :class="{'collapse':collapse}">
	<div class="left">
		<el-button :type="collapse?'':'primary'" size="mini" :icon="collapse?'el-icon-caret-right':'el-icon-caret-left'" @click="changeCollapse">{{collapse?'展开':'折叠'}}</el-button>
	</div>
	<div class="right">
		<el-button icon="el-icon-full-screen" type="success" size="mini" @click="full"></el-button>
	</div>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
	import screenfull from "screenfull"
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
			full(){
				screenfull.toggle()
			},
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
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		box-sizing: border-box;
		border-bottom: solid 1px #e6e6e6;
		box-shadow: 0 4px 15px rgb(0 0 0 / 8%);
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