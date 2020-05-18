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
      let { tree } = this
      return (
        <div class="tree-main__body">
          {this.$parent.createTree(h, tree.children)}
        </div> 
      )
    }
  }
  export default {
    name: 'tree',
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
            href: 'href'
          }
        }
      }, 
      // 是否展示复选框
      isShowCheckBox: {
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
          <div class="tree-main__content">
            <div class="tree-main__label">
              <transition name="checkbox">
                { 
                  this.isShowCheckBox ? 
                    <span class={ parentData['isCheck'] ? 
                      'tree-main__check-box tree-main__check-box_checked' : 
                        'tree-main__check-box' }
                        onClick={() => this.checkBoxClick(parentData)}>
                    </span> : 
                    '' 
                }
              </transition>
              <div class="tree-main__label-title" onClick={($event) => this.parentNodeClick($event, parentData)}>
                <svg t="1587472828710" class='tree-main__icon tree-main__icon_open' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4336" width="200" height="200"><path d="M491.904 380.638H112.171c-16.032 0-29.091 10.99-29.091 24.437 0 13.446 13.059 24.436 29.09 24.436h379.864c16.032 0 29.09-10.99 29.09-24.436-0.129-13.576-13.187-24.437-29.22-24.437z m0 216.049H112.171c-16.032 0-29.091 10.99-29.091 24.436 0 13.447 13.059 24.437 29.09 24.437h379.864c16.032 0 29.09-10.99 29.09-24.437-0.129-13.446-13.187-24.436-29.22-24.436z m-0.517 216.307H112.56c-16.291 0-29.608 10.99-29.608 24.436 0 13.447 13.188 24.437 29.608 24.437h378.828c16.42 0 29.608-10.99 29.608-24.437 0-13.446-13.188-24.436-29.608-24.436zM681.19 334.739h93.737v316.897c0 16.033 10.99 29.091 24.437 29.091 13.446 0 24.307-13.058 24.307-29.09V334.738h93.737c14.74 0 21.85-3.878 23.273-6.723 1.164-2.327-0.13-9.438-8.145-19.394l-102.53-128.258c-8.404-10.602-19.264-16.291-30.513-16.291-11.378 0-22.109 5.818-30.513 16.29L666.32 308.753c-7.886 9.955-9.18 17.066-8.016 19.393 0.905 2.716 8.146 6.594 22.885 6.594z" p-id="4337"></path><path d="M112.688 861.737h768c16.291 0 29.608-10.99 29.608-24.436s-13.188-24.436-29.608-24.436h-768c-16.29 0-29.608 10.99-29.608 24.436 0 13.576 13.188 24.436 29.608 24.436z m379.216-697.535H112.171c-16.032 0-29.091 10.99-29.091 24.436 0 13.447 13.059 24.437 29.09 24.437h379.864c16.032 0 29.09-10.99 29.09-24.437-0.129-13.446-13.187-24.436-29.22-24.436z" p-id="4338"></path></svg>
                {parentData[label]}
                {
                  this.$scopedSlots.operation ? 
                    h('a', this.$scopedSlots.operation(parentData)) : 
                    ''
                }
              </div>
            </div>
            <div class="tree-main__child-list">
              { this.createTree(h, parentData[children]) }
            </div>
          </div>
        )
      },

      // 父节点点击事件
      parentNodeClick ($event, nodeData) {
        this.$emit('nodeClick', nodeData)
        this.$emit('parentNodeClick', nodeData)
        let iconClassList = $event.currentTarget.firstChild.classList
        if (iconClassList && iconClassList.contains('tree-main__icon_open')) {
          iconClassList.add('tree-main__icon_close')  
          iconClassList.remove('tree-main__icon_open')
        } else if (iconClassList && iconClassList.contains('tree-main__icon_close')) {
          iconClassList.remove('tree-main__icon_close')
          iconClassList.add('tree-main__icon_open')
        }
        let fragment = this.createFragment(false, $event.currentTarget.parentNode.nextElementSibling)
        let nodes = [...fragment.children]
        nodes.forEach(item => {
          let isExpand = item.getAttribute('style') == 'display: none'
          if (!isExpand) item.setAttribute('style', 'display: none')
          else item.removeAttribute('style')
        })
        $event.currentTarget.parentNode.nextElementSibling.appendChild(fragment)
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
        this.$emit('nodeClick', childNode)
        this.$emit('childNodeClick', childNode)
      },

      // 创建子节点
      createChildNode (h, childData, isExpandAll) {
        let { label } = this.renderKey
        return (
          <div class='tree-main__children-label'>
            <transition name="checkbox">
              { 
                this.isShowCheckBox ? 
                <span class={ childData['isCheck'] ? 
                  'tree-main__check-box tree-main__check-box_checked' : 
                  'tree-main__check-box' }>
                </span> :
                '' 
              }
            </transition>
            <a style={ isExpandAll ? '' : 'display: none' } onClick={() => this.childNodeClick(childData)} title={childData[label]}>{childData[label]}</a>
            {
              this.$scopedSlots.operation ? 
                h('a', this.$scopedSlots.operation(childData)) : 
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

      // 点击复选框实践
      checkBoxClick (parentData) {
        this.$emit('nodeChange', parentData)
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 20px;
      font-size: 20px;
      padding: 5px;
      cursor: pointer;
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