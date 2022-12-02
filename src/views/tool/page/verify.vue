<template>
	<div class="verifyContainer noCopy">
		<el-tabs v-model="tabName" type="border-card" @tab-click="changeTab">
			<el-tab-pane label="基础滑块" name="1">
				<dragVerify ref="dragVerify" :isPassing.sync="isPassing" @passSuccess="success" />
			</el-tab-pane>
			<el-tab-pane label="图片滑块" name="2">
				<dragVerifyImg ref="dragVerifyImg" :isPassing.sync="isPassing2" :imgsrc="img" @refresh="reset" @passSuccess="success" />
			</el-tab-pane>
			<el-tab-pane label="拼图滑块" name="3">
				<dragVerifyChip ref="dragVerifyChip" :isPassing.sync="isPassing3" :imgsrc="img2" @refresh="reset" @passSuccess="success" />
			</el-tab-pane>
			<el-tab-pane label="旋转图片" name="4">
				<dragVerifyRotate ref="dragVerifyRotate" :isPassing.sync="isPassing4" :imgsrc="img3" @refresh="reset" @passSuccess="success" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	// 基本滑块验证组件
	import dragVerify from "@/components/verify/dragVerify";
	// 图片滑块组件
	import dragVerifyImg from "@/components/verify/dragVerifyImg";
	// 拼图滑块组件
	import dragVerifyChip from "@/components/verify/dragVerifyImgChip";
	// 旋转图片滑块组件
	import dragVerifyRotate from "@/components/verify/dragVerifyImgRotate";
	export default {
		components: {
			// dragVerify,
			// dragVerifyImg,
			// dragVerifyChip,
			// dragVerifyRotate
		},
		data() {
			return {
				img: '',
				img2: '',
				img3: '',
				imgList: [
					require('@/assets/home/face.png'),
					require('@/assets/home/face2.png'),
					require('@/assets/home/face3.png')
				],
				isPassing: false,
				isPassing2: false,
				isPassing3: false,
				isPassing4: false,
				tabName: '1'
			}
		},
		methods: {
			changeTab(e) {
				this.tabName = e.name
				this.reset()
			},
			reset() {
				if (this.tabName == 1) {
					this.isPassing = false
					this.$refs.dragVerify.reset()
				}
				if (this.tabName == 2) {
					this.isPassing2 = false
					this.img = this.getImg()
					this.$refs.dragVerifyImg.reset()
				}
				if (this.tabName == 3) {
					this.isPassing3 = false
					this.img2 = this.getImg()
					this.$refs.dragVerifyChip.reset()
				}
				if (this.tabName == 4) {
					this.isPassing4 = false
					this.img3 = this.getImg()
					this.$refs.dragVerifyRotate.reset()
				}
			},
			getImg() {
				return this.imgList[Math.floor(Math.random(0, 1) * this.imgList.length)]
			},
			//失败回调
			fail() {
				setTimeout(() => {
					this.reset()
				}, 500)
			},
			//成功回调
			success() {
				this.$message.success('验证通过')
				setTimeout(() => {
					this.reset()
					this.$message.closeAll()
				}, 1500)
			}
		},
		mounted() {
			this.reset()
		}
	}
</script>
<style lang="scss">
	.verifyContainer {
		margin: 16px;
		.el-tabs {
			height: 380px;
			.el-tab-pane:first-child {
				padding-top: 50px;
			}
			.el-tabs__content {
				padding: 24px;
			}
		}
	}
</style>
