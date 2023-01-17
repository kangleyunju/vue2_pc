<template>
	<svg :class="svgClass">
		<use :xlink:href="iconName"></use>
	</svg>
</template>
<script>
	export default {
		name: 'svgIcon',
		props: {
			iconClass: {
				type: String,
				required: true
			},
			className: {
				type: String
			}
		},
		computed: {
			iconName() {
				return `#icon-${this.iconClass}`
			},
			svgClass() {
				return this.className?`'svg-icon '${this.className}`:'svg-icon'
			}
		}
	};
</script>
<style lang="scss" scoped>
	.svg-icon {
		width: 24px;
		height: 24px;
		fill: currentColor;
		stroke: currentColor;
		overflow: hidden;
	}
</style>
