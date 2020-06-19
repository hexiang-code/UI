const HOMEPATH = document.location.protocol +'//' + window.document.location.hostname +':' + window.document.location.port +'/'

// const IMAGESRCPATH = [
//   require('../../public/live-model/rem/remu2048/texture_00.png')
// ]

const MESSAGE = {
  "mouseover": [
      {
          "selectorId": "liveRemInfo",
          "text": ["想看换装play嘛？"]
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


const textureConfig = [
    {   
        id: 1,
        name: 'normal',
        texture: '/live-model/rem/rem.json',
        width: '250',
        height: '280',
        toastAction: {
            normal: {
                name: 'remindAction',
                index: 12,
                priority: 4
            },
        
            lovely: {
                name: 'remindAction',
                index: 16
            },
        
            error: {
                name: 'remindAction',
                index: 21
            },
        
            success: {
                name: 'remindAction',
                index: 25
            },
        
            smail: {
                name: 'remindAction',
                index: 33
            },

            sad: {
                name: 'remindAction',
                index: 21 // 带寻找悲伤的表情动作
            }
        }
    },
    {
        id: 2,
        name: 'swim',
        width: 290,
        height: 380,
        texture: '/live-model/rem-swim/neko.model.json'
    }
]


export {
//   IMAGESRCPATH,
  HOMEPATH,
  MESSAGE,
  textureConfig
}