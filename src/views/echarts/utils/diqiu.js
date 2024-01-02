export const diqiu = {
	id: 'diqiu',
	title: {
		text: '地球',
		left: 'center',
		top: '5%',
		show: false,
		textStyle: {
			color: '#ffffff',
			fontSize: 20,
			fontFamily: '微软雅黑'
		}
	},
	backgroundColor: '#000',
	globe: {
		baseTexture: require('@/assets/echarts/earth.jpg'),
		heightTexture: require('@/assets/echarts/bathymetry.jpg'),
		displacementScale: 0.1,
		shading: 'lambert',
		environment: require('@/assets/echarts/starfield.jpg'),
		light: {
			ambient: {
				intensity: 0.1
			},
			main: {
				intensity: 1.5
			}
		},
		layers: [{
			type: 'blend',
			blendTo: 'emission',
			texture: require('@/assets/echarts/night.jpg')
		}, {
			type: 'overlay',
			texture: require('@/assets/echarts/clouds.png'),
			shading: 'lambert',
			distance: 5
		}]
	},
	series: []
}