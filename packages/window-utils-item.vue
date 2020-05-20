<template>
      <div class="login-input">
        <p class="login-label" :style="labelWidthStyle">
          {{label}}:
          <img class="login-label__icon" :src="labelIconSrc" />
        </p>
        <slot></slot>
      </div>
</template>

<script>
export default {
  name: 'windowUtilsItem',
  props: {
    // 标签文本
    label: {
      type: String,
      required: true,
      default: ''
    },
    // 标签宽度
    labelWidth: {
      type: String,
      default: ''
    },
    // 标签图标
    labelIcon: {
      type: String,
      default: ''
    }
  },

  computed: {
    labelIconSrc () {
      return this.labelIcon ? this.labelIcon : require('../public/leimu-icon.png')
    },

    labelWidthStyle () {
      return this.labelWidth ? `width: ${labelWidth};` : ''
    }
  }
}
</script>

<style lang="scss" scoped>

.login-input {
  display: flex;
  height: 60px;
  align-items: center;
}

.login-label {
  position: relative;
  display: inline-block;
  width: 140px;
  margin-right: 40px;
  text-align: right;
  font-weight: 700;
  color: #1296db;
}

.login-label__icon {
  position: absolute;
  width: 30px;
  height: 30px;
  right: -30px;
  top: -5px;
}
</style>