import ImageLazy from './image-lazy'
const LAZY_KEY = '_imageLazyKey'

// 图片懒加载  （待优化）
const imgLazy = vue => {
  vue.directive('imgLazy', {
    inserted: function (el) {
      let imageLazy = new ImageLazy()
      imageLazy.update(...arguments)
      el[LAZY_KEY] = imageLazy
    },

    update: function (el) {
      let imageLazy = el[LAZY_KEY]
      imageLazy.update(...arguments)
    }
    // unbind: imageLazy.unbind
  })
}

export default imgLazy