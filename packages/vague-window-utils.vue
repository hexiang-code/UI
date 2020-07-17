<template>
  <transition name="window">
    <div class="window" v-if="isShowWindow">
      <curtain v-if="curtain" :isShow="isShowWindow" @curtainClose="cancel"></curtain>
      <div class="window-utils" :style="windowSizeText">
        <slot name="windowTitle">
          <div class="window-title" v-if="!$slots.windowTitle">{{title}}</div>
        </slot>
        <slot></slot>
        <slot name="windowFoot">
          <div class="window-foot" v-if="!$slots.windowFoot">
            <button @click="comfirm">confirm</button>
            <button @click="cancel">cancel</button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script>
import curtain from "./bg-curtain";
export default {
  name: "windowUtils",
  props: {
    // 是否开启弹框
    isShowWindow: {
      type: Boolean,
      default: false
    },
    // 宽度
    width: {
      type: String,
      default: "30%"
    },
    height: {
      // 窗口高度
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "提示"
    },

    top: {
      // 窗口距离顶部的高度
      type: String,
      default: ""
    },

    // 是否需要遮罩层
    curtain: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    windowSizeText() {
      return `width: ${this.width};${
        this.height ? "height: " + this.height : ""
      };${this.top ? "top: " + this.top : ""}`;
    }
  },

  components: {
    curtain
  },

  methods: {
    comfirm() {
      this.$emit("update:isShowWindow", false);
      this.$emit("confirm");
    },

    // 点击取消事件
    cancel() {
      this.$emit("update:isShowWindow", false);
    }
  }
}
</script>
<style scoped lang="scss">
@import './css/_globalStyle.scss';
.window {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.window-title {
  height: 40px;
  font-size: 20px;
  color: $theme-color;
  justify-content: flex-start;
}

.window-utils {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  backdrop-filter: blur(10px) brightness(110%);
  z-index: 1001;
}

.window-enter-active {
  animation: dialog-open 1s ease-out forwards;
}

.window-leave-active {
  animation: dialog-close 0.5s ease-in forwards;
}

.window-foot {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.window-foot button {
  position: relative;
  padding: 0;
  margin: 0;
  width: 100px;
  height: 40px;
  background-color: none;
  text-transform: uppercase;
  border: 4px solid $theme-color;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
}

.window-foot button:nth-child(1) {
  margin-right: 60px;
  color: $theme-color;
}

.window-foot button::after,
.window-foot button::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 4px;
  background-color: #fff;
}

.window-foot button::after {
  top: 32px;
  right: 10px;
}

.window-foot button::before {
  top: -4px;
}

.window-foot button:hover::before {
  animation: translateBefore 1s forwards;
}

.window-foot button:hover::after {
  animation: translateAfter 1s forwards;
}

@keyframes translateBefore {
  0% {
    left: 0px;
  }

  100% {
    left: 80px;
    background-color: $theme-color;
  }
}

@keyframes translateAfter {
  0% {
    right: 10px;
  }

  100% {
    right: 80px;
    background-color: $theme-color;
  }
}
</style>