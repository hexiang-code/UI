<script>
import store from '../../store'
import { debounce } from '../../assets/js/utils'
export default {
  name: 'hxSelect',
  props: {
    value: {
      type: [ Boolean, String, Number ],
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
      default: true
    }
  },
  data () {
    return {
      optionsVisiable: false, // 下拉弹框
      filterValue: '' // 查询关键字
    }
  },

  computed: {
    options () {
      return store.getters.getSelectOptions
    },

    getValue () {
      let currentVal = this.options.find(item => item.value === this.value)
      return currentVal ? currentVal.label : ''
    },

    isDisabled () {
      return function (val) {
        if (this.filterable) {
          return this.filterValue == '' || val.indexOf(this.filterValue) > -1
        } else {
          return true
        }
      }
    }
  },
  created () {
    this.blur = debounce(() =>{
      this.optionsVisiable = false
    })
  },
  
  render () {
    let attrs = {
      disabled: this.disabled,
      value: this.getValue,
      placeholder: this.placeholder,
    }
    if (!this.filterable) attrs.readonly = 'readonly'
    return (
      <div class={['select']}>
        <input 
          class={['select__input', this.optionsVisiable ? 'select_focus' : '']} 
          { ...{attrs}}
          onFocus={ () => this.focus() }
          onBlur={ () => this.blur() } 
          onInput={ (val) => this.filter(val) }
        />
        <i class="iconfont select-icon">&#xe663;</i>
        <ul class="select__options" vShow={this.optionsVisiable}>
          <div class="select__options__top"></div>
          { this.$slots.default ? this.$slots.default : '' }
          {
            this.options.map(item => {
              return (
                <li onClick={() => this.selectVal(item) } vShow={this.isDisabled(item.label)}>{ item.defaultSlot ? item.defaultSlot : item.label}</li>
              )
            })
          }
        </ul>
      </div>
    )
  },

  methods: {
    selectVal (option) {
      let key = this.valueKey
      let value = option[key] ? option[key] : option.label
      this.$emit('input', value)
    },

    focus () {
      this.optionsVisiable = true
    },

    filter (event) {
      if (!this.filterable) return
      this.filterValue = event.target.value
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/_globalStyle.scss';
  .select {
    position: relative;
    z-index: 9;
    display: inline-block;
    cursor: pointer;

    .select__input {
      width: 210px;
      height: 40px;
      padding: 0 15px;
      padding-right: 30px;
      line-height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      cursor: pointer;
    }

    .select_focus {
      border: 1px solid $theme-color;
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
      top: 10px;
      right: 5px;
      font-size: 20px;
      color: $theme-color;
      cursor: pointer;
    }

    .select__options {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0;
      padding: 6px 0;
      margin-top: 15px;
      list-style: none;
      background-color: #fff;
      font-size: 14px;
      border: 1px solid #f5f5f5;
      border-radius: 5px;
      max-height: 200px;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: #fff;
      z-index: 10;

      li {
        padding-left: 15px;
        text-align: left;
        height: 34px;
        line-height: 34px;
        cursor: pointer;
      }

      li:hover {
        background-color: #fff;
        color: $theme-color;
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
</style>