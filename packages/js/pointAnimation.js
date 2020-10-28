import html2canvas from 'html2canvas'
const translateX = 20
const translateY = 5
const pointSize = 1

/**
 * 切换动画
 * @param {vNode} targetNode 引用动画的vNode后者元素节点
 */
function pointAnimation (targetNode) {
  if (!(targetNode instanceof HTMLElement)) targetNode = targetNode.$el
  html2canvas(targetNode).then(canvas => {
    targetNode.parentNode.replaceChild(canvas, targetNode)
    pointContent(canvas, targetNode)
  })
}

// 翻页切换动画
function pointContent (canvas, targetNode) {
  let ctx = canvas.getContext('2d')
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let index = 0
  let pointArr = []
  for (let x = 0; x < canvas.width; x += pointSize) {
    for (let y = 0; y < canvas.height; y += pointSize) {
      let point = {};
      point.x = x;
      point.y = y;
      index = y * imageData.width + x
      point.color = 'rgba('+String(imageData.data[4*index]) + ',' + String(imageData.data[4*index+1]) + ',' + String(imageData.data[4*index+2]) + ',' + String(imageData.data[4*index+3]/255) + ')'
      pointArr.push(point);
    }
  }
  canvas.setAttribute('width', `${canvas.width}px`)
  canvas.setAttribute('height', `${canvas.height}px`)
  let foreachFn = () =>{
    let len = pointArr.length
    let pointIndex = 0
    while (pointIndex < len - 1) {
      let item = pointArr[pointIndex]
      if (pointIndex % 5 == 0) {
        let randomX = Math.random() * (Math.random() > 0.5 ? -translateX : translateX)
        let randomY = Math.random() * (Math.random() > 0.5 ? -translateY : translateY)
        ctx.fillStyle = item.color
        ctx.fillRect(item.x + randomX, item.y + randomY, pointSize, pointSize)
      }
      pointIndex ++
    }
  }
  foreachFn()
  let timer = setInterval(foreachFn, 50)
  setTimeout(() => {
    clearInterval(timer)
    canvas.parentNode.replaceChild(targetNode, canvas)
  }, 1000)
} 

export {
  pointAnimation
}