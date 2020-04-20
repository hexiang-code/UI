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
      return context.parent.createTree(h, tree.children)
    }
  }
  export default {
    name: 'tree',
    props: {
      tree: {
        type: Object,
        required: true
      }, // 数据源
      isExpandAll: {
        type: Boolean,
        default: false
      }, // 是否展开全部
      renderKey: {
        type: Object,
        required: false,
        default: () => {
          return {
            label: 'label',
            children: 'children',
            href: 'href'
          }
        }
      }, // 指定key值渲染
    },
    components: {
      'treeBody': treeBody
    },
    methods: {
      // 创建节点树
      createTree(h, list) {
        let { children, label } = this.renderKey
        let { isExpandAll } = this
        let treeStr = list && list.map(item => {
          if (item[children] && item[children].length > 0) {
            return  this.createParendNode(h, item)
          } else {
            return isExpandAll ? this.createChildNode(h, item) : ''
          }
        })
        return treeStr
      },

      // 创建父节点
      createParendNode (h, parentData) {
        let { children, label } = this.renderKey
        return(
          <div class="tree-main__label">
            {parentData[label]}
            {this.createTree(h, parentData[children])}
          </div>
        )
      },

      // 创建子节点
      createChildNode (h, childData) {
        let { children, label, href } = this.renderKey
        return childData[href]
                    ? (<a class="tree-main__children-label" target="_blank" href={childData[href]} title={childData[href]}>{childData[label]}</a>)
                    : (<div class="tree-main__children-label">{childData[label]}</div>)
      }
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
        padding: 20px 0 0 20px;
        font-size: 20px;
      }

      .tree-main__children-label {
        padding: 10px 0 0 20px;
        font-size: 16px;
      }
    }
  }
</style>