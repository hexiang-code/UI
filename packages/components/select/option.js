import store from  '../../store'
const option = {
  name: 'hxOption',
  props: {
    label: {
      type: String,
      required: true
    },

    value: {
      type: [String, Number]
    }
  },

  render () {
    return ''
  },

  mounted () {
    store.commit('setSelectOptions', {
      defaultSlot: this.$slots.default,
      ...this.$props,
      uid: this._uid
    })
  },

  destroyed () {
    store.commit('delSelecteOptions', this._uid)
  }
}

export default option