<template>
	<div class="ueditorContainer" :class="{disabled:disabled}">
		<vue-ueditor-wrap v-model="content" :config="config" ref="editor" @ready="ready" editor-id="editor" @beforeInit="beforeInit"/>
		<el-dialog title="上传图片" :visible.sync="dialogVisible" :auto-upload="false" custom-class="uploadDialog">
			<div v-loading="popLoading" class="uploadImgBox">
				<el-upload action="" :show-file-list="false" accept="image/*" :before-upload="beforeUpload">
					<div class="img" v-if="imgUrl">
						<img :src="getImg(imgUrl)" />
					</div>
					<div class="add" v-else>
						<i class="el-icon-plus" />
						<span>点击上传图片</span>
					</div>
				</el-upload>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	/**
	 * @name ueditor富文本编辑器
	 * @author xie
	 * @property {String} value 内容 
	 * @property {Boolean} disabled 是否禁用
	 * @function changeText 赋值
	 */
	import VueUeditorWrap from "vue-ueditor-wrap"
	export default {
		components: {
			VueUeditorWrap,
		},
		props: {
			value: {
				type: String,
				default: ""
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			content: {
				handler(newValue, oldValue) {
					this.$emit("update", newValue);
				}
			}
		},
		data() {
			return {
				dialogVisible: false,
				popLoading: false,
				imgUrl: '',
				editor: '',
				content:'',
				config: {
					autoHeightEnabled: false, // 设置编辑器不自动被内容撑高
					initialFrameHeight: 330, // 初始容器高度
					initialFrameWidth: "100%", // 初始容器宽度
					maximumWords: 10000, // 允许的最大字符数
					serverUrl: '',
					UEDITOR_HOME_URL: "/ueditor/", // UEditor 是文件的存放路径
					toolbars: [
						[
							"fullscreen", //全屏
							"source", //源代码
							"undo", //上一步
							"redo", //下一步
							"bold", //加粗
							"italic", //斜体
							"underline", //下划线
							"fontborder", //字符边框
							"strikethrough", //删除线
							"superscript", //上标
							"subscript", //下标
							"removeformat", //清除格式
							"formatmatch", //格式刷
							"autotypeset", //自动排版
							"blockquote", //引用
							"pasteplain", //纯文本黏贴模式
							"forecolor", //字体颜色
							"backcolor", //背景色
							"insertorderedlist", //有序列表
							"insertunorderedlist", //无序列表
							"selectall", //全选
							"cleardoc", //清空文档
							"rowspacingtop", //断前距
							"rowspacingbottom", //断后距
							"lineheight", //行间距
							"customstyle", //自定义标题
							"paragraph", //段落格式
							"fontfamily", //字体
							"fontsize", //字号
							"directionalityltr", //从左向右输入
							"directionalityrtl", //从右向左输入
							"indent", //首行缩进
							"justifyleft", //居左对齐
							"justifycenter", //居中对齐
							"justifyright", //居右对齐
							"justifyjustify", //两端对齐
							"touppercase", //字母大写
							"tolowercase", //字母小写
							"link", //超链接
							"unlink", //取消链接
							"anchor", //锚点
							"simpleupload", //单图上传
							"imagenone", //默认
							"imageleft", //图片居左
							"imageright", //图片居右
							"imagecenter", //图片居中
							"insertcode", //代码语言
							"pagebreak", //分页
							"template", //模板
							"background", //背景
							"horizontal", //分隔线
							"date", //日期
							"time", //时间
							"spechars", //特殊字符
							"print", //打印
							"preview", //预览
							"searchreplace", //查询替换
							"help" //帮助
						]
					]
				}
			}
		},
		methods: {
			beforeUpload(file) {
				if (file.size / 1024 / 1024 > 2) {
					this.$message.error('图片不能超过2M!')
				} else {
					let formData = new FormData();
					formData.append("file[]", file)
					formData.append('dirName', 'articleContent')
					this.popLoading = true
					this.imgUrl = ""
					let editor = document.querySelector(".edui-default").getAttribute("id");
					window.UE.getEditor(editor).execCommand("insertimage", {
						src: this.imgUrl,
						width: "auto",
						height: "100"
					})
					this.dialogVisible = false
				}
				return false
			},
			beforeInit(editorId) {
				var that = this
				UE.registerUI('simpleupload', (editor, uiName) => {
					const btn = new window.UE.ui.Button({
						name: uiName,
						title: '单图上传',
						cssRules: '',
						onclick: function() {
							that.dialogVisible = true
							that.popLoading = false
							that.imgUrl = ''
						}
					})
					return btn
				})
			},
			changeText(e) {
				this.content=e
				if (this.disabled) {
					setTimeout(()=>{
						UE.getEditor('editor').setDisabled('fullscreen');
					},300)
				}
			},
			ready() {
				this.changeText(this.value)
			}
		}
	}
</script>
<style lang="scss">
	.ueditorContainer {
		.edui-default {
			.edui-editor-breadcrumb {
				margin-top: 0;
			}
		}
		.edui-editor-toolbarbox{
			display: block;
		}
		&.disabled{
			.edui-editor-toolbarbox{
				display: none;
			}
		}

		.uploadDialog {
			width: 420px !important;

			.el-dialog__body {
				padding: 20px 0 !important;
				margin: 0 !important;

				.uploadImgBox {
					text-align: center;

					.el-upload {
						cursor: pointer;
						margin-top: 10px;
						height: 114px;
						box-sizing: border-box;

						.img {
							position: relative;
							width: 114px;
							height: 114px;
							box-sizing: border-box;

							img {
								height: 100%;
								width: 100%;
								display: block;
								border-radius: 4px;
							}
						}

						.add {
							width: 114px;
							height: 114px;
							border: 1px dashed #d9d9d9;
							border-radius: 4px;
							box-sizing: border-box;
							color: #8c939d;
							display: flex;
							flex-direction: column;
							justify-content: center;

							span {
								font-size: 11px;
							}

							.el-icon-plus {
								font-size: 20px;
								display: block;
								margin-bottom: 13px;
							}

							&:hover {
								border-color: #5275FB;
								color: #5275FB;
							}
						}
					}
				}
			}
		}
	}
</style>
