<template>
	<div class="editorContainer">
		<el-tabs v-model="editorName" type="card" @tab-click="changeTab">
			<el-tab-pane label="ueditor" name="ueditor">
				<ueditor :value="value" @update="update" />
			</el-tab-pane>
			<el-tab-pane label="wangeditor4" name="wangeditor4">
				<wangeditor4 :value="value" @update="update" />
			</el-tab-pane>
			<el-tab-pane label="wangeditor5" name="wangeditor5">
				<wangeditor5 :value="value" @update="update" />
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
				if (e.name) {

				}
			},
			update(e) {
				this.value = e
				console.log(this.value)
			}
		},
		created() {

		}
	}
</script>
<style lang="scss">
	.editorContainer {
		padding: 10px 20px;

		.el-tab-pane {
			padding: 0 20px 0 0;
		}
	}
</style>
