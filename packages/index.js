// 导出install方法
import backgroundVideo from './background-video.vue'
import windowUtils from './vague-window-utils'
import drawer from './drawer.vue'
import tree from './tree.vue'
import windowUtilsItem from './window-utils-item.vue'
import loadAnimation from './load-animation.vue'
import liveRem from './live-rem/live2d-rem.vue'
import hxSwitch from './switch.vue'
import slider from './slider.vue'
import album from './album.vue'
import './css/animation.css'
import './css/live2d.css'
import './css/globalStyle.scss'
import './css/baseIcon.scss'
// import '../public/live-model/rem/rem.json'
import canvasBg from './canvas-bg/canvas-bg.vue'
import { createMouseAnimation } from './js/mouse-animation'
import { directives } from './js/directive'
const elementArray = [
  backgroundVideo,
  windowUtils,
  drawer,
  tree,
  windowUtilsItem,
  loadAnimation,
  liveRem,
  canvasBg,
  hxSwitch,
  slider,
  album
]

const install = function (vue) {
  elementArray.forEach(item =>{
    vue.component(item.name, item)
    directives(vue)
  })
  createMouseAnimation()
}

if (!window && typeof window.Vue !== 'undefined' ) install(window.Vue)



export default install
