

<script>
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
          <thead>
            <tr>
              { this.$slots.default ? this.$slots.default : ''}
            </tr>
          </thead>
          { 
           this.tableData && this.tableData.map((dataItem, index) => {
              return (
                <tr class={["table-row", { 'cell_stripe': this.stripe && (index + 1) % 2 === 0 }]}>
                  {
                    this.columns.map(column => {
                      return (
                        <td class={
                          [
                            'cell',
                            {'cell_center': column.align === 'center'},
                            {'cell_right': column.align === 'right'}
                          ]
                        }>{ this.getColumnContent(dataItem, column) }</td>
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
    columns () {
      return this.$store.getters.getTableColumn
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
  @import './css/_globalStyle.scss';
  .table-container {
    
    .table {
      width: 100%;
      border: 1px solid $theme-color;
      padding: 24px;
      font-size: 14px;

      th, td {
        padding: 12px 10px;
        border-bottom: 1px solid $theme-color;
      }

      tr:last-child td {
        border-bottom: none;
      }

      .cell {
        text-align: left;
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