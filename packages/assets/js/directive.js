import ImageLazy from './imageLazy'

const close = vue => {
  vue.directive('close', (el, binding, vnode) => {
    const fn = $event => {
      let res = hasParent(el, $event.target)
      if (res) vnode.context[binding.expression] = false
    }
    document.addEventListener('click', fn, true)
    // document.addEventListener('click', fn, true)
  })
}

// 拖拽指令
const drag = vue => {
  vue.directive('drag', 
      (el, binding, vnode) => {
        let disX, disY
        let { arg , value: {
          initX, initY, moveCb, limit
        } = {} } = binding
        if (initX) el.style.left = `${initX}px`
        if (initY) el.style.left = `${initY}px`
        el.onmousedown = ($event) => {
          if (!arg) {
            disX = $event.pageX - el.offsetLeft
            disY = $event.pageY - el.offsetTop
          }
          if (arg == 'X') disX = $event.pageX - el.offsetLeft
          if (arg == 'Y') disY = $event.pageY - el.offsetTop
          document.onmousemove = ($event) => {
            let move = new Proxy({x: 0, y: 0}, {
              get () {
                return Reflect.get(...arguments)
              },
              set (target) {
                setTimeout(() => {
                  if (moveCb && typeof moveCb === 'function') moveCb.call(vnode.context, target)
                }, 0);
                return Reflect.set(...arguments)
              }
            })
            if (disX) {
              let translateX = $event.pageX - disX
              translateX = limitTranslate(translateX, limit, el, 1)
              if (`${translateX}px` != el.style.left) {
                move.x = translateX
                el.style.left = `${translateX}px`
              }
            } 
            if (disY) {
              let translateY = $event.pageY - disY
              translateY = limitTranslate(translateY, limit, el, 2)
              if (`${translateY}px` != el.style.top) {
                move.y = translateY
                el.style.top = `${translateY}px`
              }
            }
          }
          document.onmouseup = () => {
            document.onmousemove = null
          }
        }
      }
    )
}

// 图片懒加载  （待优化）
const imgLazy = vue => {
  vue.directive('imgLazy', {
    inserted: function () {
      let imageLazy = new ImageLazy()
      imageLazy.bind(...arguments)
    }
    // unbind: imageLazy.unbind
  })
}

/**
 * 限制目标在父节点里移动
 * @param {Number} translate 移动距离
 * @param {Boolean} isLimit 是否限制目标节点在窗口里面拖拽
 * @param {Node} curNode 目标节点的父节点
 * @param {Number} mode 1：限制x轴的位移 2: 限制y轴位移
 * @return
 */
const limitTranslate = (translate, isLimit = true, curNode, mode = 1) => {
  if (!curNode.parentNode) isLimit = false
  if (!isLimit) return translate
  const { clientWidth: PW, clientHeight: PH } = document.documentElement || {} // 视口宽高
  const CH = curNode.clientHeight + curNode.clientTop // 子节点宽高
  const CW = curNode.clientWidth + curNode.clientLeft
  if (isLimit) {
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

export const directives = vue => {
  close(vue)
  drag(vue)
  imgLazy(vue)
}