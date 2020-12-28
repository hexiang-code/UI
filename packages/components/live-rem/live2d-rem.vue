<template>
  <div v-drag="{limit: 'window'}" 
    class="live-rem" ref="liveRem" 
    style="left:5px; bottom: 0px;" 
    :class="{'guiChu guiChu2': isGuiChu}"
    @mouseenter="meauListVisibel = true" 
    @mouseleave="meauListVisibel = false"
    @click.capture="liveRemClick">
    <transition-group name="liveRem__slow-in" tag="div">
      <div class="message" key="message" v-show="isShowLeimu && messageVisible">
        <render-custom :content="this.renderCustom" />
      </div>
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
      <ul class="menu-list" key="meauList" v-show="meauListVisibel">
        <li v-for="item in meaus" :key="item.id" :title="item.name" @click.stop="menuClick(item)">
          <i v-html="item.icon" class="iconfont menu-icon"></i>
        </li>
      </ul>
    </transition-group>
    <div v-if="!isShowLeimu" class="live-rem__call" @click="isShowLeimu = true">
      <div class="live-rem__call-text">召唤蕾姆</div>
    </div>
</div>
</template>

<script>
import { MESSAGE, textureConfig, meauList } from './config'
import { startLive2d, loadAction } from './live2d-resource/startLive2d'
import Vue from 'vue'
import renderCustom from './render-custom'
let messageTimer // 提示计时器
let canvas // live2d画布
export default {
  name: 'liveRem',
  props: {
    toastTime: {
      type: Number,
      default: 3000
    },
    welcomeBack: {
      type: Object,
      default: () => {
        return {
          text: '你回来啦~'
        }
      }
    },

    // 模型配置
    textureConfig: {
      type: Array,
      default: () => textureConfig
    },
    // 手动加载模型
    manualLoad: {
      type: Boolean,
      default: false
    },

    // 菜单
    meauList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isGuiChu: false, // 是否鬼畜
      message: '', // toast 提示
      isTalk: '', // 是否展示信息提示弹框
      isShowLeimu: true, // 是否展示蕾姆
      talkAbout: '', // 聊天内容
      setIn: '', // 循环定时器
      curTexture: {}, // 当前皮肤信息
      meauListVisibel: false, // 菜单列表展示开关
      // 确认弹框
      confirm: {
        visibel: false, // 确认弹框开关
        title: '提示',  // 标题
        message: '', // 消息内容
        showCancelButton: true, // 取消按钮
      },
      messageVisible: false, // 消息盒子开关
      renderCustom: true
    }
  },

  computed: {
    // 菜单列表
    meaus () {
      let meaus = this.meauList.concat(meauList)
      if (meaus.length > 10) {
        console.warn('only set 10 meaus')
      }
      return meaus.slice(0, 9)
    }
  },

  watch: {
    message (newVal) {
      this.renderCustom = newVal
    }
  },

  components: { renderCustom },

  created () {
    this.checkSleep()
    this.lovelyRemind()
  },

  mounted () {
    !this.manualLoad && this.initLiveRem()
  }, 

  destroyed() {
    clearInterval(this.setIn)
  },

  methods: {

    // 检测用户进入
    checkSleep () {
      let mp3, text
      if (this.welcomeBack) {
        if (this.welcomeBack.audioSrc) mp3 = new Audio(this.welcomeBack.audioSrc)
        if (this.welcomeBack.text) text = this.welcomeBack.text
      }
      if(!document.visibilitychange) {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState == 'visible') {
            mp3 && mp3.play()
            text = <span>你回来啦</span>
            text && this.showToast({text})
          }
        })
      }
    },

    // 初始化live2d
    initLiveRem () {
      this.changeTexture()
    },

    // 点击事件
    liveRemClick ($event) {
      let { click } = MESSAGE
      if ($event.target && $event.target.id  && Array.isArray(click)) {
        let { text } = click.find(item => item.selectorId == $event.target.id) || {}
        this.showToast({ text })
      }
    },

    // 随机获取数组中的一项
    getRandomItem (array) {
      if (!Array.isArray(array)) return false
      let index = Math.round(Math.random() * array.length) - 1
      index = index > 0 ? index : 0
      return array[index]
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
        let notifyText = ''
        if (curhours % 1 === 0 && curMinutes == 0) {
          notifyText = `${curhours}点了哟，休息一下保护下眼睛吧`
        }
        if (curhours == 9 && curMinutes == 0) {
          notifyText = '亲爱哒，到上班时间咯，要好好加油哟'
        } else if (curhours == 12 && curMinutes == 0) {
          notifyText = '亲爱哒，午休啦，要好好吃饭哟'
        } else if (curhours == 18 && curMinutes == 0) {
          notifyText = '亲爱哒，下班啦，回家路上注意安全哟'
        }
        this.showToast({
          text: notifyText,
          type: 'lovely'
        })
        if (window.Notification && Notification.permission !== "denied") {
          Notification.requestPermission(() => {
            new Notification('来自蕾姆的关怀', { body: notifyText, icon: 'https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.jpg' })
          })
        }
      }
      setTimeout(() => { 
        remindFn()
        this.setIn = setInterval(() => {
          remindFn()
        }, 60 * 60 * 1000)
      }, delay)
    },

    // 切换纹理
    async changeTexture () {
      this.isShowLeimu = false
      let { curTextureId } = this.curTexture
      setTimeout(() => {
        // 第一次加载模型时不要换装提示
        if (curTextureId) this.showToast({text: '换好啦', type: 'lovely'})
        this.$refs.liveRem.appendChild(canvas)
        this.isShowLeimu = true
      }, 1500)
      let textureLen = this.textureConfig.length // 纹理总数
      let curIndex = this.textureConfig.findIndex(item => item.id == this.curTexture.id)
      curIndex ++
      if (curIndex > textureLen - 1) curIndex = 0
      this.curTexture = this.textureConfig[curIndex]
      let { width, height, texture } = this.textureConfig[curIndex]
      if (canvas) this.$refs.liveRem.removeChild(canvas)
      canvas = document.createElement('canvas')
      canvas.setAttribute('id', 'live2d')
      canvas.setAttribute('class', 'live2d')
      // @mouseover="meauListVisibel = true" @mouseleave="meauListVisibel = false"
      // canvas.addEventListener('mouseenter', () => this.meauListVisibel = true)
      // canvas.addEventListener('mouseleave', () => setTimeout(() => this.meauListVisibel = false, 3000))
      if (width) {
        canvas.width = width
        this.$refs.liveRem.style.width = `${width}px`
      }
      if (height) {
        canvas.height = height
        this.$refs.liveRem.style.height = `${height}px`
      }
      startLive2d(canvas, texture)
    },

    // 点击菜单
    menuClick (menuItem) {
      let { type, clickCallback } = menuItem
      if (type == 'changeTexture') this.changeTexture()
      else if (type == 'communication') this.isTalk = !this.isTalk
      else if (type == 'goTop') {
        this.goTop()
      }
      else if (clickCallback && typeof clickCallback === 'function') {
        clickCallback.call(this)
      }
      else this.$emit('menuListClick', menuItem)
    },

    // 回到顶部
    goTop () {
      let timer = setInterval(() => {
        let totalOffsetY = window.pageYOffset
        totalOffsetY -= 100
        if (totalOffsetY <= 0) {
          window.scrollTo(0, 0)
          clearInterval(timer)
          return
        }
        window.scrollTo(0, totalOffsetY)
      }, 16)
      
    },

    // 展示信息
    showToast ({text, time = this.toastTime, type='normal'}) {
      messageTimer && clearTimeout(messageTimer)
      this.messageVisible = true
      if (text && Array.isArray(text)) {
        this.message = this.getRandomItem(text)
      }
      if (text && 
          (typeof text === 'string' || Object.prototype.hasOwnProperty.call(text, 'componentOptions'))
      ) this.message = text
      if (!this.message)  {
        this.messageVisible = false
        return
      }
      const { toastAction } = this.curTexture
      if (toastAction && Object.prototype.toString.call(toastAction) === "[object Object]") {
        let curAction = toastAction[type]
        let actionRes
        if (Array.isArray(curAction)) {
          actionRes = this.getRandomItem(curAction)
        } else if (Object.prototype.toString.call(curAction) === "[object Object]") {
          actionRes = curAction
        } else {
          console.warn('toastAction不符合规范')
          return
        }
        let { index, name, priority } = actionRes
        actionRes &&  loadAction({ name, priority, index: --index })
      }
      messageTimer = setTimeout(() => {
        this.messageVisible = false
        this.message = ''
      }, time)
    },

    // 选择提示
    showConfirm (options) {
      return new Promise(async (resolve, reject) => {
        let {
          message,
        } = options
        if (message) {
          this.messageVisible = true
          this.confirm = Object.assign({}, this.confirm, options, { visibel: true })
          this.renderCustom = (
            <div class="live-rem__confirm">
              <div class="live-rem__confirm__title">
                <span>{ this.confirm.title }</span>
                <i class="iconfont message-icon close-icon">&#xe604;</i>
              </div>
              <div class="live-rem__confirm__content">
                <i class="iconfont message-icon warn-icon">&#xe606;</i>
                <span>{ this.confirm.message }</span>
              </div>
              <div class="live-rem__confirm__buttom">
                <div class="btn live-rem__confirm__confirm" onClick={ () => {
                    resolve()
                    this.messageVisible = false
                  }
                }>确认</div>
                { 
                  this.confirm.showCancelButton ? 
                  <div class="btn live-rem__confirm__cancel" onClick={ () => {
                      reject({
                        text: '用户拒绝',
                        type: 'userReject'
                      })
                      this.messageVisible = false
                    }
                  } >取消</div> :
                  ''
                }
              </div>
            </div>
          )
          this.$forceUpdate()
        } else {
          reject({
            text: '参数不合法',
            type: 'paramError'
          })
        }
        
      })
    },

    // 进度条
    showProgress (options = {}) {
      options = Vue.observable({...options})
      this.messageVisible = true
      this.renderCustom = (
        <div class="live-rem__progress">
          <div class="live-rem__progress-title">{ options.title || '蕾姆全力加载中···' }</div>
          <div class="live-rem__progress-line">
            <div 
              class="live-rem__progress-bg"
              style={[
                {
                  width: `${Number(options.percentage) % 100}%`
                },
                {
                  backgroundColor: options.color
                }
              ]}
            >
            </div>
          </div>
        </div>
      )
    },

    // 关闭进度条
    closeProgress () {
      this.messageVisible = false
    }
  }
}
</script>

