import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    tableColumn: [], // 表格列
  },
  getters: {
    getTableColumn (state) {
      return state.tableColumn
    }
  },

  mutations: {
    setTableColumn (state, val) {
      if (state.tableColumn instanceof Array) state.tableColumn.push(val)
    },

    delTableColumn (state, id) {
      if (id) {
        let index = state.tableColumn && state.tableColumn.findIndex(item => item.uid == id)
        if (index > -1) {
          state.tableColumn = state.tableColumn.splice(index, 1)
        }
      }
    }
  }
})

export default store