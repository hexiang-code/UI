<template>
  <div class="curtain" v-if="isShow" @click.stop="closed" :style="`opacity: ${this.opacity};`"></div>
</template>

<script>
export default {
  name: 'curtain',
  props: {
    // 是否展示幕布
    isShow: {
      type: Boolean,
      required: true,
      default: false
    },
    // 透明度
    opacity: {
      type: Number,
      default: 1,
      validator: function (val) {
        return val >= 0 && val <= 1
      }
    }
  },
  methods: {
    // 关闭幕布
    closed () {
      this.$emit('curtainClose')
    }
  }
}
</script>

<style lang="scss" scoped>
  .curtain {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #000;
    opacity: .5;
  }
</style>