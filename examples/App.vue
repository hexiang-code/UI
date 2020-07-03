<template>
  <div id="app">
    <!-- <button @click="visiable = !visiable">1111</button> -->
    <!-- <backgroundVideo resource="https://api.hexiangzone.cn/assets/kafeidou/start-background-video.mp4" poster="https://api.hexiangzone.cn/assets/kafeidou/startBg.png" @videoLoaded="isShowLoadAnimation = false" @posterLoaded="isShowLoadAnimation = false"></backgroundVideo> -->
    <!-- <load-animation :isShow.sync="isShowLoadAnimation"></load-animation> -->
    <windowUtils title="你好" :isShowWindow.sync="visiable">
      <template>
        <window-utils-item label="书签名">
          <input v-model="filterValue" type="text">
        </window-utils-item>
        <window-utils-item label="书签名">
          <input v-model="filterValue" type="text">
        </window-utils-item>
        <input />
      </template>
    </windowUtils>
    <drawer :isShow.sync="testDrawer" des="" title='' :isModal="false">
      <input v-model="filterValue" @blur="blur"/>
      <div class="bookmarks-header__search" @dblclick ="deleteBtn">
        search
      </div>
      <tree :tree="tree" :isExpandAll="true" ref="tree" :isShowCheckBox="isShowCheckBox" @nodeChange="nodeChange">
        <template #operation="treeItem">
          <div class="operation-btn">
            <span>修改</span>
            <span @click.stop="deleteBtn(treeItem)">删除</span>
          </div>
        </template>
      </tree>
    </drawer>
    <button @dblclick="visiable = !visiable" v-drag>开启</button>
    <input />
    <button @click="checkbox">checkBox</button>
    <!-- <live-rem ref="rem" @liveRemTalk="liveRemTalk" :welcomeBack="{audioSrc: '/live-model/rem/sound/lemm_welcome-back.mp3', text: '你回来啦'}"></live-rem> -->
    <!-- <canvas-bg></canvas-bg> -->
    <div>
      <hx-switch v-model="switchVal" active-color="blue" inactive-color="red">
        <span slot="switchRight">11</span>
        <span slot="switchLeft">你好</span>
      </hx-switch>
      <hx-slider v-model="sliderVal" :toFixed="1" :max="10" :min="8"></hx-slider>
      {{sliderVal}}
    </div>
  </div >
  
</template>

<script>
const tree = {
  title: '你好你好你好',
  children: [
    {
      label: '前端',
      href: '',
      id: 1,
      children: [
        {
          id: 2,
          label: 'javaScript',
          href: 'https://www.baidu.com'
        },
        {
          id: 3,
          label: 'css',
          href: 'https://www.jianshu.com/p/1614ef2b8bcb'
        },
        {
          id: 4,
          label: 'nodejs',
          children: [
            {
              id: 5,
              label: '你好,nodejs',
              href: 'https://www.jianshu.com/p/1614ef2b8bcb'
            }
          ]
        }
      ]
    },
    {
      id: 6,
      label: '娱乐娱乐娱乐',
      children: [
        {
          id: 7,
          label: 'B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站',
          href: 'https://www.bilibili.com'
        },
        {
          id: 8,
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
      testDrawer: false,
      filterValue: '',
      isShowCheckBox: false,
      isShowLoadAnimation: true,
      switchVal: false,
      sliderVal: 9
    }
  },

  // watch: {
  //   filterValue (value) {
  //     this.$refs.tree.filterNode(value)
  //   }
  // },
  mounted () {
    // this.$refs.rem.showToast({text: '你好'})
  },

  methods: {
    blur () {
      this.$refs.tree.filterNode(this.filterValue)
    },

    checkbox () {
      this.isShowCheckBox = !this.isShowCheckBox
      console.log(this.isShowCheckBox)
    },

    deleteBtn(item) {
      console.log('删除成功', item)
    },
    liveRemTalk(msg) {
      console.log(msg)
    },

    nodeChange (node) {
      // console.log(node)
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

.bookmarks-header__search {
  position: relative;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  /* border-radius: 15px; */
  /* background-color: #1296db; */
  color: #1296db;
}

.bookmarks-header__search:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid #1296db;
  animation: search-animation 1.5s infinite linear;
}

.bookmarks-header__search:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid #1296db;
  animation: search-animation 1s .5s linear infinite reverse;
}

@keyframes search-animation {
  0%, 100% {
    clip: rect(0, 60px, 22px, 0)
  }
  25% {
    clip: rect(0, 102px, 22px, 60px)
  }
  50% {
    clip: rect(20px, 102px, 40px, 60px)
  }
  75% {
    clip: rect(22px, 40px, 40px, 0)
  }
}
</style>
