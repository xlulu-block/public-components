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
    url: {
      type: String,
      default: "",
      require: true,
    },
    methods: {
      type: String,
      default: "post",
      require: true,
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // 父组件没传url的情况
      const url = this.url;
      if (!url) {
        console.log("请求地址不存在！");
        return false;
      }
      this.$axios({ url: this.url, method: this.methods }).then((res) => {
        this.tableData = res.data.data;
      });
    },
  },
};
</script>