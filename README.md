[toc]
# hexiang-ui
### 示例
欢迎访问[我的博客](https://www.hexiangzone.cn/index/notes/notesDetail?notesId=3)查看示例

### 项目初始化
#### 安装
```
npm install --save codehe-ui
```

#### 启动
```
npm run serve
```

### 组件
#### canvas-bg：用canvas绘制的动态背景 
##### attribute
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
colorArray | 颜色数组 | []: String |- | ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"] | 否
numbers | 小球数量 | Number | - | 10 | 否
rInterval| 小球半径规格数组 | []: Number | - | [10, 15, 20, 25] | 否
maxR | 小球到最大半径是自动消散 | Number | - | 50 | 否
cycleTime | 小球从创建到消散经历了多少hz | Number | - | 120 (已60hz为单位刷新时间，即2s) | 否
******
#### live-rem：live2d蕾姆
##### attribute
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
toastTime | 文字提示的持续时间(ms) | Number | - | 3000 | 否
welcomeBack | 欢迎回家提示 | Object | - | 配置选项，具体看下表 | 否
textureConfig | 纹理配置 | Array | - | 配置选项，具体看下表 | 是
manualLoad | 是否手动加载模型，如是则调用组件方法initLiveRem()来手动加载模型 | Boolean | true/false | false | 否
###### welcomeBack
参数|说明|类型|可选值|默认值
--|:--:|:--:|--:|:--
audioSrc | 欢迎回家的语音 |  String | - | 无
text | 欢迎回家的文字 | String | - | 你回来啦~
###### textureConfig
注：toastAction是在调用showToast方法时，人物进行指定动作的配置。根据个人爱好配置即可。
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
id | 纹理id |  Number | - | - | 是
name | 纹理名字 | String | - | - | 是
width | 适配当前纹理的canvas宽度，如：当前纹理宽为300，则width: 300 |  String | - | - | 是
height | 适配当前纹理的canvas高度，如：当前纹理高为300，则height: 300  | String | - | - | 是
texture | 当前纹理的地址 |  String | - | - | 是
toastAction | 提示的动作 |  Object | - | 见默认纹理配置 | 否

###### 默认的纹理配置
```
textureConfig = [
    {   
        id: 1,
        name: 'normal',
        texture: '/live-model/rem/rem.json',
        width: 250,
        height: 280,
        toastAction: { 
            // normal为动作key，可通过调用实例方法showToast({type: 'normal'})，指定执行normal配置好的动作
            normal: {
                name: 'remindAction', // model.json中对应的动作数组key
                index: 12, // 动作数组下标
                priority: 4 // 默认动作优先级为3，超过3则立即停止默认动作，加载指定动作
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
        width: 250,
        height: 325,
        texture: '/live-model/rem-swim/neko.model.json'
    }
]
```
##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
showToast | 弹出提示 | function(text, time, type)<br> text: 提示内容，time: 持续时间,type: live2d展示动作类型(见textureConfig.toastAction) | void
showConfirm | 弹出二次确认弹框 | function(options)<br> options.title: 提示标题 <br> options.message 提示内容 <br> options.showCancelButton 是否展示取消按钮 <br> | void 
**********
#### background-video：视频背景
##### attribute
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
resource | 视频或图片背景的资源路径 | String | - | - | 是
isImageBg | 是否是图片背景 | Boolean | true/false | false | 否
poster | 视频背景时加载的海报路径 | String | - | - | 否

##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
videoLoaded | 视频加载完成的回调 | - | void
posterLoaded | 海报加载完成的回调 | - | void 
**********
#### bg-curtain：幕布背景
##### attribute
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
isShow | 幕布开关 | Boolean | true/false | false | 必填
opacity | 透明度(>=0 && <=1>) | Number | - | 1 | 非必填
##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
curtainClose | 幕布关闭事件 | - | void
************
#### drawer：抽屉
##### attribute
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
title | 抽屉头部展示的标题 | String | - | 加油呀 | 否
des | 抽屉头部展示的描述 | String | - | - | 否 
isShow | 是否展示抽屉（支持.sync修饰符） | Boolean | true/false | false | 是
isModal | 是否需要幕布遮罩 | Boolean | true/false | true | 否
position | 抽屉出现的位置 | String | left/right/top/bottom | right | 否
*********
#### load-animation
##### attribute
参数|说明|类型|可选值|默认值|是否必填
--|:--|:--|:--:|:--:|:--
isShow | 开关（支持.sync修饰符） | Boolean | true/false | false | 是
isModal | 是否需要幕布背景遮罩 | Boolean | true/false | true | 否
isNeedClose | 是否需要手动提前关闭（点击背景幕布即可提前关闭加载动画） | Boolean | true/false | true | 否
opacity | 背景透明度（>=0 && <=1） | Number | - | 1 | 否
************
#### tree
##### attribute
参数|说明|类型|可选值|默认值|是否必填
--|:--|:--|:--:|:--:|:--
tree | 数据源（见下表配置） | Object | - | - | 是
is-expand-all | 是否展开全部子树(子树display:none，并非懒加载) | Boolean | - | false | 否
render-key | 渲染指定key(见下表配置) | Object | - | {} | 否
is-show-checkbox | 是否展示复选框 | Boolean | true/false | false | 否
###### tree配置表
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
title | 树组件头部标题 | String | - | - | 否
children | 树组件多维数组数据源 | Array | - | - | 是
###### tree示例数据
````
const tree = {
  title: '你好你好你好',
  children: [
    {
      label: '前端',
      href: '',
      children: [
        {
          label: 'javaScript',
          href: 'https://www.baidu.com'
        },
        {
          label: 'css',
          href: 'https://www.jianshu.com/p/1614ef2b8bcb'
        },
        {
          label: 'nodejs',
          children: [
            {
              label: '你好,nodejs',
              href: 'https://www.jianshu.com/p/1614ef2b8bcb'
            }
          ]
        }
      ]
    },
    {
      label: '娱乐娱乐娱乐',
      children: [
        {
          label: 'B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站B站',
          href: 'https://www.bilibili.com'
        },
        {
          label: '来啊nodejs'
        }
      ]
    }
  ]
}
````

###### renderKey
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
label | 指定节点标签为节点对象的某个属性值 | String | - | - | 是
children | 指定子树为节点对象的某个属性值 | Array | - | - | 是
注： renderKey为指定key值渲染，label是树中渲染出来的文字，可指定数据源中任意符合要求的属性值。

##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
node-click | 节点点击事件(事件顺序：节点点击 -> 子节点点击) | 当前节点数据 | void
child-node-click | 子节点点击事件(事件顺序同上) | 当前节点数据 | void
parent-nodeClick | 父节点点击事件(事件顺序同上) | 当前节点数据 | void
check-change | 点击复选框事件 | 当前节点数据, 选中的节点id数组 | void 

###### Scoped Slot
name | 说明
--|:--:|:--
operation | 子树操作区域插槽，参数为当前节点数据
header | 树组件头部区域
bottom | 树组件底部区域
**********
#### dialog: 弹框组件
##### attribute
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
dialogVisiable | 开关 | Boolean | true/false | false | 否
width | 宽度 | String | - | 30% | 否
height | 高度(自适应) | String | - | - | 否
title | 窗口顶部标题 | String | - | 提示 | 否
top | 窗口距离顶部的位置 | String | - | 否
curtain | 是否需要背景幕布 | Boolean | true/false | false | 否

##### slot
name | 说明
--|:--:|:--
title | 窗口顶部插槽
footer | 窗口底部插槽

*********
#### hx-form-item：单个表单控件
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
label | 表单标签 | String | - | - | 是
labelWidth | 标签宽度 | String | - | - | 否
labelIcon | 标签图标地址 | String | - | - | 否 

*********
#### hxSwitch：开关
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
value / v-model | 	绑定值 | Boolean | - | false | 否
activeColor | 开启时背景颜色 | String | - | - | 否
inactiveColor | 关闭时背景颜色 | String | - | - | 否 

##### slot
name | 说明
--|:--:|:--
switchLeft | 开关左边插槽
switchRight | 开关右边插槽

******
#### hxSlider：滑块组件
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
value / v-model | 	绑定值 | Number | - | - | 是
max | 最大值 | Number | - | - | 是
min | 最小值 | String | - | - | 是
step | 使用鼠标滚轮时步长,需要使用滚轮事件必须设置步长 | Number | - | 0 | 否
-----------
#### hxAlbum： 相册组件
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
visible | 	开关（支持.sync） | Boolean | true/false | - | 否
ismodal | 是否需要幕布背景 | Boolean | true/false  | - | 否
imageList | 图片或视频信息数组(imageItem见下表) | Array | - | - | 是
accept | 文件上传是接收的文件烈性 | String | - | image/jpeg,image/png,video/mp4
classList | 相册分类数组(classItem 见下表) | Array | - | - | 是
uploadMultiple | 上传文件是否允许多选文件 | Boolean | true/false | false | 否
reachBottomRate | 触底比例（大于0 小于1） | Number | - | - | 否
selectMutiple | 图片列表是否可以多选 | Boolean | true/false | false | 否
selectable | 图片是否可以选中 | Boolean | true/false | false | 否
###### imageItem
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
id | 资源id | Number | - | - | 是
type | 资源类型 | String | image/video | - | 是
recourseName | 资源名称 | String | - | - | 是
recourseUrl | 资源地址 | String | - | - | 是

###### classList
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
id | 分类id | Number | - | - | 是
className | 分类名称 | String | - | - | 是

##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
classChange | 相册分类切换事件 | 相册分类id | void
fileChange | 上传文件时文件列表 |文件数据 | void
deleteImage | 删除图片回调 | 当前选中图片数组 | void
confirm | 确认选中的图片 | 当前选中图片数组 | void
onReachBottom | 触底函数 | - | void
 
##### slot
name | 说明
--|:--:|:--
albumFooter | 相册底部按钮区域插槽
pagination | 分页插槽

-----------
#### hxImagePreview:全屏预览图片
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
visible | 	开关（支持.sync） | Boolean | true/false | - | 否
resource | 当前展示的图片或视频 | Object | - | - | 是
resourceList | 当前资源列表 | Array | - | - | 否

##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
previewImageChange | 当前图片改变事件 | 新的资源信息 | void
----------
#### pagination: 分页组件
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
page-size | 	分页数量 | Number | - | 10 | 否
current-page | 当前页（支持.sync） | Number | - | 1 | 否
total | 资源总数 | Number | - | 1 | 否
layout | 组件布局，子组件名用逗号分隔 | String | prev/pager/next/jumper/total | prev, pager, next, jumper, total | 否
pager-count | 页码按钮的数量，当总页数超过该值时会折叠 | Number | - | 5 | 否
--------------
##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
current-change | 当前页码改变事件 | 新的页码 | void
--------------

#### hx-table: 表格组件
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
tableData | 显示的数据 | Array | - | - | 必填
stripe | 是否斑马条纹表格 | Boolean | true/false | true | -
--------------
##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
sort-change | 点击表格排序按钮触发的事件 | (prop, sort)<br>prop: 触发排序的列属性 <br>sort: 排序方式 asc: 升序, desc降序 | void

------
#### hx-table-column: 表格列组件
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
prop | 对应列内容的字段名 | String | - | - | 必填
label | 对应列标题 | Sting | - | - | 必填
sortable | 是否展示排序按钮 | Boolean | true/false | false | 否
align | 文字对齐方式 | Sting | 'left'/'right'/'center' |left | 否
width | 列宽 | Number | - | - | 否

##### Scoped slot
name | 说明
--|:--:|:--
header | 头部插槽，参数为 { prop } 当前列属性
columnContent | 内容插槽，参数为 { row } 当前行全部数据


-------
#### hx-date-picker 日期范围选择组件
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
value/v-model | 	绑定值 | Array | - | - | 否
start-placeholder | 范围选择时开始日期的占位内容 | Sting | - | - | 否
end-placeholder | 范围选择时结束日期的占位内容 | Sting | - | - | 否
format | 日期展示展示格式 | Sting | - | YYYY-MM-DD HH:mm:ss | 否

##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
select-complete | 日期选择完成 | [start, end]: 日期范围 | void


-----
#### hx-select 下拉框选择
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
value/v-model | 	绑定值 | String/Number/Boolean | - | - | 是
placeholder | 占位符 | Sting | - | 请选择 | 否
disabled | 是否禁用 | Boolean | - | false | 否
valueKey | 指定value值得key | Sting | - | value| 否
filterable | 是否可搜索 |  boolean | true/false | false | 否
multiple | 是否多选 | boolean | true/false | false | 否

##### slot
name | 说明
--|:--:|:--
default | 自定义hx-option内容，filterable此时对自定义内容失效，只能搜索label内容

----
#### hx-music 下拉框选择
参数|说明|类型|可选值|默认值|是否必填
--|:--:|:--:|--:|:--:|:--
musicSrc | 	音乐地址 | String | - | - | 是
musicFaceSrc | 音乐封面地址 | Sting | - | - | 否
singer | 歌手名称 | String | - | - | 否
song | 歌曲名称 | Sting | - | - | 否
progressUnit | 歌曲进度条单位，m:分钟s:秒(小写) |  String | m/s | m | 否
musicLyric | 歌词文件,必须符合lyric文件格式，如下例 | String | - | - | 否

##### event
事件名|说明|参数|返回值类型
--|:--:|:--:|--:
end | 播放结束 | playMode: 当前组件播放模式<br />random:随机播放<br />circulation:单曲循环<br/>sequence:顺序播放 | void
up | 上一曲 | - | void
next | 下一曲 | - | void
getLyric | 如果歌曲格式不对的话，会派发该事件 | currentTime: 当前歌曲播放时间, cb: 歌词回调函数,cb的第一个参数会作为当前时间段的歌词 | void
music-error | 播放出错事件 | musicError(this, $event) this: 当前播放器实例，$event：浏览器$event对象 | void
music-start | 开始播放钩子 | - | void
music-pause | 暂停播放钩子 | - | void

###### musicLyric例：
```
musicLyric = `[00:00.000] 作词 : 迟木
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
`
```
