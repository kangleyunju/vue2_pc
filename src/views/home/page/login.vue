<template>
	<div class="verifyContainer">
		<dragVerify
			ref="dragVerify"
			:isPassing.sync="isPassing"
			text="请按住滑块拖动"
			successText="验证通过"
			handlerIcon="el-icon-d-arrow-right"
			successIcon="el-icon-circle-check"
			@passcallback="passcallback(1)">
		</dragVerify>
		<dragVerifyImg
			ref="dragVerifyImg"
			:imgsrc="img"
			:isPassing.sync="isPassing2"
			:showRefresh="true"
			text="请按住滑块拖动"
			successText="验证通过"
			handlerIcon="el-icon-d-arrow-right"
			successIcon="el-icon-circle-check"
			refreshIcon="el-icon-refresh-right"
			@refresh="refresh(1)"
			@passcallback="passcallback(2)">
		</dragVerifyImg>
		<dragVerifyChip
			ref="dragVerifyChip"
			:imgsrc="img2"
			:isPassing.sync="isPassing3"
			:showRefresh="true"
			:barWidth="40"
			text="请按住滑块拖动"
			successText="验证通过"
			handlerIcon="el-icon-d-arrow-right"
			successIcon="el-icon-circle-check"
			refreshIcon="el-icon-refresh-right"
			@refresh="refresh(2)"
			@passcallback="passcallback(3)">
		</dragVerifyChip>
		<dragVerifyRotate
			ref="dragVerifyRotate"
			:imgsrc="img3"
			:isPassing.sync="isPassing4"
			:showTips="true"
			text="请按住滑块拖动"
			successText="验证通过"
			handlerIcon="el-icon-d-arrow-right"
			successIcon="el-icon-circle-check"
			refreshIcon="el-icon-refresh-right"
			@refresh="refresh(3)"
			@passcallback="passcallback(4)">
		</dragVerifyRotate>
	</div>
</template>
<script>
	// 基本滑块验证组件
	import dragVerify from "@/components/dragVerify";
	// 图片滑块组件
	import dragVerifyImg from "@/components/dragVerifyImg";
	// 拼图滑块组件
	import dragVerifyChip from "@/components/dragVerifyImgChip";
	// 旋转图片滑块组件
	import dragVerifyRotate from "@/components/dragVerifyImgRotate";
	export default {
		components: {
			dragVerify,
			dragVerifyImg,
			dragVerifyChip,
			dragVerifyRotate
		},
		data() {
			return {
				img: '',
				img2: '',
				img3:'',
				imgList: [
					require('@/assets/home/face.png'),
					require('@/assets/home/face2.png')
				],
				isPassing:false,
				isPassing2:false,
				isPassing3:false,
				isPassing4:false
			}
		},
		methods: {
			refresh(e) {
				if(e==1){
					this.img = this.getImg()
				}else{
					this.img2= this.getImg()
				}
			},
			getImg() {
				return this.imgList[Math.floor(Math.random(0, 1) * this.imgList.length)]
			},
			//验证通过
			passcallback(e) {
				this.$message.success('验证通过')
				setTimeout(() => {
					if (e == 1) {
						this.$refs.dragVerify.reset()
					} else if (e == 2) {
						this.$refs.dragVerifyImg.reset()
					} else if(e==3){
						this.$refs.dragVerifyChip.reset()
					}else{
						this.$refs.dragVerifyRotate.reset()
					}
					this.$message.closeAll()
				}, 2000)
			}
		},
		created() {
			this.img = this.getImg()
			this.img2 = this.getImg()
			this.img3 = this.getImg()
		}
	}
</script>
<style lang="scss">
	.verifyContainer {}
</style>
