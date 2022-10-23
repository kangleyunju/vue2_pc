<template>
	<div class="userInfoContainer">
		<div class="pageMain">
			<div><span>昵称</span>{{userInfo.name}}</div>
			<div><span>头像</span><el-image :src="userInfo.avatar"/></div>
			<div><span>账号</span>{{userInfo.account}}</div>
			<div><span>密码</span>{{userInfo.account}}</div>
			<div><span>性别</span>男</div>
			<div><span>注册时间</span>{{userInfo.account}}</div>
			<el-button type="primary" @click="isEdit=true" size="small" v-if="!isEdit">编辑</el-button>
			<el-button type="success" @click="save" size="small" v-else>保存</el-button>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isEdit:false
			}
		},
		methods: {
			save(){
				this.edit=false
			}
		},
		mounted() {
			console.log(1)
		}
	}
</script>
<style lang="scss">
	.userInfoContainer {
		.pageMain{
			padding: 24px;
			div{
				display: flex;
				min-height: 40px;
				span{
					display: inline-block;
					width: 100px;
					font-weight: 600;
				}
				.el-image{
					height: 100px;
					margin-bottom: 20px;
				}
			}
		}
	}
</style>
