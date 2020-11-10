<script>
const tableHeads = ['日', '一', '二', '三', '四', '五', '六'] // 日期表格表头
const maxWeekIndex = 6, minWeekIndex = 0 // 每周开始、结束日的下标
const curMonthFirstDay = 1 // 当月1号日期代表的数字
const dateTime = 24 * 60 * 60 * 1000 // 一整天的毫秒数
const dateTableRows = 6 // 表格一共6行
const dateTableColumns = 7 // 表格一行共七个日期
export default {
  name: 'hxDateTable',

  props: {
    // 当前日期
    curDate: {
      type: Number,
      default: new Date().getDate()
    },
    // 当前月份
    curMonth: {
      type: Number,
      default: parseInt(new Date().getMonth() + 1)
    },

    // 当前年份
    curYear: {
      type: Number,
      default: new Date().getFullYear()
    },

    // 选中日期范围数组[start, end]
    selectedDate: {
      type: Array,
      validator: function (val) {
        return val && val.length === 2
      },
      default: () => [0, 0]
    },

    // 预选日期范围
    preliminaryDateRange: {
      type: Array,
      validator: function (val) {
        return val && val.length === 2
      },
      default: () => [0, 0]
    }
  },

  data () {
    return {
      tableHeads, // 日期表格表头
      dateTableFirstLine: [], // 日期表格内容第一行
      dateTableRows, // 表格总行数
      // curDate: new Date().getDate(), // 当前日期
      // curMonth: parseInt(new Date().getMonth() + 1), // 当前月份
      // curYear: new Date().getFullYear() // 当前年份
    }
  },

  render () {
    return (
      <div class="date-picker__table">
        <div class="date-picker__header">
          <div class="date-picker__left-icon">
            <i class="iconfont change-icon" onClick={() => this.changeYear(0)}>&#xe6ed;</i>
            <i class="iconfont change-icon" onClick={() => this.changeMonth(0)}>&#xe61d;</i>
          </div>
          <span>{this.curYear}年{this.curMonth}月</span>
          <div class="date-picker__right-icon">
            <i class="iconfont change-icon" onClick={() => this.changeMonth(1)}>&#xe8ab;</i>
            <i class="iconfont change-icon" onClick={() => this.changeYear(1)}>&#xe6ec;</i>
          </div>
        </div>
        <table align='center' style="border-collapse:collapse;">
          <thead>
            {
              this.tableHeads.map(item => {
                return <th>{item}</th>
              })
            }
          </thead>
          {
            Array.apply(null, {length: this.dateTableRows}).map((item, rowIndex) => {
              return (
                <tr>
                  {
                    this.dateTableFirstLine.map((column, columnIndex) => {
                      let dateObj = this.getDate(column, rowIndex, columnIndex)
                      let timestap = +new Date(dateObj.year, dateObj.month - 1, dateObj.date, 0, 0, 0)
                      return (
                        <td onClick={() => this.$emit('selectedDate', dateObj)} onMouseover={() => this.dateMouseOver(dateObj)}>
                          <div class={[
                            'date-item',
                            {
                              'preliminary-day': this.isPreliminaryDay(dateObj, timestap),
                              'current-day': this.curDate == dateObj.date && dateObj.month == parseInt(new Date().getMonth() + 1)
                            }
                          ]}>
                            <span class={{
                              'grey-day': dateObj.month != this.curMonth,
                              'selected-day': this.selectedDate.includes(timestap) && dateObj.month == this.curMonth,
                            }}>{dateObj.date}</span>
                          </div>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </table>
      </div>
    )
  },

  computed: {
    // 最大预选日期范围
    maxPreliminaryDate () {
      return Math.max(...this.preliminaryDateRange)
    },

    // 最小预选日期范围
    minPreliminaryDate () {
      return Math.min(...this.preliminaryDateRange)
    },

    getDate () {
      return function (val, rowIndex, columnIndex) {
        let date
        let month = this.curMonth
        let curMonthLastDay = new Date(new Date(new Date().setMonth(month, 1)).setHours(0, 0, 0) - dateTime + 1000).getDate()
        // let curMonthLastDay = new Date(new Date(this.curYear, this.month, 1, 0, 0, 0) - dateTime + 1000).getDate()
        let firstDayIndex = this.dateTableFirstLine.findIndex(item => item == 1)
        if (rowIndex == 0) {
          date = this.dateTableFirstLine[columnIndex]
          // 在第一行中如果日期大于7, 则当前月份为上个月
          if (date > dateTableColumns) month = month - 1
        } else {
          /**
           * 目标日期 = 行数 * 每行单位天数 - 目标日期与总天数之间的差距天数 - 上月的天数
           * 例: 8月某天在第二行第一列, 8月1号在第一行第七列, 两行一共14天, 则
           * 14 - 7(当前日期与当前日期所在行的最右边日期间距为7天) - 6 (8月一号之前的日期占用了6天)   
           */
          date = (rowIndex + 1) * dateTableColumns - (maxWeekIndex - columnIndex) - firstDayIndex
          if (date > curMonthLastDay) {
            date = date - curMonthLastDay
            month ++ // 当前日期大于当前月最后一天日期，则进入下一月，月份+1
          }
        }
        return { 
          date,
          month,
          year: this.curYear
        }
      }
    }
  },

  watch: {
    curMonth: {
      handler(val) {
        this._computedDateTableContainer(+new Date(this.curYear, val - 1, 1, 0, 0, 0))
      },
      immediate: true
    },

    curYear: {
      handler (val) {
        this._computedDateTableContainer(+new Date(val, this.curMonth - 1, 1, 0, 0, 0))
      },
      immediate: true
    }
  },



  methods: {
    /**
     * 计算日期选择器表格内容
     * @param {Number} monthFirstDate 当月1号的时间戳
     */
    _computedDateTableContainer (monthFirstDate) {
      // 如果没有传入该参数，则自动设置为当月1号
      if (!monthFirstDate) {
        let curMonthFirst = new Date().setDate(1)
        monthFirstDate = new Date(curMonthFirst).setHours(0, 0, 0)
      }
      let week = new Date(monthFirstDate).getDay()
      this.fillDateTableFirstLine(week, monthFirstDate)
    },

    /**
     * 填充表格第一行，其余行各加7即可填充整个表格
     * @param {Number} week 当月1号是周几
     * @param {Number} monthFirstDate 当月1号的时间戳
     */
    fillDateTableFirstLine (week, monthFirstDate) {
      // 星期的中文表示
      const fill = (week) => {
        const index = tableHeads.findIndex(item => item == week)
        if (index > -1) {
          let dateTableFirstLine = []
          dateTableFirstLine[index] = curMonthFirstDay // 当月1号
          let offsetRight = maxWeekIndex - index
          let offsetLeft = index - minWeekIndex
          // 右边偏移量每次+1即可
          Math.abs(offsetRight) && Array.apply(null, {length: offsetRight}).reduce(beforeVal => {
            dateTableFirstLine[index + beforeVal] = beforeVal + 1
            return ++ beforeVal
          }, curMonthFirstDay)
          // 左边的偏移量，需要先确定上个月最后一天的日期, 利用上个月1号的时间戳减去一整天的毫秒数 + 1即可保证能取到上个月的最后一天
          let beforeMonthLastDay = new Date(monthFirstDate - dateTime).getDate()
          Math.abs(offsetLeft) && Array.apply(null, {length: offsetLeft}).reduce((beforeVal, currenVal, offsetIndex) => {
            dateTableFirstLine[index - (offsetIndex + 1)] = beforeVal
            return -- beforeMonthLastDay
          }, beforeMonthLastDay)
          dateTableFirstLine = dateTableFirstLine.filter(item => item)
          this.dateTableFirstLine = dateTableFirstLine
        }
      }
      switch (week) {
        case 1:
          fill('一')
          break
        case 2:
          fill('二')
          break
        case 3:
          fill('三')
          break
        case 4:
          fill('四')
          break
        case 5:
          fill('五')
          break
        case 6:
          fill('六')
          break
        case 0:
          fill('日')
          break
      }
    },

    /**
     * 月份切换
     * @param {Number} type 0: 减 1: 加
     */
    changeMonth (type) {
      let curMonth = this.curMonth
      let curYear = this.curYear
      switch (type) {
        case 0:
          curMonth = -- curMonth > 0 ? curMonth : curYear -- && 12
          break
        case 1:
          curMonth = ++ curMonth > 12 ? curYear ++ && 1 : curMonth
          break
        default: 
          return
      }
      this.emitYearEvent(curYear)
      this.emitMonthEvent(curMonth)
    },

    /**
     * 年份切换
     * @param {Number} type 0: 减 1: 加
     */
    changeYear (type) {
      let { curYear } = this
      if (type == 0) this.emitYearEvent(curYear - 1)
      if (type == 1) this.emitYearEvent(curYear + 1)
    },

    // 派发年份变更事件
    emitYearEvent (val) {
      this.$emit('year-change', val)
      this.$emit('update:curYear',val)
    },

    // 派发月份变更事件
    emitMonthEvent (val) {
      this.$emit('month-change', val)
      this.$emit('update:curMonth', val)
    },

    // 鼠标移动预选日期范围
    dateMouseOver (val) {
      if (this.selectedDate.some(item => item == 0)) this.$emit('dateMouseover', val)
    },

    // 是否是预选日期
    isPreliminaryDay (dateObj, timestap) {
      return this.maxPreliminaryDate && 
              this.minPreliminaryDate && 
                timestap >= this.minPreliminaryDate && 
                  timestap <= this.maxPreliminaryDate &&
                    dateObj.month == this.curMonth // 置灰的月份不加选中背景色
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/_globalStyle.scss';

  .date-picker__table {
    padding: 16px;

    table {
      width: 100%;
      font-size: 12px;

      th {
        padding: 5px;
        border-bottom: 1px solid #ebeef5;
        color: #606266;
        font-weight: 400;
      }

      td {
        width: 30px;
        height: 30px;
        padding: 4px 0;
        color: #606266;
        cursor: pointer;
      }

      td:hover {
        color: $theme-color;
      }

      .date-item {
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .date-item span {
        display: inline-block;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
      }

      .preliminary-day {
        background-color: #f2f6fc;
      }
      
      .current-day {
        color: $theme-color;
        font-weight: 700;
      }

      .grey-day {
        color: #c0c4cc;
      }

      .selected-day {
        border-radius: 50%;
        color: #fff;
        background-color: $theme-color;
      }
    }

    .date-picker__header {
      position: relative;
      display: flex;
      justify-content: center;

      .date-picker__left-icon {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
      }

      .date-picker__right-icon {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }


  .change-icon {
    width: 16px;
    height: 16px;
    font-size: 16px;
    cursor: pointer;
  }
</style>