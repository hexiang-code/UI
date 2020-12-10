<template>
  <div id="app">
    <!-- <button @click="visiable = !visiable">1111</button> -->
    <!-- <backgroundVideo resource="https://api.hexiangzone.cn/assets/kafeidou/start-background-video.mp4" poster="https://api.hexiangzone.cn/assets/kafeidou/startBg.png" @videoLoaded="isShowLoadAnimation = false" @posterLoaded="isShowLoadAnimation = false"></backgroundVideo> -->
    <!-- <load-animation :isShow.sync="isShowLoadAnimation"></load-animation> -->
    <hx-dialog title="你好" :dialogVisiable.sync="visiable" :isCurtain="false">
      <template>
        <hx-form-item label="书签名">
          <input v-model="filterValue" type="text" />
        </hx-form-item>
        <hx-form-item label="书签名">
          <input v-model="filterValue" type="text" />
        </hx-form-item>
      </template>
    </hx-dialog>
    <drawer :isShow.sync="testDrawer" :isModal="true">
      <input v-model="filterValue" @blur="blur" />
      <div class="bookmarks-header__search" @dblclick="deleteBtn">search</div>
      <tree
        :tree="tree"
        :isExpandAll="false"
        ref="tree"
        :isShowCheckBox="isShowCheckBox"
        @nodeChange="nodeChange"
      >
        <template #header>
          <div>头部</div>
        </template>
        <template #bottom>
          <div>底部</div>
        </template>
        <template #operation="treeItem">
          <div class="operation-btn">
            <span>修改</span>
            <span @click.stop="deleteBtn(treeItem)">删除</span>
          </div>
        </template>
      </tree>
    </drawer>
    <button @click="visiable = visiable" v-drag v-ctxmenu="{menuList}">弹框</button>
    <button @click="albumVisible = !albumVisible" v-drag v-ctxmenu="{menuList: testMeauList1}">相册</button>
    <button @click="testDrawer = !testDrawer" v-drag>抽屉</button>
    <button @click="canvasVisiable = !canvasVisiable" v-drag>背景</button>
    <button @click="testConfirm" v-drag>确认弹框</button>
    <button @click="testTextChange" @mousedown="testText = '你好'" v-drag>{{testText}}</button>
    <input />
    <button @click="checkbox">checkBox</button>
    <!-- <live-rem ref="rem" @liveRemTalk="liveRemTalk" :welcomeBack="{audioSrc: '/live-model/rem/sound/lemm_welcome-back.mp3', text: '你回来啦~'}"></live-rem> -->
    <!-- <canvas-bg v-if="canvasVisiable"></canvas-bg> -->
    <div>
      <hx-switch v-model="switchVal" active-color="blue" inactive-color="red">
        <span slot="switchRight">11</span>
        <span slot="switchLeft">你好</span>
      </hx-switch>
      <hx-slider v-model="sliderVal" :toFixed="2" :max="100" :min="0" direction="X"></hx-slider>
      {{sliderVal}}
    </div>

    <hx-album
      :visible.sync="albumVisible"
      :imageList="imageList"
      :classList="classList"
      @onReachBottom="albumReachBottom"
    ></hx-album>
    <!-- <hx-message :visibel.sync="hxMessageVisibel">
      <template #title>
        <span>你好</span>
      </template>
    </hx-message>-->
    <!-- <div class="menu">
      <ul class="menu-list" >
        <li v-for="item in meauList" :key="item.name">{{item.name}}</li>
      </ul>
    </div>-->
    <hx-select v-model="selectVal" :filterable="true" multiple>
      <hx-option
        v-for="(item, index) in noteLabelList"
        :value="item.id"
        :label="item.name"
        :key="index"
      ></hx-option>
    </hx-select>

    <hx-date-picker v-model="pickerRange" @selectComplete="dateSelect"></hx-date-picker>
    <hx-table :tableData="hardwareArray">
      <hx-table-column
        :width="item.props === 'token' ? 400 : 0"
        align="center"
        :prop="item.props"
        :label="item.label"
        v-for="item in hardwareTitle"
        :key="item.props"
        sortable
      ></hx-table-column>
    </hx-table>
    <div ref="testPoint" class="hardware-manager__table" @resize="console.log(213)">
      <hx-table :tableData="loggerList" ref="testPoint1">
        <hx-table-column
          :width="item.props === 'token' ? 400 : 0"
          align="center"
          :prop="item.props"
          :label="item.label"
          v-for="item in loggerTitle"
          :key="item.props"
          sortable
        >
          <!-- <template #columnContent="{cpuTemp}" v-if="item.props == 'cpuTemp'">
            <div>{{cpuTemp}}</div>
          </template>
          <template #header="{ header: {props} = {} }">{{props}}</template>-->
        </hx-table-column>
      </hx-table>
    </div>
    <hx-pagination
      ref="pagination"
      :total="totalPage"
      :page-size="3"
      :current-page.sync="currentPage"
      @current-change="currentPageChange"
    ></hx-pagination>

    <div class="test-open" ref="test-open">
      <i class="iconfont notes-icon" v-open="{target: $refs['test-open']}">&#xe67c;</i>
    </div>

    <hx-music
      :musicLyric="musicLyric"
      :musicSrc="musicSrc"
      ref="music-box"
      @end="musicEnd"
      musicFaceSrc="https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
      singer="迟木"
      song="一千万"
    ></hx-music>
  </div>
