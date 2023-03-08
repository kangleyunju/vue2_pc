<template>
  <div class="fatherContainer">
    <div class="personBox">
      <div class="sendBox">
        <el-input placeholder="请输入爸爸的话" maxlength="100" v-model="fatherWord" size="medium" clearable>
          <el-button slot="append" type="primary" size="small" @click="send">发送</el-button>
        </el-input>
      </div>
       <div class="receiveBox">收到来自爷爷的话：{{$attrs.grandWord}}</div>
       <div class="receiveBox">收到来自孙子的话：{{sonWord}}</div>
    </div>
    <!-- 使用$attrs向子组件发送事件,使用$listeners向父级发送事件 -->
    <son v-bind="$attrs" v-on="$listeners" @getSonWord="getSonWord" :fatherWord="fatherWord"/>
  </div>
</template>
<script>
  import son from "@/views/demo/components/son.vue"
  export default {
    data() {
      return {
        grandWord:'',//爷爷的话
        fatherWord:'',//爸爸的话
        sonWord:''//孙子的话
      }
    },
    components:{
      son
    },
    methods: {
      getSonWord(e){
        console.log('爸爸收到来自孙子的话：'+e)
        this.sonWord=e
      },
      getGrandWord(e){
        console.log('爸爸收到来自爷爷的话：'+e)
        this.sonWord=e
      },
      send(){
        this.$emit('getFatherWord',this.fatherWord)
      }
    },
    mounted() {

    }
  }
</script>
<style lang="scss">
  .fatherContainer {}
</style>
