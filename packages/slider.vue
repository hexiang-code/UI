<template>
  <div class="slider" ref="slider">
    <div ref="sliderBlock" class="slider-block" v-drag:X="{moveCb: this.moveCb, initX: initOffSet}"></div>
  </div>
</template>

<script>
export default {
  name: 'hxSlider',
  props: {
    value: {
      required: true,
      type: Number,
      default: 30
    },

    max: {
      required: true,
      type: Number,
      default: 100
    },

    min: {
      required: true,
      type: Number,
      default: 0
    },
    toFixed: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      percent: 0, // 百分比
      initOffSet: 0 // 滑块初始化距离
    }
  },

  watch: {
    percent () {
      this.$emit('input', this.percent)
    }
  },

  mounted () {
    let sliderW = (this.$refs.slider.clientWidth + this.$refs.slider.clientLeft) - (this.$refs.sliderBlock.clientWidth + this.$refs.sliderBlock.clientLeft)
    this.initOffSet = sliderW * ((this.value -this.min) / (this.max - this.min))
  },

  methods: {
    // 滑块移动的回调函数
    moveCb ({x}) {
      let sliderW = (this.$refs.slider.clientWidth + this.$refs.slider.clientLeft) - (this.$refs.sliderBlock.clientWidth + this.$refs.sliderBlock.clientLeft)
      this.percent = Number(new Number((x/sliderW) * (this.max - this.min)).toFixed(this.toFixed))  + this.min
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider {
    position: relative;
    width: 150px;
    height: 4px;
    border-radius: 2px;
    background-color: #e5e5e5;

    .slider-block {
      position: absolute;
      top: -9px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid red;
      background-color: #fff;
    }
  }
</style>