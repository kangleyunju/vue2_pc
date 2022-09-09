<template>
	<div class="dayContainer">
		<el-date-picker v-model="monthValue" placeholder="请选择月份" type="month" align="left" @change="changeMonth" :clearable="false" :editable="false"/>
		<el-calendar v-model="value" :first-day-of-week="7">
			<template slot="dateCell" slot-scope="{date, data}">
				<div class="cell" :class="{ selected : isSelected(date, data) }">
					<div class="solar">{{ data.day.split('-')[2]}}</div>
					<div class="lunar" :class="{ festival : isFestival(date, data) }">{{ solarToLunar(date, data) }}
					</div>
				</div>
			</template>
		</el-calendar>
	</div>
</template>
<script>
	import calendar from '@/base/calendar.js'
	export default {
		data() {
			return {
				value: new Date(),//当前日期
				selectedDates: [], //选中的日期
				monthValue: new Date()//当前月份
			}
		},
		watch:{
			value:{
				handler(e){
					this.monthValue=e
				}
			}
		},
		methods: {
			changeMonth(e) {
				this.value=new Date(e)
			},
			// 是否选中日期
			isSelected: function(slotDate, slotData) {
				return this.selectedDates.includes(slotData.day)
			},
			// 是否节假日
			isFestival(slotDate, slotData) {
				let solarDayArr = slotData.day.split('-');
				let lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])
				// 公历节日\农历节日\农历节气
				let festAndTerm = [];
				festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
				festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
				festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
				festAndTerm = festAndTerm.join('')
				return festAndTerm != ''
			},
			// 公历转农历
			solarToLunar(slotDate, slotData) {
				let solarDayArr = slotData.day.split('-');
				let lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])
				// 农历日期
				let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn
				// 公历节日\农历节日\农历节气
				let festAndTerm = [];
				festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
				festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
				festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
				let tmp = festAndTerm.join('')
				return tmp == '' ? lunarMD : festAndTerm.filter(val => val != '').join('/')
			}
		}
	}
</script>
<style lang="scss">
	.dayContainer{
		position: relative;
		.el-date-editor{
			position: absolute;
			top:10px;
			left: 20px;
			width: 105px;
			z-index: 1;
			.el-input__inner{
				height: 30px;
				padding-right: 15px;
				cursor: pointer;
			}
			.el-input__icon{
				line-height: 30px;
			}
		}
		.el-calendar {
			.el-calendar__title{
				opacity: 0;
			}
			.cell {
				text-align: center;
				.solar {
					font-weight: bold;
					margin: 8px 0 8px;
				}
			}
			.current{
				.lunar {
					&.festival {
						color: #ff5500;
					}
				}
			}
			.el-calendar-table td.is-selected{
				background-color: #E8F3FF;
			}
			.el-calendar__body{
				padding-bottom: 20px;
			}
		}
	}
</style>
