/**
 * 限制目标在父节点里移动
 * @param {Number} translate 移动距离
 * @param {Boolean} limit 是否限制目标节点在窗口里面拖拽
 * @param {Node} curNode 目标节点的父节点
 * @param {Number} mode 1：限制x轴的位移 2: 限制y轴位移
 * @return
 */
const limitTranslate = (translate, limit = 'parent', curNode, mode = 1) => {
  if (!curNode.parentNode) limit = 'window'
  if (!limit) return translate
  const { clientWidth: PW, clientHeight: PH } = (limit == 'parent' ? curNode.parentNode : document.documentElement) || {} // 视口宽高
  const CH = curNode.clientHeight + curNode.clientTop // 子节点宽高
  const CW = curNode.clientWidth + curNode.clientLeft
  if (limit) {
    let maxY = PH - CH // y轴最大位移距离
    let maxX = PW - CW // x轴最大位移距离
    // 如果父元素没有当前元素大，则以窗口大小限制
    if (maxX <= 0) maxX = window.innerWidth - CW
    if (maxY <= 0) maxY = window.innerHeight - CH
    // console.log(maxY, translate)
    if (mode == 1) translate = translate >= maxX ? maxX : translate
    if (mode == 2) translate = translate >= maxY ? maxY : translate
    translate = translate <= 0 ? 0 : translate
  }
  return translate
}

/**
 * 计算鼠标悬浮位置到元素边框的距离
 * @param {Event} $event mousedown的event事件
 * @param {HTMLELement} curEl 当前的目标节点 
 * @param {String} type X: 计算X轴上的初始位置，Y:计算Y轴上的初始位置
 * @returns {Number}
 */
const computedDestence = ($event, curEl) => {
  let _curElPostion = _getElPosition(curEl)
  return function (type = 'X') {
    // 如果目标元素没有定位方式，则为当前元素增加默认定位方式relative
    if (!_curElPostion) curEl.style.position = 'relative'
    // 不管是x/y轴上面的移动，只要当前元素的定位方式为relative, 则返回pageX/pageY
    if (_curElPostion == 'relative') return type == 'X' ? $event.pageX : $event.pageY
    // 计算fixed absolute两种定位方式的目标元素的初始位置
    else if (_curElPostion == 'fixed') {
      let { x: originX, y: originY } = _getOriginDestence(curEl)
      return type == 'X' 
              ? $event.pageX - originX
              : $event.pageY - originY
    } else if (_curElPostion == 'absolute') {
      // 对于absolute定位方式的初始位置计算，则通过寻找与当前元素关系最近的拥有定位方式祖先元素
      while(curEl.parentNode) {
        let parentNode = curEl.parentNode
        let _parentNodePosition = _getElPosition(parentNode)
        if (_parentNodePosition) {
          if (_parentNodePosition == 'fixed') {
            // 如果祖先元素也是fixed定位，则处理方式更当前元素fixed定位一样
            let { x: originX, y: originY } = _getOriginDestence(curEl)
            return type == 'X' 
                    ? $event.pageX - originX 
                    : $event.pageY - originY
          } else {
            // 如果是relative 或者absolute定位
            // 这里不能用offsetTop, 是因为offsetTop是子元素到直接父元素的距离，这里遍历祖先节点找到第一个拥有定位的祖先节点
            let { x: curELOriginX, y: curELOriginY } = _getOriginDestence(curEl)
            let { x: parentOriginX, y: parentOriginY } = _getOriginDestence(parentNode)
            return type == 'X' 
                    ? $event.pageX - (curELOriginX - parentOriginX)
                    : $event.pageY - (curELOriginY - parentOriginY)
          }
        }
      }
      // 如果所有的祖先节点都没有定位方式，按照fixed处理
      let { x: originX, y: originY } = _getOriginDestence(curEl)
      return type == 'X' 
              ? $event.pageX - originX 
              : $event.pageY - originY
    }
  }
  
}

/**
 * 获取目标元素的定位方式
 * @param {HTMLElement} targetEl 
 * @returns {String}
 */
const _getElPosition = targetEl => {
  if (!window.getComputedStyle) return ''
  if (targetEl.style && targetEl.style.position) return targetEl.style.position
  let style = window.getComputedStyle(targetEl)
  return style && style.position
}

/**
 * 获取元素相距屏幕左上角的距离
 * @param {HTMLElement} el 
 * @returns
 */
const _getOriginDestence = el => {
  let { x = 0, y = 0 } = el.getBoundingClientRect()
  return { x: parseInt(x), y: parseInt(y) }
}

export {
  limitTranslate,
  computedDestence
} 