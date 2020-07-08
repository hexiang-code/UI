<template>
  <div>
    <img v-if="isImageBg" class="background-video" :src="resource" @load="posterAlready" />
    <img v-if="isPoster && poster" :src="poster" class="background-video" @load="posterAlready" />
    <video
      v-if="loadVideo && !isImageBg"
      muted
      autoplay
      loop
      class="background-video"
      @loadeddata="videoAlready"
    >
      <source :src="resource" type="video/mp4" />
      <source :src="resource" type="video/ogg" />
    </video>
  </div>
</template>
<script>
export default {
  name: "backgroundVideo",
  props: {
    resource: {
      type: String, // 资源路径
      required: true,
      default: ""
    },
    isImageBg: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      loadVideo: false, // 视频是否加载完成
      isPoster: false // 是否展示海报
    };
  },

  created() {
    this.initPoster();
  },

  watch: {
    poster() {
      this.initPoster();
    }
  },

  methods: {
    initPoster() {
      this.isPoster = !!this.poster;
      if (!this.poster) this.loadVideo = true;
    },

    posterAlready() {
      this.$emit("posterLoaded");
      this.loadVideo = true;
    },

    videoAlready() {
      this.isPoster = false;
      this.$emit("videoLoaded");
    }
  }
};
</script>

<style lang="scss" scoped>
.background-video {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-size: cover;
}
</style>