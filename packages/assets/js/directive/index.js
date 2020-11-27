import imgLazy from './image-lazy'
import drag from './drag'
import open from './open'
import contextMenu from './context-menu'
import close from './close'
export const directives = vue => {
  close(vue)
  drag(vue)
  imgLazy(vue)
  open(vue)
  contextMenu(vue)
}