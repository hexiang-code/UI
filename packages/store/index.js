import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    tableColumn: [], // 表格列
    selectOptions: [] // 选择框选项
  },
  getters: {
    getTableColumn (state) {
      return state.tableColumn
    },

    getSelectOptions (state) {
      return state.selectOptions
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
    },

    setSelectOptions (state, val) {
      if (state.selectOptions instanceof Array) state.selectOptions.push(val)
    },

    delSelecteOptions (state, id) {
      if (id) {
        let index = state.selectOptions && state.selectOptions.findIndex(item => item.uid == id)
        if (index > -1) {
          state.selectOptions = state.selectOptions.splice(index, 1)
        }
      }
    },
  }
})

export default store