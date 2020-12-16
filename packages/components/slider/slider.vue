<template>
  <div class="slider_row" ref="sliderRow" @click.stop="clickSlider($event)" v-if="direction == 'X'">
    <div class="slider-bar" ref="sliderBarRow"></div>
    <div ref="sliderBlockRow" class="slider-block" @click.stop v-drag:X="{moveCb: this.moveCb, initX: initOffSet}"></div>
  </div>
    <div class="slider_column" ref="sliderColumn" @click.stop="clickSlider($event)" v-else>
    <div class="slider-bar" ref="sliderBarColumn"></div>
    <div ref="sliderBlockColumn" class="slider-block" @click.stop v-drag:Y="{moveCb: this.moveCb, initY: sliderWidth - sliderBlockWidth - initOffSet}"></div>
  </div>
</template>

<script>
let observer // dom观察器
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
        return value >= 0
      },
      default: 0
    },
    toFixed: {
      type: Number,
      default: 2
    },

    // 滑块方向X:横 Y:竖
    direction: {
      type: String,
      default: 'X',
      validator: function(val) {
        return ['X', 'Y'].includes(val)
      }
    }
  },
  data () {
    return {
      sliderWidth: 0, // 滑块轨道总宽度 (这里的宽度是指沿x轴方向时轨道宽度，沿y轴方向时轨道高度)
      sliderBlockWidth: 0, // 滑块宽度 (通上)
    }
  },


  computed: {
    // 水平方向移动式initOffset为滑轨左边界至滑块左边界的距离
    // 垂直方向移动时initOffset为滑轨底边界至滑块底边界的距离
    initOffSet: {
      get () {
        let initOffSet = 0
        let { sliderWidth, sliderBlockWidth, value, min, max } = this
        if (value > max) {
          value = max
          console.warn(`hxSlider：value不允许大于max,已为您修改value值为${max}`)
          this.$emit('input', value)
        }
        if (min > value) {
          value = min
          console.warn(`hxSlider：value不允许小于min,已为您修改value值为${min}`)
          this.$emit('input', value)
        }
        let sliderW = sliderWidth - sliderBlockWidth
        // if (this.direction === 'X') initOffSet = sliderW * ((value - min) / (max - min))
        // // drag组件在y轴拖动时,以top距离为计算准则,默认以向下为正方向, slider以在y轴拖动时以向下为正方向，因此需要转换计算方式
        // if (this.direction === 'Y') initOffSet = sliderWidth - sliderW * ((value - min) / (max - min)) - sliderBlockWidth
        initOffSet = sliderW * ((value - min) / (max - min))
        this.computeOffset(initOffSet)
        return initOffSet
      },

      set (val) {
        this.computeOffset(val, true)
      }
    }
  },

  mounted () {
    this.computedSliderWidth()
    if (!this.sliderWidth && !this.sliderBlockWidth) {
      observer = new MutationObserver(() => {
        this.computedSliderWidth()
      })
      let target = this.direction == 'X' ? this.$refs['sliderRow'] : this.$refs['sliderColumn']
      observer.observe(target, {
        attributes: true
      })
    }
    
    this.computeOffset(this.initOffSet)
  },

  destroyed () {
    observer && observer.disconnect();
  },

  methods: {
    // 计算轨道和滑块的宽度
    computedSliderWidth () {
      if (this.direction === 'X' && this.$refs['sliderRow'] && this.$refs['sliderBlockRow']) {
        this.sliderWidth = this.$refs['sliderRow'].clientWidth + this.$refs['sliderRow'].clientLeft
        this.sliderBlockWidth = this.$refs['sliderBlockRow'].clientWidth + this.$refs['sliderBlockRow'].clientLeft
      }

      if (this.direction === 'Y' && this.$refs['sliderColumn'] && this.$refs['sliderColumn']) {
        this.sliderWidth = this.$refs['sliderColumn'].clientHeight + this.$refs['sliderColumn'].clientTop
        this.sliderBlockWidth = this.$refs['sliderBlockColumn'].clientHeight + this.$refs['sliderBlockColumn'].clientTop
      }
    },

    // 滑块移动的回调函数
    moveCb ({x, y}) {
      if (this.direction === 'X') this.initOffSet = x
      if (this.direction === 'Y') this.initOffSet = this.sliderWidth - this.sliderBlockWidth - y
    },

    // 点击滑动轨迹
    clickSlider ($event) {
      this.initOffSet = $event.offsetX
    },

    // 滑块偏移量
    computeOffset (move, isNeedEmit = false) {
      let sliderBarColumn = this.$refs['sliderBarColumn']
      let sliderBarRow = this.$refs['sliderBarRow']
      // let sliderColumn = this.$refs['sliderColumn']
      // 当滑块沿Y轴方向滑动时，默认向上为正方向，向上滑动增加
      if (this.direction === 'Y' && sliderBarColumn) {
        // sliderBarColumn.style.height = `${sliderColumn.getBoundingClientRect().height - move}px`
        sliderBarColumn.style.height = `${move}px`
      }
      if (this.direction === 'X' && sliderBarRow) sliderBarRow.style.width = `${move}px`
      let sliderW = this.sliderWidth - this.sliderBlockWidth
      let percent = Number(new Number((move/sliderW) * (this.max - this.min) + this.min).toFixed(this.toFixed))
      percent = percent >= this.min ? percent : this.min 
      percent = percent <= this.max ? percent : this.max 
      // 当且仅当子组件内部滑块移动而改变党当前值时，才派发事件
      isNeedEmit && this.$emit('input', percent)
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider_row {
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

  .slider_column {
    position: relative;
    display: flex;
    align-items: flex-end;
    height: 150px;
    width: 6px;
    border-radius: 3px;
    background-color: #e5e5e5;

    .slider-block {
      position: absolute;
      left: -8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid #33B5E5;
      background-color: #fff;
    }

    .slider-bar {
      width: 6px;
      border-radius: 3px;
      background-color: #33B5E5;
    }
  }
</style>