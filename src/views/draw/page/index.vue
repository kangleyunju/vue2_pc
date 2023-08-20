<template>
	<div class="drawContainer pageMain">
		<div class="toolBox">
			<div class="label">粗细</div>
			<el-select v-model="strokeWidth" placeholder="请选择" @change="changeSize">
				<el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<div class="label">颜色</div>
			<el-color-picker v-model="stroke" @change="changeColor"></el-color-picker>
			<el-button type="primary" @click="pointArr=[]">清除</el-button>
		</div>
		<div class="drawBox">
			<svg :width="width" :height="height">
				<polyline :points="points"
					:fill="fill"
					:stroke="stroke"
					:stroke-width="strokeWidth"
					stroke-linejoin="round" />
			</svg>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				element: '',
				fill: 'none',
				stroke: '#000000',
				height: 800,
				width: 600,
				strokeWidth: 10,
				pointArr: [],
				sizeOptions: [{
					label: 1,
					value: 1
				}, {
					label: 5,
					value: 5
				}, {
					label: 10,
					value: 10
				}]
			}
		},
		computed: {
			points() {
				return this.pointArr.join(' ')
			}
		},
		methods: {
			changeColor(e) {
				this.stroke = e
			},
			changeSize(e) {
				this.strokeWidth = e
			},
			getPoint(event) {
				return event.offsetX + ',' + event.offsetY
			},
			start(event) {
				console.log('按下', event)
				this.pointArr.push(this.getPoint(event))
				this.element.addEventListener("mousemove", this.move)
				this.element.addEventListener("mouseup", this.up)
			},
			move(event) {
				this.pointArr.push(this.getPoint(event))
				// console.log('移动', event)
			},
			up(event) {
				this.pointArr.push(this.getPoint(event))
				// console.log('离开', this.points)
				this.element.removeEventListener("mousemove", this.move)
				this.element.removeEventListener("mouseup", this.up)
			}
		},
		mounted() {
			this.element = document.querySelector('.drawBox')
			this.height = this.element.getBoundingClientRect().height
			this.width = this.element.getBoundingClientRect().width
			this.element.addEventListener("mousedown", this.start)
		}
	}
</script>
<style lang="scss">
	.drawContainer {
		display: flex;
		flex-direction: column;
		.toolBox {
			padding: 10px 0;
			display: flex;
			align-items: center;
			.label, .el-select, .el-color-picker {
				margin-right: 20px;
			}
		}
		.drawBox {
			flex: 1;
		}
	}
</style>