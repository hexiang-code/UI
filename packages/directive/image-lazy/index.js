import ImageLazy from './image-lazy'

// 图片懒加载  （待优化）
const imgLazy = vue => {
  vue.directive('imgLazy', {
    inserted: function () {
      let imageLazy = new ImageLazy()
      imageLazy.bind(...arguments)
    }
    // unbind: imageLazy.unbind
  })
}

export default imgLazy