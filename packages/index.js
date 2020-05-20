// 导出install方法
import backgroundVideo from './background-video.vue'
import windowUtils from './vague-window-utils'
import drawer from './drawer.vue'
import tree from './tree.vue'
import windowUtilsItem from './window-utils-item.vue'
import loadAnimation from './load-animation.vue'
import './animation.css'
const elementArray = [
  backgroundVideo,
  windowUtils,
  drawer,
  tree,
  windowUtilsItem,
  loadAnimation
]

const install = function (vue) {
  elementArray.forEach(item =>{
    vue.component(item.name, item)
  })
  vue.directive('close', (el, binding, vnode) => {
    const fn = $event => {
      let res = hasParent(el, $event.target)
      if (res) vnode.context[binding.expression] = false
    }
    document.addEventListener('click', fn, true)
    document.addEventListener('click', fn, true)
  })
}

if (!window && typeof window.Vue !== 'undefined' ) install(window.Vue)

/**
 * 判断当前节点是否是某节点的子元素
 * @param {Node} node 
 * @param {Node} parent 
 */
const hasParent = (curNode, parent) => {
  while (curNode) {
    curNode = curNode.parentNode;
    if (curNode === parent) {
      return true;
    }
  }
  return false;
}

export default install
