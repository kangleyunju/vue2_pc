<template>
  <div class="pageMain">
    <div class="searchBox">
      <el-button @click="init" type="primary" size="small">生成</el-button>
      <el-button @click="save" type="success" size="small" v-if="img">保存</el-button>
    </div>
    <div class="main">
      <div class="box" ref="poster">
        <img :src="require('@/assets/home/face.png')" />
        <div>姓名:尤雨溪</div>
      </div>
      <div class="canvas">
        <img :src="img" v-if="img" />
      </div>
    </div>
  </div>
</template>
<script>
  import html2canvas from "html2canvas"
  export default {
    data() {
      return {
        img: ''
      }
    },
    methods: {
      init() {
        let that = this
        html2canvas(this.$refs.poster, {
          dpi: 300,
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false
        }).then(function(canvas) {
          that.img = canvas.toDataURL('image/jpg')
          console.log(that.img)
        }).catch((err) => {
          console.log('错误', err)
        })
      },
      save() {
        const x = new XMLHttpRequest()
        x.open('GET', this.img, true)
        x.responseType = 'blob'
        x.onload = function() {
          const url = window.URL.createObjectURL(x.response)
          const a = document.createElement('a')
          a.href = url
          a.download = '海报'
          a.click()
        }
        x.send()
      }
    }
  }
</script>
<style lang="scss">
  .main {
    display: flex;
    padding-top: 16px;
    .box {
      height: 300px;
      width: 300px;
      background-image: url('@/assets/home/404.png');
      background-size: cover;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid red;
      img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin-bottom: 16px;
      }
    }
    .canvas {
      height: 300px;
      width: 300px;
      box-sizing: border-box;
      margin-left: 20px;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>