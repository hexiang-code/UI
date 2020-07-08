<!--
<template>
  <div class="pagination">
    <i class="iconfont up-icon pagination-icon" @click="currentPageChange(1)">&#xe697;</i>
    <div :class="[
      'pagination-item',
      `${currentPage == index ? 'selected' : ''}`
      ]" 
      v-for="index in pageTotal" :key="index"
      @click="$emit('update:current-page', index)">
      {{index}}
    </div>
    <i class="iconfont up-icon pagination-icon" @click="currentPageChange(2)">&#xe629;</i>
    <span class="run-target">
      前往
      <input type="number" v-model="targetPage" :min="1" :max="pageTotal">
      页
    </span>
    <span class="total-number">共{{total}}条</span>
  </div>
</template>
-->
<script>
const layoutString = 'prev, pager, next, jumper, total'
const template = {
  total: function (h) { return <span class="total-number">共{this.total}条</span> },
  prev: function (h) { return <i class="iconfont up-icon pagination-icon" onClick={() => this.currentPageChange(1)}>&#xe697;</i> },
  pager: function (h) { 
    return (
      Array.apply(null, {length: this.pageTotal}).map((item, index) => {
        return (
          <div class={[
          'pagination-item',
          `${this.currentPage == index ? 'selected' : ''}`
          ]}
          onClick={ () => this.$emit('update:current-page', index) }>
          {index}
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
        <input type="number" vModel={this.targetPage} min={1} max={this.pageTotal} />
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
    }
  },

  computed: {
    // 总页数
    pageTotal () {
      return Math.ceil(this.total / this.pageSize)
    },

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

  methods: {
    /**
     * 切换当前页
     * @param {Number} type 1: 上一页 2: 下一页
     */
    currentPageChange (type = 1) {
      let { currentPage } = this
      if (type == 1) currentPage = -- currentPage
      if (type == 2) currentPage = ++ currentPage
      if (currentPage > 1 && currentPage <= this.pageTotal) {
        this.$emit('update:current-page', currentPage)
        this.$emit('current-change', currentPage)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './css/_globalStyle.scss';
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