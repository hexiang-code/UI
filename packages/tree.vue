<template>
  <div class="tree-main">
    <div class="tree-main__body">
      <div class="tree-main__title" ref="treeContent">
        {{tree.title}}
      </div>
      <tree-body :tree="tree"></tree-body>
    </div>
  </div>
</template>

<script>
  const treeBody = {
    name: 'treeBody',
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
        let { children } = this.renderKey
        let { isExpandAll } = this
        let treeStr = list && list.map(item => {
          if (item[children] && item[children].length > 0) {
            return  this.createParendNode(h, item)
          } else {
            return this.createChildNode(h, item, isExpandAll)
          }
        })
        return treeStr
      },

      // 创建父节点
      createParendNode (h, parentData) {
        let { children, label } = this.renderKey
        return(
          <div class="tree-main__label">
            <div class="tree-main__label-title" onClick={($event) => this.parentNodeClick($event, parentData)}>
              <svg t="1587472828710" class='tree-main_open' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4336" width="200" height="200"><path d="M491.904 380.638H112.171c-16.032 0-29.091 10.99-29.091 24.437 0 13.446 13.059 24.436 29.09 24.436h379.864c16.032 0 29.09-10.99 29.09-24.436-0.129-13.576-13.187-24.437-29.22-24.437z m0 216.049H112.171c-16.032 0-29.091 10.99-29.091 24.436 0 13.447 13.059 24.437 29.09 24.437h379.864c16.032 0 29.09-10.99 29.09-24.437-0.129-13.446-13.187-24.436-29.22-24.436z m-0.517 216.307H112.56c-16.291 0-29.608 10.99-29.608 24.436 0 13.447 13.188 24.437 29.608 24.437h378.828c16.42 0 29.608-10.99 29.608-24.437 0-13.446-13.188-24.436-29.608-24.436zM681.19 334.739h93.737v316.897c0 16.033 10.99 29.091 24.437 29.091 13.446 0 24.307-13.058 24.307-29.09V334.738h93.737c14.74 0 21.85-3.878 23.273-6.723 1.164-2.327-0.13-9.438-8.145-19.394l-102.53-128.258c-8.404-10.602-19.264-16.291-30.513-16.291-11.378 0-22.109 5.818-30.513 16.29L666.32 308.753c-7.886 9.955-9.18 17.066-8.016 19.393 0.905 2.716 8.146 6.594 22.885 6.594z" p-id="4337"></path><path d="M112.688 861.737h768c16.291 0 29.608-10.99 29.608-24.436s-13.188-24.436-29.608-24.436h-768c-16.29 0-29.608 10.99-29.608 24.436 0 13.576 13.188 24.436 29.608 24.436z m379.216-697.535H112.171c-16.032 0-29.091 10.99-29.091 24.436 0 13.447 13.059 24.437 29.09 24.437h379.864c16.032 0 29.09-10.99 29.09-24.437-0.129-13.446-13.187-24.436-29.22-24.436z" p-id="4338"></path></svg>
              {parentData[label]}
            </div>
            { this.createTree(h, parentData[children]) }
          </div>
        )
      },

      // 父节点点击事件
      parentNodeClick ($event, parentNode) {
        this.$emit('nodeClick', parentNode)
        this.$emit('parentNodeClick', parentNode)
        let nodes = [...$event.target.parentNode.children]
        let iconClassList = $event.target.firstChild.classList
        if (iconClassList.value == 'tree-main_open') iconClassList.value = 'tree-main_close'
        else iconClassList.value = 'tree-main_open'
        let visibelNode = nodes.slice(1, nodes.length)
        visibelNode.forEach(item => {
          let isExpand = item.getAttribute('style') == 'display: none'
          if (!isExpand) item.setAttribute('style', 'display: none')
          else item.removeAttribute('style')
        })
      },

      // 重渲染子节点
      reRenderChildNode () {
        console.log('reRenderChildNode')
      },

      // 子节点点击事件
      childNodeClick (childNode) {
        this.$emit('nodeClick', childNode)
        this.$emit('childNodeClick', childNode)
        console.log('childNodeClick')
      },

      // 创建子节点
      createChildNode (h, childData, isExpandAll) {
        let { children, label } = this.renderKey
        // return (childData[children] && childData[children].length > 0)
        //             ? (<a class="tree-main__children-label" onClick={() => this.childNodeClick(childData)} title={childData[label]}>{childData[label]}</a>)
        //             : (<div class="tree-main__children-label" onClick={() => this.parentNodeClick(childData)}>{childData[label]}</div>)
        return (<a class='tree-main__children-label' style={ isExpandAll ? '' : 'display: none' } onClick={() => this.childNodeClick(childData)} title={childData[label]}>{childData[label]}</a>)
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
        padding: 10px 20px;
        text-align: left;
      }

      .tree-main__label-title {
        margin: 0;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 20px;
        font-size: 20px;
        padding: 5px;
        cursor: pointer;
      }

      .tree-main_open {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        transform: rotate(180deg);
      }

      .tree-main_close {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        transform: rotate(90deg);
      }

      .tree-main__label-title:hover {
        // color: #fff;
        // background-color: #1296db;
        transform: scale(1.1);
      }

      .tree-main__children-label {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 5px 0 5px 20px;
        font-size: 16px;
        cursor: pointer;
      }
      .tree-main__children-label:hover {
        border-bottom: 1px solid #409eff;
      }
      .tree-main__children_visibel {
        display: none;
      }
    }
  }
</style>