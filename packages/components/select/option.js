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

  inject: ['select'],

  render () {
    return ''
  },

  mounted () {
    this.select.setOptions({
      defaultSlot: this.$slots.default,
      ...this.$props,
      uid: this._uid
    })
  },

  destroyed () {
    this.select.delOptions(this._uid)
  }
}

export default option