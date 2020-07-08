<template>
  <div v-if="visible" class="album">
    <window-utils :isShowWindow.sync="visible" title="相册" width="800px" :curtain="visible && ismodal" @curtainClose="$emit('update:visible', false)">
      <div class="album-main">
        <div class="left">
          <div :class="classId == item.id ? 'selected' : ''" @click="classId = item.id" v-for="item in classList" :key="item.id">{{item.className}}</div>
        </div>
        <div class="right">
          <div class="image-item" title="单击预览，双击选中图片" v-for="(item, index) in imageList" :key="index" @click="selImage(item, 1)" @dblclick="selImage(item, 2)">
            <img v-if="item.type == 'image'" :src="item.resourceUrl">
            <video
              v-if="item.type == 'video'"
              muted
            >
              <source :src="item.resourceUrl" type="video/mp4" />
              <source :src="item.resourceUrl" type="video/ogg" />
            </video>
            <p>{{item.resourceName}}</p>
            <i class="iconfont sel-icon selected" v-show="item.selected">&#xe8aa;</i>
          </div>
        </div>
      </div>
      <template #windowFoot>
        <slot name="albumFooter">
        <div class="album-buttom" v-if="!$slots.albumFooter">
          <button @click="confirm">确认</button>
          <button @click="deleteImage">删除</button>
          <div class="insert-image">
            <button @click="$refs.selImage.click()">上传文件</button>
            <input ref="selImage" v-show="false" type="file" @change="selImageChange($event)" :accept="accept" />
          </div>
        </div>
        </slot>
      </template>
    </window-utils>
    <image-preview :visible.sync="imagePreviewVisible" :resource="curImage" :resourceList="imageList"
     @previewImageChange="previewImageChange"
     >
    </image-preview>
  </div>
</template>
<script>
import windowUtils from './vague-window-utils'
import imagePreview from './image-preview'
import { debounce } from './js/utils'
export default {
  name: 'hxAlbum',
  components: {
    windowUtils,
    imagePreview
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    ismodal: {
      type: Boolean,
      default: true
    },
    imageList: {
      type: Array,
      required: true
    },
    accept: {
      type: String,
      default: 'image/jpeg,image/png,video/mp4'
    },
    classList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      classId: '', // 当前相册分类id
      curImage: {}, // 当前选中的图片
      imagePreviewVisible: false // 预览图片开关
    }
  },

  watch: {
    classId () {
      this.$emit('classChange', this.classId)
    },

    classList: {
      handler: function () {
        this.classId = this.classList.length > 0 ? this.classList[0].id : 0
      },
      immediate: true
    }
  },

  created () {
    // 双击选中图片
    this.selImage = debounce((imageItem, type) => {
      if (type == 2) this.$set(imageItem, 'selected', !imageItem.selected)
      if (type == 1) {
        this.curImage = imageItem 
        this.imagePreviewVisible = true
      }
    }, 200, this)
  },

  methods: {
    // 选择文件
    selImageChange (event) {
      this.$emit('fileChange', event.target.files)
    },

    // 双击图片选中
    // selImage (imageItem, type) {
    //   if (type == 2) this.$set(imageItem, 'selected', !imageItem.selected)
    //   if (type == 1) {
    //     this.curImage = imageItem 
    //     this.imagePreviewVisible = true
    //   }
    // },

    // 删除图片
    deleteImage () {
      let selectedImages = this.imageList.filter(item => item.selected)
      this.$emit('deleteImage', selectedImages)
    },

    // 确认选择图片
    confirm () {
      let selectedImages = this.imageList.filter(item => item.selected)
      this.$emit('confirm', selectedImages)
    },

    // 预览图片切换
    previewImageChange (imageItem) {
      // this.curImage = imageItem
      this.curImage = Object.assign({}, this.curImage, imageItem)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './css/_globalStyle.scss';
  .album /deep/ {
    .window-utils {
      width: 800px;
      background-color: #fff;

      .window-foot button:nth-child(2) {
        color: #000;
      }
    }
    .album-main {
      display: flex;
      height: 500px;

      .left {
        width: 60px;
        height: 100%;
        border-right: 1px solid $theme-color;

        div {
          padding: 5px;
          cursor: pointer;
          margin-top: 10px;
        }

        div:nth-child(1) {
          margin: 0;
        }

        .selected {
          background-color: $theme-color;
          color: #fff;
        }

        div:hover {
          background-color: $theme-color;
          color: #fff;
        }
      }

      .right {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        padding: 10px 10px 10px 20px;
        justify-content: space-between;
        align-self: baseline;
        max-height: 480px;
        overflow-y: auto;

        .image-item {
          position: relative;
          width: 30%;
          padding-bottom: 20px;
          
          .selected {
            position: absolute;
            top: 0;
            right: 0;
          }

          img, video {
            width: 100%;
            height: auto;
          }

          p {
            margin: 0;
            padding: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
          }
        }
      }
    }

    .album-buttom {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      button {
        padding: 10px;
        margin-right: 10px;
        border-radius: 5px;
        background-color: $theme-color;
        border: none;
        color: #fff;
        outline: none;
      }
    }
  }

</style>