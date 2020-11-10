<script>
import store from '../../store'
export default {
  name: 'hxTableColumn',
  props: {
    // 对应列内容字段名
    prop: {
      type: String,
      required: true
    },

    // 表头名字
    label: {
      type: String,
      required: true
    },

    // 对应列是否可以排序
    sortable: {
      type: Boolean,
      default: false
    },

    // 对齐方式
    align: {
      type: String,
      default: 'left',
      validator: function (val) {
        return ['left', 'right', 'center'].includes(val)
      }
    },

    //列宽
    width: {
      type: [String, Number],
      default: ''
    }
  },

  data () {
    return {
      sort: '' // 排序类型
    }
  },

  computed: {
    alignStyle () {
      return `text-align: ${this.align}`
    },

    // 列宽
    columnWidth () {
      return this.width ? 
              typeof this.width == 'number' ? 
                this.width + 'px' :
                '' :
              this.width
    }
  },

  mounted () {
    store.commit('setTableColumn', {
      columnContent: this.$scopedSlots.columnContent,
      ...this.$props,
      columnWidth: this.columnWidth,
      uid: this._uid
    })
  },

  render () {
    return (
      <th>
        { this.$scopedSlots.header ? 
          <slot name="header" header={this.prop}></slot> : 
          <div class={[
              'cell',
              {'cell_center': this.align === 'center'},
              {'cell_right': this.align === 'right'}
            ]}
          >
            <span>{this.label}</span>
            {
              this.sortable ? 
              <span class="sortable">
                <i class={['iconfont', 'sort-icon', 'asc-sort', {'sort-icon_selected': this.sort == 'asc' }]} onClick={() => this.clickSort(1)}>&#xe60b;</i>
                <i class={['iconfont', 'sort-icon', {'sort-icon_selected': this.sort == 'desc' }]} onClick={() => this.clickSort(2)}>&#xe60b;</i>
              </span> :
              ''
            }
          </div>
        } 
      </th>
    )
  },

  methods: {
    /**
     * 点击升序
     * @param {Number} type 1: 升序 2:降序
     */
    clickSort (type) {
      if (this.sortable && this.$parent && this.$parent.$emit) {
        let sort = type == 1 ? 'asc' : 'desc'
        this.$parent.$emit('sort-change', this.prop, sort)
        this.sort = sort
      }
    }
  },

  destroyed () {
    store.commit('delTableColumn', this._uid)
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/_globalStyle.scss';

  .cell {
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    text-align: left;
    padding: 0 10px;

    .sortable {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      line-height: 10px;

      .sort-icon {
        width: 14px;
        height: 14px;
        margin: 0;
        font-size: 14px;
        color: #c0c4cc;
        cursor: pointer;
      }

      .sort-icon_selected {
        color: $theme-color;
      }

      .asc-sort {
        transform: rotate(180deg);
      }
    }
  }

  .cell_center {
    // text-align: center;
    justify-content: center;
  }

  .cell_right {
    // text-align: right;
    justify-content: flex-end;
  }
</style>