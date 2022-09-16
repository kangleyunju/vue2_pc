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
		  <el-select v-model="value2" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
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
				value2:'',
				editorName: 'ueditor',
				options: [{
				          value: '选项1',
				          label: '黄金糕'
				        }, {
				          value: '选项2',
				          label: '双皮奶'
				        }, {
				          value: '选项3',
				          label: '蚵仔煎'
				        }, {
				          value: '选项4',
				          label: '龙须面'
				        }, {
				          value: '选项5',
				          label: '北京烤鸭'
				        }]
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
		background-color: #fff;
		.el-tab-pane {
			padding: 0 20px 0 0;
		}
	}
</style>
