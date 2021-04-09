import imgLazy from './image-lazy'
import drag from './drag'
import open from './open'
import contextMenu from './context-menu'
import close from './close'
import loading from './loading'
import tips from './tips'

export const directives = vue => {
  close(vue)
  drag(vue)
  imgLazy(vue)
  open(vue)
  contextMenu(vue)
  loading(vue)
  tips(vue)
}