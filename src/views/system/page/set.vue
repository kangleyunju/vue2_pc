<template>
	<div class="setContainer pageMain">
		<div class="pageTitle">系统设置</div>
		<div class="pageContent">
			<el-form class="pageContent" :model="form" :rules="rules" ref="form" label-width="100px" label-position="left">
				<el-form-item label="夜间模式">
				  <el-switch v-model="form.isNight" @change="changeNight"></el-switch>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				form:{},
				rules:{}
			}
		},
		watch:{
			isNight(val){
				this.$set(this.form,'isNight',val)
			}
		},
		methods: {
			changeNight(e){
				this.$store.commit('edit',{name:'isNight',val:e})
				localStorage.setItem('isNight',e?1:0)
			}
		},
		mounted() {
			this.$set(this.form,'isNight',this.isNight)
				// this.request({
				// 	baseURL: 'https://www.yizhibo.com',
				// 	url: 'www/web/asyn_index',
				// 	methods:'post'
				// }).then(res => {
				// 	// this.bgImg=res.data[Math.floor(Math.random()*res.data.length)]
				// })
				this.$jsonp('https://www.yizhibo.com/www/web/asyn_index').then(res=>{
					
				})
		}
	}
</script>
<style lang="scss">
	.setContainer {}
</style>
