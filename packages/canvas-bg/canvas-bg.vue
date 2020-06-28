<template>
  <div class="canvas-bg" ref="parent">
    <canvas id='canvasBg' :width="canvasWidth" :height="canvasHeight" ref="canvasBg"></canvas>
  </div>
</template>

<script>
let canvasCtx, canvas, cycleArray
let curHz = 0, baseHz = 60
export default {
  name: 'CanvasBg',
  props: {
    // 颜色数组
    colorArray: {
      type: Array,
      default: () => ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
    },
    // 小球数量
    numbers: {
      type: Number,
      default: 10
    },
    // 小球规格数组
    rInterval: {
      type: Array,
      default: () => [10, 15, 20, 25]
    },
    // 最大半径
    maxR: {
      type: Number,
      default: 50
    },
    // 完成一次动画的时间，单位HZ
    cycleTime: {
      type: Number,
      default: 120
    }
  },
  data () {
    return {
      canvasWidth: 0,
      canvasHeight: 0
    }
  },

  mounted () {
    this.initCanvas()
    this.getCanvasCtx()
  },

  methods: {
    initCanvas () {
      let parent = this.$refs.parent
      this.canvasWidth = parent.offsetWidth
      this.canvasHeight = parent.offsetHeight
    },

    async getCanvasCtx () {
      canvas = this.$refs.canvasBg
      canvasCtx = this.$refs.canvasBg.getContext('2d')
      await this.$nextTick()
      this.createCycle()
    },

    createCycle () {
      cycleArray = Array.apply(null, {length: this.numbers}).map(() => {
        return this.newCycle()
      })
      this.update()
    },

    update () {
      curHz++
      if (curHz >= 60) curHz = 0
      let { width, height } = canvas
      canvasCtx.clearRect(0, 0, width, height)
      cycleArray.forEach(item => {
        if (curHz % (this.cycleTime / baseHz) === 0) item.R ++
        if (curHz % 6 === 0) item.alpha = item.alpha - 0.1 > 0 ? item.alpha - 0.1 : 0 
        if (item.R >= this.maxR) Object.assign(item, this.newCycle())
        if (item) {
          let { randomX, randomY, R, color, alpha } = item
          this.drawCycle(randomX, randomY, R, color, alpha)
        }
      })
      requestAnimationFrame(this.update)
    },

    // 新建圆形配置
    newCycle () {
        let width = canvas.width - this.maxR
        let height = canvas.height - this.maxR
        let randomX = Math.round(Math.random() * width) + this.maxR
        let randomY = Math.round(Math.random() * height) + this.maxR
        let color = this.randomColor()
        let R = this.randomR()
        return {
          randomX, randomY, R, color, alpha: 1
        }
    },

    // 绘制圆形
    drawCycle (randomX, randomY, R, color, alpha = 1) {
        canvasCtx.beginPath()
        canvasCtx.fillStyle = color
        canvasCtx.globalAlpha = alpha;
        canvasCtx.arc(randomX, randomY, R, 0, 2*Math.PI)
        canvasCtx.fill()
    },
    randomR () {
      return this.rInterval[this.random(this.rInterval)] || '15'
    },

    random (targetArray) {
      let len = targetArray.length
      return Math.floor(Math.random() * len)
    },

    randomColor () {
      return this.colorArray[this.random(this.colorArray)] || '#000'
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>