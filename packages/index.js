import './assets/css/animation.css'
process.env.NODE_ENV == 'development' && import('./assets/css/globalStyle.scss')
process.env.NODE_ENV == 'development' && import('./assets/css/baseIcon.scss')
import { createMouseAnimation } from './assets/js/mouse-animation'
import { directives } from './assets/js/directive/index'
import { filters } from './assets/js/filters'

import backgroundVideo from './components/background-video.vue'
import dialog from './components/dialog'
import drawer from './components/drawer.vue'
import tree from './components/tree.vue'
import hxFormItem from './components/form-item.vue'
import loadAnimation from './components/load-animation.vue'
import liveRem from './components/live-rem/live2d-rem.vue'
import hxSwitch from './components/switch.vue'
import slider from './components/slider.vue'
import album from './components/album.vue'
import pagination from './components/pagination.vue'
import hxMessage from './components/meesage.vue'
import hxTable from './components/table/table.vue'
import hxTableColumn from './components/table/table-column.vue'
import hxDatePicker from './components/date-picker/date-picker.vue'
import canvasBg from './components/canvas-bg/canvas-bg.vue'
import select from './components/select/select.vue'
import options from './components/select/option'
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
  options
]

const install = function (vue) {
  elementArray.forEach(item =>{
    vue.component(item.name, item)
    filters(vue)
  })
  directives(vue)
  createMouseAnimation()
}

if (!window && typeof window.Vue !== 'undefined' ) install(window.Vue)



export default install
