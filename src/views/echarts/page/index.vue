<template>
	<div class="echartsContainer pageMain">
		<div class="cont" :class="item.id" v-for="(item,index) in options" :key="index">
			<div class="echart" :id="item.id"></div>
		</div>
	</div>
</template>
<script>
	import 'echarts-gl';
	import { ganran } from './ganran'
	import { shipin } from './shipin'
	import { yingye } from './yingye'
	import { fensi } from './fensi'
	import { diqiu } from './diqiu'
	import { gdp } from './gdp'
	import { duihua } from './duihua'
	export default {
		data() {
			return {
				options: [
					ganran,
					shipin,
					yingye,
					fensi,
					duihua,
					diqiu,
					gdp
				]
			}
		},
		mounted() {
			this.getLoadEcharts()
			let item = this.options.filter(item => item.id == 'gdp')?.[0]
			// 每循环一下，让每一项随机加一些数
			if (item) {
				for (let i = 0; i < 100; i++) {
					setTimeout(() => {
						gdp.series[0].data.forEach(item => {
							item[4] = Math.round(item[4] + Math.random() * 200)
						})
						if (i % 2 == 0) {
							gdp.graphic.elements[0].style.text += 1;
						}
						let echarts = this.$echarts.init(document.getElementById(item.id), item.dark)
						echarts.setOption(item)
						window.addEventListener('resize', echarts.resize)
					}, i * 1000)
				}
			}
		},
		methods: {
			getLoadEcharts() {
				this.options.forEach(item => {
					let echarts = this.$echarts.init(document.getElementById(item.id), item.dark)
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
		.cont {
			width: 33.33%;
			min-width: 500px;
			height: 400px;
			margin-bottom: 20px;
			&.gdp {
				width: 100%;
				height: 550px;
			}
			.echart {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>