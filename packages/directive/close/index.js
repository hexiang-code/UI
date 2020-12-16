

/**
 * 点击别的区域关闭当前标记节点
 * 点击目标元素需注意阻止事件冒泡
 * @param {Object} Vue 
 * @param {Boolean} isRemove 移除节点或隐藏节点 false：隐藏 true: 移除
 */
const close = Vue => {
  Vue.directive('close', {
    inserted: function (el, binding, vnode) {
      const { value: { isRemove = false, closeCb } = {} } = binding
      document.addEventListener('click', function ($event) {
        let { target } = $event
        if(!el.contains(target))  {
          if (isRemove) el.parentNode && el.parentNode.removeChild(el)
          else el.style.display = 'none'
          closeCb && typeof closeCb === 'function' && closeCb.call(vnode.context)
        }
      }, false)
    }
  })
}

export default close