<template>
  <div id="app">
    <!-- <button @click="visiable = !visiable">1111</button> -->
    <!-- <backgroundVideo resource="https://api.hexiangzone.cn/assets/kafeidou/start-background-video.mp4" poster="https://api.hexiangzone.cn/assets/kafeidou/startBg.png" @videoLoaded="isShowLoadAnimation = false" @posterLoaded="isShowLoadAnimation = false"></backgroundVideo> -->
    <!-- <load-animation :isShow.sync="isShowLoadAnimation"></load-animation> -->
    <windowUtils title="你好" :isShowWindow.sync="visiable" :curtain="true">
      <template>
        <window-utils-item label="书签名">
          <input v-model="filterValue" type="text">
        </window-utils-item>
        <window-utils-item label="书签名">
          <input v-model="filterValue" type="text">
        </window-utils-item>
      </template>
    </windowUtils>
    <drawer :isShow.sync="testDrawer" :isModal="false">
      <input v-model="filterValue" @blur="blur"/>
      <div class="bookmarks-header__search" @dblclick ="deleteBtn">
        search
      </div>
      <tree :tree="tree" :isExpandAll="true" ref="tree" :isShowCheckBox="isShowCheckBox" @nodeChange="nodeChange">
        <template #header>
          <div>
            头部
          </div>
        </template>
        <template #bottom>
          <div>
            底部
          </div>
        </template>
        <template #operation="treeItem">
          <div class="operation-btn">
            <span>修改</span>
            <span @click.stop="deleteBtn(treeItem)">删除</span>
          </div>
        </template>
      </tree>
    </drawer>
    <button @click="visiable = !visiable" v-drag>弹框</button>
    <button @click="albumVisible = !albumVisible" v-drag>相册</button>
    <button @click="testDrawer = !testDrawer" v-drag>抽屉</button>
    <button @click="canvasVisiable = !canvasVisiable" v-drag>背景</button>
    <input />
    <button @click="checkbox">checkBox</button>
    <!-- <live-rem ref="rem" @liveRemTalk="liveRemTalk" :welcomeBack="{audioSrc: '/live-model/rem/sound/lemm_welcome-back.mp3', text: '你回来啦'}"></live-rem> -->
    <!-- <canvas-bg v-if="canvasVisiable"></canvas-bg> -->
    <div>
      <hx-switch v-model="switchVal" active-color="blue" inactive-color="red">
        <span slot="switchRight">11</span>
        <span slot="switchLeft">你好</span>
      </hx-switch>
      <hx-slider v-model="sliderVal" :toFixed="2" :max="1" :min="0.8"></hx-slider>
      {{sliderVal}}
    </div>

    <hx-album :visible.sync="albumVisible" :imageList="imageList" :classList="classList" @onReachBottom="albumReachBottom">
    </hx-album>

    <hx-pagination 
      :total="totalPage" :page-size="10" 
      :current-page.sync="currentPage" 
      @current-change="currentPageChange">
    </hx-pagination>
    <!-- <hx-message :visibel.sync="hxMessageVisibel">
      <template #title>
        <span>你好</span>
      </template>
    </hx-message> -->
    <!-- <div class="menu">
      <ul class="menu-list" >
        <li v-for="item in meauList" :key="item.name">{{item.name}}</li>
      </ul>
    </div> -->

    <!-- <hx-table :tableData="hardwareArray">
      <hx-table-column :prop="item.props" :label="item.label" v-for="item in hardwareTitle" :key="item.props">
        <template #columnContent="{cpuTemp}" v-if="item.props == 'cpuTemp'">
          <div>{{cpuTemp}}</div>
        </template>
        <template #header="{ header: {props} = {} }">{{props}}</template>
      </hx-table-column>
    </hx-table> -->
    <hx-date-picker @selectComplete="dateSelect"></hx-date-picker>
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

const imageList = [
          {
            id: 1,
            type: 'image',
            resourceName: '测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片',
            resourceUrl: 'http://localhost:3000/assets/kafeidou/englishenglishenglishenglishenglishenglishenglishenglish.png'
          },
          {
            id: 2,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'http://localhost:3000/assets/kafeidou/songshu.jpg'
          },
          {
            id: 3,
            type: 'video',
            resourceName: '测试图片',
            resourceUrl: 'http://localhost:3000/assets/kafeidou/start-background-video.mp4'
          },
          {
            id: 4,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'http://localhost:3000/assets/kafeidou/englishenglishenglishenglishenglishenglishenglishenglish.png'
          },
          {
            id: 5,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'http://localhost:3000/assets/kafeidou/englishenglishenglishenglishenglishenglishenglishenglish.png'
          },
          {
            id: 6,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'http://localhost:3000/assets/kafeidou/englishenglishenglishenglishenglishenglishenglishenglish.png'
          }
        ]

