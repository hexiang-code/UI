let AudioContext
let audioContext
let analyser
let audioSrc
let canvas
let ctx
let grd
let grd2
let het = 0
let globalID
let canvasHeight
let canvasWidth
/**
 * 渲染背景动画
 */
function render() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  let dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  ctx.beginPath();
  for (let i = 0; i < 200; i++) {
    let value = dataArray[6 * i] / Math.ceil(256/Math.ceil(canvasHeight/2))
    ctx.fillStyle = grd;
    ctx.fillRect(i * 3, canvasHeight/2, 2, -value + 1);
    // ctx.fillRect(i * 3, 280 - value, 2, het);
    ctx.fillStyle = grd2;
    ctx.fillRect(i * 3, canvasHeight/2, 2, value + 1);
    // ctx.fillRect(i * 3, 320 + value, 2, het);
  }
  globalID = requestAnimationFrame(render)
}

/**
 * 初始化音乐背景
 * @param {HTMLNode} canvasObj 
 * @param {HTMLNode} audioObj 
 */
function musicCanvasInit (canvasObj, audioObj) {
  // audioObj.crossOrigin = "anonymous"
  AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 256;
  analyser = audioContext.createAnalyser()
  audioSrc = audioContext.createMediaElementSource(audioObj)
  audioSrc.connect(analyser);
  analyser.connect(audioContext.destination)
  canvas = canvasObj
  canvasWidth = canvas.width
  canvasHeight = canvas.height
  ctx = canvas.getContext("2d")
  ctx.lineWidth = 2
  grd = ctx.createLinearGradient(0, 0, canvasHeight, 0)
  grd.addColorStop(0, "#fff")
  grd.addColorStop(1, "#e720ee")
  grd2 = ctx.createLinearGradient(0, 0, canvasHeight, 0)
  grd2.addColorStop(0, "#00d0ff")
  grd2.addColorStop(1, "#eee")
}

/**
 * 暂停或开始音乐背景
 * @param {Boolean} type 
 */
function stopOrStartMusicCanvas (type) {
  if (type) {
    render()
  } else {
    window.cancelAnimationFrame(globalID)
  }
}
export {
  musicCanvasInit,
  stopOrStartMusicCanvas
}