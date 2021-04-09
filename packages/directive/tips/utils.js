class RenderTips {

  constructor (content = '', Vue) {
    this.content = content
    this.tipsModel = null
    this.vue = Vue
    this._init()
  }
  
  _init () {
    let div = document.createElement('div') 
    document.body.appendChild(div)
    if (this.content instanceof HTMLElement) div.appendChild(this.content)
    this.tipsModel = new this.vue({
      data: {
        content: this.content, // 需要渲染的内容 可以是文字、html节点、或者是vNode
        visible: false, // 是否显示提示
        top: 0, // 屏幕上边的距离
        left: 0, // 屏幕右边的距离
        targetEl: null, // 需要展示tips的目标元素
        style: '',
        class: ''
      },

      watch: {
        content () {
          this.$nextTick(() => {
            // top: 元素顶端到视口上边的距离，bottom元素底端到视口上边的距离
            // 都是以视口上边做基准的
            let { bottom = 0, top = 0, left = 0 } = (this.targetEl && this.targetEl.getBoundingClientRect()) || {}
            // 计算元素底部到视口底部的距离
            let bottomDistance = window.innerHeight - bottom
            let { height: _selfHeight } = this.$el.getBoundingClientRect()
            // TODO 未考虑 top - (10 + _selfHeight) < 0 的情况
            const tipsTop = bottomDistance > top ? bottom + 10 : top - (10 + _selfHeight)
            const tipsLeft = parseInt(left)
            this.style = `top: ${tipsTop}px; left: ${tipsLeft}px`
            this.class = bottomDistance > top ? 'tips-arrow_up' : 'tips-arrow_down'
          })
        }
      },

      render (h) {
        return (
          this.visible && this.content
            ? (
              <div class="tips-content" style={this.style}>
                <div class={this.class}></div>
                { reundeCustom(h, this.content) }
              </div>
            )
            : ''
        )
      }
    }).$mount(div)
  }
}

/**
 * 自定义渲染内容
 * @param {Function} h 
 * @param {Object | String} content 自定义渲染内容
 * @returns 
 */
const reundeCustom = (h, content) => {
  if (Object.prototype.hasOwnProperty.call(content, 'componentOptions')) {
    return content 
  } else {
    return h('div', {
      domProps: {
        innerHTML: content
      }
    })
  }
}

/**
 * 计算tips展示位置，是在当前元素的上边还是当前元素的下边
 * @param {Number} left 
 * @param {Number} top 
 * @param {HTMLElement} el 
 * @returns 
 */
const computedPosition = (el = null) => {
  // top: 元素顶端到视口上边的距离，bottom元素底端到视口上边的距离
  // 都是以视口上边做基准的
  let { bottom = 0, top = 0, left = 0 } = (el && el.getBoundingClientRect()) || {}
  // 计算元素底部到视口底部的距离
  let bottomDistance = window.innerHeight - bottom
  return { 
    style: {
      // 10 表示箭头的高度
      top: `${ bottomDistance > top ? bottom + 10 : top - 10}px`, 
      left: `${left}px` 
    },
    class: bottomDistance > top ? 'tips-arrow_up' : 'tips-arrow_down'
  }
}

export { RenderTips } 