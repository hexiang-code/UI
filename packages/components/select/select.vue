<script>
import { debounce } from '../../assets/js/utils'
let observer // dom观察器，观察select节点高度变化
export default {
  name: 'hxSelect',
  props: {
    value: {
      type: [ Boolean, String, Number, Array],
      required: true
    },

    placeholder: {
      type: String,
      default: '请选择'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    // 指定value值得key
    valueKey: {
      type: String,
      default: 'value'
    },

    // 可搜索
    filterable: {
      type: Boolean,
      default: false
    },
    
    // 可多选
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      optionsVisiable: false, // 下拉弹框
      filterValue: '', // 查询关键字
      options: [], // 下拉选项列表
      selectedOptions: [] // 被选择的选项
    }
  },

  provide() {
    return {
      'select': this
    }
  },

  computed: {
    // 获取输入框的值
    getInputValue () {
      let { value, options } = this
      if (Array.isArray(value)) {
        let returnVal = []
        value.forEach(item => {
          let res = options.find(option => this.getTargetValue(option) === item)
          if (res) returnVal.push(res.label)
        })
        return returnVal
        // value.filter(item => {
        //   return options.findIndex(option => this.getTargetValue(option) === item) == -1
        // })
        // return value.map(item => {
        //   let res = options.find(option => this.getTargetValue(option) === item)
        //   return res && res.label
        // })
      } else {
        let currentVal = this.options.find(option => this.getTargetValue(option) === value)
        return currentVal ? currentVal.label : ''
      }
      
    },

    // select组件是否被禁用
    isDisabled () {
      return function (val) {
        if (this.filterable) {
          return this.filterValue == '' || val.indexOf(this.filterValue) > -1
        } else {
          return true
        }
      }
    },

    // 当前li是否被选中
    liIsSelected () {
      return function (option) {
        let { getInputValue } = this
        if (Array.isArray(getInputValue)) {
          return getInputValue.indexOf(option.label) > -1
        } else {
          return this.getTargetValue(option) == getInputValue
        }
      }
    }
  },
  created () {
    this.blur = debounce(() =>{
      this.optionsVisiable = false
    })
  },

  mounted () {
    observer = new MutationObserver(() => {
      let selectInfo = this.$refs['select'].getBoundingClientRect()
      this.$refs['option-list'].style.top = `${selectInfo ? selectInfo.height : 0}px`
    })
    observer.observe(this.$refs['select'], {
      childList: true,
      subtree: true
    })
  },

  destroyed () {
    observer.disconnect()
  },
  
  render () {
    let attrs = {
      disabled: this.disabled,
      value: Array.isArray(this.getInputValue) ? '' : this.getInputValue,
      placeholder: this.placeholder,
    }
    const renderInput = (<div class="input">
            <input 
              class={['select__input']} 
              { ...{attrs}}
              onFocus={ () => this.focus() }
              onBlur={ () => this.blur() } 
              onInput={ (val) => this.filter(val) }
            />
            <i class="iconfont select-icon">&#xe663;</i>
          </div>)
    
    if (!this.filterable) attrs.readonly = 'readonly'
    return (
      <div class={['select', this.optionsVisiable ? 'select_focus' : '']} ref="select">
        <div class="content">
          {
            Array.isArray(this.getInputValue) ?
            (
              <div class="value-list">
                {
                  this.getInputValue.map(label => {
                    return (
                      <span onMousedown={$event => $event.preventDefault()}>
                        {label}
                        <i class="iconfont value-close" onClick={() => this.delSelectedOptions(label)}>&#xe604;</i>
                      </span>
                    )
                  })
                }
                { renderInput }
              </div>
            ) : 
            renderInput
          }
        </div>
        <div class="select__options" vShow={this.optionsVisiable} ref="option-list">
          <div class="select__options__top"></div>
          <ul class="list">
            { this.$slots.default ? this.$slots.default : '' }
            {
              this.options.map(item => {
                return (
                  <li onClick={() => this.selectVal(item) } 
                    onMousedown={$event => $event.preventDefault()}
                    vShow={this.isDisabled(item.label)}
                    class={{ 'li_selected': this.liIsSelected(item) }}
                    >
                    { item.defaultSlot ? item.defaultSlot : item.label}
                    {
                      this.liIsSelected(item) ?
                        <i class="iconfont selected-icon">&#xe614;</i> : 
                        ''
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  },

  methods: {
    selectVal (option) {
      let { multiple, selectedOptions } = this
      let value = this.getTargetValue(option)
      // 如果不是多选
      if (!multiple) {
        this.$emit('input', value)
      } else {
        let index = selectedOptions.findIndex(item => item === value)
        if (index > -1) selectedOptions.splice(index, 1)
        else {
          selectedOptions.push(value)
        }
        this.$emit('input', selectedOptions)
      }
      
    },

    getTargetValue (option) {
      let { valueKey: key } = this
      return option[key] !== undefined ? option[key] : option.label
    },

    focus () {
      this.optionsVisiable = true
    },

    filter (event) {
      if (!this.filterable) return
      this.filterValue = event.target.value
    },

    setOptions (option) {
      if (this.options.findIndex(item => item.uid === option._uid) == -1) this.options.push(option)
    },

    delOptions (_uid) {
      let index = this.options.findIndex(item => item.uid === _uid)
      if (index && index > -1) this.options.splice(index, 1)
    },
    
    // 删除已选中的选项
    delSelectedOptions (label) {
      let value = this.options.find(option => option.label === label)
      let index = this.selectedOptions.findIndex(selectedOption => selectedOption === value)
      this.selectedOptions.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/_globalStyle.scss';
  .select {
    position: relative;
    z-index: 9;
    display: inline-flex;
    align-items: center;
    width: 210px;
    padding: 2px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    cursor: pointer;

    .content {
      display: flex;

      .value-list {
        display: flex;
        flex-wrap: wrap;

        span {
          display: flex;
          align-items: center;
          position: relative;
          padding: 4px 8px;
          margin: 4px;
          border-radius: 4px;
          border: 1px solid #e9e9eb;
          font-size: 12px;
          background-color: #f5f5f5;

          .value-close {
            font-size: 16px;
            color: $theme-color;
            cursor: pointer;
          }
        }
      }

      .input {
        display: flex;
        align-items: center;
        min-width: 100px;
        flex: 1;

        .select__input {
          width: 100%;
          height: 40px;
          padding: 0 15px;
          padding-right: 30px;
          line-height: 40px;
          border: none;
          cursor: pointer;
        }

        .select__input:focus {
          outline: none;
        }

        .select__input::placeholder {
          color: $theme-color;
          font-size: 14px;
        }

        .select-icon {
          position: absolute;
          right: 10px;
          font-size: 20px;
          color: $theme-color;
          cursor: pointer;
        }
      }
    }

    .select__options {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0;
      padding: 6px 0;
      margin-top: 15px;
      background-color: #fff;
      font-size: 14px;
      border: 1px solid #f5f5f5;
      border-radius: 5px;
      background-color: #fff;
      z-index: 10;

      .list {
        padding: 0;
        margin: 0;
        max-height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        list-style: none;

        li {
          display: flex;
          justify-content: space-between;
          padding: 0 5px 0 15px;
          text-align: left;
          height: 34px;
          line-height: 34px;
          cursor: pointer;
          
          .selected-icon {
            position: relative;
            font-size: 16px;
            font-weight: normal;
            color: $theme-color;
          }
        }

        .li_selected {
          background-color: #fff;
          color: $theme-color;
          font-weight: bold;
        }
        
        li:hover {
          background-color: #fff;
          color: $theme-color;
        }
      }
    }

    .select__options__top::before {
      content: '';
      position: absolute;
      top: 2px;
      left: -7px;
      z-index: 2;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 8px solid #fff;
    }

    .select__options__top {
      position: absolute;
      top: -10px;
      left: 20px;
      z-index: 1;
      width: 0px;
      height: 0px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 10px solid #f5f5f5;
    }
  }
  
  .select_focus {
    border: 1px solid $theme-color;
  }
</style>