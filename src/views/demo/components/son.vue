<template>
  <div class="personBox">
      <div class="sendBox">
        <el-input placeholder="请输入孙子的话" maxlength="100" v-model="sonWord" size="medium" clearable>
          <el-button slot="append" size="small" @click="send">发送</el-button>
        </el-input>
      </div>
      <div class="receiveBox">收到来自爷爷的话:{{grandWord}}</div>
      <div class="receiveBox">收到来自爸爸的话:{{fatherWord}}</div>
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
      send(){
        this.$emit('getSonWord',this.sonWord)
      }
    }
  }
</script>
