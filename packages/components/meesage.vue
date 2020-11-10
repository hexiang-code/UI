<template>
  <div class="message" v-if="visibel">
    <curtain :isShow="visibel" @curtainClose="messageClose"></curtain>
    <div class="message__container">
      <div class="message__title">
        <slot v-if="$slots.title" name="title"></slot>
        <span v-else>{{ title }}</span>
        <i class="iconfont message-icon close-icon" @click="messageClose">&#xe604;</i>
      </div>
      <div class="mesasge__content">
        <slot v-if="$slots.content" name="content"></slot>
        <div class="mesasge__tips" v-else>
          <i class="iconfont message-icon warn-icon">&#xe606;</i>
          <span>{{message}}</span>
        </div>
      </div>
      <slot name="bottom" v-if="$slots.bottom"></slot>
      <div class="message__bottom" v-else>
        <div class="message__btn message__confirm" v-if="confirmButton" @click="messageConfirm">确认</div>
        <div class="message__btn message__cancel" v-if="cancelButton" @click="messageCancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import curtain from './bg-curtain'
const tipsType = ['warn', 'info']  // 提示类型
export default {
  name: 'hxMessage',
  props: {
    // 开关
    visibel: {
      type: Boolean,
      default: false
    },

    // 标题
    title: {
      type: String,
      default: '提示'
    },

    // 弹框类型
    type: {
      type: String,
      default: 'info',
      validator: function (value) {
        return tipsType.includes(value)
      }
    },

    // 是否展示确认按钮
    confirmButton: {
      type: Boolean,
      default: true
    },

    // 是否展示取消按钮
    cancelButton: {
      type: Boolean,
      default: true
    },

    // 消息内容
    message: {
      type: String,
      default: '测试消息'
    }
  },
  data () {
    return {

    }
  },

  components: {
    curtain
  },

  methods: {
    messageClose () {
      this.$emit('update:visibel', false)
      this.$emit('messageClosed', false)
    },

    messageConfirm () {
      this.$emit('confirm')
    },

    messageCancel () {
      this.$emit('update:visibel', false)
      this.$emit('messageClosed', false)
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/_globalStyle.scss';
  .message {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .message__container {
      position: absolute;
      width: 500px;
      z-index: 1001;
      padding: 20px;
      border-radius: 5px;
      background-color: #fff;

      .message__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        color: #303133;

        .close-icon {
          width: 16px;
          height: 16px;
          font-size: 16px;
        }
      }

      .mesasge__content {
        padding: 10px;
        .mesasge__tips {
          display: flex;
          align-items: center;
          color: #606266;
          font-size: 15px;
          .warn-icon {
            width: 18px;
            height: 18px;
            font-size: 18px;
            margin-right: 10px;
          }
        }
      }

      .message__bottom {
        display: flex;
        justify-content: flex-end;

        .message__btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 15px;
          border-radius: 5px;
          font-size: 14px;
        }

        .message__confirm {
          margin-right: 10px;
          background-color: $theme-color;
          color: #fff;
        }

        .message__cancel {
          border: 1px solid $theme-color;
          color: #606266;
        }
      }
    }
  }
</style>