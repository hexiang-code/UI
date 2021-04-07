<template>
  <div class="tree-main">
    <div class="tree-main__title">
      {{tree.title}}
    </div>
    <tree-body :tree="tree" ref="treeBody">
      <template slot="operation">
        <div>操作</div>
      </template>
    </tree-body>
  </div>
</template>

<script>
  const treeBody = {
    name: 'treeBody',
    // functional: true,
    props: ['tree'],
    render: function(h) {
      return (
        <div class="tree-main__body">
          {
            this.$parent.$scopedSlots.header ? this.$parent.$scopedSlots.header() : ''
          }
          { this.$parent.createTree(h, this.tree.children) }
          {
            this.$parent.$scopedSlots.bottom ? this.$parent.$scopedSlots.bottom() : ''
          }
        </div> 
      )
    }
  }
  export default {
    name: 'hx-tree',
    props: {
      // 数据源
      tree: {
        type: Object,
        required: true
      }, 
      // 是否展开全部
      isExpandAll: {
        type: Boolean,
        default: false
      }, 
      // 指定key值渲染
      renderKey: {
        type: Object,
        required: false,
        default: () => {
          return {
            label: 'label',
            children: 'children',
          }
        }
      }, 
      // 是否展示复选框
      isShowCheckbox: {
        type: Boolean,
        value: false
      }
    },

    data () {
      return {
        filterNodeNum: 0, // 节点过滤的次数
        copyFragment: null // 节点过滤的文档碎片备份
      }
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
            return this.createParendNode(h, item, isExpandAll)
          } else {
            return this.createChildNode(h, item, isExpandAll)
          }
        })
        return treeStr
      },

      // 创建父节点
      createParendNode (h, parentData, isExpandAll) {
        let { children, label } = this.renderKey
        return(
          <div class="tree-main__content">
            <div class="tree-main__label">
              <transition name="checkbox">
                { 
                  this.isShowCheckbox ? 
                    <span class={ parentData['isCheck'] ? 
                      'tree-main__check-box tree-main__check-box_checked' : 
                        'tree-main__check-box' }
                        onClick={() => this.checkBoxClick(parentData)}>
                    </span> : 
                    '' 
                }
              </transition>
              <div class="tree-main__label-title" onClick={($event) => this.parentNodeClick($event, parentData)}>
                <i class={ ['iconfont tree-main__icon', isExpandAll ? 'tree-main__icon_open' : 'tree-main__icon_close'] }>&#xe61e;</i>
                <div class="tree-main__title-text">{parentData[label]}</div>
                {
                  this.$scopedSlots.operation ? 
                    h('div', this.$scopedSlots.operation(parentData)) : 
                    ''
                }
              </div>
            </div>
            <div class="tree-main__child-list" style={ isExpandAll ? '' : 'display: none' }>
              { this.createTree(h, parentData[children]) }
            </div>
          </div>
        )
      },

      // 父节点点击事件
      parentNodeClick ($event, nodeData) {
        this.$emit('node-click', nodeData)
        this.$emit('parent-node-click', nodeData)
        let iconClassList = $event.currentTarget.firstChild.classList
        if (iconClassList && iconClassList.contains('tree-main__icon_open')) {
          iconClassList.add('tree-main__icon_close')  
          iconClassList.remove('tree-main__icon_open')
        } else if (iconClassList && iconClassList.contains('tree-main__icon_close')) {
          iconClassList.remove('tree-main__icon_close')
          iconClassList.add('tree-main__icon_open')
        }
        let childListNode = $event.currentTarget.parentNode.nextElementSibling
        let isExpand = childListNode.getAttribute('style') == 'display: none;'
        if (!isExpand) childListNode.setAttribute('style', 'display: none;')
        else childListNode.removeAttribute('style')
        // let fragment = this.createFragment(false, $event.currentTarget.parentNode.nextElementSibling)
        // let nodes = [...fragment.children]
        // nodes.forEach(item => {
        //   let isExpand = item.getAttribute('style') == 'display: none;'
        //   if (!isExpand) item.setAttribute('style', 'display: none;')
        //   else item.removeAttribute('style')
        // })
        // $event.currentTarget.parentNode.nextElementSibling.appendChild(fragment)
      },

      // 创建文档碎片
      createFragment (curNode, root) {
        let fragment = document.createDocumentFragment()
        if(curNode) {
          while (curNode !== root.lastChild) {
            fragment.appendChild(root.lastChild)
          }
        } else {
          let firstChild = root.firstChild
          while (firstChild) {
            fragment.appendChild(firstChild)
            firstChild = root.firstChild
          }
        }
        return fragment
      },

      // 子节点点击事件
      childNodeClick (childNode) {
        this.$emit('node-click', childNode)
        this.$emit('child-node-click', childNode)
      },

      // 创建子节点
      createChildNode (h, childData, isExpandAll) {
        let { label } = this.renderKey
        return (
          <div class='tree-main__children-label'>
            <transition name="checkbox">
              { 
                this.isShowCheckbox ? 
                <span class={ childData['isCheck'] ? 
                  'tree-main__check-box tree-main__check-box_checked' : 
                  'tree-main__check-box' }
                  onClick={() => this.checkBoxClick(childData)}>
                </span> :
                '' 
              }
            </transition>
            <a class="tree-main__title-text" onClick={() => this.childNodeClick(childData)} title={childData[label]}>{childData[label]}</a>
            {
              this.$scopedSlots.operation ? 
                this.$scopedSlots.operation(childData) : 
                ''
            }
          </div>
          )
      },

      // 过滤节点
      filterNode (value) {
        let fragment = this.createFragment(false, this.$refs.treeBody.$el)
        if (value && this.filterNodeNum === 0) {
          // 备份一次用于还原
          this.copyFragment = document.importNode(fragment, true)
        }
        // 没有查询条件，重置节点之前的状态
        if (!value) {
          this.filterNodeNum = 0
          this.$refs.treeBody.$el.appendChild(this.copyFragment)
          return
        }
        this.filterNodeNum ++
        const findNode  = (value, nodeList) => {
          let index = 0, firstChild = nodeList[index]
          while (firstChild && index <= nodeList.length) {
            index ++
            // 找到了关键字, 并且有子节点
            if (value && firstChild.innerText && firstChild.innerText.indexOf(value) > -1) {
              // 还有孩子节点, 放弃第一个节点遍历兄弟节点（第一个节点是标题， 第二个节点是兄弟节点）
              if (firstChild.childNodes.length) {
                let length = firstChild.childNodes.length
                findNode(value, firstChild.childNodes[length - 1].childNodes)
              }
              else continue // 没有孩子节点
            } else if (value && firstChild.innerText && firstChild.innerText.indexOf(value) === -1) {
              // 找不到关键字
              firstChild.setAttribute('style', 'display: none')
            } else if (!value) {
              let isExpand = firstChild.getAttribute('style') == 'display: none'
              if (!isExpand) firstChild.setAttribute('style', 'display: none')
              else firstChild.removeAttribute('style')
              if (firstChild.childNodes.length) findNode(firstChild.childNodes)
            }
            firstChild = nodeList[index]
          }
        }
        findNode(value, fragment.childNodes)
        this.$refs.treeBody.$el.appendChild(fragment)
      },

      // 点击复选框事件
      checkBoxClick (parentData) {
        // 父节点选中时，子节点全部同步父节点选中状态
        let parentIsCheck = parentData.isCheck
        const selectFn = (nodeData, isSel) => {
          this.$set(nodeData, 'isCheck', isSel === undefined ? !parentIsCheck : isSel)
          parentIsCheck = parentData.isCheck

          if (nodeData.children && nodeData.children.length > 0) {
            nodeData.children.forEach(item => {
              this.$set(item, 'isCheck', parentIsCheck)
              if (item.children && item.children.length > 0) selectFn(item, parentIsCheck)
            })
          }
        }
        selectFn(parentData)
        this.$emit('check-change', parentData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tree-main /deep/ {
    position: relative;
    padding: 0 20px;

    .tree-main__title {
      text-align: left;
      font-size: 18px;
    }

    .tree-main__content {
      display: flex;
      flex-direction: column;
      padding: 10px 20px;
      text-align: left;
    }

    .tree-main__label {
      display: flex;
      align-items: center;
    }
    
    .tree-main__check-box {
      position: relative;
      width: 14px;
      height: 14px;
      margin-right: 8px;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      cursor: pointer;
    }

    .tree-main__check-box_checked::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      height: 8px;
      width: 8px;
      margin-left: -4px;
      margin-top: -4px;
      background-color: #409eff;
    }

    .tree-main__label-title {
      display: flex;
      align-items: center;
      margin: 0;
      width: 100%;
      line-height: 20px;
      font-size: 20px;
      padding: 5px;
      cursor: pointer;
    }

    .tree-main__title-text {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .tree-main__child-list {
      display: flex;
      flex-direction: column;
    }

    .tree-main__icon {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }

    .tree-main__icon_open {
      animation: rotateIcon 0.2s linear forwards;
    }

    .tree-main__icon_close {
      animation: rotateIconReseve 0.2s linear forwards;
    }

    @keyframes rotateIcon {
      from {
        transform: rotate(90deg);
      }
      to {
        transform: rotate(180deg);
      }
    }

    @keyframes rotateIconReseve {
      from {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(90deg);
      }
    }

    .tree-main__children-label {
      display: flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 5px 0 5px 20px;
      font-size: 14px;
      cursor: pointer;
      box-sizing: border-box;
    }
    
    .tree-main__children-label:hover {
      color: #409eff;
      border-bottom: 1px solid #409eff;
    }

    .tree-main__children_visibel {
      display: none;
    }

    .checkbox-enter-active {
      animation: open-translate-left .3s linear forwards;
    }

    .checkbox-leave-active {
      animation: open-translate-left .3s linear forwards reverse;
    }

  }
</style>