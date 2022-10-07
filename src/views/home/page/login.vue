<template>
	<div class="loginContainer">
		 <el-form ref="login" :model="ruleForm" :rules="rules"  class="loginBox">
			<div class="name">后台{{state==1?'登录':'注册'}}</div>
			<el-form-item label="账号" prop="account">
				<el-input placeholder="请输入账号" maxlength="20" type="text" clearable v-model="ruleForm.account" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input placeholder="请输入密码" maxlength="20" type="password" clearable v-model="ruleForm.password" />
			</el-form-item>
			<div class="bottom">
				<el-button :type="state==2?'default':'primary'" @click="submitForm(login,1)">登录</el-button>
				<el-button :type="state==1?'default':'primary'" @click="submitForm(login,2)">注册</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	export default({
		data(){
			return {
				state,
				ruleForm,
				rules,
				login,
				submitForm
			}
		},
		methods: {

		},
		mounted() {

		}
	})
</script>

<style lang="scss">
	.loginContainer {

	}
</style>
