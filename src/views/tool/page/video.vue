<template>
	<div class="videoContainer pageMain" v-loading="loading">
		<div class="pageTitle">短视频</div>
		<div class="pageContent">
			<div class="item" v-for="(item,index) in list" :key="index" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">
				<video :src="item.url" :id="'video'+index" muted @click="jump(item.url)" />
				<div class="time">
					<i class="el-icon-caret-right" />{{item.time}}
				</div>
				<el-slider v-model="item.now" :show-tooltip="false" @change="changeTime($event,index)" :max="item.duration" />
				<div class="info">
					<div class="name xzw_word1">{{item.name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				list: [],
				loading: false
			}
		},
		methods: {
			jump(url) {
				this.$router.push('/tool/player?url=' + url)
			},
			async getList() {
				this.loading = true
				this.list = [{
					name: '第一个视频的名称',
					url: 'https://vd4.bdstatic.com/mda-kcj61hgvep8m4i8j/sc/mda-kcj61hgvep8m4i8j.mp4'
				}, {
					name: '第二个视频的名称',
					url: 'http://vd3.bdstatic.com/mda-mmwfyjruzeuwe38n/360p/h264/1640949405327486895/mda-mmwfyjruzeuwe38n.mp4'
				}, {
					name: '长津湖战役，志愿军九兵团的伤亡巨大，这个视频一起来看看吧',
					url: 'https://vd2.bdstatic.com/mda-nhshuxuai9m276n4/sc/cae_h264/1661604142056760592/mda-nhshuxuai9m276n4.mp4'
				}]
				for (let i in this.list) {
					const duration = await this.getDuring(i, this.list[i].url)
					this.list[i].percent = 0
					this.$set(this.list[i], 'duration', duration)
					this.$set(this.list[i], 'time', this.parseTime(duration))
				}
				this.loading = false
			},
			getDuring(i, url) {
				var audioElement = new Audio(url)
				return new Promise((resolve, reject) => {
					audioElement.addEventListener("loadedmetadata", function() {
						resolve(parseInt(document.getElementById('video' + i).duration))
					})
				})
			},
			changeTime(e, index) {
				let video = document.getElementById('video' + index)
				video.currentTime = e
				this.play(index, video)
			},
			mouseenter(index) {
				let video = document.getElementById('video' + index)
				this.play(index, video)
			},
			mouseleave(index) {
				let video = document.getElementById('video' + index)
				video.pause()
				clearInterval(this.timer)
			},
			play(index, video) {
				video.play()
				this.timer = setInterval(() => {
					let total = video.duration
					let current = video.currentTime
					this.list[index].percent = current / total;
					this.list[index].now = this.list[index].percent * total;
					if (this.list[index].percent == 1) {
						video.pause()
						clearInterval(this.timer)
					}
					this.list = this.list.splice(0)
				}, 100)
			},
			parseTime(time) {
				var day = Math.floor(time / (24 * 3600))
				var hour = Math.floor((time - day * 24 * 3600) / 3600)
				var minute = Math.floor((time - day * 24 * 3600 - hour * 3600) / 60)
				var second = time - day * 24 * 3600 - hour * 3600 - minute * 60
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				if (day > 0) {
					return day + ":" + hour + ":" + minute + ":" + second
				} else if (hour > 0) {
					return hour + ":" + minute + ":" + second
				} else {
					return minute + ":" + second
				}
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>
<style lang="scss">
	.videoContainer {
		.pageContent {
			display: flex;
			flex-wrap: wrap;
			.item {
				width: 280px;
				margin-right: 24px;
				height: 160px;
				border-radius: 10px;
				overflow: hidden;
				transition: all 0.3s;
				position: relative;
				&:hover {
					height: 200px;
					transform: translateY(-10px);
					box-shadow: 0px 1px 10px 4px rgba(0, 0, 0, 0.1);
					.info {
						display: flex;
					}
					.el-slider {
						display: block;
					}
					.time {
						display: none;
					}
				}
				video {
					height: 160px;
					width: 100%;
					margin: 0;
				}
				.time {
					position: absolute;
					top: 130px;
					left: 10px;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.6);
					padding: 2px 4px 2px 2px;
					border-radius: 4px;
					font-size: 12px;
				}
				.info {
					height: 50px;
					display: flex;
					align-items: center;
					display: none;
					padding: 0 10px;
					margin-top: -6px;
				}
				.el-slider {
					display: none;
					margin-top: -10px;
					.el-slider__runway {
						border-radius: 0;
						margin: 0;
						.el-slider__button {
							display: none;
						}
						.el-slider__bar {
							border-radius: 0;
						}
					}
				}
			}
		}
	}
</style>
