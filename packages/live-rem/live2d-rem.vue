<template>
  <div v-drag class="live-rem" style="left:5px; bottom: 0px;" :class="{'guiChu guiChu2': isGuiChu}" @click.capture="liveRemClick" @mouseover="liveRemMouseover">
    <transition-group name="liveRem__slow-in" tag="div" v-show="isShowLeimu">
      <div class="message" key="message" v-if="message.length > 0" v-html="message"></div>
      <canvas id="live2d" key="live2d" width="500" height="560" class="live2d"></canvas>
      <div class="live-rem__talk-body" key="live-rem__talk-body" v-if="isTalk">
        <div class="live-rem__name">
          <input name="name" type="text" class="live-rem__name-input" autocomplete="off" placeholder="你的名字" />
        </div>
        <div class="live-rem__talk-box">
          <input v-model="talkAbout" name="talk" type="text" class="live-rem__name-input live-rem__talk-input" autocomplete="off" placeholder="要和我聊什么呀？"/>
          <div class="live-rem__send-tips" @click="liveRemTalk">发送</div>
        </div>
      </div>
      <input name="live_talk" key="live_talk" id="live_talk" value="1" type="hidden" />
      <div class="live-rem__icon-list" key="live-rem__icon-list">
        <img class="live-rem__icon" id="liveRemInfo" src="../image/info.png" />
        <img class="live-rem__icon" id="liveRemTalk" @click.stop="isTalk = !isTalk" src="../image/talk.png"/>
        <img class="live-rem__icon" id="liveRemMusic" src="../image/music.png"/>
        <img class="live-rem__icon" id="liveRemGuiChu" @click.stop="isGuiChu = !isGuiChu" src="../image/youdu.png"/>
        <img class="live-rem__icon" id="liveRemHide" @click="isShowLeimu = false" src="../image/quite.png"/>
        <input name="live_statu_val" id="live_statu_val" value="0" type="hidden" />
        <audio src="" style="display:none;" id="live2d_bgm" data-bgm="0" preload="none"></audio>
        <input name="live2dBGM" value="https://t1.aixinxi.net/o_1c52p4qbp15idv6bl55h381moha.mp3" type="hidden">
        <input name="live2dBGM" value="https://t1.aixinxi.net/o_1c52p8frrlmf1aled1e14m56una.mp3" type="hidden">
        <input id="duType" value="douqilai,l2d_caihong" type="hidden">
      </div>
    </transition-group>
    <div v-if="!isShowLeimu" class="live-rem__call" @click="isShowLeimu = true">
      <div class="live-rem__call-text">召唤蕾姆</div>
    </div>
</div>
</template>

<script>
import { IMAGESRCPATH, MESSAGE } from './config'
export default {
  name: 'liveRem',
  props: {
    toastTime: {
      type: Number,
      default: 3000
    },
    modelPath: {
      type: String,
      default: '/live-model/rem/rem.json'
    },
    texturePathArray: {
      type: Array,
      default: () => {
        return ['/live-model/rem/remu2048/texture_00.png']
      }
    },
    welcomeBackpath: {
      type: String,
      default: '/live-model/rem/sound/lemm_welcome-back.mp3'
    }
  },
  data () {
    return {
      isGuiChu: false, // 是否鬼畜
      message: '', // toast 提示
      isTalk: '', // 是否展示信息提示弹框
      isShowLeimu: true, // 是否展示蕾姆
      talkAbout: '', // 聊天内容
      setIn: '' // 循环定时器
    }
  },
  created () {
    this.checkSleep()
  },

  mounted () {
    this.initLiveRem()
  }, 

  destroyed() {
    clearInterval(this.setIn)
  },

  methods: {

    // 检测用户进入
    checkSleep () {
      let mp3 = new Audio(this.welcomeBackpath)
      if(!document.visibilitychange) {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState == 'visible') {
            mp3.play()
            this.showToast('你回来啦~')
          }
        })
      }
    },

    // 初始化live2d
    initLiveRem () {
      // let images = []
      // let textureArr = []
      // if (this.texturePathArray && this.texturePathArray.length > 0) {
      //   textureArr = this.texturePathArray
      // }
      // if (textureArr.length == 0) {
      //   this.showToast('未获取到纹理')
      //   return
      // }
      // textureArr.forEach((item, index) => {
      //   images[index] = new Image()
      //   images[index].src = item
      //   images[index].onload = () => {
          // loadlive2d("live2d", `${HOMEPATH}live-model/rem/rem.json`)
          loadlive2d("live2d", this.modelPath)
          this.lovelyRemind()
      //   }
      // });
    },

    // 鼠标移动
    liveRemMouseover ($event) {
      let { mouseover: mouseoverMsg } = MESSAGE
      if ($event.target && $event.target.id  && Array.isArray(mouseoverMsg)) {
        let { text } = mouseoverMsg.find(item => item.selectorId == $event.target.id) || {}
        this.showToast(text)
      }
    },

    // 点击事件
    liveRemClick($event) {
      let { click } = MESSAGE
      if ($event.target && $event.target.id  && Array.isArray(click)) {
        let { text } = click.find(item => item.selectorId == $event.target.id) || {}
        this.showToast(text)
      }
    },

    // 展示信息
    showToast (text, time = this.toastTime) {
      if (text && Array.isArray(text)) {
        let index = Math.round(Math.random() * text.length) - 1
        index = index > 0 ? index : 0
        this.message = text[index]
      }
      if (text && typeof text === 'string') this.message = text
      setTimeout(() => {
        this.message = ''
      }, time)
    },

    // 与蕾姆交流
    liveRemTalk () {
      this.$emit('liveRemTalk', this.talkAbout)
      this.talkAbout = ''
    },

    lovelyRemind () {
      let curS = new Date().getSeconds()
      let curM = new Date().getMinutes()
      let delay = 60 * 60 * 1000 - (curM * 60 * 1000 +  curS * 1000)
      const remindFn = () => {
          let curhours = new Date().getHours()
          let curMinutes = new Date().getMinutes()
          if (curhours % 1 === 0 && curMinutes == 0) {
            this.showToast(`${curhours}点了哟，休息一下保护下眼睛吧`)
          }
          if (curhours == 9 && curMinutes == 0) {
            this.showToast('亲爱哒，到上班时间咯，要好好加油哟')
          } else if (curhours == 12 && curMinutes == 0) {
            this.showToast('亲爱哒，午休啦，要好好吃饭哟')
          } else if (curhours == 18 && curMinutes == 0) {
            this.showToast('亲爱哒，下班啦，回家路上注意安全哟')
          }
      }
      setTimeout(() => { 
        remindFn()
        this.setIn = setInterval(() => {
          remindFn()
        }, 60 * 60 * 1000)
      }, delay)
    }
  }
}
</script>

