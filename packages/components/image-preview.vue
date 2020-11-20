<template>
    <transition name="preview">
      <div v-if="visible" class="preview-image">
        <i class="iconfont up-icon up-image" @click="imageChange(1)">&#xe697;</i>
        <img v-if="resource.type == 'image'" :src="resource.resourceUrl" @click="imageClick">
        <video
          v-if="resource.type == 'video'"
          controls
          @click.prevent="imageClick"
        >
          <source :src="resource.resourceUrl" type="video/mp4" />
          <source :src="resource.resourceUrl" type="video/ogg" />
        </video>
        <i class="iconfont up-icon down-image" @click="imageChange(2)">&#xe629;</i>
        <div class="image-list">
          <template  v-for="(item, index) in resourceList">
            <img v-if="item.type == 'image'" :class="item.id == resource.id ? 'selected' : ''" :src="item.resourceUrl" :key="index" @click="selImageNav(item)">
            <!-- <video
              v-if="item.type == 'video'"
              controls
              @click="selImageNav(item)"
              :key="index"
              :class="item.id == resource.id ? 'selected' : ''"
            >
              <source :src="item.resourceUrl" type="video/mp4" />
              <source :src="item.resourceUrl" type="video/ogg" />
            </video> -->
          </template>
        </div>
      </div>
    </transition>
</template>
<script>
export default {
  name: 'hxImagePreview',
  props: {
    visible: {
      type: Boolean,
      default: false
    },

    resource: {
      type: Object,
      required: true
    },
    
    resourceList: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    // 关闭图片
    imageClick () {
      this.$emit('update:visible', false)
    },

    // 选择底部图片导航
    selImageNav (item) {
      this.$emit('previewImageChange', item)
    },

    /**
     * 上一张/下一张图片
     * @param {Number} type 1:上一张 2:下一张
     */
    imageChange (type) {
      let curIndex = this.resourceList.findIndex(item => item.id == this.resource.id)
      if (curIndex > -1) {
        if (type == 1) {
          curIndex = --curIndex >= 0 ? curIndex : this.resourceList.length - 1
        }
        if (type == 2) {
          curIndex = ++curIndex > this.resourceList.length ? 0 : curIndex
        }
        this.$emit('previewImageChange', this.resourceList[curIndex])
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .preview-image {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2002;
    
    img, video {
      position: relative;
      z-index: 1002;
      width: 90%;
      height: auto;
    }

    .image-list {
      position: absolute;
      bottom: 100px;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img, video {
        width: 100px;
        height: auto;
      }

      img:hover {
        width: 200px;
        transition: width .5s;
      }

      .selected {
        width: 200px;
        transition: width .5s;
      }
    }

    .up-image {
      position: absolute;
      left: 20px;
      z-index: 1003;
      width: 50px;
      height: 50px;
      font-size: 50px;
      color: #fff;
    }

    .up-image:active, .down-image:active  {
      transform: scale(1.5);
      transition: transform .5s;
    }
    .down-image {
      position: absolute;
      right: 20px;
      z-index: 1003;
      width: 50px;
      height: 50px;
      font-size: 50px;
      color: #fff;
    }
  }

  .preview-leave-active {
    animation: preview-image 1.5s linear forwards;
  }

  .preview-enter-active {
    animation: open-translate-left .5s linear forwards;
  }
</style>