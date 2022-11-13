<template>
	<div ref="dragVerify" class="drag_verify" :style="dragVerifyStyle" @mousemove="dragMoving" @mouseup="dragFinish" @mouseleave="dragFinish" @touchmove="dragMoving" @touchend="dragFinish">
		<div class="dv_progress_bar" :class="{goFirst2:isOk}" ref="progressBar" :style="progressBarStyle"></div>
		<div class="dv_text" :style="textStyle" ref="message">
			<slot name="textBefore" v-if="$slots.textBefore"></slot>
			{{message}}
			<slot name="textAfter" v-if="$slots.textAfter"></slot>
		</div>
		<div class="dv_handler" :class="{goFirst:isOk}" @mousedown="dragStart" @touchstart="dragStart" ref="handler" :style="handlerStyle">
			<i :class="handlerIcon"></i>
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
					left: "0px",
					width: this.height + "px",
					height: this.height + "px",
					background: this.handlerBg,
					boxShadow: this.isShadow ? '0px 0px 4px 1px rgba(0, 0, 0, 0.2) inset' : 'none'
				};
			},
			message: function() {
				return this.isPassing ? this.successText : this.text;
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
			}
		},
		data() {
			return {
				isMoving: false,
				x: 0,
				isOk: false
			};
		},
		methods: {
			dragStart: function(e) {
				if (!this.isPassing) {
					this.isMoving = true;
					var handler = this.$refs.handler;
					this.x = (e.pageX || e.touches[0].pageX) - parseInt(handler.style.left.replace("px", ""), 10);
				}
				this.$emit("handlerMove");
			},
			dragMoving: function(e) {
				if (this.isMoving && !this.isPassing) {
					var _x = (e.pageX || e.touches[0].pageX) - this.x;
					var handler = this.$refs.handler;
					if (_x > 0 && _x <= this.width - this.height) {
						handler.style.left = _x + "px";
						this.$refs.progressBar.style.width = _x + this.height / 2 + "px";
					} else if (_x > this.width - this.height) {
						handler.style.left = this.width - this.height + "px";
						this.$refs.progressBar.style.width = this.width - this.height / 2 + "px";
						this.passVerify();
					}
				}
			},
			dragFinish: function(e) {
				if (this.isMoving && !this.isPassing) {
					var _x = (e.pageX || e.changedTouches[0].pageX) - this.x;
					if (_x < this.width - this.height) {
						this.isOk = true;
						var that = this;
						setTimeout(function() {
							that.$refs.handler.style.left = "0";
							that.$refs.progressBar.style.width = "0";
							that.isOk = false;
						}, 500);
					} else {
						var handler = this.$refs.handler;
						handler.style.left = this.width - this.height + "px";
						this.$refs.progressBar.style.width = this.width - this.height / 2 + "px";
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
				this.$refs.message.style.color = "#fff";
				this.$emit("passSuccess");
			},
			reset: function() {
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
	.goFirst2 {
		width: 0px !important;
		transition: width 0.5s;
	}
</style>
