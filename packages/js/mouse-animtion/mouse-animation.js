import { randomColor } from './config'
/**
 * 创建鼠标点击动画
 */
const createMouseAnimation = () => {
  document.addEventListener('click', $event => {
    const color = randomColor()
    let lovelyIcon = document.createElement('div') 
    lovelyIcon.setAttribute('class', 'lovely-icon')
    let iconLeft = document.createElement('div') 
    iconLeft.setAttribute('class', 'lovely-icon__left')
    iconLeft.setAttribute('style', `background-color: ${color};`)
    let iconRight = document.createElement('div') 
    iconRight.setAttribute('class', 'lovely-icon__right')
    iconRight.setAttribute('style', `background-color: ${color};`)
    let iconCenter = document.createElement('div') 
    iconCenter.setAttribute('class', 'lovely-icon__center')
    iconCenter.setAttribute('style', `background-color: ${color};`)
    lovelyIcon.appendChild(iconLeft)
    lovelyIcon.appendChild(iconRight)
    lovelyIcon.appendChild(iconCenter)
    let { clientX, clientY } = $event
    lovelyIcon.setAttribute('style', `left: ${clientX}px; top: ${clientY}px;`)
    document.body.appendChild(lovelyIcon)
    setTimeout(() => {
      document.body.removeChild(lovelyIcon)
    }, 1000);
  }, true)
}

export {
  createMouseAnimation
}