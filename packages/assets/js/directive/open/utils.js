/**
 * 目标节点收缩处理
 * @param {Event} $event 点击事件参数
 * @param {HTMLElement} targetNode 目标节点
 * @param {String} targetClass 指定缩放后的样式类名(vue 样式scope会被加上hash导致无效, 切记切记！)
 * @param {Number} height 指定缩放后的高度 优先级高于类名
 */
function targetNodeHandler ($event, targetNode, targetClass = 'element-close', height) {
  if (height) {
    if (!targetNode.style.height) {
      targetNode.style.cssText = `height: ${height}px; max-height: ${height}px; overflow: hidden;`
      $event.target.innerHTML = '&#xe680;'
    } else {
      targetNode.style.height = ''
      targetNode.style.maxHeight = ''
      targetNode.style.overflow = ''
      $event.target.innerHTML = '&#xe67c;'
    }
    return
  }
  let classList = targetNode.classList
  if (classList.contains(targetClass)) {
    classList.remove(targetClass)
    $event.target.innerHTML = '&#xe67c;'
  } else {
    classList.add(targetClass)
    $event.target.innerHTML = '&#xe680;'
  }
}

export {
  targetNodeHandler
}