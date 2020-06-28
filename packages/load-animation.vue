<template>
  <transition name="baiyechuang">
    <div v-if="isShow" class="load-animation" @click.capture="curtainClose">
      <curtain :isShow="isShow" v-if="isModal" @curtainClose="curtainClose" key="curtain"></curtain>
      <div class="load-animtion__border border-animation" v-if="isShow">
        <div class="load-animation__content condensation-light"> watting... </div>
      </div>
    </div>
  </transition>
</template>

<script>
import curtain from './bg-curtain'
export default {
  name: 'loadAnimation',
  components: {
    curtain
  },
  props: {
    isShow: {
      type: Boolean,
      required: true,
      default: false
    },
    isModal:  {
      type: Boolean,
      required: false,
      default: true
    },
    isNeedClose: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    curtainClose () {
      this.isNeedClose && this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .load-animation {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100000;
  }

  .curtain {
    opacity: 1;
  }

  .load-animation__content {
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
    // background-color: #000;
  }

  .load-animtion__border {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -40px;
    z-index: 1001;
    width: 200px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 20px;
    color: #ffffff;
    border: 2px solid #fff;
    font-weight: bold;
  }
</style>