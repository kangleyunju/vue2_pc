<template>
	<div class="echartsContainer pageMain" :class="{dark:isDark}">
		<el-row :gutter="20">
			<el-col :span="12" :lg="8" v-for="(item,index) in options" :key="index" class="cont" :class="item.id">
				<div class="echart" :id="item.id"></div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import 'echarts-gl';
	import { gdp } from '../utils/gdp'
	export default {
		data() {
			return {
				options: [
					gdp
				],
				isDark: false,
				timer: null
			}
		},
		mounted() {
			clearTimeout(this.timer)
			this.timer = null
			this.$store.watch((state, getters) => {
				return state.isNight
			}, (e) => {
				this.isDark = e
				this.changeBg()
			})
			this.isDark = this.isNight
			this.getLoadEcharts()
			let item = this.options.filter(item => item.id == 'gdp')?.[0]
			if (item) {
				this.timer = setInterval(() => {
					let el = document.getElementById('gdp')
					if (!el) {
						clearTimeout(this.timer)
						this.timer = null
					} else {
						gdp.series[0].data.forEach(item => {
							item[4] = Math.round(item[4] + Math.random() * 50)
						})
						if (Math.random(0, 1) > 0.6) {
							gdp.graphic.elements[0].style.text += 1;
						}
						//这里通过获取节点的方式避免重复渲染,否则控制台报错
						let echarts = this.$echarts.getInstanceByDom(el)
						echarts.setOption(item)
					}
				}, 1000)
			}
		},
		methods: {
			changeBg() {
				this.options.forEach(item => {
					let echarts = this.$echarts.init(document.getElementById(item.id), this.isDark ? 'dark' : '')
					echarts.setOption(item)
				})
			},
			getLoadEcharts() {
				this.options.forEach(item => {
					let echarts = this.$echarts.init(document.getElementById(item.id), this.isDark ? 'dark' : '')
					echarts.setOption(item)
					window.addEventListener('resize', echarts.resize)
				})
			}
		}
	}
</script>
<style lang="scss">
	.echartsContainer {
		padding: 24px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		overflow-y: auto;
		&.dark {
			background-color: #100c2a;
		}
		.el-row {
			width: 100%;
			.cont {
				height: 400px;
				margin-bottom: 20px;
				.echart {
					border-radius: 4px;
					overflow: hidden;
					box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
				}
				&.gdp {
					width: 100%;
					height: 550px;
					margin: 0;
				}
				.echart {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>