</template>

<script>
const tree = {
  title: "你好你好你好",
  children: [
    {
      label: "前端",
      href: "",
      id: 1,
      children: [
        {
          id: 2,
          label: "javaScript",
          href: "https://www.baidu.com"
        },
        {
          id: 3,
          label: "css",
          href: "https://www.jianshu.com/p/1614ef2b8bcb"
        },
        {
          id: 4,
          label: "nodejs",
          children: [
            {
              id: 5,
              label: "你好,nodejs",
              href: "https://www.jianshu.com/p/1614ef2b8bcb"
            }
          ]
        }
      ]
    },
    {
      id: 6,
      label: "娱乐娱乐娱乐",
      children: [
        {
          id: 7,
          label:
            "B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站",
          href: "https://www.bilibili.com"
        },
        {
          id: 8,
          label: "来啊nodejs"
        }
      ]
    }
  ]
};
const musicLyric = `[00:00.000] 作词 : 迟木
[00:01.000] 作曲 : 迟木
[00:24]没有酒 而我醉好几夜
[00:30]没有风 却飘在青雾间
[00:36]没朝夕 只有我 与神仙
[00:48]没有山 犹立在云之巅
[00:54]没有船 也渡到苦海边
[01:00]没日月 只有我 和妖孽
[01:12]飘不到 一千万座岛屿
[01:17]赶不上 一千万次花期
[01:24]我梦了 一千万道涟漪
[01:31]全是你
[01:37]不愿留 一千万页过去
[01:42]换最后 一千万首怨曲
[01:49]我所求 一千万个故事
[01:55]只有你
[02:00]没有诗 捉呓语谱作曲
[02:06]没有琴 戏流水弄笑语
[02:12]没鬼神 只有我 只有你
[02:48]没有灯 铜铃声照四壁
[02:54]没有火 燃烧爱与身体
[03:00]没天地 还有我 还有你
[03:12]飘不到 一千万座岛屿
[03:19]赶不上 一千万次花期
[03:25]我梦了 一千万道涟漪
[03:30]全是你
[03:37]不愿留 一千万页过去
[03:43]换最后 一千万首怨曲
[03:50]我所求 一千万个故事
[03:55]只有你
[04:18]全是你
[04:24]不愿留 一千万页过去
[04:31]换最后 一千万首怨曲
[04:37]我所求 一千万个故事
[04:42]只有你
[04:48]没有酒 而我醉好几夜
[04:54]没有风 却飘在青雾间
[05:00]没朝夕 只有我 与神仙
`;
const imageList = [
  {
    id: 1,
    type: "image",
    resourceName:
      "测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片",
    resourceUrl:
      "https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_232533.jpg"
  },
  {
    id: 2,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/songshu.jpg"
  },
  {
    id: 3,
    type: "video",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/6.jpg"
  },
  {
    id: 4,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/8.jpg"
  },
  {
    id: 5,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/loadingError.png"
  },
  {
    id: 6,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.jpg"
  },
  {
    id: 7,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.gif"
  },
  {
    id: 8,
    type: "image",
    resourceName: "测试图片",
    resourceUrl:
      "https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_173606.jpg"
  },
  {
    id: 9,
    type: "image",
    resourceName: "测试图片",
    resourceUrl:
      "https://api.hexiangzone.cn/assets/kafeidou/wx_camera_1598800076868.jpg"
  },
  {
    id: 10,
    type: "image",
    resourceName: "测试图片",
    resourceUrl:
      "https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_232533.jpg"
  }
];

