<template>
  <div id="app">
    <!-- <button @click="visiable = !visiable">1111</button> -->
    <!-- <backgroundVideo :resource="require('./assets/start-background-video.mp4')"></backgroundVideo> -->
    <!-- <windowUtils title="你好" :isShowWindow.sync="visiable"></windowUtils> -->
    <drawer :isShow.sync="testDrawer" des="你好">
      <tree :tree="tree" :isExpandAll="true" :isModal="true"></tree>
    </drawer>
    <button @click="testDrawer = true">开启</button>
    
  </div >
</template>

<script>
const tree = {
  title: '你好你好你好',
  children: [
    {
      label: '前端',
      href: '',
      children: [
        {
          label: 'javaScript',
          href: 'https://www.baidu.com'
        },
        {
          label: 'css',
          href: 'https://www.jianshu.com/p/1614ef2b8bcb'
        }
      ]
    },
    {
      label: '娱乐',
      children: [
        {
          label: 'B站',
          href: 'https://www.bilibili.com'
        }
      ]
    }
  ]
}
// import backgroundVideo from 'backgroundVideo'
export default {
  name: 'app',
  data () {
    return {
      tree: tree,
      visiable: false,
      testDrawer: true
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
