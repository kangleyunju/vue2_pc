<template>
  <div class="grandContainer pageMain">
    <div class="personBox">
      <div class="sendBox">
        <el-input placeholder="请输入爷爷的话" maxlength="100" v-model="grandWord" size="medium" clearable/>
        <el-button type="primary" @click="send" size="medium">发送</el-button>
      </div>
      <div class="receiveBox">收到来自孙子的话：{{sonWord}}</div>
    </div>
    <father :grandWord="grandWord" @getWord="getWord"></father>
  </div>
</template>
<script>
  import father from "../components/father.vue"
  export default {
    data() {
      return {
        grandWord:'',
        sonWord:''
      }
    },
    components:{
      father
    },
    methods: {
      send(){
        // this.$listeners.open(this.grandWord)
      },
      getWord(e){
        console.log('爷爷收到来自孙子的话：'+e)
        this.sonWord=e
      }
    },
    mounted() {
      
    }
  }
</script>
<style lang="scss">
  .grandContainer {
    padding: 16px;
    .personBox{
      box-shadow: 0 2px 10px 0 rgb(0 0 0 / 30%);
      margin-bottom: 16px;
      padding: 0 16px;
      border-radius: 4px;
      .sendBox{
        display: flex;
        align-items: center;
        padding: 16px 0;
        .el-input{
          width: 300px;
          margin-right: 12px;
        }
      }
      .receiveBox{
        padding: 16px 0;
      }
    }
  }
</style>
