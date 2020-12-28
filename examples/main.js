import Vue from 'vue'
import App from './App.vue'

import hexiangUI from '../packages/index'
import '../lib/codeheUi.css'
Vue.use(hexiangUI)
Vue.config.performance = true
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
