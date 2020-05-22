<template>
  <div class="canvas-bg">
    <canvas id='canvasBg' :width="canvasW" :height="canvasH" ref="canvasBg" @click="startAnimation"></canvas>
  </div>
</template>

<script>
import { ballArray } from './config'
export default {
  name: 'CanvasBg',

  data () {
    return {
      canvasCtx: {},
      canvasW: '', // 宽
      canvasH: '',  // 高
      curBallHz: '' // 当前帧
    }
  },
  created () {
    this.initCanvas()
  },

  mounted () {
    this.getCanvasCtx()
  },

  methods: {
    initCanvas () {
      this.canvasW = window.innerWidth;
      this.canvasH = window.innerHeight
    },

    getCanvasCtx () {
      this.canvasCtx = this.$refs.canvasBg && this.$refs.canvasBg.getContext('2d')
      this.canvasCtx && this.startDraw()
    },

    startAnimation () {
      window.requestAnimationFrame(() => {
        this.curBallHz++
        this.updateDraw()
      })
    },

    // 开始绘制
    startDraw () {
      // let ctx = this.canvasCtx
      // let cycleCenterX = window.innerWidth, cycleCenterY = window.innerHeight
      // ballArray.forEach(item => {
      //   ctx.beginPath()
      //   let x = cycleCenterX/2 - item.centerDX, y = cycleCenterY/2 - item.centerDY
      //   ctx.arc(x, y, item.sR, 0, 2 * Math.PI)
      //   ctx.strokeStyle = item.borderC
      //   ctx.stroke()
      //   if (item.isComplete) {
      //     ctx.fillStyle = item.bgC
      //     ctx.fill()
      //   }
      // })
    },

    updateDraw () {
      if (this.curBallHz > 60) this.curBallHz = 0
      let ctx = this.canvasCtx
      let { innerHeight, innerWidth } = window
      ctx.clearRect(0, 0, innerWidth, innerHeight)
        ballArray.forEach((item, index) => {
        let angel = Math.PI * 2 * Math.ceil(Math.random()*5) // 定义圆周运动
        // let disR = 50  // 运动半径
        let curx = item.centerDY * Math.sin((angel/60 * this.curBallHz)) + innerWidth/2
        let curY = item.centerDY * Math.cos((angel/60 * this.curBallHz)) + innerHeight/2
        ctx.beginPath()
        ctx.arc(curx, curY, 4, 0, angel)
        ctx.fillStyle = '#000'
        ctx.fill()
      })
      this.startAnimation()
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
}
</style>