const renderCustom = {

  props: {
    content:{
      type: Object | String,
      required: true
    } 
  },

  render () {
    return Object.prototype.hasOwnProperty.call(this.content, 'componentOptions') ? 
            this.content : 
            this.$createElement('span', this.content)
  }
}

export default renderCustom