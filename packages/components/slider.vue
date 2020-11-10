<template>
  <div class="slider" ref="slider" @click.stop="clickSlider($event)">
    <div class="slider-bar" ref="sliderBar"></div>
    <div ref="sliderBlock" class="slider-block" @click.stop v-drag:X="{moveCb: this.moveCb, initX: initOffSet}"></div>
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
      validator: function (value) {
        return value > 0
      }, 
      default: 100
    },

    min: {
      required: true,
      type: Number,
      validator: function (value) {
        return value > 0
      },
      default: 0
    },
    toFixed: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      sliderWidth: 0, // 滑块轨道总宽度
      sliderBlockWidth: 0 // 滑块宽度
    }
  },


  computed: {
    initOffSet: {
      get () {
        let initOffSet = 0
        let sliderW = this.sliderWidth - this.sliderBlockWidth
        initOffSet = sliderW * ((this.value -this.min) / (this.max - this.min))
        this.computeOffset(initOffSet)
        return initOffSet
      },

      set (val) {
        this.computeOffset(val)
      }
    }
  },

  mounted () {
    this.sliderWidth = this.$refs.slider.clientWidth + this.$refs.slider.clientLeft
    this.sliderBlockWidth = this.$refs.sliderBlock.clientWidth + this.$refs.sliderBlock.clientLeft
    this.computeOffset(this.initOffSet)
  },

  methods: {
    // 滑块移动的回调函数
    moveCb ({x}) {
      this.initOffSet = x
    },

    // 点击滑动轨迹
    clickSlider ($event) {
      this.initOffSet = $event.offsetX
    },

    // 滑块偏移量
    computeOffset (moveX) {
      if (this.$refs.sliderBar) this.$refs.sliderBar.style.width = `${moveX}px`
      let sliderW = this.sliderWidth - this.sliderBlockWidth
      let percent = Number(new Number((moveX/sliderW) * (this.max - this.min) + this.min).toFixed(this.toFixed))
      percent = percent >= this.min ? percent : this.min 
      percent = percent <= this.max ? percent : this.max 
      this.$emit('input', percent)
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider {
    position: relative;
    width: 150px;
    height: 6px;
    border-radius: 3px;
    background-color: #e5e5e5;

    .slider-block {
      position: absolute;
      top: -7px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid #33B5E5;
      background-color: #fff;
    }

    .slider-bar {
      height: 6px;
      border-radius: 3px;
      background-color: #33B5E5;
    }
  }
</style>