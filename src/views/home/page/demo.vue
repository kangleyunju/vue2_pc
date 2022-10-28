<template>
	<div class="demoContainer">
		<div>
			<el-button @click="init" type="primary">生成</el-button>
			<el-button @click="save" type="success" v-if="img">保存</el-button>
		</div>
		
		<div class="div">
			<div class="box" ref="poster">
				<img :src="require('@/assets/home/face.png')"/>
				<div>姓名:尤雨溪</div>
			</div>
			<div class="canvas">
				<img :src="img" v-if="img"/>
			</div>
		</div>
	</div>
</template>
<script>
	import html2canvas from "html2canvas"
	export default {
		data() {
			return {
				img:''
			}
		},
		methods: {
			init() {
				let that=this
				html2canvas(this.$refs.poster, {
					dpi: 300,
					scale: 2,
					useCORS: true,
					allowTaint: false,
					logging: false
				}).then(function(canvas) {
					that.img = canvas.toDataURL('image/jpg')
					console.log(that.img)
				}).catch((err) => {
					console.log('错误',err)
				})
			},
			save(){
				
			}
		}
	}
</script>
<style lang="scss">
	body{
		padding: 20px;
	}
	.div {
		display: flex;
		.box{
			height: 500px;
			width: 500px;
			background-image: url('@/assets/home/404.png');
			border: 10px solid #333;
			padding: 20px;
			box-sizing: border-box;
			img{
				height: 100px;
				width: 100px;
				border-radius: 50%;
			}
		}
		.canvas{
			height: 500px;
			width: 500px;
			border: 10px solid #333;
			box-sizing: border-box;
			img{
				height: 100%;
				width: 100%;
			}
		}
	}
</style>
