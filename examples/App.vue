<template>
  <div id="app">
    <!-- <button @click="visiable = !visiable">1111</button> -->
    <!-- <backgroundVideo :resource="require('./assets/start-background-video.mp4')"></backgroundVideo> -->
    <!-- <windowUtils title="你好" :isShowWindow.sync="visiable"></windowUtils> -->
    <drawer :isShow.sync="testDrawer" des="你好" :isModal="false">
      <input v-model="filterValue" @blur="blur"/>
      <tree :tree="tree" :isExpandAll="true" ref="tree" :isShowCheckBox="isShowCheckBox">
        <template #operation="treeItem">
          <div class="operation-btn">
            <span>修改</span>
            <span @click.stop="deleteBtn(treeItem)">删除</span>
          </div>
        </template>
      </tree>
    </drawer>
    <button @click="testDrawer = true">开启</button>
    <button @click="checkbox">checkBox</button>
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
        },
        {
          label: 'nodejs',
          children: [
            {
              label: '你好,nodejs',
              href: 'https://www.jianshu.com/p/1614ef2b8bcb'
            }
          ]
        }
      ]
    },
    {
      label: '娱乐娱乐娱乐',
      children: [
        {
          label: 'B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站',
          href: 'https://www.bilibili.com'
        },
        {
          label: '来啊nodejs'
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
      testDrawer: true,
      filterValue: '',
      isShowCheckBox: false
    }
  },

  // watch: {
  //   filterValue (value) {
  //     this.$refs.tree.filterNode(value)
  //   }
  // },

  methods: {
    blur () {
      this.$refs.tree.filterNode(this.filterValue)
    },

    checkbox () {
      this.isShowCheckBox = !this.isShowCheckBox
      console.log(this.isShowCheckBox)
    },

    deleteBtn(item) {
      console.log(item)
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