<style>
.live2d {
  position: relative;
  z-index: 3;
  animation: slow-in .5s forwards linear;
}
</style>

<style lang="scss" scoped>
  @import '../../assets/css/_globalStyle.scss';
  @mixin cycle ($rotate: 1) {
    animation: cycle-#{$rotate} .5s linear forwards;
    @keyframes cycle-#{$rotate} {
      from {
        opacity: 0;
        transform: rotate(0);
      }
      to {
        opacity: 1;
        @if $rotate % 2 != 0 {
          transform: rotate((($rotate + 1) / 2) * 30deg);
        } @else {
          transform: rotate(-($rotate / 2) * 30deg);
        }
      }
    }
  }

  @mixin contrary-cycle ($rotate: 1) {
    @if $rotate % 2 != 0 {
      transform: rotate(-(($rotate + 1) / 2) * 30deg);
    } @else {
      transform: rotate(($rotate / 2) * 30deg);
    }
  }

  .live-rem {
    position: fixed;
    left: 10px;
    z-index: 10001;
    width: 250px;
    padding-top: 52px;
  }

  .liveRem__slow-in-enter-active {
    animation: slow-in 1s forwards;
  }

  // .liveRem__slow-in-leave-active {
  //   animation: slow-in 1s forwards reverse;
  // }

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
    top: 62px;
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
    top: 0;
    left: 0;
    z-index: 5;
    box-sizing: border-box;
    margin: auto;
    padding: 5px;
    width: 250px;
    // max-height: 100px;
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

  .menu-list {
    position: absolute;
    left: 60px;
    z-index: 4;
    width: 50px;
    list-style: none;

    li {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      padding: 5px;
      border-radius: 50%;
      color: #fff;
      transform-origin: 50% 150px;
      cursor: pointer;
    }

    @for $i from 1 through 10 {
      li:nth-child(#{$i}) {
        @include cycle($i);
      }

      li:nth-child(#{$i}) i {
        @include contrary-cycle($i);
      }
    }
  }

  .live-rem__confirm {
    width: 100%;

    .live-rem__confirm__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;

      .close-icon {
        width: 14px;
        height: 14px;
        font-size: 14px;
      }
    }

    .live-rem__confirm__content {
      display: flex;
      justify-content: flex-start;
      padding: 10px;
      font-size: 14px;
      
      .warn-icon {
        width: 16px;
        height: 16px;
        margin-right: 10px;
        font-size: 16px;
      }
    }

    .live-rem__confirm__buttom {
      display: flex;
      justify-content: flex-end;

      .btn {
        padding: 5px 15px;
        font-size: 14px;
        cursor: pointer;
      }

    }
  }

  .live-rem__progress-line {
    width: 100%;
    height: 6px;
    margin-top: 12px;
    border-radius: 3px;
    background-color: #fff;
  }

  .live-rem__progress-bg {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background-color: $theme-color;
    transition: width .2s;
  }

  .live-rem__progress-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: .8;
    border-radius: 3px;
    background-color: #fff;
    animation: condensation-animation 1.5s infinite linear;
  }

</style>