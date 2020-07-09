
/**
 * 函数防抖
 * @param {Function} fn 需要防抖的函数
 * @param {Number} wait 等待时间 单位毫秒
 * @param {Object} ctx fn函数执行的上下文环境
 */
function debounce (fn, wait = 200, ctx = null) {
  let timer
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(ctx, ...arguments)
    }, wait)
  }
}
/**
 * 函数节流
 * @param {any} fn 
 * @param {number} [wait=200] 
 * @param {any} [ctx=null] 
 */
function throttle(fn, wait = 200, ctx = null) {
  let timer
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.call(ctx, ...arguments)
      timer = null
    }, wait);
  }
}

export {
  debounce,
  throttle
}
