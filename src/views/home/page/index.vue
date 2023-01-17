<template>
	<div class="dayContainer pageMain" >
    <div class="bgImg" :style="{backgroundImage:'url('+bgImg+')'}"></div>
		<el-date-picker v-model="monthValue" placeholder="请选择月份" type="date" align="left" @change="changeMonth" :clearable="false" :editable="false" />
		<el-calendar v-model="value" :first-day-of-week="7" >
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
				value: new Date(), //当前日期
				selectedDates: [], //选中的日期
				monthValue: new Date() ,//当前月份
        bgImg:require('@/assets/home/bg2.jpg'),
        // bgImg:''
			}
		},
		watch: {
			value: {
				handler(e) {
					this.monthValue = e
				}
			}
		},
		methods: {
			changeMonth(e) {
				this.value = new Date(e)
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
		},
		created() {

		}
	}
</script>
<style lang="scss">
	.dayContainer {
		position: relative;
    .bgImg{
      // filter: blur(1px);
      height: 100%;
      width: 100%;
      position: absolute;
      right: 0;
      z-index: 0;
      background-repeat: no-repeat;
      background-size: cover;
    }
		.el-date-editor {
			position: absolute;
			top: 12px;
			left: 20px;
			width: 125px;
			z-index: 1;
			.el-input__inner {
				height: 30px;
				padding-right: 15px;
				cursor: pointer;
			}
			.el-input__icon {
				line-height: 30px;
			}
		}
		.el-calendar {
      position: absolute;
      top:0;
      left: 0;
      background-color: transparent;
			.el-calendar__title {
				opacity: 0;
			}
      .el-calendar__body{
        padding: 0 20px 20px;
        thead{
          th{
            color: #000;
            font-weight: bold;
          }
        }
        .cell {
        	text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          padding: 8px 0;
          box-sizing: border-box;
        	.solar {
        		font-weight: bold;
        	}
          *{
            transition: all 0.2s;
          }
        }
        .current {
          background-color: rgba(255,255,255,0.7);
          background-color: rgba(0,0,0,0.6);
          *{
            color: #fff;
            color: rgba(255,255,255,0.90);
          }
        	.lunar {
        		&.festival {
        			color: var(--color-danger);
        		}
        	}
        }
        .prev,.next{
          background-color: rgba(0,0,0,0.2);
          *{
            color: rgba(255,255,255,0.5);
          }
        }
        //悬浮色
        .el-calendar-day:hover{
          background-color: rgba(0,0,0,0.6);
        }
        //选中色
        .el-calendar-table td.is-selected {
          background-color: rgba(0,0,0,0.9);
          *{
            color: rgba(255,255,255,1);
            font-size: 16px;
          }
        }
      }
		}
	}
</style>
