<template>
	<div class="verifyContainer">
		<el-tabs v-model="tabName" type="border-card" @tab-click="changeTab">
			<el-tab-pane label="基础滑块" name="1">
				<dragVerify
				v-if="tabName=='1'"
					ref="dragVerify"
					:isPassing.sync="isPassing"
					text="请按住滑块拖动"
					successText="验证通过"
					handlerIcon="el-icon-d-arrow-right"
					successIcon="el-icon-circle-check"
					@passcallback="passcallback(1)">
				</dragVerify>
			</el-tab-pane>
			<el-tab-pane label="图片滑块" name="2">
				<dragVerifyImg
					v-if="tabName=='2'"
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
			</el-tab-pane>
			<el-tab-pane label="拼图滑块" name="3">
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
			</el-tab-pane>
			<el-tab-pane label="旋转图片" name="4">
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
			</el-tab-pane>
		</el-tabs>
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
				isPassing4:false,
				tabName:'1'
			}
		},
		methods: {
			changeTab(e){
				this.tabName=e.name
				if (this.tabName == 1) {
					this.$refs.dragVerify.reset()
				} else if (this.tabName == 2) {
					console.log('9999')
					this.$refs.dragVerifyImg.reset()
				} else if(this.tabName==3){
					this.$refs.dragVerifyChip.reset()
				}else{
					this.$refs.dragVerifyRotate.reset()
				}
			},
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
		mounted() {
			this.img = this.getImg()
			this.img2 = this.getImg()
			this.img3 = this.getImg()
			this.$refs.dragVerify?.reset()
		}
	}
</script>
<style lang="scss">
	.verifyContainer {
		margin: 16px;
		.el-tabs{
			height: 450px;
		}
	}
</style>
