<template>
  <div class="tree-main">
    <div class="tree-main__body">
      <div class="tree-main__title" ref="treeContent">
        {{tree.title}}
      </div>
      <treeBody :tree="tree"></treeBody>
    </div>
  </div>
</template>

<script>
  const treeBody = {
    name: 'cpn',
    functional: true,
    render: (h, context) => {
      let { tree } = context.props
      const createTree = (list = tree.children) => {
        let treeStr = list && list.map(item => {
          if (item.children && item.children.length > 0) {
            return  (<div class="tree-main__label">
                      {item.label}
                      {createTree(item.children)}
                    </div>)
          } else {
            return item.href ? (<a class="tree-main__label" target="_blank" href={item.href} title={item.href}>{item.label}</a>) : (<div class="tree-main__label">{item.label}</div>)
          }
        })
        return treeStr
      }
      return createTree()
    }
  }
  export default {
    name: 'tree',
    props: {
      tree: {
        type: Object,
        required: true
      }
    },
    components: {
      'treeBody': treeBody
    },
    mounted () {
      // let vnode = document.createElement('div')
      // var t=document.createTextNode("CLICK ME");
      // vnode.appendChild(t)
      // let vnode = this.$createElement('a', '你好')
      // this.$refs.treeContent.appendChild(vnode)
    }
  }
</script>

<style lang="scss" scoped>
  .tree-main {
    position: relative;

    
    .tree-main__body {
        padding: 0 20px;

      .tree-main__title {
        text-align: left;
        font-size: 18px;
      }

      .tree-main__label {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 5px 0 0 20px;
      }
    }
  }
</style>