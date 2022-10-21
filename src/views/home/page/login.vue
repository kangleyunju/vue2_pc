<template>
	<div class="loginContainer">
		<div class="formBox" v-if="state==1">
			<h1>后台登录</h1>
			<el-form ref="login" :model="form" :rules="rules" class="loginBox">
				<el-form-item label="账号" prop="account">
					<el-input placeholder="请输入账号" maxlength="20" type="text" clearable v-model="form.account" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input placeholder="请输入密码" maxlength="20" type="password" clearable v-model="form.password" />
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="toLogin()" class="btn">登录</el-button>
			<div class="tip">没有账号？<el-button type="text" @click="state=2">注册</el-button></div>
		</div>
		<div class="formBox" v-else>
			<h1>后台注册</h1>
			<el-form ref="login" :model="form" :rules="rules" class="loginBox">
				<el-form-item label="账号" prop="account">
					<el-input placeholder="请输入账号" maxlength="20" type="text" clearable v-model="form.account" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input placeholder="请输入密码" maxlength="20" type="password" clearable v-model="form.password" />
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="toRegister()" class="btn">注册</el-button>
			<div class="tip">已有账号？<el-button type="text" @click="state=1">登录</el-button></div>
		</div>
	</div>
</template>
<script>
	export default ({
		data() {
			return {
				state: 1,//1登录2注册
				form: {},
				rules: {
					account: [{ required: true, message: '请输入账号', trigger: 'blur' }, { min: 2, max: 11, message: '账号长度在 2 到 11 个字符', trigger: 'blur' }],
					password: [{ required: true, message: '请输入账号', trigger: 'blur' }, { min: 4, max: 12, message: '密码长度在 4 到 12 个字符', trigger: 'blur' }]
				}
			}
		},
		methods: {
			toLogin() {},
			toRegister(){
				
			}
		}
	})
</script>
<style lang="scss">
	.loginContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;
		.formBox{
			width: 300px;
			background-color: var(--bgColor);
			padding:  20px 40px 20px;
			border-radius: 4px;
			box-shadow: rgb(0 0 0 / 15%) 0px 2px 15px;
			h1{
				font-size: 20px;
				line-height: 30px;
				text-align: center;
				padding-bottom: 10px;
			}
			.el-form{
				.el-form-item__label{
					line-height: 30px;
				}
				.el-form-item{
					margin-bottom: 18px;
				}
			}
			.btn{
				width: 100%;
				margin: 10px 0 10px;
			}
			.tip{
				text-align: center;
			}
		}
	}
</style>
