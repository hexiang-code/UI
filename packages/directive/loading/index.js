
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
      if(binding.def) binding.def.loading = loading
    },
    update: function (el, binding) {
      let isLoading, loading = binding.def && binding.def.loading
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