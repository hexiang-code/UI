import { createCtxMenu } from './utils'
let parent

const contextMenu = Vue => {
  Vue.directive('ctxmenu', function (el, binding, vNode) {
    let { value: { menuList } = {} } = binding
    let { context: ctx } = vNode
    if (menuList) {
      // el.addEventListener('contextmenu', ctxmenuHandler, false)
      el.oncontextmenu = function ($event) {
        $event.preventDefault()
        parent && parent.parentNode && parent.parentNode.removeChild(parent)
        let { clientX, clientY } = $event
        parent = document.createElement('div')
        document.body.appendChild(parent)
        const ctxMenu = new Vue({
          data() {
            return {
              visible: true
            }
          },
          render: function (h) {
            return this.visible ? createCtxMenu.call(this, h, ctx, menuList, clientX, clientY) : ''
          } 
        }).$mount(parent)
        document.onclick = function ($event) {
          const ctxNode = ctxMenu.$el
          let { target } = $event
          if (!ctxNode.contains(target)) ctxMenu.visible = false
        }
        
      }
    }

  })
}

export default contextMenu
