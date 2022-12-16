<template>
	<div class="mapContainer" v-loading="loading" element-loading-text="拼命加载中">
		<div class="infoBox">
			<el-select v-model="locationId" placeholder="请输入地点" :remote-method="inputWord" clearable filterable remote size="medium" @clear="clear" @change="chooseLocation" v-loadmore="loadmore" :loading="searchLoading" >
				<el-option v-for="(item,index) in options" :key="index" :label="item.title" :value="item.id"></el-option>
			</el-select>
			<div class="label" v-if="ad_info.province"><span>IP归属地：</span>{{ad_info.province+ad_info.city+ad_info.district}}</div>
			<div class="label" v-if="ip"><span>IP：</span>{{ip}}</div>
		</div>
		<div id="mapBox"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				keyword: '',
				key: 'WLABZ-45G3F-Q3CJO-NWTGZ-O6DLE-QQBGN',
				lat: '',
				lng: '',
				ip: '',
				ad_info: {},
				map: null,
				marker: [], //标记点
				loading: false,
				options: [],
				locationId: '',
				page: 1,//页码
				pages:1,//总页码
				searchLoading:false
			}
		},
		methods: {
			// ip定位
			getIp() {
				this.loading = true
				this.request({
					baseURL: 'https://api.uomg.com',
					url: 'api/visitor.info?skey=1',
				}).then(res => {
					this.ip = res.ip
					this.$jsonp(`https://apis.map.qq.com/ws/location/v1/ip?ip=${res.ip}&key=${this.key}&output=jsonp`).then(data => {
						this.ad_info = data.result.ad_info
						this.lat = data.result.location.lat
						this.lng = data.result.location.lng
						this.initMap()
						this.loading = false
					}).catch((err) => {
						this.loading = false
					})
				})
			},
			//初始化地图
			initMap() {
				// 定义地图中心点坐标
				let center = new TMap.LatLng(this.lat, this.lng)
				// 定义map变量
				this.map = new TMap.Map(document.getElementById("mapBox"), {
					rotation: 0, //设置地图旋转角度
					pitch: 10, //设置俯仰角度（0~45）
					zoom: 14, //设置地图缩放级别
					center: center, //设置地图中心点坐标
					viewMode: '2D'
				})
				// 地图打点
				this.marker = new TMap.MultiMarker({
					map: this.map,
					styles: {
						"marker": new TMap.MarkerStyle({
							"width": 25,
							"height": 38,
							"anchor": { x: 12, y: 32 },
						})
					},
					geometries: [{
						"id": 'marker',
						"styleId": 'marker',
						"position": new TMap.LatLng(this.lat, this.lng),
						"properties": {
							"title": this.ad_info.city
						}
					}]
				})
			},
			//精确定位,受浏览器限制
			getLocation() {
				var geolocation = new window.qq.maps.Geolocation(this.key, "myapp")
				geolocation.getLocation(postion => {
					console.log("成功", postion)
				}, err => {
					console.log("定位失败")
				})
			},
			//清空关键词
			clear() {
				this.keyword = ''
				this.options = []
			},
			loadmore() {
				if(this.page<this.pages){
					this.page++
					this.inputWord(this.keyword, 2)
				}
			},
			// 搜索提示
			inputWord(keyword, type = 1) {
				this.keyword = keyword.replace(/\s*/g, '')
				if (keyword != '') {
					if (type == 1) {
						this.page = 1
						this.options=[]
						this.searchLoading=true
					}
					this.$jsonp(`https://apis.map.qq.com/ws/place/v1/suggestion?keyword=${this.keyword}&key=${this.key}&output=jsonp&region=${this.ad_info.city}&page_index=${this.page}`).then(res => {
						this.options = this.options.concat(res.data)
						this.pages = Math.ceil(res.count/10)
						this.searchLoading=false
					})
				}
			},
			//选择地点
			chooseLocation(val) {
				if (val != '') {
					this.locationId = val
					let position = this.options.filter((item) => { return item.id == val })[0]
					//设置地图中心点
					this.map.setCenter(new TMap.LatLng(position.location.lat, position.location.lng))
					//改变地图缩放
					this.map.setZoom(20)
					//更新标记点
					this.marker.updateGeometries([{
						"id": 'marker',
						"styleId": 'marker',
						"position": new TMap.LatLng(position.location.lat, position.location.lng),
						"properties": {
							"title": position.title
						}
					}])
				}
			}
		},
		mounted() {
			this.getIp()
		}
	}
</script>
<style lang="scss">
	.mapContainer {
		height: calc(100vh - 48px);
		overflow: hidden;
		.infoBox {
			background-color: #fff;
			display: flex;
			align-items: center;
			padding: 16px;
			.el-input {
				width: 300px;
			}
			.label {
				margin-left: 16px;
				color: #999;
				span {
					color: #333
				}
			}
		}
		#mapBox {
			height: 100%;
		}
	}
</style>
