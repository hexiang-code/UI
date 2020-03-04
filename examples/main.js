import Vue from 'vue'
import App from './App.vue'
import hexiangUI from '../packages/index'
Vue.use(hexiangUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
