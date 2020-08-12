
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

function formatDate(formatText, timestamp = +new Date()) {
  const _getFullDate = val => {
    if (String(val).length < 2) {
      return '0' + String(val)
    } else {
      return val
    }
  }
  const replaceFn = (str, _target) => {
    if (str.length == 2) return _getFullDate(_target)
    else return _target
  }
  let targetDate = new Date(timestamp),
  _targetYear = targetDate.getFullYear(),
  _targetMonth = targetDate.getMonth() + 1,
  _targetDay = targetDate.getDate(),
  _targetHour = targetDate.getHours(),
  _targetMinutes = targetDate.getMinutes(),
  _targetSecond = targetDate.getSeconds(),
  returnText = ''
  returnText = formatText.replace(/Y+/g, function (str) {
    return String(_targetYear).slice(String(_targetYear).length - str.length)
  })
  returnText = returnText.replace(/M+/g, function (str) {
    return replaceFn(str, _targetMonth)
  })
  returnText = returnText.replace(/D+/g, function (str) {
    return replaceFn(str, _targetDay)
  })
  returnText = returnText.replace(/H+/g, function (str) {
    return replaceFn(str, _targetHour)
  })
  returnText = returnText.replace(/m+/g, function (str) {
    return replaceFn(str, _targetMinutes)
  })
  returnText = returnText.replace(/s+/g, function (str) {
    return replaceFn(str, _targetSecond)
  })
  return returnText
}

export {
  debounce,
  throttle,
  formatDate
}
