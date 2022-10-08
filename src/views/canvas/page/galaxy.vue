<template>
	<div class="galaxyContainer" ref="box">
		<canvas id="galaxy" />
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			this.draw()
		},
		methods: {
			draw() {
				var canvas = document.getElementById('galaxy'),
					ctx = canvas.getContext('2d'),
					w = canvas.width = this.$refs.box.clientWidth,
					h = canvas.height = this.$refs.box.clientHeight,
					hue = 2170,
					stars = [],
					count = 0,
					maxStars = 1400;
				var canvas2 = document.createElement('canvas'),
					ctx2 = canvas2.getContext('2d');
				canvas2.width = 100;
				canvas2.height = 100;
				var half = canvas2.width / 1.5,
					gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
				gradient2.addColorStop(0.025, '#fff');
				gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
				gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
				gradient2.addColorStop(1, 'transparent');
				ctx2.fillStyle = gradient2;
				ctx2.beginPath();
				ctx2.arc(half, half, half, 0, Math.PI * 3);
				ctx2.fill();

				function random(min, max) {
					if (arguments.length < 2) {
						max = min;
						min = 0;
					}
					if (min > max) {
						var hold = max;
						max = min;
						min = hold;
					}
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
				var Star = function() {
					this.orbitRadius = random(w / 2 - 50);
					this.radius = random(100, this.orbitRadius) / 10;
					this.orbitX = w / 2;
					this.orbitY = h / 2;
					this.timePassed = random(0, maxStars);
					this.speed = random(this.orbitRadius) / 900000;
					this.alpha = random(2, 10) / 10;
					count++;
					stars[count] = this;
				}
				Star.prototype.draw = function() {
					var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
						y = Math.cos(this.timePassed) * this.orbitRadius / 2 + this.orbitY,
						twinkle = random(100);
					if (twinkle === 1 && this.alpha > 0) {
						this.alpha -= 0.05;
					} else if (twinkle === 2 && this.alpha < 1) {
						this.alpha += 0.05;
					}
					ctx.globalAlpha = this.alpha;
					ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
					this.timePassed += this.speed;
				}
				for (var i = 0; i < maxStars; i++) {
					new Star()
				}

				function animation() {
					ctx.globalCompositeOperation = 'source-over';
					ctx.globalAlpha = 0.8;
					ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
					ctx.fillStyle = "#000"
					ctx.fillRect(0, 0, w, h)
					ctx.globalCompositeOperation = 'lighter';
					for (var i = 1, l = stars.length; i < l; i++) {
						stars[i].draw();
					}
					window.requestAnimationFrame(animation);
				}
				animation()
			}
		}
	};
</script>
<style lang="scss">
	.galaxyContainer {
		background: #000;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
