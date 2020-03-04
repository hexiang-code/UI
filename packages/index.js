// 导出install方法
import backgroundVideo from './background-video.vue'
import windowUtils from './vague-window-utils'
const elementArray = [
  backgroundVideo,
  windowUtils
]
const install = function (vue) {
  elementArray.forEach(item =>{
    vue.component(item.name, item)
  })
}

if (!window && typeof window.Vue !== 'undefined' ) install(window.Vue)

export default install
