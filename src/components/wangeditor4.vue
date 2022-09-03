<template>
	<div class="wangeditorContainer" :class="{disabled:disabled}">
		<div ref="editor"></div>
	</div>
</template>
<script>
	/**
	* @name wangeditor4富文本编辑器
	* @author xie
	* @property {String} value 内容 
	* @property {Boolean} disabled 是否禁用
	* @function changeText 赋值
	*/
	import wangeditor from "wangeditor"
	export default ({
		props:{
			value: { 
				type: String, 
				default: ""
			},
			disabled: {
				type: Boolean, 
				default: false
			}
		},
		data() {
			return {
				editor:''
			}
		},
		methods: {
			initEditor() {
				const editor = new wangeditor(this.$refs.editor)
				this.editor=editor
				if(this.disabled){
					editor.config.menus=[]
					editor.config.showFullScreen = false//隐藏全屏
				}else{
					editor.config.menus = [
						'head', // 标题
						'bold', // 粗体  
						'fontSize', // 字号  
						'fontName', // 字体  
						'italic', // 斜体  
						'underline', // 下划线  
						'strikeThrough', // 删除线  
						'foreColor', // 文字颜色  
						'backColor', // 背景颜色  
						'link', // 插入链接  
						'list', // 列表  
						'justify', // 对齐方式 
						'quote', // 引用  
						'emoticon', // 表情
						'image', // 插入图片  
						'table', // 表格
						'code', // 插入代码
						'undo', // 上一步
						'redo', // 下一步
						'video', // 插入视频
						'fullscreen' // 全屏
					]
				}
				editor.config.height = 350
				editor.config.zIndex = 1
				editor.config.showLinkImg = false //隐藏插入网络图片的功能 
				editor.config.onchangeTimeout = 400 // 配置触发 onchange 的时间频率，默认为 200ms
				editor.config.uploadImgMaxLength = 1 //限制一次最多能传几张图片 
				editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 限制图片大小 
				editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
				editor.config.onchange = newHtml => {
					this.$emit("update", newHtml);
				}
				editor.config.customUploadImg = async (file, insert) => {
					let imgUrl=URL.createObjectURL(file[0])
					insert(imgUrl)
				} 
				editor.create()
				this.changeText(this.value)
			},
			changeText(value){
				this.editor.txt.html(value)
				document.activeElement.blur()
				if(this.disabled){
					this.editor.$textElem.attr('contenteditable', false)
				}
			}
		},
		mounted(){
			this.initEditor()
		}
	})
</script>
<style lang="scss">
	.wangeditorContainer {
		&.disabled{
			.w-e-text{
				background-color: #F5F7FA;
				cursor: not-allowed;
			}
		}
	}
</style>
