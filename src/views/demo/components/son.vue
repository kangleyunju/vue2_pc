<template>
  <div class="sonContainer personBox">
      <div class="sendBox">
        <el-input placeholder="请输入发送给爷爷的话" maxlength="100" v-model="sonWord" size="medium" clearable/>
        <el-button type="primary" @click="send" size="medium">发送</el-button>
      </div>
      <div class="receiveBox">收到来自爸爸的话:{{fatherWord}}</div>
      <div class="receiveBox">收到来自爷爷的话:{{grandWord}}</div>
  </div>
</template>
<script>
  export default {
    props: {
      grandWord:{
        type:String,
        default:''
      },
      fatherWord:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        sonWord:''
      }
    },
    methods: {
      open(e){
        console.log('孙子收到的信息',e)
        // this.grandWord=e
      },
      send(){
        this.$emit('getWord',this.sonWord)
      }
    },
    mounted() {

    }
  }
</script>
<style lang="scss">
  .sonContainer {}
</style>
