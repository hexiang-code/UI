import html2canvas from 'html2canvas'
const repetition = 2;
const canvasNums = 128
const html2CanvasOPtions = {
  backgroundColor: null,
}
/**
 * 切换动画
 * @param {vNode} targetNode 引用动画的vNode后者元素节点
 * @param {Number} time 动画持续时间
 */
async function pointAnimation (targetNode, time = 2000, params) {
  if (!(targetNode instanceof HTMLElement)) targetNode = targetNode.$el
  params = Object.assign({ scrollY: -window.pageYOffset }, html2CanvasOPtions, params)
  let canvas = await html2canvas(targetNode, params)
  let replaceNode = document.createElement('div')
  replaceNode.style = `height: ${canvas.height}px`
  replaceNode.classList.add('content-canvas')
  replaceNode.classList.add(targetNode.classList)
  targetNode.parentNode.replaceChild(replaceNode, targetNode)
  await pointContent(canvas, targetNode, replaceNode, time)
  return Promise.resolve()
}

/**
 * 沙化动画
 * @param {HTMLElement} canvas 
 * @param {HTMLElement} targetNode 被替换的dom
 * @param {HTMLElement} replaceNode 替换用的dom
 * @param {Number} time 动画持续时间
 */
function pointContent (canvas, targetNode, replaceNode, time) {
  return new Promise(resolve => {
    let nodes = new NewFrame(canvas, canvasNums)
    nodes.forEach((item, i) => {
      item.style.transitionDelay = `${1.7 * i / nodes.length}s`
      replaceNode.appendChild(item)
    })
    setTimeout(() => {
      nodes.forEach(item => {
        let randomRadian = 2 * Math.PI * (Math.random() - 0.5)
        item.style.transform = `rotate(${15 * (Math.random() - 0.5)}deg) translate(${60 * Math.cos(randomRadian)}px, ${30 * Math.sin(randomRadian)}px) rotate(${15 * (Math.random() - 0.5)}deg)`;
        item.style.opacity = 0;
      })
      setTimeout(() => {
        replaceNode.parentNode.replaceChild(targetNode, replaceNode)
        resolve()
      }, time)
    })
  })
} 

function NewFrame(canvas, count = 32) {
  let {
      width,
      height
  } = canvas;
  let ctx = canvas.getContext("2d");
  let originalData = ctx.getImageData(0, 0, width, height);
  let imageDatas = [...Array(count)].map(() => ctx.createImageData(width, height))

  for (let x = 0; x < width; ++x)
      for (let y = 0; y < height; ++y) {
          for (let i = 0; i < repetition; ++i) {
              let dataIndex = Math.floor(count * (Math.random() + 2 * x / width) / 3);
              let pixelIndex = (y * width + x) * 4;
              for (let offset = 0; offset < 4; ++offset) 
              imageDatas[dataIndex].data[pixelIndex + offset] = originalData.data[pixelIndex + offset];
          }
      }
  return imageDatas.map(data => {
      let clone = canvas.cloneNode(true);
      clone.getContext("2d").putImageData(data, 0, 0);
      return clone;
  });
}

export {
  pointAnimation
}