<template>
  <div class="home">
<!-- 	<div class="title">wangeditor4</div>
	<wangeditor :value="value"/> -->
	<div class="title">wangeditor5</div>
	<wangeditor5 :value="value"/> 
  </div>
</template>

<script>
	import wangeditor5 from "@/components/wangeditor5"
	export default {
		components:{
			wangeditor5
		},
		data() {
			return {
				value:''
			}
		},
		methods: {

		},
		created() {

		}
	}
</script>
<style lang="scss">
	.home{
		padding: 20px;
		.title{
			font-size: 18px;
			line-height: 40px;
			font-weight: bold;
		}
	}
</style>