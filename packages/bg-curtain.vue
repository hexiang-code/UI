<template>
  <div class="curtain" v-if="isShow" @click="closed"></div>
</template>

<script>
export default {
  name: 'curtain',
  props: {
    isShow: {
      type: Boolean,
      required: true,
      default: false
    } // 是否展示幕布
  },
  methods: {
    // 关闭幕布
    closed () {
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .curtain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: #000;
    opacity: .5;
  }
</style>