<template>
	<div class="echartsContainer pageMain">
		<div class="cont">
			<div class="title">环形图</div>
			<div class="echart" id="echart"></div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		// 页面初始化挂载dom
		mounted() {
			this.getLoadEcharts();
		},
		methods: {
			getLoadEcharts() {
				var myChart = this.$echarts.init(document.getElementById("echart"));
				var colorList = ["#ff0000", "#00ff00", "#e6df02"];
				var listData = [{ name: "阳性", value: 20 }, { name: "阴性", value: 20 }, { name: "无症状", value: 20 }]
				var option = {
					color: colorList,
					title: {
						x: "center",
						y: "center",
						textStyle: {
							color: "#000",
							fontSize: 40
						}
					},
					legend: {
						orient: "vertical",
						bottom: 5,
						align: "right",
						right: 15,
						textStyle: {
							color: "#000",
							fontSize: 20
						},
						selectedMode: false,
						data: ["元素1", "元素2", "元素3"]
					},
					tooltip: {
						trigger: "item"
					},
					series: [{
						type: "pie",
						center: ['50%', '50%'],
						radius: ['50%', '30%'],
						itemStyle: {
							normal: {
								color: function(params) {
									return colorList[params.dataIndex]
								}
							}
						},
						label: {
							show: true,
							fontSize: 10,
							color: "#000",
							formatter: function(data) {
								return data.name + ":" + data.percent.toFixed(0) + "%"
							}
						},
						labelLine: {
							normal: {
								length: 15,
								length2: 15,
								lineStyle: {
									width: 2
								}
							}
						},
						data: listData
					}]
				};
				myChart.setOption(option)
			}
		}
	};
</script>
<style lang="scss">
	.echartsContainer{
		padding: 24px;
		.cont{
			border: 1px solid red;
			width: 300px;
			.title{
				line-height: 40px;
				font-size: 18px;
				font-weight: 600;
			}
			.echart{
				width: 300px;
				height: 300px;
				border: 1px solid blue;
			}
		}
	}
</style>
