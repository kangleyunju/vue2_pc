<template>
  <div class="fatherContainer">
    <div class="personBox">
      <div class="sendBox">
        <el-input placeholder="请输入爸爸的话" maxlength="100" v-model="fatherWord" size="medium" clearable/>
        <el-button type="primary" @click="send" size="medium">发送</el-button>
      </div>
       <div class="receiveBox">收到来自爷爷的话：{{$attrs.grandWord}}</div>
       <div class="receiveBox">收到来自孙子的话：{{sonWord}}</div>
    </div>
    <son v-bind="$attrs" v-on="$listeners" @getWord="getWord" :fatherWord="fatherWord"/>
  </div>
</template>
<script>
  import son from "@/views/demo/components/son.vue"
  export default {
    data() {
      return {
        sonWord:'',
        fatherWord:''
      }
    },
    components:{
      son
    },
    methods: {
      getWord(e){
        console.log('爸爸收到来自孙子的话：'+e)
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
