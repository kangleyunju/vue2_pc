<template>
  <div class="grandContainer pageMain">
    <div class="personBox">
      <div class="sendBox">
        <el-input placeholder="请输入爷爷的话" maxlength="100" v-model="grandWord" size="medium" clearable>
          <el-button slot="append" size="small" @click="send">发送</el-button>
        </el-input>
      </div>
      <div class="receiveBox">收到来自爸爸的话：{{fatherWord}}</div>
      <div class="receiveBox">收到来自孙子的话：{{sonWord}}</div>
    </div>
    <father :grandWord="grandWord" @getWord="getSonWord" @getFatherWord="getFatherWord"/>
  </div>
</template>
<script>
  import father from "../components/father.vue"
  export default {
    data() {
      return {
        grandWord:'',//爷爷的话
        fatherWord:'',//爸爸的话
        sonWord:''//孙子的话
      }
    },
    components:{
      father
    },
    methods: {
      send(){
        // this.$listeners.open(this.grandWord)
      },
      getFatherWord(e){
        console.log('爷爷收到来自爸爸的话：'+e)
        this.fatherWord=e
      },
      getSonWord(e){
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
        .el-button{
          color:#fff;
        }
      }
      .receiveBox{
        padding: 16px 0;
      }
    }
  }
</style>
