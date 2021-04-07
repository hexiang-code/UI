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
      <hx-tree
        :tree="tree"
        :isExpandAll="false"
        ref="tree"
        :isShowCheckbox="isShowCheckBox"
        @check-change="nodeChange"
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
      </hx-tree>
    </drawer>
    <button @click="visiable = visiable" v-drag v-ctxmenu="{menuList}">弹框</button>
    <button @click="albumVisible = !albumVisible" v-drag v-ctxmenu="{menuList: testMeauList1}">相册</button>
    <button @click="testDrawer = !testDrawer" v-drag>抽屉</button>
    <button @click="canvasVisiable = !canvasVisiable" v-drag>背景</button>
    <button @click="testLoading1" v-loading="{isLoading: isTestLoading && loadingType == 1, message: '测试1'}">测试loading1</button>
    <button @click="testLoading2" v-loading="{isLoading: isTestLoading && loadingType == 2, message: '测试2'}">测试loading2</button>
    <button @click="testLoading3" v-loading="{isLoading: isTestLoading && loadingType == 3, message: '测试3'}">测试loading3</button>
    <button @click="testTextChange" @mousedown="testText = '你好'" v-drag>{{testText}}</button>
    <button @click="isMusicFix = !isMusicFix" >音乐盒展示开关</button>
    <input />
    <button @click="checkbox">checkBox</button>

    <!-- 音乐盒测试 -->
    <hx-music
      :musicLyric="musicLyric"
      :musicSrc="musicSrc"
      ref="music-box"
      @end="musicEnd"
      musicFaceSrc="https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
      singer="迟木"
      song="一千万"
      :volume.sync="musicVolumn"
      @music-error="musicError"
    ></hx-music>

    <!-- <live-rem 
      ref="rem" 
      @liveRemTalk="liveRemTalk" 
      :meauList="liveRemMeauList"
      @menuListClick="menuListClick"
      :welcomeBack="{audioSrc: '/live-model/rem/sound/lemm_welcome-back.mp3', text: '你回来啦~'}">
    </live-rem> -->
    <!-- <canvas-bg v-if="canvasVisiable"></canvas-bg> -->
    <div>
      <hx-switch v-model="switchVal" active-color="blue" inactive-color="red">
        <span slot="switchRight">11</span>
        <span slot="switchLeft">你好</span>
      </hx-switch>
      <hx-slider v-model="sliderVal" :toFixed="2" :max="100" :min="0" direction="Y" :step="1"></hx-slider>
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

    <div class="test-open" ref="testOpen">
      <i class="iconfont notes-icon" v-open="{target: testOpenTarget}">&#xe67c;</i>
    </div>
  </div>
</template>

<script>
import {
  noteLabelList,
  loggerList,
  hardwareArray,
  loggerTitle,
  hardwareTitle,
  classList,
  meauList,
  imageList,
  musicLyric,
  tree
} from './mock-data/app-data'
export default {
  name: "app",
  data() {
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
      noteLabelList,
      testOpenTarget: '',
      isTestLoading: false,
      loadingType: -1,
      liveRemMeauList: [
        {
          name: '上一曲',
          icon: '&#xe61f;',
          type: 'musicBack',
          clickCallback: () => {
            this.$liveRem.musicBox && this.$liveRem.musicBox.pauseMusic()
          }
        },
        {
          name: '下一曲',
          icon: '&#xe651;',
          type: 'musicForward'
        }
      ],
      isMusicFix: true,
      musicVolumn: 30 
    };
  },

  watch: {
    filterValue (value) {
      this.$refs.tree.filterNode(value)
    },

    isMusicFix: function (val) {
      val && setTimeout(() => this.musicFix(val), 1000) 
    }
  },
  mounted() {
    this.testOpenTarget = this.$refs['testOpen']
    this.$liveRem = this.$refs['rem']
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

    nodeChange(node, ids) {
      console.log(node, ids);
    },

    async currentPageChange(curPage) {
      console.log(`当前在第${curPage}页`);
      this.$refs["pagination"].pointAnimation(this.$refs["testPoint1"], { isRemoveTargetNode: false });
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
    },

    musicError () {
      console.log('music error')
    },

    testLoading1 () {
      this.isTestLoading = true
      this.loadingType = 1
      setTimeout(() => this.loadingType = -1, 3000)
    },

    testLoading2 () {
      this.isTestLoading = true
      this.loadingType = 2
      setTimeout(() => this.loadingType = -1, 3000)
    },

    testLoading3 () {
      this.isTestLoading = true
      this.loadingType = 3
      setTimeout(() => this.loadingType = -1, 3000)
    },

    musicFix (musicFix) {
      // this.musicBox = this.$refs['music-box']
      // if (this.musicBox && musicFix) {
      //   this.$liveRem.$el.appendChild(this.musicBox.$el)
      //   this.$liveRem.musicBox = this.musicBox
      // }
    },

    menuListClick (meauItem) {
      console.log(meauItem)
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
