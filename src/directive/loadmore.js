
//el-select触底加载
export default {
  loadmore: {
    bind(el, binding) {
			const selectDom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
			selectDom.addEventListener('scroll', function() {
				const boolean = selectDom.scrollHeight - selectDom.scrollTop <= selectDom.clientHeight
				if (boolean) {
					binding.value()
				}
			})
		}
	}
}
