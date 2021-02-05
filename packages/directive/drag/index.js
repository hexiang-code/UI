import { limitTranslate, getInitDestence } from './utils'

/**
 * 拖拽指令
 * @param {Number} initX 初始化x轴位置以屏幕左上角为原点
 * @param {Number} initY 初始化y轴位置以屏幕左上角为原点
 * @param {Function} moveCb 拖动元素回调函数，参数为{x, y}携带相对原点位置的对象
 * @param {Boolean} [limit = parent] 该元素是否限制拖动, 'parent': 在父节点里限制, window: 在窗口里限制, ''：则不限制
 * @param {Number} arg 参数为X/Y,可限制元素在某一方向(x轴/y轴)拖动
 */
const drag = Vue => {
  Vue.directive('drag', 
      (el, binding, vnode) => {
        let disX, disY
        let { arg , value: {
          initX, initY, moveCb, limit = 'parent'
        } = {} } = binding
        if (initX && initX !== 0) el.style.left = `${initX}px`
        if (initY && initY !== 0) el.style.top = `${initY}px`
        function mousedownHandle ($event) {
          $event.stopPropagation()
          let _getInitDestence = getInitDestence($event, el)
          if (!arg) {
            // disX = $event.pageX - el.offsetLeft
            // disY = $event.pageY - el.offsetTop
            disX = _getInitDestence('X')
            disY = _getInitDestence('Y')
          }
          if (arg == 'X') disX = _getInitDestence('X')
          if (arg == 'Y') disY = _getInitDestence('Y')
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
            if (disX != undefined && disX != null) {
              let translateX = $event.pageX - disX
              translateX = limitTranslate(translateX, limit, el, 1)
              if (`${translateX}px` != el.style.left) {
                move.x = translateX
                el.style.left = `${translateX}px`
              }
            } 
            if (disY != undefined && disY != null) {
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
        
        el.addEventListener('mousedown', mousedownHandle, true)
      }
    )
}

export default drag