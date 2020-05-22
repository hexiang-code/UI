const HOMEPATH = document.location.protocol +'//' + window.document.location.hostname +':' + window.document.location.port +'/'

// const IMAGESRCPATH = [
//   require('../../public/live-model/rem/remu2048/texture_00.png')
// ]

const MESSAGE = {
  "mouseover": [
      {
          "selectorId": "liveRemInfo",
          "text": ["查看最新吐槽和站内信息"]
      },
      {
          "selectorId": "liveRemTalk",
          "text": ["要和我聊天吗？"]
      },
      {
          "selectorId": "liveRemHide",
          "text": ["隐藏蕾姆，希望隐藏后我们还能再见面！"]
      },
      {
          "selectorId": "liveRemMusic",
          "text": ["给页面加点音乐吗？"]
      },
      {
          "selectorId": "liveRemGuiChu",
          "text": ["按钮有毒，癫痫患者不要开启！！！<br>点一下开启，再点一下可以关闭。"]
      },
      {
          "selectorId": "liveRemInfo",
          "text": ["要看看 {text} 么？"]
      },
      {
          "selectorId": "liveRemInfo",
          "text": ["在找什么东西呢，需要帮忙吗？"]
      }
  ],
  "click": [
      {
          "selectorId": "live2d",
          "text": ["有什么事要吩咐吗？", "那个……如果太过强硬，蕾姆会不自觉长出角的！","如果一直这样的话，蕾姆可是会生气的哦！", "头晕目眩", "要是能再温柔一点的话……"]
      }
  ]
}

export {
//   IMAGESRCPATH,
  HOMEPATH,
  MESSAGE
}