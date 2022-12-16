<template>
	<div class="wangeditor5Container" :class="{disabled:disabled}">
		<Toolbar :editor="editor" :defaultConfig="toolbarConfig" class="toolbar" v-if="!disabled" />
		<Editor :defaultConfig="editorConfig" v-model="content" @onChange="onChange" @onCreated="onCreated" class="editor" />
	</div>
</template>
<script>
	/**
	 * @name wangeditor5富文本编辑器
	 * @author xie
	 * @property {String} value 内容 
	 * @property {Boolean} disabled 是否禁用
	 * @function changeText 赋值
	 */
	import { Toolbar,Editor } from '@wangeditor/editor-for-vue'
	import { DomEditor } from '@wangeditor/editor'
	export default {
		components: { Editor, Toolbar },
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
		data() {
			return {
				editor: null,
				content: '',
				toolbarConfig: {
					excludeKeys: [], //排除的菜单
					insertKeys: [] //添加的菜单
				},
				editorConfig: {
					placeholder: '请填写文章内容',
					MENU_CONF: {}
				}
			}
		},
		methods: {
			onCreated(editor) {
				this.editor = Object.seal(editor)
				this.changeText(this.value)
			},
			onChange(editor) {
				this.$emit("update", editor.getHtml())
			},
			changeText(value) {
				this.content=value
				this.editor.blur()
				if (this.disabled) {
					this.editor.disable()
				}
			}
		},
		created() {
			this.editorConfig.MENU_CONF['uploadImage'] = {
				maxNumberOfFiles: 1,
				maxFileSize: 2 * 1024 * 1024,
				base64LimitSize: 5 * 1024, // 5kb 以下插入 base64
				customUpload(file, insert) {
					let imgUrl = URL.createObjectURL(file)
					insert(imgUrl)
				}
			}
		},
		beforeDestroy() {
			if (this.editor) {
				this.editor.destroy()
			}
		}
	}
</script>
<style lang="scss">
	@import url("@wangeditor/editor/dist/css/style.css");
	.wangeditor5Container {
		z-index: 1000;
		&.disabled * {
			cursor: not-allowed;
			background-color: #F5F7FA;
		}
		.toolbar {
			border: 1px solid #D3D4DB;
			border-bottom: none;
		}
		.editor {
			overflow: hidden;
			border: 1px solid #D3D4DB;
			height: 363px;
			.w-e-text-placeholder {
				font-style: normal;
			}
		}
	}
</style>