const classList = [
  {
    id: 1,
    className: "图片"
  },
  {
    id: 2,
    className: "视频"
  }
];
const meauList = [
  {
    name: "回到顶部"
  },
  {
    name: "你好"
  },
  {
    name: "测试"
  }
];
const hardwareTitle = [
  {
    props: "cpuTemp",
    label: "cpu温度"
  },
  {
    props: "cpuUseage",
    label: "cpu使用率"
  },
  {
    props: "cpuMaxClocks",
    label: "cpu最大频率"
  },
  {
    props: "cpuPowers",
    label: "cpu功耗"
  },
  {
    props: "diskTemp",
    label: "硬盘温度"
  },
  {
    props: "diskUseage",
    label: "硬盘使用率"
  },
  {
    props: "ssdDiskTemp",
    label: "固态硬盘温度"
  },
  {
    props: "ssdDiskUseage",
    label: "固态硬盘使用率"
  },
  {
    props: "memUseage",
    label: "内存使用率"
  }
];
const loggerTitle = [
  {
    props: "userId",
    label: "用户id"
  },
  {
    props: "userAccount",
    label: "用户账户"
  },
  {
    props: "url",
    label: "请求地址"
  },
  {
    props: "method",
    label: "请求方式"
  },
  {
    props: "params",
    label: "请求参数"
  },
  {
    props: "time",
    label: "请求耗时"
  },
  {
    props: "token",
    label: "用户token"
  },
  {
    props: "mode",
    label: "用户身份"
  },
  {
    props: "error",
    label: "错误信息"
  },
  {
    props: "createdAt",
    label: "发生时间",
    sortable: true
  }
];
let hardwareArray = [
  {
    cpuTemp: "38 °C",
    cpuUseage: "40 %",
    cpuMaxClocks: "3850 MHz",
    cpuPowers: "40 W",
    diskTemp: "40 °C",
    diskUseage: "20 %",
    ssdDiskTemp: "20 °C",
    ssdDiskUseage: "50 %",
    memUseage: "30 %"
  }
];
let loggerList = [
  {
    createdAt: 1604630787183,
    error: JSON.stringify({ message: "你好啊，错了错了" }),
    id: 22,
    method: "GET",
    mode: "superManager",
    params: "{}",
    time: 59,
    token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoic3VwZXJNYW5hZ2VyIiwidXNlckFjY291bnQiOiJrYWZlaWRvdSIsInVzZXJJZCI6OCwiaWF0IjoxNjA0NjI3ODAwLCJleHAiOjE2MDQ3MTQyMDB9.bEn2-efVa3BxREiqYdqClGOs3hbkxByvyOKsbUcZD5M",
    updatedAt: 1604630787183,
    url: "/api/user/getCurLoginUserInfo",
    userAccount: null,
    userId: 8
  }
];

let noteLabelList = [
  {
    id: 4,
    name: "readme",
    userId: 8,
    disabled: 0,
    createdAt: "2020-11-30T06:36:35.000Z",
    updatedAt: "2020-11-30T06:36:35.000Z"
  },
  {
    id: 3,
    name: "css",
    userId: 8,
    disabled: 0,
    createdAt: "2020-11-27T08:42:34.000Z",
    updatedAt: "2020-11-27T08:42:34.000Z"
  },
  {
    id: 2,
    name: "JavaScript",
    userId: 8,
    disabled: 0,
    createdAt: "2020-11-23T09:46:24.000Z",
    updatedAt: "2020-11-23T09:46:24.000Z"
  },
  {
    id: 1,
    name: "游记",
    userId: 8,
    disabled: 0,
    createdAt: "2020-11-23T09:43:10.000Z",
    updatedAt: "2020-11-27T07:52:16.000Z"
  }
];

