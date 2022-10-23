<template>
	<div class="playerContainer pageMain">
		<div class="pageTitle">视频播放器</div>
		<video-player 
			ref="videoPlayer" 
			:playsinline="true" 
			:options="options" 
			class="videoBox" 
			@play="play" 
			@pause="pause"
			@ended="ended"
			@waiting="waiting"
			@playing="playing"
			@loadeddata="loadeddata"
			@timeupdate="timeupdate"
			@canplay="canplay"
			@canplaythrough="canplaythrough"
			@statechanged="statechanged"
			@ready="ready"
		/>
		<el-input placeholder="请输入mp4或m3u8链接" v-model="url" class="inputLine">
			<el-select v-model="url" slot="prepend" placeholder="请选择">
				<el-option :label="item.name" :value="item.url" v-for="(item,index) in list" :key="index"/>
			</el-select>
			<el-button slot="append" type='primary' @click="toPlay">播放</el-button>
		</el-input>
		<a href="https://www.yizhibo.com" target="_blank">一直播传送门</a>
	</div>
</template>
<script>
	import 'videojs-contrib-hls' // 直播推流
	import { videoPlayer } from 'vue-video-player'
	export default {
		components: {
			videoPlayer
		},
		data() {
			return {
				url: '',
				select:'mp4链接1',
				list:[{
					name:'mp4链接1',
					url:'https://vd4.bdstatic.com/mda-kcj61hgvep8m4i8j/sc/mda-kcj61hgvep8m4i8j.mp4'
				},{
					name:'m3u8链接1',
					url:'https://pl.xiaoka.tv/alicdn/4808888786093845.m3u8'
				},{
					name:'m3u8链接2',
					url:'https://pl.xiaoka.tv/alicdn/4808895501700108.m3u8'
				}],
				options: {},
				videoList:[]
			}
		},
		methods: {
			toPlay() {
				this.init(this.url,2)
			},
			init(url,type) {
				if(type==1){
					this.url=url?url:this.list[0].url
				}
				if(type==1||this.url!=this.options.sources[0].src){
					this.options = {
						playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
						autoplay: false, //如果true,浏览器准备好时开始回放。
						muted: false, // 默认情况下将会消除任何音频。
						loop: false, // 视频一结束就重新开始。
						preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
						language: 'zh-CN',
						aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
						fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
						sources: [{
							type: this.getType(),
							src: this.url
						}],
						poster: "", //你的封面地址
						width: document.documentElement.clientWidth,
						notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
						controlBar: {
							timeDivider: true, //当前时间和持续时间的分隔符
							durationDisplay: true, //显示持续时间
							remainingTimeDisplay: true, //是否显示剩余时间功能
							fullscreenToggle: true //全屏按钮
						}
					}
					if(type==2){
						setTimeout(()=>{
							this.$refs.videoPlayer.player.play()
						},200)
					}
				}
				if(this.url==this.options.sources[0].src&&type==2){
					this.$refs.videoPlayer.player.play()
				}
			},
			getType(){
				if(this.url.indexOf('m3u8')>-1){
					return 'application/x-mpegURL'
				}else{
					return ''
				}
			},
			getVideoList(){
				
			},
			// 播放回调
			play(e) {
				// console.log('play', e)
			},
			// 暂停回调
			pause(e) {
				// console.log('pause!', e)
			},
			// 视频播完回调
			ended(e) {
				// console.log('ended',e)
			},
			// DOM元素上的readyState更改导致播放停止
			waiting(e) {
				// console.log('waiting',e)
			},
			// 已开始播放回调
			playing(e) {
				// console.log('waiting',e)
			},
			// 当播放器在当前播放位置下载数据时触发
			loadeddata(e) {
				// console.log('loadeddata',e)
			},
			// 当前播放位置发生变化时触发。
			timeupdate(e) {
				// console.log('timeupdate',e)
			},
			//媒体的readyState为HAVE_FUTURE_DATA或更高
			canplay(e) {
				// console.log('canplay',e)
			},
			//媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
			canplaythrough(e) {
				// console.log('canplaythrough',e)
			},
			//播放状态改变回调
			statechanged(e) {
				// console.log('statechanged', e)
			},
			//将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数
			ready(e) {
				// console.log('ready', e)
			}
		},
		created() {
			this.init(this.$route.query.url,1)
			this.getVideoList()
		}
	}
</script>
<style lang="scss">
	@import 'video.js/dist/video-js.css';
	.playerContainer {
		.videoBox {
			width: 100%;
			min-width: 800px;
			.vjs-big-play-button {
				background-color: rgba(0, 0, 0, 0.45);
				height: 50px;
				width: 50px;
				border-radius: 50%;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.inputLine {
			margin: 20px 0;
			.el-select .el-input {
				width: 120px;
			}
			.el-input-group__append {
				border-color: #5275FB;
				background-color: #5275FB;

				.el-button {
					background-color: #5275FB;
					color: #fff;
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;

					&:hover {
						background-color: #4080ff;
					}
				}
			}
		}
		a{
			font-size: 18px;
			color: #1a7b80;
			font-weight: bold;
			text-decoration: none;
			&:hover{
				color: #4080ff;
			}
		}
	}
</style>
