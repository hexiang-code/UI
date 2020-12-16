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

export {
  limitTranslate
} 