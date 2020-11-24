import imgLazy from './image-lazy'
import drag from './drag'
import open from './open'

export const directives = vue => {
  close(vue)
  drag(vue)
  imgLazy(vue)
  open(vue)
}