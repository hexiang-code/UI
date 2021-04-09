<template>
  <transition name="dialog-bg" v-if="dialogVisiable">
    <div class="dialog-bg" key="curtain" @click.self="dialogClose" :style="!isCurtain ? 'transparent' : ''">
      <transition name="dialog-container">
        <div class="dialog-container" key="dialogContent" :style="windowSizeText">
          <div class="dialog__title">
            <slot name="title">{{title}}</slot>
          </div>
          <div class="dialog__content">
            <slot></slot>
          </div>
          <slot name="footer">
            <div class="dialog__footer">
              <button @click="comfirm">confirm</button>
              <button @click="cancel">cancel</button>
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "hxDialog",
  props: {
    // 弹框开关
    dialogVisiable: {
      type: Boolean,
      default: false
    },

    // 是否需要幕布
    isCurtain: {
      type: Boolean,
      default: false
    },

    // 弹框标题
    title: {
      type: String,
      default: "你好啊"
    },

    // 宽度
    width: {
      type: String,
      default: "30%"
    },

    // 窗口高度
    height: {
      type: String,
      default: ""
    },

    // 窗口距离顶部的高度
    top: {
      type: String,
      default: ""
    }
  },

  computed: {
    windowSizeText() {
      return `width: ${this.width};${
        this.height ? "height: " + this.height : ""
      };${this.top ? "margin-top: " + this.top : ""}`;
    }
  },

  methods: {
    comfirm() {
      this.$emit("update:dialog-visiable", false);
      this.$emit("confirm");
    },
    // 点击取消事件
    cancel() {
      this.$emit("update:dialog-visiable", false);
    },
    dialogClose() {
      this.cancel();
      this.$emit("dialog-close", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/_globalStyle.scss";
.dialog-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2001;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  .dialog-container {
    position: relative;
    z-index: 2002;
    width: 30%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;

    .dialog__title {
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      color: #303133;
      text-align: left;
      color: $theme-color;
      font-weight: bold;
    }

    .dialog__content {
      padding: 20px 0;
      font-size: 14px;
      color: #606266;
    }
  }

  .dialog__footer {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .dialog__footer button {
    position: relative;
    padding: 0;
    margin: 0;
    width: 100px;
    height: 40px;
    background-color: none;
    text-transform: uppercase;
    border: 4px solid $theme-color;
    background-color: #fff;
    color: $theme-color;
    cursor: pointer;
  }

  .dialog__footer button:nth-child(1) {
    margin-right: 30px;
  }

  .dialog__footer button::after,
  .dialog__footer button::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 4px;
    background-color: #fff;
  }
  .dialog__footer button::after {
    top: 32px;
    right: 10px;
  }
  .dialog__footer button::before {
    top: -4px;
  }
  .dialog__footer button:hover::before {
    animation: translateBefore 1s forwards;
  }
  .dialog__footer button:hover::after {
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
}

.dialog-bg-enter-active {
  transform: scale(0);
  animation: dialog-bg-open 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.dialog-container-enter-active {
  transform: scale(0);
  animation: dialog-container-open 1s 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
    forwards;
}

.dialog-bg-leave-active {
  animation: dialog-bg-open 1s 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) reverse;
}

.dialog-container-leave-active {
  animation: dialog-container-open 1s cubic-bezier(0.165, 0.84, 0.44, 1)
    forwards reverse;
}
</style>