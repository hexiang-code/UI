import './assets/css/animation.css'
import './assets/css/base.css'
process.env.NODE_ENV == 'development' && import('./assets/css/globalStyle.scss')
process.env.NODE_ENV == 'development' && import('./assets/css/baseIcon.scss')
import { createMouseAnimation } from './utils/mouse-animation'
import { directives } from './directive/index'
import { filters } from './filters/filters'

import LoadingService from './directive/loading/utils'

import { pointAnimation } from './utils/pointAnimation'

import backgroundVideo from './components/background-video/background-video'
import dialog from './components/dialog/dialog'
import drawer from './components/drawer/drawer'
import tree from './components/tree/tree'
import hxFormItem from './components/form/form-item'
import loadAnimation from './components/load-animation/load-animation'
import liveRem from './components/live-rem/live2d-rem'
import hxSwitch from './components/switch/switch'
import slider from './components/slider/slider'
import album from './components/album/album'
import pagination from './components/pagination/pagination'
import hxMessage from './components/meesage/meesage'
import hxTable from './components/table/table'
import hxTableColumn from './components/table/table-column'
import hxDatePicker from './components/date-picker/date-picker'
import canvasBg from './components/canvas-bg/canvas-bg'
import select from './components/select/select'
import options from './components/select/option'
import music from './components/music/music'
const elementArray = [
  backgroundVideo,
  dialog,
  drawer,
  tree,
  hxFormItem,
  loadAnimation,
  liveRem,
  canvasBg,
  hxSwitch,
  slider,
  album,
  pagination,
  hxMessage,
  hxTable,
  hxTableColumn,
  hxDatePicker,
  select,
  options,
  music
]

const install = function (vue) {
  elementArray.forEach(item =>{
    vue.component(item.name, item)
  })
  filters(vue)
  directives(vue)
  createMouseAnimation()
}

if (!window && typeof window !== 'undefined' ) install(window)



export default {
  install,
  
  // 组件
  backgroundVideo,
  dialog,
  drawer,
  tree,
  hxFormItem,
  loadAnimation,
  liveRem,
  canvasBg,
  hxSwitch,
  slider,
  album,
  pagination,
  hxMessage,
  hxTable,
  hxTableColumn,
  hxDatePicker,
  select,
  options,
  music,

  // 服务
  LoadingService,

  // 工具
  pointAnimation
}
