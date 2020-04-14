<template>
  <div class="main">
    <curtain :isShow.sync="isShowModal" v-if="isModal && isShowModal"></curtain>
    <transition :name="transitonName">
      <div :class="[drawerClass, 'main__content']">
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
    </transition>
  </div>
</template>

<script>
import curtain from './bg-curtain'
export default {
  name: 'drawer',
  props:{
    title: {
      type: String,
      default: '加油呀'
    }, // 标题
    des: {
      type: String,
      default: ''
    }, // 描述
    isShow: {
      type: Boolean,
      required: true,
      default: false
    }, // 是否开启组件 
    isModal: {
      type: Boolean,
      default: true
    },  // 是否需要幕布背景
    drawerStyle: {
      type: String,
      required: false
    }, // 自定义样式
    position: {
      type: [Boolean, String],
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

  data() {
    return {
      isShowModal: false // 是否需要幕布
    }
  },

  components:{
    curtain
  },

  methods: {
  
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
        padding: 20px;
            &_right {
        position: fixed;
        top: 0;
        right: 0;
        width: 20%;
        height: 100%;
        background-color: #fff;
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
        right: 0;
        width: 20%;
        background-color: #fff;
      }

      &_top {
        position: fixed;
        left: 0;
        top: 0;
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