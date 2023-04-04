<template>
	<div class="menuContainer noCopy" :class="{'collapse':isCollapse}">
		<div class="logoBox" @click="$router.push('/')">
			<img src="@/assets/home/logo.png" />
			<div>vue2后台</div>
		</div>
		<el-menu :collapse="isCollapse" :default-active="activePath" unique-opened router>
			<template v-for="item in menuList">
				<el-submenu v-if="item.children" :index="item.path" :key="item.path">
					<template slot="title">
						<i :class="item.meta.icon" />
						<span slot="title">{{item.meta.title}}</span>
					</template>
					<template v-for="item2 in item.children">
						<el-menu-item :index="item2.path" :key="item2.path">
							<span slot="title">{{item2.meta.title}}</span>
						</el-menu-item>
					</template>
				</el-submenu>
				<el-menu-item v-else :index="item.path" :key="item.path">
					<i :class="item.meta.icon" />
					<span slot="title">{{item.meta.title}}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				menuList: [],
				activePath: ''
			}
		},
		watch: {
			$route() {
				this.setPath()
			}
		},
		methods: {
			setPath() {
				this.activePath = this.$route.path
			},
			solveMenu() {
				let arr = JSON.parse(JSON.stringify(this.$router.options.routes))
				for (let i = arr.length - 1; i >= 0; i--) {
					if (arr[i].children) {
						for (let j in arr[i].children) {
							arr[i].children[j].path = arr[i].path + '/' + arr[i].children[j].path
						}
						if (arr[i].children.length == 1) {
							arr[i].component = arr[i].children[0].component
							arr[i].path = arr[i].children[0].path
							arr[i].name = arr[i].children[0].name
							delete arr[i].children
						}
					} else {
						arr.splice(i, 1)
					}
				}
				this.menuList = arr
				this.setPath()
			}
		},
		mounted() {
			this.solveMenu()
		}
	}
</script>
<style lang="scss">
	.menuContainer {
		width: 200px;
		border-right: solid 2px var(--borderColor);
    border-right: 1px solid var(--borderColor);
		box-shadow: 4px 0px 15px rgb(0 0 0 / 8%);
    box-sizing: border-box;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		z-index: 10;
		transition: all 0.3s;
		overflow: hidden;
		color: var(--textColor);
		background-color: var(--bgColor);
		&.collapse {
			width: 64px;
		}
		.logoBox {
			padding: 0 18px;
			display: flex;
			align-items: center;
			height: 50px;
			cursor: pointer;
			img {
				height: 29px;
			}
			div {
				font-size: 16px;
				font-weight: 600;
				margin-left: 18px;
				white-space: nowrap;
			}
		}
		.el-menu {
			border: none;
			overflow: hidden;
			width: 100% !important;
			transition: all 0.1s;
			background-color: transparent;
      .el-menu-item {
        &:hover {
        	background-color: var(--hoverBg);
        }
      }
			.el-submenu {
				&.is-active{
					.el-submenu__title{
						color: var(--color-primary);
						i{
							color: var(--color-primary);
						}
					}
				}
				.el-submenu__title {
					display: flex;
					align-items: center;
          &:hover {
          	background-color: var(--hoverBg);
          }
				}
				.el-submenu__icon-arrow {
					margin-top: -5px;
				}
				.el-menu-item {
					padding-left: 50px !important;
          &:hover {
          	background-color: var(--hoverBg);
          }
				}
			}
		}
	}
	.dark {
		.el-submenu__title, .el-menu-item {
			color: var(--textColor);
			&.is-active {
				background-color: #000;
				color: var(--textColor);
			}
		}
	}
</style>
