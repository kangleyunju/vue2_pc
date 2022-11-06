<template>
	<div class="editorContainer">
		<el-tabs v-model="editorName" type="border-card" @tab-click="changeTab">
			<el-tab-pane label="ueditor" name="ueditor">
				<ueditor :value="value" @update="update" ref="ueditor" />
			</el-tab-pane>
			<el-tab-pane label="wangeditor4" name="wangeditor4">
				<wangeditor4 :value="value" @update="update" ref="wangeditor4" />
			</el-tab-pane>
			<el-tab-pane label="wangeditor5" name="wangeditor5">
				<wangeditor5 :value="value" @update="update" ref="wangeditor5" v-if="editorName=='wangeditor5'" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import ueditor from "@/components/ueditor"
	import wangeditor4 from "@/components/wangeditor4"
	import wangeditor5 from "@/components/wangeditor5"
	export default {
		components: {
			ueditor,
			wangeditor4,
			wangeditor5
		},
		data() {
			return {
				value: '',
				editorName: 'ueditor'
			}
		},
		methods: {
			changeTab(e) {
				setTimeout(() => {
					this.$refs[this.editorName].changeText(this.value)
				}, 200)
			},
			update(e) {
				this.value = e
			}
		},
		mounted() {
			this.$refs[this.editorName].changeText(this.value)
		}
	}
</script>
<style lang="scss">
	.editorContainer {
		margin: 16px;
		.el-tabs__content {
			padding: 16px;
		}
	}
</style>