export default {
  name: "app",
  data() {
    let testDiv = document.createElement("div");
    testDiv.innerHTML = "你好";
    return {
      testText: "测试文字",
      tree: tree,
      visiable: false,
      testDrawer: false,
      filterValue: "",
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
      pickerRange: [],
      loggerTitle,
      loggerList,
      selectVal: [
        1,2
      ],
      menuList: [
        {
          label: "编辑",
          clickCallback: () => {
            console.log("点击了编辑1按钮");
          }
        },
        {
          label: "编辑",
          clickCallback: () => {
            console.log("点击了编辑2按钮");
          }
        },
        {
          label: "<span>你好</span>",
          clickCallback: () => {
            console.log("点击了编辑3按钮");
          }
        }
      ],
      testMeauList1: "<span>你好</span>",
      musicLyric,
      musicSrc: "http://localhost:3000/assets/kafeidou/test-music.mp3",
      noteLabelList
    };
  },

  // watch: {
  //   filterValue (value) {
  //     this.$refs.tree.filterNode(value)
  //   }
  // },
  mounted() {
    // this.testConfirm()
    // this.testProgress()
  },

  methods: {
    blur() {
      this.$refs.tree.filterNode(this.filterValue);
    },

    checkbox() {
      this.isShowCheckBox = !this.isShowCheckBox;
      this.browerNotification();
      console.log(this.isShowCheckBox);
    },

    deleteBtn(item) {
      console.log("删除成功", item);
    },

    liveRemTalk(msg) {
      console.log(msg);
    },

    nodeChange(node) {
      console.log(node);
    },

    async currentPageChange(curPage) {
      console.log(`当前在第${curPage}页`);
      this.$refs["pagination"].pointAnimation(this.$refs["testPoint1"]);
    },

    albumReachBottom() {
      console.log("图片库要到底啦");
    },

    browerNotification() {
      if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(() => {
          new Notification("测试提示", {
            body: "你好",
            icon: "https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.jpg"
          });
        });
      }
    },

    dateSelect(val) {
      console.log(val);
    },

    testProgress() {
      let percentage = 0;
      let timer = setInterval(() => {
        percentage += 10;
        percentage >= 100 && clearInterval(timer);
        console.log(percentage);
        this.$refs.rem.showProgress({
          title: "你好",
          percentage
        });
      }, 1000);
    },

    testConfirm() {
      let message = {
        message: <span style="color: red">你好</span>
      };
      this.$refs.rem
        .showConfirm(message)
        .then(() => {
          console.log("用户点击同意");
        })
        .catch(err => {
          console.log(err);
        });
    },

    async testTextChange() {
      // this.testText = '你好'
      // await this.$nextTick()
      Array.apply(null, { length: 10000 }).forEach(() => {
        console.log(123);
      });
    },

    musicEnd() {
      this.musicSrc =
        "http://m8.music.126.net/20201209151658/fca87ecb505ace967c2668ff720815f9/ymusic/0e58/0453/5609/920c678a2c39b263f1c4ac58e2593712.mp3";
      this.$refs["music-box"].musicSwitch();
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin cycle($rotate: 1) {
  animation: cycle-#{$rotate} 0.5s linear forwards;
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid #1296db;
  animation: search-animation 1.5s infinite linear;
}

.bookmarks-header__search:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid #1296db;
  animation: search-animation 1s 0.5s linear infinite reverse;
}

@keyframes search-animation {
  0%,
  100% {
    clip: rect(0, 60px, 22px, 0);
  }
  25% {
    clip: rect(0, 102px, 22px, 60px);
  }
  50% {
    clip: rect(20px, 102px, 40px, 60px);
  }
  75% {
    clip: rect(22px, 40px, 40px, 0);
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

.hardware-manager__table {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .table-container {
    position: relative;
  }
  .table-container .table {
    font-size: 12px;
  }
}

.test-open {
  width: 300px;
  height: 300px;
  max-height: 300px;
  border: 1px solid;
  margin-bottom: 300px;
  cursor: pointer;

  .test-close {
    height: 200px;
    max-height: 200px;
    overflow: hidden;
  }
}
</style>
