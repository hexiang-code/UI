import { createCtxMenu } from './utils'
let parent = document.createElement('div')
document.body.appendChild(parent)
let ctxMenu // 右键菜单实例
const contextMenu = Vue => {
  Vue.directive('ctxmenu', function (el, binding, vNode) {
    let { value: { menuList } = {} } = binding
    let { context: ctx } = vNode
    if (menuList) {
      // el.addEventListener('contextmenu', ctxmenuHandler, false)
      el.oncontextmenu = function ($event) {
        $event.preventDefault()
        let { clientX, clientY } = $event
        if (!ctxMenu) {
          ctxMenu = new Vue({
            data() {
              return {
                clientX,
                clientY,
                menuList,
                visible: true
              }
            },
            render: function (h) {
              return this.visible ? createCtxMenu.call(this, h, ctx, this.menuList, this.clientX, this.clientY) : ''
            } 
          }).$mount(parent)
        } else {
          ctxMenu.menuList = menuList
          ctxMenu.clientX = clientX
          ctxMenu.clientY = clientY
          ctxMenu.visible = true
        }
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
