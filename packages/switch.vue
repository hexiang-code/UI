<template>
  <div class="switch-main">
    <slot name="switchLeft"></slot>
    <span :style="bgColor" :class="[value ? 'switch switch_open' : 'switch switch_close']" @click="switchClick"></span>
    <slot name="switchRight"></slot>
  </div>
</template>
<script>
export default {
  name: 'hxSwitch',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 选中颜色
    activeColor: {
      type: String,
      default: ''
    },
    // 未选中颜色
    inactiveColor: {
      type: String,
      default: ''
    }
  },

  computed: {
    bgColor () {
      return this.value ? 
              this.activeColor ? `background-color: ${this.activeColor}; border: 1px solid ${this.activeColor}` : '' :
              this.inactiveColor ? `background-color: ${this.inactiveColor}; border: 1px solid ${this.inactiveColor}` : ''     
    }
  },

  methods: {
    switchClick () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-main {
  display: inline-flex;
  align-items: center;

  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin: 0 10px;
    border-radius: 10px;
    background-color: #000;
    border: 1px solid #000;
  }

  .switch_close {
    position: relative;
  }

  .switch_open {
    position: relative;
  }

  .switch_open::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    animation: moveRight .2s linear forwards;
  }
  
  .switch_close::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    animation: moveLeft .2s linear forwards;
  }

  @keyframes moveRight {
    0% {
      transform: translateX(0%)
    }
    100% {
      transform: translateX(100%)
    }
  }

  @keyframes moveLeft {
    0% {
      transform: translateX(0%)
    }
    100% {
      transform: translateX(-100%)
    }
  }
}
</style>