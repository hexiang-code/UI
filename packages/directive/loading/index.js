const loadingKey = '_loadingKey'
import loadingService from './utils'
const loading = Vue => {
  Vue.directive('loading', {
    bind: function (el, binding) {
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
      el[loadingKey] = loading
    },
    update: function (el, binding) {
      let isLoading, loading = el[loadingKey]
      let { value } = binding
      if (typeof value === 'boolean') {
        isLoading = value
      } else {
        isLoading = value.isLoading
      }
      loading && loading.init(isLoading)
    }
  })
}

export default loading