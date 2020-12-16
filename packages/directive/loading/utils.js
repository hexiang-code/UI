import Vue from 'vue'
import loadAnimation from '../../components/load-animation/load-animation'
class LoadingService {
  constructor ({
    type = 'service', 
    el = this._createEl(), 
    message = '全力加载中...',
  } = {}) {
    this.type = type
    this.message = message
    this.realTextContent = ''
    if (el instanceof Vue || el instanceof HTMLElement) this.el = el
    else throw new Error('el 必须是HTML节点或者vue实例')
  }

  init (isLoading) {
    if (!this.el) return
    this.type == 'directive' && this._directiveLoading(isLoading)
    this.type == 'service' && this._serviceLoading(isLoading)
  }

  /**
   * 指令形式loading
   * @param {Boolean} isLoading 
   */
  _directiveLoading (isLoading) {
    if (isLoading) {
      this.el.classList.add('btn-loading', 'condensation-light')
      this.realTextContent = this.el.textContent
      this.el.textContent = this.message
    } else {
      this.el.classList.remove('btn-loading', 'condensation-light')
      if (this.realTextContent) this.el.textContent = this.realTextContent
    }
  }

  /**
   * 服务形式loading
   * @param {Boolean} isLoading 
   */
  _serviceLoading(isLoading) {
    if (this.el instanceof Vue)  {
      this.el.message = this.message
      this.el.loadingVisiable = isLoading
    }
    if (this.el instanceof HTMLElement) {
      isLoading && document.body.appendChild(this.el)
      !isLoading && this.el.parentNode.removeChild(this.el)
    }
  }

  _createEl () {
    let div = document.createElement('div')
    document.body.appendChild(div)
    return new Vue({
      data () {
        return {
          loadingVisiable: false,
          message: '',
          opacity: 0.5
        }
      },
      components: {
        'loading': loadAnimation
      },
      render () {
        return (
          <loading message={this.message} isShow={this.loadingVisiable} opacity={this.opacity}></loading>
        ) 
      }
    }).$mount(div)
  }
}

export default LoadingService