
import loadingService from './utils'
const loading = Vue => {
  Vue.directive('loading', function (el, binding) {
    let isLoading, message
    let { value } = binding
    if (typeof value === 'boolean') {
      isLoading = value
    } else {
      isLoading = value.isLoading,
      message = value.message || 'loading'
    }
    let loading =  new loadingService({el, type: "directive", message})
    loading.init(isLoading)
  })
}

export default loading