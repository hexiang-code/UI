<template>
  <div id="app">
    <!-- <button @click="visiable = !visiable">1111</button> -->
    <!-- <backgroundVideo resource="https://api.hexiangzone.cn/assets/kafeidou/start-background-video.mp4" poster="https://api.hexiangzone.cn/assets/kafeidou/startBg.png" @videoLoaded="isShowLoadAnimation = false" @posterLoaded="isShowLoadAnimation = false"></backgroundVideo> -->
    <!-- <load-animation :isShow.sync="isShowLoadAnimation"></load-animation> -->
    <hx-dialog title="你好" :dialogVisiable.sync="visiable" :isCurtain="false">
      <template>
        <hx-form-item label="书签名">
          <input v-model="filterValue" type="text">
        </hx-form-item>
        <hx-form-item label="书签名">
          <input v-model="filterValue" type="text">
        </hx-form-item>
      </template>
    </hx-dialog>
    <drawer :isShow.sync="testDrawer" :isModal="true">
      <input v-model="filterValue" @blur="blur"/>
      <div class="bookmarks-header__search" @dblclick ="deleteBtn">
        search
      </div>
      <tree :tree="tree" :isExpandAll="false" ref="tree" :isShowCheckBox="isShowCheckBox" @nodeChange="nodeChange">
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
    <button @click="testConfirm" v-drag>确认弹框</button>
    <input />
    <button @click="checkbox">checkBox</button>
    <!-- <live-rem ref="rem" @liveRemTalk="liveRemTalk" :welcomeBack="{audioSrc: '/live-model/rem/sound/lemm_welcome-back.mp3', text: '你回来啦~'}"></live-rem> -->
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
      :total="totalPage" :page-size="3" 
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

    <hx-table :tableData="hardwareArray" ref="testPoint" style="padding: 20px;">
      <hx-table-column :prop="item.props" :label="item.label" v-for="item in hardwareTitle" :key="item.props" sortable>
        <template #columnContent="{cpuTemp}" v-if="item.props == 'cpuTemp'">
          <div>{{cpuTemp}}</div>
        </template>
        <!-- <template #header="{ header: {props} = {} }">{{props}}</template> -->
      </hx-table-column>
    </hx-table>
    <hx-date-picker v-model="pickerRange" @selectComplete="dateSelect"></hx-date-picker>
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
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_232533.jpg'
          },
          {
            id: 2,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/songshu.jpg'
          },
          {
            id: 3,
            type: 'video',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/6.jpg'
          },
          {
            id: 4,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/8.jpg'
          },
          {
            id: 5,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/loadingError.png'
          },
          {
            id: 6,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.jpg'
          },
          {
            id: 7,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.gif'
          },
          {
            id: 8,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_173606.jpg'
          },
          {
            id: 9,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/wx_camera_1598800076868.jpg'
          },
          {
            id: 10,
            type: 'image',
            resourceName: '测试图片',
            resourceUrl: 'https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_232533.jpg'
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
import html2canvas from 'html2canvas'
let translateX = 20
let translateY = 5
let pointSize = 1
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
      sliderVal: 9,
      albumVisible: false,
      imageList: imageList,
      classList,
      currentPage: 1,
      totalPage: 10,
      canvasVisiable: true,
      meauList,
      hxMessageVisibel: true,
      hardwareArray,
      hardwareTitle,
      pickerRange: []
    }
  },

  // watch: {
  //   filterValue (value) {
  //     this.$refs.tree.filterNode(value)
  //   }
  // },
  mounted () {
    // this.testConfirm()
    // this.testProgress()
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

    async currentPageChange (curPage) {
      console.log(`当前在第${curPage}页`)
      let targetNode = this.$refs['testPoint'].$el
      html2canvas(targetNode).then(res => {
        this.pointContent(res, targetNode)
      })
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
    },

    testProgress () {
      let percentage = 0
      let timer = setInterval(() => {
        percentage += 10
        percentage >= 100 && clearInterval(timer)
        console.log(percentage)
        this.$refs.rem.showProgress({
          title: '你好',
          percentage
        })
      }, 1000)
    },

    testConfirm () {
      let message = {
        message: <span style="color: red">你好</span>
      }
      this.$refs.rem.showConfirm(message).then(() => {
        console.log('用户点击同意')
      }).catch(err => {
        console.log(err)
      })
    },

    pointContent (canvas, targetNode) {
      let canvas1 = document.createElement('canvas')
      canvas1.width = canvas.width
      canvas1.height = canvas.height
      targetNode.parentNode.replaceChild(canvas1, targetNode)
      let ctx1 = canvas1.getContext('2d')
      let ctx = canvas.getContext('2d')
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let index = 0
      let pointArr = []
      for (let x = 0; x < canvas.width; x += pointSize) {
          for (let y = 0; y < canvas.height; y += pointSize) {
            let point = {};
            point.x = x;
            point.y = y;
            index = y * imageData.width + x
            point.color = 'rgba('+String(imageData.data[4*index]) + ',' + String(imageData.data[4*index+1]) + ',' + String(imageData.data[4*index+2]) + ',' + String(imageData.data[4*index+3]/255) + ')'
            pointArr.push(point);
          }
        }
        pointArr.forEach(item => {
          ctx1.fillStyle = item.color
          ctx1.fillRect(item.x, item.y, 1, 1)
        })
      let timer = setInterval(() => {
        let len = pointArr.length
        let pointIndex = 0
        while (pointIndex < len - 1) {
          let item = pointArr[pointIndex]
          if (pointIndex % 5 == 0) {
            let randomX = Math.random() * (Math.random() > 0.5 ? -translateX : translateX)
            let randomY = Math.random() * (Math.random() > 0.5 ? -translateY : translateY)
            ctx1.fillStyle = item.color
            ctx1.fillRect(item.x + randomX, item.y + randomY, pointSize, pointSize)
          }
          pointIndex ++
        }
      }, 50)
      setTimeout(() => {
        clearInterval(timer)
        canvas1.parentNode.replaceChild(targetNode, canvas1)
      }, 1000)
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
.list-box {
  width: 500px;
  height: 300px;
  border: 1px solid;
  margin: 0 auto;
}
</style>
