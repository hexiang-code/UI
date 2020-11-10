<script>
import { pointAnimation } from '../assets/js/pointAnimation'
const layoutString = 'prev, pager, next, jumper, total'
const template = {
  total: function (h) { return <span class="total-number">共{this.total}条</span> },
  prev: function (h) { return <i class="iconfont up-icon pagination-icon" onClick={() => this.currentPageChange(1)}>&#xe697;</i> },
  pager: function (h) { 
    return (
      this.pagerList.map((item, index) => {
        return (
          <div class={[
          'pagination-item',
          `${this.currentPage == item ? 'selected' : ''}`
          ]}
          onClick={ () => this.currentPageChange(3, item, index) }>
          {item}
        </div>
        )
      })
    )
  },
  next: function (h) { return <i class="iconfont up-icon pagination-icon" onClick={() => this.currentPageChange(2)}>&#xe629;</i> },
  jumper: function (h) { 
    return (
      <span class="run-target">
        前往&nbsp;
        <input type="number" value={this.targetPage} onInput={val => this.currentPageChange(3, Number(val))} min={1} max={this.pagerTotal} />
        &nbsp;页
      </span>
    )
  }
}

export default {
  name: 'hxPagination',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },

    currentPage: {
      type: Number,
      default: 1
    },

    total: {
      type: Number,
      default: 1
    },

    layout: {
      type: String,
      validator: function(value) {
        let layoutArray = value.split(',')
        return layoutArray instanceof Array && layoutArray.every(item => layoutString.indexOf(item) > -1)
      },
      default: layoutString
    },

    pagerCount: {
      type: Number,
      validator: function (value) {
        return value >=5 && value <= 21 && value % 2 === 1
      }, 
      default: 5,
    }
  },
  computed: {
    // 总页数
    pagerTotal () {
      return Math.ceil(this.total / this.pageSize)
    },

    // 页码列表
    pagerList () {
      return this.getPagerList()
    },

    // 分页布局
    layoutArray () {
      return this.layout.split(',')
    }
  },

  data () {
    return {
      targetPage: 1, // 跳转的页码
    }
  },

  render (h) {
    return (
      <div class="pagination">
        { this.layoutArray.map(item => typeof template[item.trim()] === 'function' ? template[item.trim()].call(this, h) : '') }
      </div>
    )
  },

  mounted () {
    this.pointAnimation = pointAnimation
  },

  methods: {
    /**
     * 切换当前页
     * @param {Number} type 1: 上一页 2: 下一页 3:指定页面
     * @param {Number} pageCode 指定页面页码
     */
    currentPageChange (type = 1, pageCode, index) {
      let { currentPage, pagerCount } = this
      if (type == 1) currentPage = -- currentPage
      if (type == 2) currentPage = ++ currentPage
      if (type == 3) {
        if (pageCode !== '...') currentPage = pageCode
        if (pageCode == '...') {
          let currentPageIndex = this.pagerList.findIndex(item => item == currentPage)
          if (index > currentPageIndex) currentPage = currentPage + pagerCount
          if (index < currentPageIndex) currentPage = currentPage - pagerCount
        }
      }
      if (currentPage >= 1 && currentPage <= this.pagerTotal) {
        this.$emit('update:current-page', currentPage)
        this.$emit('current-change', currentPage)
        this.targetPage = currentPage
        // this.limitPagerCount()
      }
    },

    // 计算页码列表
    getPagerList () {
      let pagerList = Array.apply(null, {length: Math.ceil(this.total / this.pageSize)}).map((item, index) => ++index)
      let { pagerCount, currentPage } = this
      let currentPageIndex = pagerList.findIndex(item => item == currentPage)
      // const getIndex = value => pagerList.findIndex(item => item == value)
      let firstPager = pagerList[0], 
          lastPager = pagerList[pagerList.length - 1]
          // lastPagerIndex = getIndex(lastPager),
          // firstPagerIndex = getIndex(firstPager)
      let offset = (pagerCount - 1) / 2 // 偏移量
      // let offsetLeftIndex = currentPageIndex - offset > firstPagerIndex ? currentPageIndex - offset : firstPagerIndex
      // let offsetRightIndex = currentPageIndex + offset > lastPagerIndex ? lastPagerIndex : currentPageIndex + offset
      let offsetLeftIndex = currentPageIndex - offset
      let offsetRightIndex = currentPageIndex + offset

      // let pages = pagerList.slice(offsetLeftIndex, pagerCount + 1)
      let pages
      if (offsetLeftIndex <= 0 && offsetRightIndex > pagerList.length - 1) {
        pages = pagerList.slice(0)
      } else if (offsetLeftIndex <= 0 && offsetRightIndex <= pagerList.length - 1) { 
        pages = pagerList.slice(0, pagerCount + 1)
      } else if (offsetLeftIndex > 0 && offsetRightIndex > pagerList.length - 1) {
        pages = pagerList.slice(pagerList.length - 1 - pagerCount, pagerList.length)
      } else if (offsetLeftIndex > 0 && offsetRightIndex < pagerList.length) {
        pages = pagerList.slice(offsetLeftIndex, offsetRightIndex + 1)
      }


      if (pages[0] > firstPager + 1) {
        pages.unshift('...')
        pages.unshift(firstPager)
      }
      if (pages[0] == firstPager + 1) {
        pages.unshift(firstPager)
      }
      if (pages[pages.length - 1] < lastPager - 1) {
        pages.push('...')
        pages.push(lastPager) 
      }
      if (pages[pages.length - 1] == lastPager - 1) {
        pages.push(lastPager)
      }
      return pages
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/css/_globalStyle.scss';
  .pagination {
    display: flex;
    align-items: center;

    .pagination-item {
      min-width: 30px;
      height: 30px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      border-radius: 2px;
      background-color: #f4f4f5;
      font-weight: 700;
      cursor: pointer;
    }

    .pagination-icon {
      width: 20px;
      height: 20px;
      font-size: 20px;
    }

    .selected {
      color: #fff;
      background-color: $theme-color;
    }

    .run-target {
      margin-left: 20px;
      font-size: 14px;
      color: #606266;

      input {
        width: 40px;
        height: 20px;
        padding: 0;
        text-align: center;
        outline: none;
      } 
      ::-webkit-inner-spin-button {
        display: none;
      }
    }

    .total-number {
      margin-left: 20px;
      font-size: 14px;
      color: #606266;
    }
  }
</style>