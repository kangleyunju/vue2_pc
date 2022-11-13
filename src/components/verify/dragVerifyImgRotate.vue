<template>
	<div class="drag-verify-container" :style="{width:width+'px'}">
		<div class="refresh" v-if="showRefresh && !isPassing">
			<i :class="refreshIcon" @click="refreshimg"></i>
		</div>
		<div :style="dragVerifyImgStyle">
			<img ref="checkImg" :src="imgsrc" class="check-img" :class="{goOrigin:isOk}" @load="checkimgLoaded" :style="imgStyle" alt="">
			<div class="tips success" v-if="showTips && isPassing">{{successTip}}</div>
			<div class="tips danger" v-if="showTips && !isPassing && showErrorTip">{{failTip}}</div>
		</div>
		<div ref="dragVerify" class="drag_verify" :style="dragVerifyStyle" @mousemove="dragMoving" @mouseup="dragFinish" @mouseleave="dragFinish" @touchmove="dragMoving" @touchend="dragFinish">
			<div class="dv_progress_bar" :class="{goFirst2:isOk}" ref="progressBar" :style="progressBarStyle">
				{{successMessage}}
			</div>
			<div class="dv_text" :style="textStyle" ref="message">
				{{message}}
			</div>
			<div class="dv_handler dv_handler_bg" :class="{goFirst:isOk}" @mousedown="dragStart" @touchstart="dragStart" ref="handler" :style="handlerStyle">
				<i :class="handlerIcon"></i>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "dragVerify",
		props: {
			//验证状态
			isPassing: {
				type: Boolean,
				default: false
			},
			//宽度
			width: {
				type: Number,
				default: 250
			},
			//滑块高度
			height: {
				type: Number,
				default: 40
			},
			//初始文字
			text: {
				type: String,
				default: "请按住滑块拖动"
			},
			//成功提示文字
			successText: {
				type: String,
				default: "验证通过"
			},
			//滑块右侧背景色
			background: {
				type: String,
				default: "#eee"
			},
			//滑块左侧背景色
			progressBarBg: {
				type: String,
				default: "#76c61d"
			},
			//验证通过背景色
			completedBg: {
				type: String,
				default: "#76c61d"
			},
			//两侧是否圆形
			circle: {
				type: Boolean,
				default: false
			},
			//圆角
			radius: {
				type: String,
				default: "4px"
			},
			//滑块阴影
			isShadow: {
				type: Boolean,
				default: true
			},
			//滑块颜色
			handlerColor: {
				type: String,
				default: "#666"
			},
			//滑块icon
			handlerIcon: {
				type: String,
				default: 'el-icon-d-arrow-right'
			},
			//成功icon
			successIcon: {
				type: String,
				default: 'el-icon-circle-check'
			},
			//滑块背景色
			handlerBg: {
				type: String,
				default: "#fff"
			},
			//文字大小
			textSize: {
				type: String,
				default: "14px"
			},
			//文字颜色
			textColor: {
				type: String,
				default: "#333"
			},
			//图片地址
			imgsrc: {
				type: String
			},
			//是否右上角显示刷新
			showRefresh: {
				type: Boolean,
				default: true
			},
			// 刷新icon
			refreshIcon: {
				type: String,
				default: 'el-icon-refresh-right'
			},
			//是否显示底部提示
			showTips: {
				type: Boolean,
				default: true
			},
			//成功文案
			successTip: {
				type: String,
				default: "验证通过"
			},
			//失败文案
			failTip: {
				type: String,
				default: "验证失败"
			},
			//角度误差
			diffDegree: {
				type: Number,
				default: 10
			},
			//最小旋转角度
			minDegree: {
				type: Number,
				default: 90
			},
			//最大旋转角度
			maxDegree: {
				type: Number,
				default: 270
			}
		},
		mounted: function() {
			const dragEl = this.$refs.dragVerify;
			dragEl.style.setProperty("--textColor", this.textColor);
			dragEl.style.setProperty("--width", Math.floor(this.width / 2) + "px");
			dragEl.style.setProperty("--pwidth", -Math.floor(this.width / 2) + "px");
		},
		computed: {
			handlerStyle: function() {
				return {
					color: this.handlerColor,
					width: this.height + "px",
					height: this.height + "px",
					background: this.handlerBg,
					boxShadow: this.isShadow ? '0px 0px 4px 1px rgba(0, 0, 0, 0.2) inset' : 'none'
				};
			},
			message: function() {
				return this.isPassing ? "" : this.text;
			},
			successMessage: function() {
				return this.isPassing ? this.successText : "";
			},
			dragVerifyStyle: function() {
				return {
					width: this.width + "px",
					height: this.height + "px",
					lineHeight: this.height + "px",
					background: this.background,
					borderRadius: this.circle ? this.height / 2 + "px" : this.radius
				};
			},
			dragVerifyImgStyle: function() {
				return {
					width: this.width + "px",
					height: this.width + "px",
					position: 'relative',
					overflow: 'hidden',
					"border-radius": "50%"
				};
			},
			progressBarStyle: function() {
				return {
					background: this.progressBarBg,
					height: this.height + "px",
					borderRadius: this.circle ? this.height / 2 + "px 0 0 " + this.height / 2 + "px" : this.radius
				};
			},
			textStyle: function() {
				return {
					height: this.height + "px",
					width: this.width + "px",
					fontSize: this.textSize
				};
			},
			factor: function() {
				//避免指定旋转角度时一直拖动到最右侧才验证通过
				if (this.minDegree == this.maxDegree) {
					return Math.floor(1 + Math.random() * 6) / 10 + 1
				}
				return 1;
			}
		},
		data() {
			return {
				isMoving: false,
				x: 0,
				isOk: false,
				showBar: false,
				showErrorTip: false,
				ranRotate: 0,
				cRotate: 0,
				imgStyle: {}
			};
		},
		methods: {
			checkimgLoaded: function() {
				//生成旋转角度
				var minDegree = this.minDegree;
				var maxDegree = this.maxDegree;
				var ranRotate = Math.floor(minDegree + Math.random() * (maxDegree - minDegree)); //生成随机角度
				this.ranRotate = ranRotate;
				this.imgStyle = {
					transform: `rotateZ(${ranRotate}deg)`
				}
			},
			dragStart: function(e) {
				if (!this.isPassing) {
					this.isMoving = true;
					var handler = this.$refs.handler;
					this.x = (e.pageX || e.touches[0].pageX) - parseInt(handler.style.left.replace("px", ""), 10);
				}
				this.showBar = true;
				this.showErrorTip = false;
				this.$emit("handlerMove");
			},
			dragMoving: function(e) {
				if (this.isMoving && !this.isPassing) {
					var _x = (e.pageX || e.touches[0].pageX) - this.x;
					var handler = this.$refs.handler;
					handler.style.left = _x + "px";
					this.$refs.progressBar.style.width = _x + this.height / 2 + "px";
					var cRotate = Math.ceil(_x / (this.width - this.height) * this.maxDegree * this.factor)
					this.cRotate = cRotate;
					var rotate = this.ranRotate - cRotate
					this.imgStyle = {
						transform: `rotateZ(${rotate}deg)`
					}
				}
			},
			dragFinish: function(e) {
				if (this.isMoving && !this.isPassing) {
					if (Math.abs(this.ranRotate - this.cRotate) > this.diffDegree) {
						this.isOk = true;
						this.imgStyle = {
							transform: `rotateZ(${this.ranRotate}deg)`
						}
						var that = this;
						setTimeout(function() {
							that.$refs.handler.style.left = "0";
							that.$refs.progressBar.style.width = "0";
							that.isOk = false;
						}, 500);
						this.showErrorTip = true;
					} else {
						this.passVerify();
					}
					this.isMoving = false;
				}
			},
			passVerify: function() {
				this.$emit("update:isPassing", true);
				this.isMoving = false;
				var handler = this.$refs.handler;
				handler.children[0].className = this.successIcon;
				this.$refs.progressBar.style.background = this.completedBg;
				this.$refs.message.style["-webkit-text-fill-color"] = "unset";
				this.$refs.message.style.animation = "slidetounlock2 3s infinite";
				this.$refs.progressBar.style.color = "#fff";
				this.$refs.progressBar.style.fontSize = this.textSize;
				this.$emit("passSuccess");
			},
			reset: function() {
				this.reImg();
				this.checkimgLoaded();
			},
			reImg: function() {
				this.$emit("update:isPassing", false);
				const oriData = this.$options.data();
				for (const key in oriData) {
					if (oriData.hasOwnProperty(key)) {
						this.$set(this, key, oriData[key]);
					}
				}
				var handler = this.$refs.handler;
				var message = this.$refs.message;
				handler.style.left = "0";
				this.$refs.progressBar.style.width = "0";
				handler.children[0].className = this.handlerIcon;
				message.style["-webkit-text-fill-color"] = "transparent";
				message.style.animation = "slidetounlock 3s infinite";
				message.style.color = this.background;
			},
			refreshimg: function() {
				this.$emit('refresh')
			}
		},
		watch: {
			imgsrc: {
				immediate: false,
				handler: function() {
					this.reImg();
				}
			}
		}
	};
</script>
<style lang="scss">
	@import "common.scss";
	.goFirst {
		left: 0px !important;
		transition: left 0.5s;
	}
	.goOrigin {
		transition: transform 0.5s;
	}
	.goKeep {
		transition: left 0.2s;
	}
	.goFirst2 {
		width: 0px !important;
		transition: width 0.5s;
	}
	.drag-verify-container {
		position: relative;
		line-height: 0;
		border-radius: 50%;
	}
	.check-img {
		width: 100%;
		border-radius: 50%;
	}
	.tips {
		bottom: 20px;
	}
</style>
