<template>
	<div class="userInfoContainer pageMain">
		<div class="pageTitle">个人中心</div>
		<div class="pageContent">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="left">
				<el-form-item label="头像" prop="account">
					<el-upload action="" accept="image/*" :auto-upload="true" :show-file-list="false" :before-upload="beforeUpload">
						<img :src="form.avatar" class="avatar" />
					</el-upload>
				</el-form-item>
				<el-form-item label="账号" prop="account">
					<el-input v-model="form.account" disabled />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password" autocomplete="off" show-password maxlength="12" />
				</el-form-item>
				<el-form-item label="昵称" prop="name">
					<el-input v-model="form.name" placeholder="请输入昵称" maxlength="10" show-word-limit />
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="form.sex" size="medium">
						<el-radio :label="1" border>男</el-radio>
						<el-radio :label="2" border>女</el-radio>
						<el-radio :label="3" border>保密</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="个人介绍" prop="desc">
					<el-input v-model="form.desc" type="textarea" placeholder="请输入个人介绍" maxlength="100" height show-word-limit :autosize="{ minRows: 4, maxRows: 8 }" />
				</el-form-item>
			</el-form>
			<div class="btnLine">
				<el-button type="primary" @click="save" size="medium">保存修改</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				form: {},
				rules: {
					name: [{ required: true, message: '请输入昵称', trigger: 'blur' }, { min: 1, max: 10, message: '账号长度在 1 到 10 个字符', trigger: 'blur' }],
					password: [{ required: true, message: '请输入密码 数字或字母', trigger: 'blur' }, { min: 4, max: 12, message: '密码长度在 4 到 12 个字符', trigger: 'blur' }]
				}
			}
		},
		methods: {
			beforeUpload(file) {
				let that = this
				if (file.size / 1024 / 1024 > 2) {
					this.$message.error('图片不能超过2M!')
				} else {
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						that.form.avatar = e.target.result
					}
				}
				return false
			},
			save() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						let userInfo = this.deepCopy(this.form)
						this.$store.commit('edit', { name: 'userInfo', val: userInfo })
						this.setStorage('userInfo', userInfo)
						this.$message.success('修改成功')
					}
				})
			},
			getIp(){
				return
				this.$jsonp(
					'https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&ip=111.206.145.41&key=WLABZ-45G3F-Q3CJO-NWTGZ-O6DLE-QQBGN'
				).then(res => {
					console.log(res)
				})
			}
		},
		mounted() {
			this.getIp()
			this.form = this.deepCopy(this.userInfo)
		}
	}
</script>
<style lang="scss">
	.userInfoContainer {
		.el-form {
			width: 600px;
			padding: 16px 0;
			.el-upload {
				height: 100px;
				width: 100px;
				position: relative;
				overflow: hidden;
				text-align: center;
				border-radius: 10px;
				img {
					height: 100px;
					border-radius: 10px;
					position: absolute;
					left: 50%;
					transform: translate(-50%);
				}
				&:before {
					content: '上传图片';
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					color: rgba(255, 255, 255, 0.9);
					top: 0;
					left: 0;
					width: 100px;
					height: 100px;
					background-color: rgba(0, 0, 0, 0.5);
					border-radius: 10px;
					opacity: 0;
					transition: all 0.3s;
					z-index: 10;
				}
				&:hover {
					&:before {
						opacity: 1;
					}
				}
			}
		}
		.btnLine {
			width: 600px;
			text-align: center;
			margin-top: 20px;
		}
	}
</style>
