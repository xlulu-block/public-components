<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column v-if="index" type="index"></el-table-column>
    <el-table-column v-if="selection" type="selection"></el-table-column>
    <template v-for="item in column">
      <el-table-column v-if="item.type=== 'function'" :prop="item.prop" :key="item.prop" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <div v-html="item.callback&&item.callback(scope.row)"></div>
        </template>
      </el-table-column>
      <el-table-column v-if="item.type=== 'slot'" :prop="item.prop" :key="item.prop" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <!-- 作用域插槽 -->
          <slot :name="item.slot_name" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column v-else :prop="item.prop" :key="item.prop" :label="item.label" :width="item.width"></el-table-column>
    </template>
  </el-table>
</template>

  <script>
export default {
  props: {
    column: {
      type: Array,
      default: () => [],
    },
    selection: Boolean,
    index: Boolean,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>