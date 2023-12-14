<template>
	<!-- 寻源/招标 物资明细——报价详情 -->
	<el-table :data="dataMsg" border :span-method="arraySpanMethod">
		<el-table-column prop="detailName" label="名称" align="center" min-width="100"></el-table-column>
		<el-table-column prop="detailSpecs" label="规格" align="center" min-width="100"></el-table-column>
		<el-table-column prop="unit" label="单位" align="center" min-width="100"></el-table-column>
		<el-table-column prop="number" label="需求数量" align="center" min-width="100"></el-table-column>
		<el-table-column prop="brand" label="品牌" align="center" min-width="100"></el-table-column>
		<el-table-column prop="notes" label="备注" align="center" min-width="100"></el-table-column>
		<el-table-column v-for="(item, index) in sourcingDetailQuotationListVOList" :key="index" :label="`公司${index+1}`" align="center">
			<el-table-column :prop="'brand' + index" label="品牌" align="center" width="120">
				<template slot-scope="scope">
					<!-- <span>{{ scope.row['brand' + index] }}</span> -->
					<el-input v-model="scope.row['brand' + index]"></el-input>
				</template>
			</el-table-column>
			<el-table-column :prop="'excludingTaxPrice' + index" label="不含税单价（元）" align="center" width="120">
				<template slot-scope="scope">
					<div style="display:flex;justify-content: center;align-items: center;">
						<!-- <span>{{ scope.row['excludingTaxPrice' + index] }}</span> -->
						<el-input v-model="scope.row['excludingTaxPrice' + index]"></el-input>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="includingTaxPrice" label="含税单价（元）" align="center" width="120">
				<template slot-scope="scope">
					<div style="display:flex;justify-content: center;align-items: center;">
						<!-- <span>{{ scope.row['includingTaxPrice' + index] }}</span> -->
						<el-input v-model="scope.row['includingTaxPrice' + index]"></el-input>
					</div>
				</template>
			</el-table-column>
			<!-- <el-table-column :prop="'excludingTaxPrice' + index" label="不含税总价（元）" align="center" width="120">
                <template slot-scope="scope">
                    <div style="display:flex;justify-content: center;align-items: center;">
                        <span>{{ scope.row['excludingTaxPrice' + index] }}</span>
                    </div>
                </template>
            </el-table-column> -->
			<!-- <el-table-column prop="includingTaxPrice" label="含税总价（元）" align="center" width="120">
                <template slot-scope="scope">
                    <div style="display:flex;justify-content: center;align-items: center;">
                        <span>{{ scope.row['includingTaxPrice' + index] }}</span>
                    </div>
                </template>
            </el-table-column> -->
			<el-table-column :prop="'taxRate' + index" label="税率（%）" align="center" width="120">
				<template slot-scope="scope">
					<!-- <span>{{ scope.row['taxRate' + index] }}</span> -->
					<el-input v-model="scope.row['taxRate' + index]"></el-input>
				</template>
			</el-table-column>
			<el-table-column :prop="'otherExpenses' + index" label="其他费用（元）" align="center" width="120">
				<template slot-scope="scope">
					<!-- <span>{{ scope.row['otherExpenses' + index] }}</span> -->
					<el-input v-model="scope.row['otherExpenses' + index]"></el-input>
				</template>
			</el-table-column>
			<el-table-column :prop="'areaName' + index" label="所属区域" align="center" width="120">
				<template slot-scope="scope">
					<!-- <span>{{ scope.row['areaName' + index] }}</span> -->
					<el-input v-model="scope.row['areaName' + index]"></el-input>
				</template>
			</el-table-column>
			<el-table-column fixed :prop="'file' + index" label="报价附件" align="center" width="120">
				<template slot-scope="scope">
					<el-button size="mini" @click="attachments(scope.$index)">附件管理</el-button>
				</template>
			</el-table-column>
			<el-table-column fixed :prop="'notes' + index" label="备注" align="center" width="120">
				<template slot-scope="scope">
					<!-- <span>{{ scope.row['notes' + index] }}</span> -->
					<el-input v-model="scope.row['notes' + index]"></el-input>
				</template>
			</el-table-column>
		</el-table-column>
		<el-table-column label="操作" width="100" fixed="right">
			<template slot-scope="scope">
				<el-button @click="add(scope.row, scope.$index)" type="text" size="small">新增</el-button>
				<el-button type="text" size="small" v-if="dataMsg.length> 1" @click="remove(scope.$index)">删除</el-button>
			</template>
		</el-table-column>
		<!-- 		<el-dialog title="报价附件" :visible.sync="dialogVisible" width="75%" :append-to-body="true">
			<upload-file-list ref="upload" :file="detailData.quotationAnnexList" btn-text="附件管理" style="margin: 0 0 0 10px;"
				:disabled="false" @success="detailData.quotationAnnexList.push($event)"
				@delete="detailData.quotationAnnexList.splice($event, 1)"></upload-file-list> -->
		<!-- 寻源 -->
		<!-- <upload-file-list ref="upload" :file="detailData.sourcingDetailAnnexList" style="margin: 0 0 0 10px;"
                v-if="detailData.sourcingDetailAnnexList" btn-text="附件管理" :disabled="false"
                @success="detailData.sourcingDetailAnnexList.push($event)"
                @delete="detailData.sourcingDetailAnnexList.splice($event, 1)"></upload-file-list> -->
		<!-- 招标 -->
		<!-- <upload-file-list ref="upload" :file="detailData.annexList" btn-text="附件管理" v-if="detailData.annexList"
                style="margin: 0 0 0 10px;" :disabled="false" @success="detailData.annexList.push($event)"
                @delete="detailData.annexList.splice($event, 1)"></upload-file-list> -->
		<!-- </el-dialog> -->
	</el-table>
