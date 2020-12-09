<script>
import silder from '../slider'
import { debounce } from '../../assets/js/utils'
import { musicCanvasInit, stopOrStartMusicCanvas } from './music-canvas'
import { randomColor } from '../../assets/js/base-config'
const playMode = [
  {
    mode: 'random', // 随机播放
    icon: '&#xe613;',
    title: '随机播放'
  }, 
  {
    mode: 'circulation', // 单曲循环
    icon: '&#xe610;',
    title: '单曲循环'
  }, 
  {
    mode: 'sequence', // 顺序播放
    icon: '&#xe61a;',
    title: '顺序播放'
  }
]
export default {
  name: 'hxMusic',
  props: {
    // 音乐地址
    musicSrc: {
      type: String,
      required: true
    },

    // 歌曲封面
    musicFaceSrc: {
      type: String,
      default: ''
    },

    // 歌手名称
    singer: {
      type: String,
      default: ''
    },

    // 专辑名称
    album: {
      type: String,
      default: ''
    },

    // 歌曲名称
    song: {
      type: String,
      default: ''
    },

    // 进度条单位
    progressUnit: {
      type: String,
      default: 'm',
      validator: function (value) {
        return ['s', 'm'].includes(value)
      }
    },

    // 歌词
    musicLyric: {
      type: String
    }
  },

  data () {
    return {
      isStratMusic: false, // 是否开始播放音乐
      duration: 1, // 歌曲时长(单位s)
      currentTime: 1, // 歌曲当前播放时间(单位s)
      isMusicChangeVisible: false, // 展示音乐切换icon
      isVolumeVisiable: false, // 是否展示音量滑块
      volume: 50, // 音量
      lyricText: '', // 歌词
      lyricColor: '', // 歌词颜色
      playMode: playMode[0].mode, // 播放模式
      isCanvasInit: false // 是否初始化音乐背景完毕
    }
  },

  computed: {
    playModeIcon () {
      let mode = playMode.find(item => item.mode === this.playMode)
      return mode && {
        innerHTML: mode.icon,
        title: mode.title
      }
    }
  },

  mounted () {
    if (this.$refs['music']) {
      let musicInfo = this.$refs['music'].getBoundingClientRect()
      if (this.$refs['mainCanvas']) {
        this.$refs['mainCanvas'].width = musicInfo.width
        this.$refs['mainCanvas'].height = musicInfo.height
      } 
    }
  },

  created () {
    this.playMusicFromTarget = debounce(val => {
      let musicBox = this.$refs['music-box']
      if (musicBox && musicBox.seekable) {
        let lenght = musicBox.seekable.length
        for(let index = 0; index < lenght; index ++) {
          if (val >= musicBox.seekable.start(index) && val <= musicBox.seekable.end(index)) {
            musicBox.currentTime = val
            if (!this.isStratMusic) this.isStratMusic = true
            return
          }
        }
      }
    })
  },

  watch: {
    volume (newVal) {
      if (this.$refs['music-box']) this.$refs['music-box'].volume = newVal / 100
    }
  },

  components: {
    'hx-silder': silder
  },

  render () {
    return (
      <div class="music" ref="music">
        <div
          class={[ 'left', {'music_opacity': !this.isMusicChangeVisible && this.isStratMusic} ]}
          onMouseleave={() => this.isMusicChangeVisible = false }
          onMouseover={() => this.isMusicChangeVisible = true}>
          { this.musicFaceSrc ? <img class="bg" src={this.musicFaceSrc} /> : '' }
          <i class="iconfont up" 
            onClick={() => this.changeMusic(1)}
            vShow={this.isMusicChangeVisible}>&#xe61f;</i>
          <i class="iconfont down" 
            onClick={() => this.changeMusic(2)}
            vShow={this.isMusicChangeVisible}>&#xe651;</i>
          <i class="iconfont start" 
            onClick={() => this.isStratMusic ? this.pauseMusic() : this.playMusic()} 
            domProps={{innerHTML: this.isStratMusic ? '&#xe60f;' : '&#xe617;' }}></i>
        </div>
        <div class="right">
          <div class="song-info">
            { this.song ? <span class="song">{this.song}</span> : '' }
            { this.singer ? <span class="singer">—&nbsp;{this.singer}</span> : '' }
          </div>
          <div class="lyric-info" style={this.isStratMusic && this.lyricText ? `opacity: 1;color: ${this.lyricColor};`: ''}>{this.lyricText}</div>
          <div class="progress">
            <hx-silder toFixed={0} max={this.duration} min={0} value={this.currentTime} 
              onInput={val => this.playMusicFromTarget(val)}>
            </hx-silder>
            <div class="time">
              <i class="iconfont mode-icon" onClick={() => this.modeChange()} domProps={this.playModeIcon}></i>
              <span class="volume">
                <i class="iconfont volume-icon" onClick={$event => this.volumeVisiable($event)}>&#xe72b;</i>
                <hx-silder
                  direction="Y"
                  toFixed={0}
                  max={100} 
                  min={0}
                  vClose={{ closeCb: () => this.isVolumeVisiable = false}}
                  vShow={this.isVolumeVisiable}
                  // style={!this.isVolumeVisiable ? 'visibility: hidden' : ''}
                  value={this.volume} onInput={val => this.volume = val}>
                </hx-silder>
              </span>
              { this.formatTimeFromSencondToMinute(this.currentTime) }&nbsp;/&nbsp;{ this.formatTimeFromSencondToMinute(this.duration) }
            </div>
          </div>
        </div>
      <audio 
          ref="music-box" 
          onCanplay={() => this.musicCanPlay()}
          onTimeupdate={$event => this.musciProgress($event)}
          onLoadedmetadata={$event => this.getDuration($event)}
          onEnded={() => this.musicEnd()}
          src={this.musicSrc}
          crossOrigin="anonymous">
        </audio>
        <canvas ref="mainCanvas" class="main-canvas" width="300" height="85"></canvas>
      </div>
    )
  },

  methods: {
    // 音乐可以播放
    musicCanPlay () {
      this.$watch('isStratMusic', async newVal => {
        await this.$nextTick()
        if (newVal) {
          this.$refs['music-box'].play()
          if (!this.isCanvasInit) {
            this.$refs['mainCanvas'] && this.$refs['music-box'] && musicCanvasInit(this.$refs['mainCanvas'], this.$refs['music-box'])
            this.isCanvasInit = true
          }
        } else {
          this.$refs['music-box'].pause()
        }
        stopOrStartMusicCanvas(this.isStratMusic)
      }, {
        sync: true
      })
    },

    // 获取歌曲时长
    getDuration ($event) {
      this.duration = Math.ceil($event.target.duration)
      this.currentTime = 0
    },

    // 音乐开关
    // musicSwitch () {
    //   this.isStratMusic = !this.isStratMusic
    // },

    // 开始播放
    playMusic () {
      this.isStratMusic = true
    },

    // 暂停播放
    pauseMusic () {
      this.isStratMusic = false
    },

    // 音乐播放进度
    musciProgress ($event) {
      this.currentTime = Math.floor($event.target.currentTime)
      this.matchLyric(this.currentTime)
    },

    // 音乐播放完毕
    async musicEnd() {
      if (this.playMode == 'circulation') {
        this.playMusicFromTarget(0)
      }
      this.isStratMusic = false
      this.$emit('end', this.playMode)
    },

    /**
     * 切换歌曲
     * @param {type} 1:上一曲 2:下一曲
     */
    changeMusic (type) {
      this.isStratMusic = false
      type == 1 && this.$emit('up', this.playMode)
      type == 2 && this.$emit('next', this.playMode)
    },

    // 格式化时间(秒(60)->分钟(1:0))
    formatTimeFromSencondToMinute (val) {
      if (this.progressUnit === 'm') {
        let min = Math.floor(val / 60)
        let second = Math.floor(val % 60)
        return `${min}:${second}`
      } 
      return val
    },

    // 匹配歌词
    matchLyric (currentTime) {
      if (!this.musicLyric) return
      let lyricArray = this.musicLyric.split('\n')
      if (lyricArray.length === 0) {
        this.manualLyric(currentTime)
        return
      }
      let reg = /\[(\d{2}:\d{2})[^]*\]([^]+)/
      let index = 0
      for (let item of lyricArray) {
        let matchInfo = item.match(reg)
        if (!matchInfo) {
          this.manualLyric(currentTime)
          return
        }
        let time = matchInfo['1']
        let lyricText = matchInfo['2']
        if (time) {
          let nextLyricInfo = lyricArray[index+1].match(reg)
          let startTimestamp = this._formatTimeFromMinuteToSecond(time)
          // 如果不存在结束时间，则此时歌词到了最后一句
          if (!nextLyricInfo) {
            if (currentTime >= startTimestamp  && this.lyricText !== lyricText) {
              this.lyricColor = randomColor()
              this.lyricText = lyricText
            }
            return
          }
          let endTimestamp = this._formatTimeFromMinuteToSecond(nextLyricInfo[1])
          if (currentTime >= startTimestamp && currentTime < endTimestamp && this.lyricText !== lyricText) {
            this.lyricColor = randomColor()
            this.lyricText = lyricText
            return
          }

          // let startTimesArray = time.split(':')
          // let nextLyricInfo = lyricArray[index+1].match(reg)
          // if (!nextLyricInfo) return
          // let endTimesArray = nextLyricInfo[1].split(':')
          // // 一个':' 能分割成连个数组,则最大时间为分钟
          // if (startTimesArray.length == 2 && endTimesArray.length == 2) {
          //   let startTimestamp = Number(startTimesArray[0]) * 60 + Number(startTimesArray[1])
          //   let endTimestamp = Number(endTimesArray[0]) * 60 + Number(endTimesArray[1])
          //   if (currentTime >= startTimestamp && currentTime < endTimestamp && this.lyricText !== lyricText) {
          //     this.lyricColor = randomColor()
          //     this.lyricText = lyricText
          //     return
          //   }
          // }
        }
        index++
      }
    },

    // 格式化时间 (分钟(1:0)->秒(60))
    _formatTimeFromMinuteToSecond (minute) {
      let timeArray = minute.split(':').reverse() 
      // 将数组颠倒则得到[秒,分,...]这样的数组，歌词时间只算到分钟即可
      return Number(timeArray[0]) + Number(timeArray[1]) * 60
    },

    // 音量滑块开关
    volumeVisiable ($event) {
      $event.stopPropagation()
      this.isVolumeVisiable = !this.isVolumeVisiable
    },
    
    // 播放模式切换
    modeChange () {
      let index = playMode.findIndex(item => item.mode == this.playMode)
      if (index > -1) {
        if (index === playMode.length - 1) index = 0
        this.playMode = playMode[index+1].mode
        this.$emit('playModeChange', this.playMode)
      }
    },

    // 派发手动获取歌词事件
    manualLyric (currentTime) {
      this.$emit('getLyric', currentTime , lyric => {
        if (typeof lyric === 'string') this.lyricText = lyric
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/_globalStyle.scss';
  .music {
    position: relative;
    width: 300px;
    border-radius: 5px;
    display: flex;
    align-items: center;

    .music_opacity {
      opacity: .3;
    }
    
    .left {
      position: relative;
      width: 80px;
      height: 80px;

      .bg {
        width: 80px;
        height: 80px;
      }

      .start {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -18px;
        margin-top: -18px;
        font-size: 36px;
        cursor: pointer;
      }

      .up {
        position: absolute;
        top: 50%;
        margin-top: -5px;
        left: 0;
        font-size: 20px;
        cursor: pointer;
        animation: slow-in .3s forwards;
      }

      .down {
        position: absolute;
        top: 50%;
        margin-top: -5px;
        right: 0;
        font-size: 20px;
        cursor: pointer;
        animation: slow-in .3s forwards;
      }
    }

    .right /deep/ {
      flex: 1;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      padding-left: 20px;
      
      .progress {
        display: flex;
        align-items: center;

        .slider_row {
          width: 90px;
          height: 3px;
          margin-right: 10px;
          border-radius: 1px;

          .slider-bar {
            height: 3px;
            border-radius: 1px;
          }

          .slider-block {
            top: -4px;
            width: 6px;
            height: 6px;
          }
        }

        .time {
          flex: 1;
          display: flex;
          width: 20px;
          color: #666;
          font-size: 14px;
          
          .mode-icon {
            font-size: 16px;
            cursor: pointer;
            margin-right: 4px;
          }

          .volume {
            display: flex;
            position: relative;
            margin-right: 5px;

            .volume-icon {
              font-size: 16px;
              cursor: pointer;
            }

            .slider_column {
              position: absolute;
              top: -55px;
              left: 6px;
              width: 3px;
              height: 50px;

              .slider-bar {
                width: 3px;
                border-radius: 1px;
              }

              .slider-block {
                left: -4px;
                width: 6px;
                height: 6px;
              }
            }
          }
        }
      }
      

      .song-info {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        width: 100%;
        flex-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 16px;

        .song {
          font-size: 20px;
          color: #000;
          font-weight: bold;
          color: $theme-color;
        }

        .singer {
          margin-left: 12px;
          font-size: 14px;
          color: #666;
          color: $theme-color;
        }
      }

      .lyric-info {
        text-align: right;
        opacity: 0;
        font-size: 14px;
        height: 18px;
        line-height: 18px;
        margin-bottom: 8px;
        transition: all 1s;
      }
    }

    .main-canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .bg-canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.3;
    }
  }
</style>