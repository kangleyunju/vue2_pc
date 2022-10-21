<template>
  <div class="headerContainer noCopy" :class="{'collapse':isCollapse}">
	<div class="left">
		<el-button :type="isCollapse?'':'primary'" size="mini" :icon="isCollapse?'el-icon-caret-right':'el-icon-caret-left'" @click="changeCollapse">{{isCollapse?'展开':'折叠'}}</el-button>
	</div>
	<div class="right">
		<div class="theme" @click="changeNight">
			<svg-icon :iconClass="isNight?'moon':'sun'" />
		</div>
		<el-dropdown placement="bottom" @command="handleCommand">
		  <div class="user">
			  <el-image :src="userInfo.avatar||require('@/assets/home/face.png')"/>
			  <span class="xzw_word1">{{userInfo.name}}</span>
			  <i class="el-icon-arrow-down"></i>
		  </div>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item command="1">系统设置</el-dropdown-item>
		    <el-dropdown-item command="2">个人中心</el-dropdown-item>
		    <el-dropdown-item command="3">退出登录</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</div>
  </div>
</template>

<script>
	
	export default {
		components:{
			
		},

		data() {
			return {
				userInfo:{
					name:"曹操曹操曹操",
					avatar:""
				}
			}
		},
		methods: {
			changeCollapse(){
				this.$store.commit('edit',{name:'isCollapse',val:this.isCollapse?false:true})
				localStorage.setItem('isCollapse',this.isCollapse?1:0)
			},
			changeNight(){
				this.$store.commit('edit',{name:'isNight',val:this.isNight?false:true})
				localStorage.setItem('isNight',this.isNight?1:0)
			},
			handleCommand(e){
				if(e==1){
					
				}else if(e==2){
					
				}else{
					this.handleDelete('确定退出登录？')
					.then(res=>{
						console.log(res)
					})
				}
			}
		},
		created() {

		}
	}
</script>
<style lang="scss">
	.headerContainer{
		height: 50px;
		color: var(--textColor);
		background-color: var(--bgColor);
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
		border-bottom: 1px solid var(--borderColor);
		box-shadow: 0 4px 15px rgb(0 0 0 / 8%);
		transition: all 0.3s;
		&.collapse{
			left: 64px;
		}
		.left{
			font-size: 20px;
			cursor: pointer;
			&:hover{
				color: var(--color-primary);
			}
		}
		.right{
			display: flex;
			align-items: center;
			.theme{
				border-radius: 50%;
				width: 20px;
				height: 20px;
				padding: 3px;
				margin-right: 10px;
				cursor: pointer;
				.svg-icon {
					width: 20px;
					height: 20px;
				}
			}
			.user{
				display: flex;
				align-items: center;
				cursor: pointer;
				padding: 2px 6px;
				color: var(--textColor);
				span{
					margin: 0 6px;
					max-width: 80px;
				}
				.el-image{
					height: 26px;
					width: 26px;
					border-radius: 50%;
				}
				i{
					font-size: 12px;
				}
			}
		}
	}
</style>