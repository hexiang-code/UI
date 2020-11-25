
import { targetNodeHandler } from './utils'
/**
 * 节点展开关闭指令
 * @param {String|Object} target 需要被关闭的目标节点(必填)
 */
const open = Vue => {
  Vue.directive('open', 
  function (el, binding, vnode) {
    let { value: { target, targetClass, height } = {} } = binding
    // 如果指定需要开关的节点
    if (target) {
      let targetNode = target instanceof HTMLElement ? target : document.getElementById(target)
      targetNode.classList.add('element-transition')
      el.addEventListener('click',$event => targetNodeHandler($event, targetNode, targetClass, height), false)
    }
  })
}

export default open