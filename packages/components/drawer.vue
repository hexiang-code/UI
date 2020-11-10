<template>
  <transition-group :name="transitonName">
    <template v-if="isShow">
      <curtain :isShow="isShow" v-if="isModal" @curtainClose="curtainClose" key="curtain"></curtain>
      <div :class="[drawerClass, 'main__content']" key="content">
        <div class="main__close-zone">
          <i @click="$emit('update:isShow', false)" class="iconfont main__close-icon">&#xe609;</i>
          <!-- <svg t="1587392277086" @click="$emit('update:isShow', false)" class="main__close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3743" width="200" height="200"><path d="M340.688 830.24l11.312 11.328a16 16 0 0 0 22.624 0L685.76 530.448a16 16 0 0 0 0-22.64L374.624 196.688a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.624l288.496 288.496-288.496 288.512a16 16 0 0 0 0 22.624z" p-id="3744"></path></svg> -->
        </div>
        <div class="main__title">
          <slot name="title">
            {{title}}
          </slot>
          <slot name="des"></slot>
          <div class="main__des" v-if="des && !$slots.des">
            {{des}}
          </div>
        </div>
        <slot></slot>
      </div>
    </template>
  </transition-group>
</template>

<script>
import curtain from './bg-curtain'
export default {
  name: 'drawer',
  props:{
    // 标题
    title: {
      type: String,
      default: '加油呀'
    }, 
    // 描述
    des: {
      type: String,
      default: ''
    }, 
    // 是否开启组件 
    isShow: {
      type: Boolean,
      required: true,
      default: false
    }, 
    // 是否需要幕布背景
    isModal: {
      type: Boolean,
      default: true
    },  
    // 抽屉出现的位置
    position: {
      type: [String],
      require: false,
      validator: (value) =>{
        return ['left', 'right', 'top', 'bottom'].indexOf(value) !== -1
      },
      default: 'right'
    }
  },
  computed: {
    transitonName () {
      switch (this.position) {
        case 'right':
          return 'drawer-open-right'
        case 'left':
          return 'drawer-open-left'
        case 'top':
          return 'drawer-open-top'
        case 'bottom':
          return 'drawer-open-bottom'
        default: 
          return 'drawer-open-right'
      }
    },

    drawerClass () {
      switch (this.position) {
        case 'right':
          return 'main__content_right'
        case 'left':
          return 'main__content_left'
        case 'top':
          return 'main__content_top'
        case 'bottom':
          return 'main__content_bottom'
        default: 
          return 'main__content_right'
      }
    }
  },

  components:{
    curtain
  },

  methods: {
    // 背景幕布关闭
    curtainClose () {
      this.$emit('update:isShow', false)
    }
  }

}
</script>

<style lang="scss" scoped>
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
      &__content {
        position: relative;
        z-index: 1001;
        padding: 20px;
        height: 100%;
        overflow: auto;
          &_right {
            position: fixed;
            top: 0;
            right: 0;
            width: 20%;
            height: 100%;
            background-color: #fff;
          }

          .main__close-zone {
            position: absolute;
            right: 0;
          }

          .main__close-icon {
            width: 30px;
            height: 30px;
          }
          
          &_bottom {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 20%;
            background-color: #fff;
          }

          &_left {
            position: fixed;
            top: 0;
            left: 0;
            width: 20%;
            height: 100%;
            background-color: #fff;
          }

          &_top {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 20%;
            background-color: #fff;
          }
        }

      &__title {
        position: relative;
        margin-bottom: 30px;
        border-bottom: 1px solid #f5f5f5;
        font-weight: bold;
        font-size: 24px;
        text-align: left;
      }

      &__des {
        padding: 5px 0 0 36px;
        font-size: 18px;
        font-weight: 300;
      }
  }
</style>