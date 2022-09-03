<template>
  <div class="home">
	<el-calendar v-model="value">
	</el-calendar>
  </div>
</template>

<script>
	export default {
		components:{
			
		},
		data() {
			return {
				value:new Date()
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