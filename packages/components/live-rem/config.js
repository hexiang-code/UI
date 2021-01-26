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
        width: 250,
        height: 280,
        toastAction: {
            normal: {
                name: 'remindAction',
                index: 12,
                priority: 4
            },
        
            lovely: {
                name: 'remindAction',
                index: 17
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
            },

            shy: {
                name: 'remindAction',
                index: 16
            }
        }
    },
    {
        id: 2,
        name: 'swim',
        width: 250,
        height: 325,
        texture: '/live-model/rem-swim/neko.model.json'
    }
]

const meauList = [
    {
        name: '想看换装play嘛',
        icon: '&#xe695;',
        type: 'changeTexture'
    },
    {
        name: '要和我聊天嘛',
        icon: '&#xe62b;',
        type: 'communication'
    },
    {
        name: '回到顶部',
        icon: '&#xe635;',
        type: 'goTop'
    }
]


const voiceTips = {
    beautifulDay: [
        {
            sound: '/live-model/rem/sound/lemm_001.mp3',
            text: '希望今天也是美好的一天，姐姐大人'
        }
    ],

    notHappy: [
        {
            sound: '/live-model/rem/sound/lemm_003.mp3',
            text: '雷姆很不愉快。'
        }
    ],

    goodMorning: [
        {
            sound: '/live-model/rem/sound/lemm_006.mp3',
            text: '早上好。'
        },
        {
            sound: '/live-model/rem/sound/lemm_023.mp3',
            text: '请看窗外。心情好的早上啊。23'
        }
    ],

    // 困扰
    worry: [
        {
            sound: '/live-model/rem/sound/lemm_009.mp3',
            text: '已经不行了。请不要让雷姆困扰。'
        }, 
        {   
            sound: '/live-model/rem/sound/lemm_040.mp3',
            text: '被那样凛冽的目光盯着的话会很困扰……。'
        },
        {   
            sound: '/live-model/rem/sound/lemm_055.mp3',
            text: '请不要为难。脸会变红。55'
        }
    ],

    // 窘迫
    embarrassment: [
        {
            sound: '/live-model/rem/sound/lemm_014.mp3',
            text: '真的是很为难的人呢…。'
        }
    ],

    remind: [
        {
            sound: '/live-model/rem/sound/lemm_020.mp3',
            text: '雷姆也有一点，非常有一点，相当有一点，很在意。'
        }
    ],

    // praise 夸赞
    praiseRem: [
        {
            sound: '/live-model/rem/sound/lemm_022.mp3',
            text: '怎么样？可以表扬我吗？'
        }
    ],

    praiseMaster: [
        {
            sound: '/live-model/rem/sound/lemm_024.mp3',
            text: '好厉害！雷姆钦佩了！'
        }
    ],
    
    // 安慰
    comfort: [
        {
            sound: '/live-model/rem/sound/lemm_025.mp3',
            text: '没关系。雷姆总是在你身后守护着你。'
        },
        {
            sound: '/live-model/rem/sound/lemm_047.mp3',
            text: '即使没有被命令，雷姆也会一直在你身边。'
        }
    ],

    careForMaster: [
        {
            sound: '/live-model/rem/sound/lemm_028.mp3',
            text: '你不累吗？需要治愈魔法吗？'
        },
        {
            sound: '/live-model/rem/sound/lemm_041.mp3',
            text: '辛苦了。喝茶的时间怎么样？'
        }
    ],

    // 照顾
    lookAfter: [
        {
            sound: '/live-model/rem/sound/lemm_029.mp3',
            text: '枕膝…是吗？如果可以的话我很高兴。'
        }
    ],

    welcome: [
        {
            sound: '/live-model/rem/sound/lemm_042.mp3',
            text: '欢迎回来。今天有甜的烤点心哦。'
        }
    ],

    goOffWork: [
        {
            sound: '/live-model/rem/sound/lemm_044.mp3',
            text: '工作辛苦了。洗澡的准备也全部结束了。'
        }
    ],

    goodNight: [
        {
            sound: '/live-model/rem/sound/lemm_048.mp3',
            text: '好好休息，明天也请给我看帅气的地方。'
        },
        {
            sound: '/live-model/rem/sound/lemm_050.mp3',
            text: '那，陪睡吗？玩笑开得太过火了。'
        },
        {
            sound: '/live-model/rem/sound/lemm_051.mp3',
            text: '在睡着之前，我可以握着你的手吗？'
        },
        {
            sound: '/live-model/rem/sound/lemm_053.mp3',
            text: '雷姆也困了。'
        },
        {
            sound: '/live-model/rem/sound/lemm_049.mp3',
            text: '差不多该休息了。'
        }
    ],

    
    shy: [
        {
            sound: '/live-model/rem/sound/lemm_063.mp3',
            text: '那样的……可爱什么的，很害羞。'
        }
    ],

    celebrate: [
        {
            sound: '/live-model/rem/sound/lemm_072.mp3',
            text: '雷姆一定是为了这一天而生的吧。'
        }
    ],

    // 以下是整点报时

    '0': [
        {
            sound: '/live-model/rem/sound/lemm_074.mp3',
            text: '0点。新的一天开始了哦。。'
        }
    ],

    '1': [
        {
            sound: '/live-model/rem/sound/lemm_075.mp3',
            text: '1点。还醒着没关系吗？？'
        }
    ],

    '2': [
        {
            sound: '/live-model/rem/sound/lemm_076.mp3',
            text: '两点。雷姆是……我有点困了。'
        }
    ],

    '3': [
        {
            sound: '/live-model/rem/sound/lemm_077.mp3',
            text: '3点…是的。那个，明天早上也要早起…。'
        }
    ],

    '4': [
        {
            sound: '/live-model/rem/sound/lemm_078.mp3',
            text: '4点…是的。真的，真的…。'
        }
    ],


    '5': [
        {
            sound: '/live-model/rem/sound/lemm_079.mp3',
            text: '五点…啊，到了早上…！'
        }
    ],

    '6': [
        {
            sound: '/live-model/rem/sound/lemm_080.mp3',
            text: '6点！今天也要打起精神来！'
        }
    ],

    '7': [
        {
            sound: '/live-model/rem/sound/lemm_081.mp3',
            text: '早饭想吃什么？'
        }
    ],

    '8': [
        {
            sound: '/live-model/rem/sound/lemm_082.mp3',
            text: '8点。大家差不多该起床了吧。'
        }
    ],

    '9': [
        {
            sound: '/live-model/rem/sound/lemm_083.mp3',
            text: '9点。果然，姐姐大人很棒…。'
        }
    ],

    '10': [
        {
            sound: '/live-model/rem/sound/lemm_084.mp3',
            text: '10点。那么，首先从房间的打扫开始。'
        }
    ],

    '11': [
        {
            sound: '/live-model/rem/sound/lemm_085.mp3',
            text: '11点。休息还早呢。'
        }
    ],

    '12': [
        {
            sound: '/live-model/rem/sound/lemm_086.mp3',
            text: '12点。吃午饭吧。'
        }
    ],

    '13': [
        {
            sound: '/live-model/rem/sound/lemm_087.mp3',
            text: '13点。开始下午的工作吧。'
        }
    ],

    '14': [
        {
            sound: '/live-model/rem/sound/lemm_088.mp3',
            text: '14点。我有点困了。'
        }
    ],

    '15': [
        {
            sound: '/live-model/rem/sound/lemm_089.mp3',
            text: '15点。点心…是吗？是蒸芋头呢♪'
        }
    ],

    '16': [
        {
            sound: '/live-model/rem/sound/lemm_090.mp3',
            text: '16点。姐姐大人的蒸番薯，咸度绝妙♪'
        }
    ],

    '17': [
        {
            sound: '/live-model/rem/sound/lemm_091.mp3',
            text: '17点。能看见美丽的晚霞吗？'
        }
    ],

    '18': [
        {
            sound: '/live-model/rem/sound/lemm_092.mp3',
            text: '18点。肚子饿了吗？？'
        }
    ],

    '19': [
        {
            sound: '/live-model/rem/sound/lemm_093.mp3',
            text: '19点。今晚是雷姆的特制…全套♪'
        }
    ],

    '20': [
        {
            sound: '/live-model/rem/sound/lemm_094.mp3',
            text: '20点。今晚一起…没什么。'
        }
    ],

    '21': [
        {
            sound: '/live-model/rem/sound/lemm_095.mp3',
            text: '21点。被子的准备随时都可以。'
        }
    ],

    '22': [
        {
            sound: '/live-model/rem/sound/lemm_096.mp3',
            text: '22点。差不多该睡了吧？'
        }
    ],

    '23': [
        {
            sound: '/live-model/rem/sound/lemm_097.mp3',
            text: '23点。已经到了睡觉的时间了哦？'
        }
    ]
}


export {
//   IMAGESRCPATH,
  HOMEPATH,
  MESSAGE,
  textureConfig,
  meauList,
  voiceTips
}