</template>
<script>
	// import UploadFileList from "@/components/UploadFileList.vue"
	// import { colMethod } from '@/utils/util'
	export default {
		// components: { UploadFileList },
		props: {
			dataMsg: {
				type: Array,
				default: [],
			},
		},
		data() {
			return {
				checked: false,
				sourcingDetailQuotationListVOList: [],
				id: '',
				dialogVisible: false,
				detailData: {}
			}
		},
		mounted() {
			if (this.dataMsg.length > 0) {
				this.sourcingDetailQuotationListVOList = this.dataMsg[0].sourcingDetailQuotationListVOList
			}
			let array = JSON.parse(JSON.stringify(this.dataMsg))
			array.forEach(item => {
				item.sourcingDetailQuotationListVOList.forEach((item2, index2) => {
					item['brand' + index2] = item2.brand
					item['excludingTaxPrice' + index2] = item2.excludingTaxPrice
					item['includingTaxPrice' + index2] = item2.includingTaxPrice
					item['taxRate' + index2] = item2.taxRate
					item['otherExpenses' + index2] = item2.otherExpenses
					item['areaName' + index2] = item2.areaName
					item['file' + index2] = item2.file
					item['notes' + index2] = item2.notes
				})
			})
			this.$emit('update', array)
			console.log(this.dataMsg)
		},
		methods: {
			// 附件管理
			attachments(index) {
				this.dialogVisible = true
				this.detailData = this.sourcingDetailQuotationListVOList[index]
			},
			arraySpanMethod({ row, column, rowIndex, columnIndex }) {
				// 合并前7列
				if (columnIndex < 7) {
					if (rowIndex >= 0) {
						const pre = this.dataMsg[rowIndex - 1]?.id
						const current = this.dataMsg[rowIndex].id
						// 如果当前值和上一行的值相同，则将当前单元格隐藏
						if (current === pre) {
							return [0, 0]
						} else {
							// 否则计算当前单元格应该跨越多少行
							let rowspan = 1;
							for (let i = rowIndex + 1; i < this.dataMsg.length; i++) {
								const nextValue = this.dataMsg[i].id
								if (nextValue == current) {
									rowspan++;
								} else {
									break;
								}
							}
							return [rowspan, 1]
						}
					}
				}
			},
			renderHeader(h, { column, $index }) {
				console.log('列表加载就会触发', h, { column, $index })
				let that = this
				// 逻辑是 h() 括号里包裹标签 第一个参数是标签名 第二个是属性  第三个是标签内容  如果是多个标签需要包裹数组
				return h('div', [
					// 列名称
					h('span', {
						style: 'color:#169bd5',
					}, column.label),
					// 按钮
					h('span', {
						style: 'color:#169bd5;margin-left:20px',
						on: {
							// 各种事件触发
							click: function() {
								that.clickButton()
							}
						}
					}, '查看详情')
				], )
			},
			add(item, index) {
				item = { ...item }
				//新增项清空数值
				this.sourcingDetailQuotationListVOList.forEach((value, key) => {
					item['brand' + key] = ''
					item['excludingTaxPrice' + key] = ''
					item['includingTaxPrice' + key] = ''
					item['taxRate' + key] = ''
					item['otherExpenses' + key] = ''
					item['areaName' + key] = ''
					item['file' + key] = ''
					item['notes' + key] = ''
				})
				let array = JSON.parse(JSON.stringify(this.dataMsg))
				array.splice(index + 1, 0, item)
				this.$emit('update', array)
			},
			remove(index) {
				let array = JSON.parse(JSON.stringify(this.dataMsg))
				array.splice(index, 1)
				this.$emit('update', array)
			},
		}
	}
</script>
<style lang="sass">
</style>