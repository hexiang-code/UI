

<script>
import store from '../../store'
export default {
  name: 'hxTable',
  props: {
    tableData: {
      type: Array,
      required: true
    },

    // 是否是斑马条纹
    stripe: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  render () {
    return (
      <div class="table-container">
        <table class="table" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            {
              this.columns.map(column => {
                return (
                  <col width={column.width} align="right"></col>
                )
              })
            }
          </colgroup>
          <thead>
            <tr>
              { this.$slots.default ? this.$slots.default : ''}
            </tr>
          </thead>
          <tbody>
            { 
              this.tableData && this.tableData.map((dataItem, index) => {
                return (
                  <tr class={["table-row", { 'cell_stripe': this.stripe && (index + 1) % 2 === 0 }]}>
                    {
                      this.columns.map(column => {
                        return (
                          <td>
                            <div class={
                                [
                                  'cell',
                                  {'cell_center': column.align === 'center'},
                                  {'cell_right': column.align === 'right'}
                                ]
                              }
                              // style = {
                              //   column.columnWidth ? `width: ${column.columnWidth}` : ''
                              // }
                            >
                            { this.getColumnContent(dataItem, column) }
                            </div>
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  },

  computed: {
    columns () {
      return store.getters.getTableColumn
    }
  },

  mounted () {
  },

  methods: {
    getColumnContent (row, column) {
      if (column.columnContent && typeof column.columnContent === 'function') {
        return column.columnContent(row)
      } else if (column.prop) {
        return row[column.prop] || '-'
      } else {
        return '-'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/_globalStyle.scss';
  .table-container {
    position: relative;
    
    .table {
      width: 100%;
      border: 1px solid $theme-color;
      padding: 24px;
      font-size: 14px;

      th, td {
        box-sizing: border-box;
        border-bottom: 1px solid $theme-color;
        padding: 12px 0;
      }

      tr:last-child td {
        border-bottom: none;
      }

      .cell {
        text-align: left;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
        padding-left: 10px;
        padding-right: 10px;
      }

      .cell_center {
        text-align: center;
      }

      .cell_right {
        text-align: right;
      }

      .cell_stripe {
        background-color: #fafafa;
      }
      
      .table-row:hover {
        background-color: #f5f7fa;
      }
    }
  }
</style>