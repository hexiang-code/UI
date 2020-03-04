<template>
  <div id="app">
    <button @click="visiable = !visiable">1111</button>
    <!-- <backgroundVideo :resource="require('./assets/start-background-video.mp4')"></backgroundVideo> -->
    <windowUtils title="你好" :isShowWindow.sync="visiable"></windowUtils>
  </div >
</template>

<script>
// import backgroundVideo from 'backgroundVideo'
export default {
  name: 'app',
  components: {
    // backgroundVideo
  },
  data () {
    return {
      visiable: false
    }
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
