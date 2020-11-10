<script>
const dateTime = 24 * 60 * 60 * 1000 // 一整天的毫秒数
import dateTable from './date-table'
import { formatDate } from '../../assets/js/utils'
export default {
  name: 'hxDatePicker',
  props: {
    value: {
      type: [Array, Number, String],
      default: () => [0, 0]
    },

    startPlaceholder: {
      type: String,
      default: '请选择开始日期'
    },

    endPlaceholder: {
      type: String,
      default: '请选择结束日期'
    },

    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  data () {
    return {
      dateTableVisible: false, // 日期表格开关
      curDate: new Date().getDate(), // 当前日期
      curMonth: parseInt(new Date().getMonth() + 1), // 当前月份
      curYear: new Date().getFullYear(), // 当前年份
      nextMonth: parseInt(new Date().getMonth() + 1) + 1, // 下个月
      realStartDate: 0, // 选择日期开始时间戳
      realEndDate: 0, // 选择日期结束时间戳
      preliminaryStartDate: 0, // 预选日期范围的开始日期
      preliminaryEndDate: 0, // 预选日期范围的结束日期
    }
  },

  computed: {
    // realStartDate: {
    //   get () {
    //     return this.value[0]
    //   },
    //   set (val) {
    //     this.$emit('input', [val, this.realEndDate])
    //   }
    // },

    // realEndDate: {
    //   get () {
    //     return this.value[1]
    //   },
    //   set (val) {
    //     this.$emit('input', [this.realStartDate, val])
    //   }
    // },

    // 用户点击选择的两个日期（鼠标点击选择）
    selectedDateRange () {
      return [Math.min(this.realStartDate, this.realEndDate), Math.max(this.realStartDate, this.realEndDate)]
    },

    // 预选日期时间范围（鼠标悬浮预选）
    preliminaryDateRange () {
      return [this.preliminaryStartDate, this.preliminaryEndDate]
    }
  },

  watch: {
    realStartDate: {
      handler (val) {
        this.preliminaryStartDate = val
      },
      immediate: true
    },
    
    realEndDate: {
      handler (val) {
        this.preliminaryEndDate = val
      },
      immediate: true
    },

    value: {
      handler (val) {
        this.realStartDate = val[0]
        this.realEndDate = val[1]
      },
      immediate: true 
    }
  },

  render () {
    return (
      <div class="date-pick">
        <div class="date-pick__container">
          <i class="iconfont date-icon">&#xe607;</i>
          <input type="text" placeholder="选择日期" value={this.realStartDate ? formatDate(this.format, this.realStartDate) : ''} onfocus={() => this.datePickerFocus()} onblur={() => this.datePickerBlur()}/>
          <span class="date-picker__middle">至</span>
          <input type="text" placeholder="选择日期" value={this.realEndDate ? formatDate(this.format, this.realEndDate) : ''} onfocus={() => this.datePickerFocus()} onblur={() => this.datePickerBlur()}/>
          <i class="iconfont close-icon" onClick={() => this.clear()}>&#xe604;</i>
        </div>
        <div class="date-picker__dialog" 
          vShow={this.dateTableVisible} 
          onMousedown={(e) => this.preventInputBlur(e)} 
          onDblclick={() => this.dateTableVisible = false}>
          <date-table curMonth={this.curMonth} curYear={this.curYear} curDate={this.curDate} selectedDate={this.selectedDateRange}
            preliminaryDateRange={this.preliminaryDateRange}
            {...{
              on: {
                'update:curDate': val => this.curDate = val,
                'update:curMonth': val => this.curMonth = val,
                'update:curYear': val => this.curYear = val,
                'selectedDate': val => this.selectedDate(val),
                'dateMouseover': val => this.preliminaryDate(val)
              }
            }}
          >
          </date-table>
          <date-table curMonth={this.nextMonth} curYear={this.curYear} curDate={this.curDate} selectedDate={this.selectedDateRange}
            preliminaryDateRange={this.preliminaryDateRange} 
            {...{
              on: {
                'update:curDate': val => this.curDate = val,
                'update:curMonth': val => this.nextMonth = val,
                'update:curYear': val => this.curYear = val,
                'selectedDate': val => this.selectedDate(val),
                'dateMouseover': val => this.preliminaryDate(val)
              }
            }}
          >
          </date-table>
        </div>
      </div>
    )
  },

  components: {
    dateTable
  },

  methods: {
    // 日期选择器聚焦事件
    datePickerFocus () {
      this.dateTableVisible = true
    },

    // 日期选择器失焦事件
    datePickerBlur () {
      this.dateTableVisible = false
    },

    // 选择日期
    selectedDate (val) {
      let { year, month, date } = val
      let timestrap = +new Date(year, month - 1, date, 0, 0, 0)
      // 如果已存在时间范围，清空原先时间范围重新选择
      if (this.realStartDate && this.realEndDate) {
        this.realEndDate = 0
        this.realStartDate = timestrap
        return
      }
      if (!this.realStartDate) {
        this.realStartDate = timestrap
        return
      }
      if (this.realStartDate) {
        if (timestrap > this.realStartDate) this.realEndDate = timestrap
        if (timestrap < this.realStartDate) {
          this.realEndDate = this.realStartDate
          this.realStartDate = timestrap
        }
        if (timestrap == this.realStartDate) {
          this.realEndDate = + new Date(this.realStartDate + dateTime - 1000)
        }
      }
      this.isCloseDateTable()
    },

    // 是否关闭日期选择表格
    isCloseDateTable () { 
      if(this.realStartDate && this.realEndDate ) {
        this.$emit('selectComplete', [this.realStartDate, this.realEndDate])
        this.$emit('input', [this.realStartDate, this.realEndDate])
        this.dateTableVisible = false
      }
      
    },

    // 鼠标悬浮预选最小日期
    preliminaryDate (val) {
      // 预选日期范围，必须的确定一个开始日期
      if (!this.realStartDate) return
      this.preliminaryStartDate = this.realStartDate
      let { year, month, date } = val
      if (this.realStartDate && this.realEndDate) return
      let timestrap = +new Date(year, month - 1, date, 0, 0, 0)
      if (timestrap >= this.realStartDate) {
        this.preliminaryEndDate = timestrap
      } 
      if (timestrap < this.realStartDate) {
        this.preliminaryEndDate = this.realStartDate
        this.preliminaryStartDate = timestrap
      }
    },

    // 点击日期表格时阻止input失焦
    preventInputBlur (e) {
      if (e && e.preventDefault) {
        e.preventDefault()
      }
    },

    clear () {
      this.realStartDate = 0, // 选择日期开始时间戳
      this.realEndDate = 0, // 选择日期结束时间戳
      this.preliminaryStartDate = 0, // 预选日期范围的开始日期
      this.preliminaryEndDate = 0 // 预选日期范围的结束日期
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/_globalStyle.scss';

  .date-pick {
    position: relative;
    max-width: 352px;

    .date-pick__container {
      display: flex;
      padding: 5px 10px;
      align-items: center;
      border: 1px solid $theme-color;

      .date-icon {
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        color: $theme-color;
      }

      .close-icon {
        width: 15px;
        height: 15px;
        font-size: 15px;
        color: $theme-color;
        cursor: pointer;
      }

      input {
        width: 130px;
        height: 20px;
        padding: 0;
        text-align: center;
        border: none;
        outline: none;
      }
      
      .date-picker__middle {
        margin: 0 10px;
      }
    }

    .date-picker__dialog {
      position: absolute;
      display: flex;
      min-width: 520px;
      margin-top: 10px;
      border: 1px solid #e4e7ed;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
  }

  .change-icon {
    width: 16px;
    height: 16px;
    font-size: 16px;
    cursor: pointer;
  }
</style>