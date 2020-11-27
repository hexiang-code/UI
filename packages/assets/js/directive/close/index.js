

/**
 * 点击别的区域关闭当前标记节点
 * @param {Object} Vue 
 * @param {Boolean} isRemove 移除节点或隐藏节点 false：隐藏 true: 移除
 */
const close = Vue => {
  Vue.directive('close',  function (el, binding) {
    const { value: { isRemove = false } = {} } = binding
    document.addEventListener('click', function ($event) {
      let { target } = $event
      if(!el.contains(target))  {
        if (isRemove) el.parentNode && el.parentNode.removeChild(el)
        else el.style.display = 'none'
      }
    }, false)
  })
}

export default close