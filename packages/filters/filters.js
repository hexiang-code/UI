import { formatDate } from '../utils/utils'

const filters = vue => {
  vue.filter('formatDate', (val, format) => formatDate(format, val))
}
export {
  filters
}