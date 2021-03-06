<template>
  <div class="album">
    <hx-dialog :dialogVisiable="visible" title="相册" width="800px" :isCurtain="visible && ismodal" @dialogClose="$emit('update:visible', false)">
      <div class="album-main">
        <div class="left">
          <div :class="classId == item.id ? 'selected' : ''" @click="classId = item.id" v-for="item in classList" :key="item.id">{{item.className}}</div>
        </div>
        <div class="right" @scroll="albumScroll" ref="albumList">
          <div class="image-item" title="单击预览，双击选中图片" v-for="(item, index) in imageList" :key="index" @click.capture="selImage(item, 1)" @dblclick.capture="selImage(item, 2)">
            <img v-if="item.type == 'image'" :src="item.resourceUrl" v-imgLazy>
            <video
              v-if="item.type == 'video'"
              muted
            >
              <source :src="item.resourceUrl" type="video/mp4" />
              <source :src="item.resourceUrl" type="video/ogg" />
            </video>
            <p>{{item.resourceName}}</p>
            <i class="iconfont sel-icon selected" v-show="imgIsSelect(item)">&#xe8aa;</i>
          </div>
        </div>
      </div>
      <template #footer>
        <slot name="albumFooter">
          <div class="album-buttom" v-if="!$slots.albumFooter">
            <div class="left">
              <slot name="pagination"></slot>
            </div>
            <div class="right">
              <button @click="confirm">确认</button>
              <button @click="deleteImage">删除</button>
              <div class="insert-image">
                <button @click="$refs.selImage.click()">上传文件</button>
                <input ref="selImage" v-show="false" type="file" @change="selImageChange($event)" :accept="accept" :multiple="uploadMultiple"/>
              </div>
            </div>
          </div>
        </slot>
      </template>
    </hx-dialog >
    <image-preview :visible.sync="imagePreviewVisible" :resource="curImage" :resourceList="imageList"
     @previewImageChange="previewImageChange"
     >
    </image-preview>
  </div>
</template>
<script>
import hxDialog  from '../dialog/dialog'
import imagePreview from '../image-preview/image-preview'
import { debounce, throttle } from '../../utils/utils'
export default {
  name: 'hxAlbum',
  components: {
    hxDialog,
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
    },
    // 上传图片多选
    uploadMultiple: {
      type: Boolean,
      default: false
    },
    reachBottomRate: {
      type: Number,
      validator: function (value) {
        return value > 0 && value < 1
      },
      default: 0.1
    },
    // 多选图片
    selectMutiple: {
      type: Boolean,
      default: false
    },

    // 图片是否可以选中
    selectable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      classId: '', // 当前相册分类id
      curImage: {}, // 当前选中的图片
      imagePreviewVisible: false, // 预览图片开关
      selectedImgList: [] // 被选择的图片列表 
    }
  },

  computed: {
    // 图片是否被选中
    imgIsSelect () {
      return function (imgItem) {
        return this.selectable && this.selectedImgList.indexOf(imgItem) > -1
      }
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
    /**
     * 选择图片
     * @param {Object} imageItem 图片数据
     * @param {Number} 1:点击 2:双击
     */
    this.selImage = debounce((imageItem, type) => {
      if (type == 2) {
        // 如果可多选
        if (this.selectMutiple) {
          let index = this.selectedImgList.indexOf(imageItem)
          index > -1 && this.selectedImgList.splice(index, 1)
          if (index == -1) {
            this.selectedImgList.push(imageItem)
            this.selectedImgList = Array.from(new Set(this.selectedImgList))
          }
        } else {
          let selectedImgList = []
          selectedImgList.push(imageItem)
          this.selectedImgList = selectedImgList
        }
      }
      if (type == 1) {
        this.curImage = imageItem 
        this.imagePreviewVisible = true
      }
    }, 500, this)

    // 监听窗口滚动事件
    this.albumScroll = throttle($event => {
      let { scrollTop, clientHeight, scrollHeight } = $event.target
      if ((scrollTop + clientHeight) >= (1 - 0.1) * scrollHeight) {
        this.$emit('onReachBottom')
      }
    }, 500, this)
  },

  methods: {
    // 选择文件
    selImageChange (event) {
      this.$emit('fileChange', event.target.files)
    },

    // 删除图片
    deleteImage () {
      let selectedImages = this.selectedImgList
      this.$emit('deleteImage', this.selectable ? selectedImages : null)
    },

    // 确认选择图片
    confirm () {
      let selectedImages = this.selectedImgList
      this.$emit('confirm', this.selectable ? selectedImages : null)
      this.$emit('update:visible', false)
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
  @import '../../assets/css/_globalStyle.scss';
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
        height: 100%;
        padding: 0 5px;
        border-right: 1px solid $theme-color;

        div {
          width: 60px;
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
          padding-bottom: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .selected {
            position: absolute;
            top: 0;
            right: 0;
            color: #fff;
          }

          img, video {
            width: 100%;
            height: auto;
          }

          p {
            position: absolute;
            bottom: 10px;
            margin: 0;
            padding: 0;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }

    .album-buttom {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .left {
        flex-shrink: 0;
      }

      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        button {
          padding: 10px;
          margin-right: 10px;
          border-radius: 5px;
          background-color: $theme-color;
          border: none;
          color: #fff;
          outline: none;
          cursor: pointer;
        }
      }
      
    }
  }

</style>