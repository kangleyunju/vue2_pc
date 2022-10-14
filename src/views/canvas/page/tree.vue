<template>
	<div class="treeContainer noCopy" @click="reset">
		<div>点击屏幕重新生成树</div>
		<canvas id="tree" width="840" height="600"/>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				ctx: null,
				leafArr: [],//叶子的数组
				canvas:null
			}
		},
		mounted() {
			this.canvas=document.getElementById("tree")
			this.ctx = this.canvas.getContext("2d")
			this.reset()
		},
		methods: {
			reset(){
				this.leafArr=[]
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
				this.drawTree(400, 600, 80, -Math.PI / 2, 8, 12);
				this.drawAllLeaves();
			},
			getRandomInt(n, m) {
				return Math.floor(Math.random() * (m - n + 1)) + n;
			},
			drawAllLeaves() {
				this.leafArr.forEach(item => {
					this.drawLeaf(item[0], item[1], this.getRandomInt(15, 25));
				})
			},
			drawLeaf(x, y, num) {
				let _this = this;
				for (let i = 0; i < num; i++) {
					x += (Math.random() - 0.5) * _this.getRandomInt(0, 25);
					y += (Math.random() - 0.5) * _this.getRandomInt(0, 25);
					_this.ctx.beginPath();
					let num1 = Math.random();
					_this.ctx.fillStyle =
						"rgba(247," +
						(Math.random() * 190) +
						",190," +
						(num1 >= 0.5 ? num1 - 0.2 : num1) +
						")";
					_this.ctx.arc(x, y, _this.getRandomInt(2, 5), 0, 2 * Math.PI);
					_this.ctx.fill();
				}
			},
			drawTree(startX, startY, length, angle, depth, branchWidth) {
				let _this = this;
				var newLength,
					newAngle,
					newDepth,
					endX,
					endY,
					maxAngle = (2 * Math.PI) / 5,
					subBranches;
				//开始绘制路径
				_this.ctx.beginPath();
				_this.ctx.moveTo(startX, startY);
				endX = startX + Math.cos(angle) * length;
				endY = startY + Math.sin(angle) * length;

				_this.ctx.lineCap = "round";
				_this.ctx.lineWidth = branchWidth;
				_this.ctx.lineTo(endX, endY);

				_this.ctx.strokeStyle = "#442525"; // 树干棕色

				_this.ctx.stroke();
				if (depth <= 4) {
					_this.leafArr.push([endX, endY]);
				}
				newDepth = depth - 1;
				if (newDepth <= 0) {
					return; // 如果绘制到叶子节点后就结束递归
				}
				subBranches = _this.getRandomInt(2, 3);
				branchWidth *= 0.75;
				for (var i = 0; i < subBranches; i++) {
					newLength = length * 0.75 + 0.25 * length * Math.random();
					newAngle = angle + Math.random() * maxAngle - maxAngle * 0.5;
					_this.drawTree(endX, endY, newLength, newAngle, newDepth, branchWidth);
				}
			}
		}
	};
</script>
<style lang="scss">
	.treeContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: #e0efe2;
		overflow: hidden;
		position: relative;
		div{
			position: absolute;
			top:30px;
			font-size: 20px;
			left: 50%;
			transform: translateX(-50%);
			cursor: default;
		}
	}
</style>
