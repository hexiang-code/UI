<template>
  <div id="app">
    <!-- <button @click="visiable = !visiable">1111</button> -->
    <!-- <backgroundVideo :resource="require('./assets/background1.jpg')" :isImage="true"></backgroundVideo> -->
    <load-animation :isShow.sync="isShowLoadAnimation"></load-animation>
    <windowUtils title="你好" :isShowWindow.sync="visiable">
      <window-utils-item label="书签名">
        <input v-model="filterValue" type="text">
      </window-utils-item>
    </windowUtils>
    <drawer :isShow.sync="testDrawer" des="" title='' :isModal="false">
      <input v-model="filterValue" @blur="blur"/>
      <div class="bookmarks-header__search" @dblclick ="deleteBtn">
        search
      </div>
      <tree :tree="tree" :isExpandAll="true" ref="tree" :isShowCheckBox="isShowCheckBox">
        <template #operation="treeItem">
          <div class="operation-btn">
            <span>修改</span>
            <span @click.stop="deleteBtn(treeItem)">删除</span>
          </div>
        </template>
      </tree>
    </drawer>
    <button @click="visiable = !visiable" v-drag>开启</button>
    <button @click="checkbox">checkBox</button>
    <live-rem ref="rem"></live-rem>
  </div >
  
</template>

<script>
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
// import backgroundVideo from 'backgroundVideo'
export default {
  name: 'app',
  data () {
    return {
      tree: tree,
      visiable: false,
      testDrawer: false,
      filterValue: '',
      isShowCheckBox: false,
      isShowLoadAnimation: false
    }
  },

  // watch: {
  //   filterValue (value) {
  //     this.$refs.tree.filterNode(value)
  //   }
  // },
  mounted () {
    this.$refs.rem.showToast('你好')
  },

  methods: {
    blur () {
      this.$refs.tree.filterNode(this.filterValue)
    },

    checkbox () {
      this.isShowCheckBox = !this.isShowCheckBox
      console.log(this.isShowCheckBox)
    },

    deleteBtn(item) {
      console.log('删除成功', item)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.bookmarks-header__search {
  position: relative;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  /* border-radius: 15px; */
  /* background-color: #1296db; */
  color: #1296db;
}

.bookmarks-header__search:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid #1296db;
  animation: search-animation 1.5s infinite linear;
}

.bookmarks-header__search:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid #1296db;
  animation: search-animation 1s .5s linear infinite reverse;
}

@keyframes search-animation {
  0%, 100% {
    clip: rect(0, 60px, 22px, 0)
  }
  25% {
    clip: rect(0, 102px, 22px, 60px)
  }
  50% {
    clip: rect(20px, 102px, 40px, 60px)
  }
  75% {
    clip: rect(22px, 40px, 40px, 0)
  }
}
</style>