const classList = [
  {
    id: 1,
    className: '图片'
  },
  {
    id: 2,
    className: '视频'
  }
]
const meauList = [
  {
    name: '回到顶部'
  },
  {
    name: '你好'
  },
  {
    name: '测试'
  }
]
const hardwareTitle = [
  {
    props: 'cpuTemp',
    label: 'cpu温度'
  },
  {
    props: 'cpuUseage',
    label: 'cpu使用率'
  },
  {
    props: 'cpuMaxClocks',
    label: 'cpu最大频率'
  },
  {
    props: 'cpuPowers',
    label: 'cpu功耗'
  },
  {
    props: 'diskTemp',
    label: '硬盘温度'
  },
  {
    props: 'diskUseage',
    label: '硬盘使用率'
  },
  {
    props: 'ssdDiskTemp',
    label: '固态硬盘温度'
  },
  {
    props: 'ssdDiskUseage',
    label: '固态硬盘使用率'
  },
  {
    props: 'memUseage',
    label: '内存使用率'
  }
]
let hardwareArray = [
  {
    cpuTemp: '38 °C',
    cpuUseage: '40 %',
    cpuMaxClocks: '3850 MHz',
    cpuPowers: '40 W',
    diskTemp: '40 °C',
    diskUseage: '20 %',
    ssdDiskTemp: '20 °C',
    ssdDiskUseage: '50 %',
    memUseage: '30 %'
  }
]
hardwareArray = hardwareArray.concat(hardwareArray)
// import backgroundVideo from 'backgroundVideo'
export default {
  name: 'app',
  data () {
    return {
      tree: tree,
      visiable: false,
      testDrawer: true,
      filterValue: '',
      isShowCheckBox: false,
      isShowLoadAnimation: true,
      switchVal: false,
      sliderVal: 9,
      albumVisible: false,
      imageList: imageList.concat(imageList),
      classList,
      currentPage: 1,
      totalPage: 10,
      canvasVisiable: true,
      meauList,
      hxMessageVisibel: true,
      hardwareArray,
      hardwareTitle
    }
  },

  // watch: {
  //   filterValue (value) {
  //     this.$refs.tree.filterNode(value)
  //   }
  // },
  mounted () {
    // this.$refs.rem.showConfirm({message: '你好'}).then(() => {
    //   console.log('用户点击同意')
    // }).catch(err => {
    //   console.log(err)
    // })
  },

  methods: {
    blur () {
      this.$refs.tree.filterNode(this.filterValue)
    },

    checkbox () {
      this.isShowCheckBox = !this.isShowCheckBox
      this.browerNotification()
      console.log(this.isShowCheckBox)
    },

    deleteBtn(item) {
      console.log('删除成功', item)
    },

    liveRemTalk(msg) {
      console.log(msg)
    },

    nodeChange (node) {
      console.log(node)
    },

    currentPageChange (curPage) {
      console.log(`当前在第${curPage}页`)
    },
    
    albumReachBottom () {
      console.log('图片库要到底啦')
    },

    browerNotification () {
      if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(() => {
          new Notification('测试提示', { body: '你好', icon: 'https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.jpg' })
        })
      }
    },

    dateSelect (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">

@mixin cycle ($rotate: 1) {
  animation: cycle-#{$rotate} .5s linear forwards;
  @keyframes cycle-#{$rotate} {
    from {
      opacity: 0;
      transform: rotate(0);
    }
    to {
      opacity: 1;
      transform: rotate(($rotate - 1) * 30deg);
    }
  }
}
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

.menu {
  position: fixed;
  top: 300px;
  left: 50%;
  width: 500px;
  height: 500px;
  margin-left: -250px;

  .menu-list {
    list-style: none;

    li {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      padding: 5px;
      border-radius: 50%;
      background-color: #91bef0;
      color: #fff;
      transform-origin: 0 200px;
    }
    li:nth-child(1) {
      @include cycle(1);
    }
    li:nth-child(2) {
      @include cycle(2);
    }
    li:nth-child(3) {
      @include cycle(3);
    }
    li:nth-child(4) {
      @include cycle(4);
    }
    li:nth-child(5) {
      @include cycle(5);
    }
    li:nth-child(6) {
      @include cycle(6);
    }
    li:nth-child(7) {
      @include cycle(7);
    }
    li:nth-child(8) {
      @include cycle(8);
    }
    li:nth-child(9) {
      @include cycle(9);
    }
    li:nth-child(10) {
      @include cycle(10);
    }
    li:nth-child(11) {
      @include cycle(11);
    }
    li:nth-child(12) {
      @include cycle(12);
    }
  }
}




</style>
