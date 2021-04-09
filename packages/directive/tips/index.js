import { RenderTips } from './utils'

const tips = Vue => {
  const renderTips = new RenderTips('' , Vue)
  Vue.directive('tips', (el, binding) => {
    let { value: { content } = {} } = binding
    el.addEventListener('mouseover', () => {
      if (content) {
        renderTips.tipsModel.targetEl = el
        renderTips.tipsModel.content = content
        renderTips.tipsModel.visible = true
      }
      el.addEventListener('mouseleave', () => {
        renderTips.tipsModel.visible = false
      }, false)
    }, false)
  })
}

export default tips