import { defaultOption } from './default-option'
class ImageLazy {
  constructor(options = {}) {
    this.options = Object.assign(defaultOption, options)
    this.intersectionObserver = null
    this.dataSrc = ''
    this.status = ''
    if (window && window.IntersectionObserver) this.intersectionObserver = new IntersectionObserver(this.imageVisibel.bind(this))
    else throw new Error('您的浏览器暂不支持图片懒加载')
  }

  update (el) {
    if (!this.intersectionObserver) return
    this.intersectionObserver.observe(el)
    this.dataSrc = el.src
    el.src = this.options.loading
    this.status = 'loading'
    this.el = el
  }

  unbind () {
    this.intersectionObserver.disconnect()
    this.options = null
    this.intersectionObserver = null
    this.dataSrc = null
    this.status = null
  }

  imageVisibel (entries) {
    let [ entry ] = entries
    if (entry.intersectionRatio > 0) {
      let image = new Image()
      image.src = this.dataSrc
      image.onload = () => {
        this.el.src = this.dataSrc
        this.intersectionObserver.unobserve(this.el)
        this.changeStatus('success')
      }
      image.onerror = () => {
        this.el.src = this.options.error
        this.changeStatus('error')
      }
    }
  }

  changeStatus (status) {
    this.status = status
  } 
}


export default ImageLazy