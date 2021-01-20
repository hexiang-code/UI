
const tree = {
  title: "你好你好你好",
  children: [
    {
      label: "前端",
      href: "",
      id: 1,
      children: [
        {
          id: 2,
          label: "javaScript",
          href: "https://www.baidu.com"
        },
        {
          id: 3,
          label: "css",
          href: "https://www.jianshu.com/p/1614ef2b8bcb"
        },
        {
          id: 4,
          label: "nodejs",
          children: [
            {
              id: 5,
              label: "你好,nodejs",
              href: "https://www.jianshu.com/p/1614ef2b8bcb"
            }
          ]
        }
      ]
    },
    {
      id: 6,
      label: "娱乐娱乐娱乐",
      children: [
        {
          id: 7,
          label:
            "B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站",
          href: "https://www.bilibili.com"
        },
        {
          id: 8,
          label: "来啊nodejs"
        }
      ]
    }
  ]
}
const musicLyric = `[00:00.000] 作词 : 迟木
[00:01.000] 作曲 : 迟木
[00:24]没有酒 而我醉好几夜
[00:30]没有风 却飘在青雾间
[00:36]没朝夕 只有我 与神仙
[00:48]没有山 犹立在云之巅
[00:54]没有船 也渡到苦海边
[01:00]没日月 只有我 和妖孽
[01:12]飘不到 一千万座岛屿
[01:17]赶不上 一千万次花期
[01:24]我梦了 一千万道涟漪
[01:31]全是你
[01:37]不愿留 一千万页过去
[01:42]换最后 一千万首怨曲
[01:49]我所求 一千万个故事
[01:55]只有你
[02:00]没有诗 捉呓语谱作曲
[02:06]没有琴 戏流水弄笑语
[02:12]没鬼神 只有我 只有你
[02:48]没有灯 铜铃声照四壁
[02:54]没有火 燃烧爱与身体
[03:00]没天地 还有我 还有你
[03:12]飘不到 一千万座岛屿
[03:19]赶不上 一千万次花期
[03:25]我梦了 一千万道涟漪
[03:30]全是你
[03:37]不愿留 一千万页过去
[03:43]换最后 一千万首怨曲
[03:50]我所求 一千万个故事
[03:55]只有你
[04:18]全是你
[04:24]不愿留 一千万页过去
[04:31]换最后 一千万首怨曲
[04:37]我所求 一千万个故事
[04:42]只有你
[04:48]没有酒 而我醉好几夜
[04:54]没有风 却飘在青雾间
[05:00]没朝夕 只有我 与神仙
`;
const imageList = [
  {
    id: 1,
    type: "image",
    resourceName:
      "测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片",
    resourceUrl:
      "https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_232533.jpg"
  },
  {
    id: 2,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/songshu.jpg"
  },
  {
    id: 3,
    type: "video",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/6.jpg"
  },
  {
    id: 4,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/8.jpg"
  },
  {
    id: 5,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/loadingError.png"
  },
  {
    id: 6,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.jpg"
  },
  {
    id: 7,
    type: "image",
    resourceName: "测试图片",
    resourceUrl: "https://api.hexiangzone.cn/assets/kafeidou/leimuAvatar.gif"
  },
  {
    id: 8,
    type: "image",
    resourceName: "测试图片",
    resourceUrl:
      "https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_173606.jpg"
  },
  {
    id: 9,
    type: "image",
    resourceName: "测试图片",
    resourceUrl:
      "https://api.hexiangzone.cn/assets/kafeidou/wx_camera_1598800076868.jpg"
  },
  {
    id: 10,
    type: "image",
    resourceName: "测试图片",
    resourceUrl:
      "https://api.hexiangzone.cn/assets/kafeidou/IMG_20200830_232533.jpg"
  }
];

const classList = [
  {
    id: 1,
    className: "图片"
  },
  {
    id: 2,
    className: "视频"
  }
];
const meauList = [
  {
    name: "回到顶部"
  },
  {
    name: "你好"
  },
  {
    name: "测试"
  }
];
const hardwareTitle = [
  {
    props: "cpuTemp",
    label: "cpu温度"
  },
  {
    props: "cpuUseage",
    label: "cpu使用率"
  },
  {
    props: "cpuMaxClocks",
    label: "cpu最大频率"
  },
  {
    props: "cpuPowers",
    label: "cpu功耗"
  },
  {
    props: "diskTemp",
    label: "硬盘温度"
  },
  {
    props: "diskUseage",
    label: "硬盘使用率"
  },
  {
    props: "ssdDiskTemp",
    label: "固态硬盘温度"
  },
  {
    props: "ssdDiskUseage",
    label: "固态硬盘使用率"
  },
  {
    props: "memUseage",
    label: "内存使用率"
  }
];
const loggerTitle = [
  {
    props: "userId",
    label: "用户id"
  },
  {
    props: "userAccount",
    label: "用户账户"
  },
  {
    props: "url",
    label: "请求地址"
  },
  {
    props: "method",
    label: "请求方式"
  },
  {
    props: "params",
    label: "请求参数"
  },
  {
    props: "time",
    label: "请求耗时"
  },
  {
    props: "token",
    label: "用户token"
  },
  {
    props: "mode",
    label: "用户身份"
  },
  {
    props: "error",
    label: "错误信息"
  },
  {
    props: "createdAt",
    label: "发生时间",
    sortable: true
  }
];
let hardwareArray = [
  {
    cpuTemp: "38 °C",
    cpuUseage: "40 %",
    cpuMaxClocks: "3850 MHz",
    cpuPowers: "40 W",
    diskTemp: "40 °C",
    diskUseage: "20 %",
    ssdDiskTemp: "20 °C",
    ssdDiskUseage: "50 %",
    memUseage: "30 %"
  }
];
let loggerList = [
  {
    createdAt: 1604630787183,
    error: JSON.stringify({ message: "你好啊，错了错了" }),
    id: 22,
    method: "GET",
    mode: "superManager",
    params: "{}",
    time: 59,
    token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoic3VwZXJNYW5hZ2VyIiwidXNlckFjY291bnQiOiJrYWZlaWRvdSIsInVzZXJJZCI6OCwiaWF0IjoxNjA0NjI3ODAwLCJleHAiOjE2MDQ3MTQyMDB9.bEn2-efVa3BxREiqYdqClGOs3hbkxByvyOKsbUcZD5M",
    updatedAt: 1604630787183,
    url: "/api/user/getCurLoginUserInfo",
    userAccount: null,
    userId: 8
  }
]

let noteLabelList = [
  {
    id: 4,
    name: "readme",
    userId: 8,
    disabled: 0,
    createdAt: "2020-11-30T06:36:35.000Z",
    updatedAt: "2020-11-30T06:36:35.000Z"
  },
  {
    id: 3,
    name: "css",
    userId: 8,
    disabled: 0,
    createdAt: "2020-11-27T08:42:34.000Z",
    updatedAt: "2020-11-27T08:42:34.000Z"
  },
  {
    id: 2,
    name: "JavaScript",
    userId: 8,
    disabled: 0,
    createdAt: "2020-11-23T09:46:24.000Z",
    updatedAt: "2020-11-23T09:46:24.000Z"
  },
  {
    id: 1,
    name: "游记",
    userId: 8,
    disabled: 0,
    createdAt: "2020-11-23T09:43:10.000Z",
    updatedAt: "2020-11-27T07:52:16.000Z"
  }
]

export {
  noteLabelList,
  loggerList,
  hardwareArray,
  loggerTitle,
  hardwareTitle,
  classList,
  meauList,
  imageList,
  musicLyric,
  tree
}