<template>
	<div class="loginContainer" v-loading="loading" :style="{'backgroundImage': 'url(' + bgImg + ')'}">
		<div class="formBox" v-if="state==1">	
			<h1>后台登录</h1>
			<el-form ref="form" :model="form" :rules="rules" class="loginBox">
				<el-form-item label="账号" prop="account">
					<el-input placeholder="请输入账号" maxlength="10" type="text" clearable v-model="form.account" @input="handleInput" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input placeholder="请输入密码" maxlength="12" type="password" show-password v-model="form.password" />
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="toLogin(1)" class="btn">登录</el-button>
			<div class="tip"> 没有账号？<el-button type="text" @click="state=2">注册</el-button>
			</div>
		</div>
		<div class="formBox" v-else>
			<h1>后台注册</h1>
			<el-form ref="form" :model="form" :rules="rules" class="loginBox">
				<el-form-item label="账号" prop="account">
					<el-input placeholder="请输入账号" maxlength="20" type="text" clearable v-model="form.account" @input="handleInput" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input placeholder="请输入密码" maxlength="20" type="password" v-model="form.password" show-password/>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="toLogin(2)" class="btn">注册</el-button>
			<div class="tip"> 已有账号？<el-button type="text" @click="state=1">登录</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default ({
		data() {
			return {
				state: 1, //1登录2注册
				form: {
					account: '2964321836',
					password: '123456'
				},
				rules: {
					account: [{ required: true, message: '请输入账号 5-10位数字', trigger: 'blur' }, { min: 5, max: 10, message: '账号长度在 5 到 10 个字符', trigger: 'blur' }],
					password: [{ required: true, message: '请输入密码 数字或字母', trigger: 'blur' }, { min: 4, max: 12, message: '密码长度在 4 到 12 个字符', trigger: 'blur' }]
				},
				loading:false,
				bgImg:''
			}
		},
		watch:{
			state(){
				this.form={
					account:'',
					password:''
				}
			}
		},
		methods: {
			handleInput(e) {
				this.form.account = e.replace(/\D/g, '').replace(/^0{1,}/g, '')
			},
			toLogin(e) {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.loading=true
						this.request({
							baseURL: 'https://api.uomg.com/api',
							url: 'qq.info',
							params: {
								qq: this.form.account
							}
						}).then(res => {
							if (res.name && res.name.trim() != '') {
								let userInfo = {
									name: res.name,
									avatar: res.qlogo,
									account: this.form.account,
									password: this.form.password,
									sex:3,
									desc:''
								}
								this.setStorage('userInfo', userInfo)
								this.$store.commit('edit',{name:'userInfo',val:userInfo})
								this.$cookies.set('token',this.createToken(),60*60*24 )
								this.$message.success(e==1?'登录成功':'注册成功')
								this.$router.push('/')
							} else {
								this.$message.error(e==1?'账号或密码错误':'账号已存在')
							}
							this.loading=false
						})
					}
				})
			},
			//背景图
			getBg(){
				this.request({
					baseURL: 'https://api.uomg.com',
					url: 'api/image.lofter',
				}).then(res => {
					this.bgImg=res.data[Math.floor(Math.random()*res.data.length)]
				})
			}
		},
		mounted() {
			this.getBg()
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
		background-size: cover;
		background-repeat: no-repeat;
		background-color: #f8f8f8;
		.formBox {
			width: 300px;
      color:var(--textColor);
			background-color: var(--bgColor);
			padding: 20px 40px 20px;
			border-radius: 4px;
			box-shadow: rgb(0 0 0 / 15%) 0px 2px 15px;
			h1 {
				font-size: 20px;
				line-height: 30px;
				text-align: center;
				padding-bottom: 10px;
			}
			.el-form {
				.el-form-item__label {
					line-height: 30px;
          color:var(--textColor);
				}
				.el-form-item {
					margin-bottom: 18px;
				}
			}
			.btn {
				width: 100%;
				margin: 10px 0 10px;
			}
			.tip {
				text-align: center;
			}
		}
	}
</style>