<style lang="scss" scoped>
  .live-rem {
    position: fixed;
    left: 10px;
    bottom: 0;
    z-index: 1001;
    width: 250px;
    height: 280px;
  }

  .liveRem__slow-in-enter-active {
    animation: slow-in 1s forwards;
  }

  .liveRem__slow-in-leave-active {
    animation: slow-in 1s forwards reverse;
  }

  .live2d {
    position: relative;
    z-index: 3;
	  width: 250px;
    height: 280px;
  }

  .live-rem__icon {
    width: 15px;
    height: 15px;
  }

  .live-rem__talk-body {
    position:absolute;
    bottom: 15px;
    left: 0;
    width: 250px;
    z-index: 4;
  }

  .live-rem__name {
    width: 70px;
    box-sizing: border-box;
    height: 24px;
    border: 2px solid rgb(223, 179, 241);
    border-radius: 5px;
    background-color: rgba(74, 59, 114,0.9);
  }

  .live-rem__name-input {
    box-sizing: border-box;
    margin: 0;
    padding: 0 3px;
    width: 66px;
    height: 20px;
    border: 0px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    outline: none;
    background-color: transparent;
    color: #E4E4E4;  
  }

  .live-rem__name-input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #E4E4E4;  
    opacity: 1;
  }
  
  .live-rem__name-input::-moz-placeholder {  /* Mozilla Firefox 19+*/ 
    color: #E4E4E4;
    opacity: 1;
  }
  
  .live-rem__name-input:-ms-input-placeholder {
    color: #E4E4E4;
  }
  
  .live-rem__name-input::-webkit-input-placeholder {
    color: #E4E4E4;
  }

  .live-rem__talk-input {
    flex: 1;
    height: 24px;
    line-height: 24px;
    text-align: left;
  }

  .live-rem__talk-box {
    display: flex;
    justify-content: space-between;
    width: 260px;
    height: 28px;
    box-sizing: border-box;
    border: 2px solid rgb(223, 179, 241);
    border-radius: 5px;
    background-color: rgba(74, 59, 114,0.9);
  }
  
  .live-rem__send-tips {
    position: relative;
    width: 40px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #fff;
    background-color: transparent;
    cursor: pointer;
    text-align: center;
  }

  .live-rem__send-tips::after {
    content: '';
    position: absolute;
    left: -3px;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: #fff;
  }

  .live-rem__icon-list {
    position: absolute;
    right: 0;
    top: 10px;
    z-index: 5;
    width: 15px;
    opacity: 0.9;
  }

  .guiChu {
    -webkit-animation-name: shake-little;
    -ms-animation-name: shake-little;
    animation-name: shake-little;
    -webkit-animation-duration: 100ms;
    -ms-animation-duration: 100ms;
    animation-duration: 100ms;
    -webkit-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: ease-in-out;
    -ms-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-delay: 0s;
    -ms-animation-delay: 0s;
    animation-delay: 0s;
    -webkit-animation-play-state: running;
    -ms-animation-play-state: running;
    animation-play-state: running;
  }

  .guiChu2 {
    animation: shake-it .5s reverse infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .message {
    position: absolute;
    left: 0;
    bottom: 280px;
    box-sizing: border-box;
    margin: auto;
    padding: 7px;
    width: 250px;
    height: auto;
    text-align: center;
    border: 2px solid rgba(75,127,199,0.9);
    border-radius: 5px;
    font-size: 13px;
    background-color: rgba(74, 59, 114,0.9);
    text-overflow: ellipsis;
    text-transform: uppercase;
    overflow: hidden;
    color: #fff;
  }

  .live-rem__call {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border: 2px solid rgba(75,127,199,0.9);
    border-radius: 2px;
    background-color: rgba(74, 59, 114,0.9);
    color:#fff;
    cursor: pointer;
  }

</style>