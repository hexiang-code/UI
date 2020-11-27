const offsetX = -30 // 菜单弹框往右的偏移量
const offsetY = 10 // 菜单弹框往下的偏移量
function createCtxMenu (h, ctx, menuList, clientX, clientY) {
  return (
    <ul class="ctx-menu"
        style={{ top: `${clientY + offsetY}px`, left: `${clientX + offsetX}px` }}>
        {
          getMenuList.call(this, h, ctx, menuList)
        }
    </ul>
  )
}

function getMenuList (h, ctx, menuList) {
  // 如果menuList是vNode，直接渲染menuList
  if (Object.prototype.hasOwnProperty.call(menuList, 'componentOptions')) {
    return menuList
  } else if (Array.isArray(menuList)) { // 如果是数组
    return (
      menuList.map(menu => {
        let { clickCallback, label } = menu
        return (
          <li onClick={() => {
            if(clickCallback && typeof clickCallback === 'function') {
              clickCallback.call(ctx)
              this.visible = false
            }  
          }}>
            {
              label 
                ? Object.prototype.hasOwnProperty.call(label, 'componentOptions') 
                  ? label 
                  : ctx.$createElement('span', label)
                : ''
                
            }
          </li>
        )
      })
    )
  } else {
    return ctx.$createElement('li', menuList)
  }
}

export {
  createCtxMenu
}