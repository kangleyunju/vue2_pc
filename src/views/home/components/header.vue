<template>
  <div class="headerContainer noCopy" :class="{'collapse':isCollapse}">
    <div class="left">
      <div class="collapseBtn" @click="changeCollapse">
        <i :class="isCollapse?'el-icon-caret-right':'el-icon-caret-left'"></i>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <div class="theme" @click="changeNight">
        <svg-icon :iconClass="isNight?'moon':'sun'" />
      </div>
      <el-dropdown placement="bottom" @command="handleCommand">
        <div class="user">
          <el-image :src="userInfo.avatar||require('@/assets/home/face.png')" />
          <span class="xzw_word1">{{userInfo.name}}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">github源码</el-dropdown-item>
          <el-dropdown-item command="1">个人中心</el-dropdown-item>
          <el-dropdown-item command="2">系统设置</el-dropdown-item>
          <el-dropdown-item command="3">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        breadcrumbList: []
      }
    },
    watch: {
      $route: {
        handler(newVal) {
          this.getBreadcrumb(newVal)
        },
        immediate: true //立即监听
      }
    },
    methods: {
      //面包屑处理
      getBreadcrumb() {
        //这里需要深拷贝,否则会影响路由
        this.breadcrumbList = [...this.$route.matched]
        if (this.breadcrumbList[0].meta.title == this.breadcrumbList[1].meta.title) {
          this.breadcrumbList.splice(1, 1)
        }
      },
      changeCollapse() {
        this.$store.commit('edit', { name: 'isCollapse', val: this.isCollapse ? false : true })
        localStorage.setItem('isCollapse', this.isCollapse ? 1 : 0)
      },
      changeNight() {
        this.$store.commit('edit', { name: 'isNight', val: this.isNight ? false : true })
        localStorage.setItem('isNight', this.isNight ? 1 : 0)
      },
      handleCommand(e) {
        if(e==0){
          window.open('https://github.com/kangleyunju/vue2_pc')
        }else  if (e == 1) {
          this.$router.push('/user/info')
        } else if (e == 2) {
          this.$router.push('/system/set')
        } else {
          this.handleDelete('确定退出登录？').then(res => {
            this.$cookies.remove('token')
            this.$store.commit('edit', { name: 'userInfo', val: {} })
            this.removeStorage('userInfo')
            this.$router.push('/login')
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .headerContainer {
    height: 48px;
    color: var(--textColor);
    background-color: var(--bgColor);
    position: fixed;
    min-width:1000px;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 0;
    box-sizing: border-box;
    border-bottom: 1px solid var(--borderColor);
    box-shadow: 0 4px 15px rgb(0 0 0 / 8%);
    transition: all 0.3s;
    &.collapse {
      left: 64px;
    }
    .left {
      display: flex;
      align-items: center;
      height: 100%;
      .collapseBtn {
        width: 40px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        margin-right: 4px;
        cursor: pointer;
        margin-right: 12px;
        &:hover {
          background-color: var(--hoverBg);
        }
        .el-icon-caret-left, .el-icon-caret-right {
          color: var(--textColor);
          font-size: 18px;
        }
      }
      .el-breadcrumb{
        .el-breadcrumb__inner{
          color: var(--textColor) !important;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .theme {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        padding: 3px;
        margin-right: 10px;
        cursor: pointer;
        .svg-icon {
          width: 20px;
          height: 20px;
        }
      }
      .user {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 2px 6px;
        color: var(--textColor);
        span {
          margin: 0 6px;
          max-width: 100px;
        }
        .el-image {
          height: 26px;
          width: 26px;
          border-radius: 50%;
        }
        i {
          font-size: 12px;
        }
      }
    }
  }
</style>
