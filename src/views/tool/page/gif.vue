<template>
	<div class="gifContainer">
		<h1>今天吃什么</h1>
		<img :src="imgUrl" id="img" />
		<div class="controllBox">
			<el-button @click="togglePlay" :type="isPlay?'danger':'primary'" size="small">{{isPlay?'暂停':'播放'}}</el-button>
			<el-button type="warning" @click="gif.move_to(0)" size="small">重播</el-button>
			<el-button type="success" @click="gif.move_relative(1)" size="small">下一帧</el-button>
			<el-button type="info" @click="gif.move_relative(-1)" size="small">上一帧</el-button>
		</div>
	</div>
</template>
<script>
	import superGif from "@/views/tool/js/libgif.js"
	export default {
		components: {},
		data() {
			return {
				isPlay: true,
				gif:null,
				imgUrl:require('@/assets/tool/eat.gif')
			}
		},
		methods: {
			togglePlay() {
				if(this.isPlay){
					this.isPlay=false
					this.gif.pause()
				}else{
					this.isPlay=true
					this.gif.play()
				}
			},
			initGif() {
				this.gif = new superGif({
					gif: img
				})
				this.gif.load()
			}
		},
		mounted() {
			this.initGif()
		}
	}
</script>
<style lang="scss">
	.gifContainer {
		text-align: center;
		h1{
			line-height: 100px;
		}
		img{
			height: 300px;
			width: 300px;
		}
		.controllBox{
			padding: 20px 0;
		}
	}
</style>
