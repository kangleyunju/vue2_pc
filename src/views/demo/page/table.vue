<template>
	<div class="tableContainer pageMain" v-loading="loading" element-loading-text="拼命加载中">
		<el-table :data="tableData" border :span-method="arraySpanMethod">
			<el-table-column prop="name" label="物资名称" width="100" fixed="left"></el-table-column>
			<el-table-column prop="type" label="规格型号" width="100" fixed="left"></el-table-column>
			<el-table-column prop="unit" label="单位" width="100" fixed="left"></el-table-column>
			<el-table-column prop="date" label="需用日期" min-width="100"></el-table-column>
			<el-table-column prop="number" label="库存数量" min-width="100"></el-table-column>
			<el-table-column prop="plan" label="计划单价" min-width="100"></el-table-column>
			<el-table-column prop="mark" label="询价备注" min-width="100"></el-table-column>
			<el-table-column prop="file" label="询价附件" min-width="100"></el-table-column>
			<el-table-column prop="person" label="吴冰倩">
				<el-table-column prop="price1" label="含税单价(元)" min-width="150"></el-table-column>
				<el-table-column prop="total1" label="含税总价(元)" min-width="150"></el-table-column>
				<el-table-column prop="price2" label="不含税单价(元)" min-width="150"></el-table-column>
				<el-table-column prop="total2" label="不含税总价(元)" min-width="150"></el-table-column>
			</el-table-column>
		</el-table>
		<supplierOffer :dataMsg="dataMsg" @update="update" />
	</div>
</template>
<script>
	import supplierOffer from "./supplierOffer"
	export default {
		data() {
			return {
				tableData: [],
				columnNumber: 12,
				loading: false,
				dataMsg: [{
					sourcingDetailQuotationListVOList: [{
						brand: '品牌',
						excludingTaxPrice: '不含税单价',
						includingTaxPrice: '含税单价',
						taxRate: '税率',
						otherExpenses: '其他费用',
						areaName: '所属区域',
						file: '',
						notes: 'notes'
					}],
					detailName: '名称',
					detailSpecs: '规格',
					unit: '单位',
					number: '需求数量',
					brand: '品牌',
					notes: '备注',
					id: 48
				}]
			}
		},
		components: {
			supplierOffer
		},
		methods: {
			update(e) {
				this.dataMsg = e
			},
			getList() {
				this.loading = true
				//模拟请求接口
				setTimeout(() => {
					this.loading = false
					this.tableData = [{
						name: '螺纹钢',
						type: 'A',
						unit: '吨',
						date: '2023-09-09',
						number: 21,
						plan: 34,
						mark: '解决',
						file: '无',
						price1: 100,
						total1: 200,
						price2: 1000,
						total2: 2000
					}, {
						name: '大熊猫',
						type: 'C',
						unit: '只',
						date: '2023-10-09',
						number: 331,
						plan: 4200,
						mark: '哈佛大学',
						file: '无',
						price1: 200,
						total1: 400,
						price2: 2000,
						total2: 20000
					}]
					//计算总价
					let price1 = 0
					let price2 = 0
					this.tableData.forEach((item) => {
						price1 += item.total1
						price2 += item.total2
					})
					//倒二行
					this.tableData.push({
						type: '合计：' + price1,
						unit: '合计：' + price2
					})
					//倒一行
					this.tableData.push({
						type: '备注--'
					})
				}, 500)
			},
			arraySpanMethod({ row, column, rowIndex, columnIndex }) {
				//自定义显示字段会改变列的数量,当前是12列,以下需要重新计算
				if (rowIndex == this.tableData.length - 2) {
					if (columnIndex === 0) {
						return [1, 8]
					} else if (columnIndex === 1) {
						return [1, 2]
					} else if (columnIndex === 2) {
						return [1, 2]
					} else {
						return [0, 0]
					}
				}
				if (rowIndex == this.tableData.length - 1) {
					if (columnIndex === 0) {
						return [1, 8]
					} else if (columnIndex === 1) {
						return [1, 4]
					} else {
						return [0, 0]
					}
				}
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>
<style lang="scss">
	.tableContainer {
		padding: 20px;
		.el-table .el-table__cell.is-hidden {
			* {
				visibility: unset;
			}
		}
	}
</style>