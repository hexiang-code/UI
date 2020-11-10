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
  name: 'hxFormItem',
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
      return this.labelIcon ? this.labelIcon : require('../assets/image/leimu-icon.png')
    },

    labelWidthStyle () {
      return this.labelWidth ? `width: ${this.labelWidth};` : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/_globalStyle.scss';
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
  color: $theme-color;
}

.login-label__icon {
  position: absolute;
  width: 30px;
  height: 30px;
  right: -30px;
  top: -5px;
}
</style>