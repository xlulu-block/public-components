<template>
  <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange">
    <el-table-column v-if="index" type="index"></el-table-column>
    <el-table-column v-if="selection" type="selection"></el-table-column>
    <el-table-column v-for="item in column" :render-header="item.render_header" :sortable="item.sortable" :sort-by="item.sort_by" :prop="item.prop" :key="item.prop" :label="item.label" :width="item.width">
      <template slot-scope="scope">
        <!-- 作用域插槽 -->
        <slot v-if="item.type === 'slot'" :name="item.slot_name" :data="scope.row"></slot>
        <!-- 如果没传type就默认组件为文本类型的组件 ：data：当前数据  config当前的配置项-->
        <component v-else :is="!item.type?'com-text':`com-${item.type}`" :data="scope.row" :config="item" :prop="item.prop"></component>
      </template>
    </el-table-column>
  </el-table>
</template>

  <script>
//自动化规则，根据父组件传递的type属性，自动读取到目录文件
const modules = {};
//（文件路径，是否自动读取下层文件，读取具体的文件名）
const files = require.context("../control", true, /\index.vue$/);
// keys()方法，将遍历的数组/对象的索引/键名生成为一个新数组
files.keys().forEach((item) => {
  // 将具体的文件名取出来
  const key = item.split("/");
  const name = key[1];
  // 组件集成
  modules[`com-${name}`] = files(item).default;
});
console.log(modules);
export default {
  // 动态组件
  components: {
    ...modules,
  },
  props: {
    // 表头数据
    column: {
      type: Array,
      default: () => [],
    },

    // 是否开启复选框
    selection: Boolean,
    // 是否开启序列
    index: Boolean,
    // 是否在请求成功后回调函数
    onLoad: Boolean,
    // 处理返回的数据格式
    formatData: Function,
    // 选中的复选框数据
    checkList: {
      type: Array,
      default: () => [],
    },
    // 是否自动调用表格数据函数
    initRequest: {
      type: Boolean,
      default: false,
    },
    // 请求地址
    url: {
      type: String,
      default: "",
      require: true,
    },
    // 请求方式
    methods: {
      type: String,
      default: "post",
      require: true,
    },
    // 明文传参
    params: {
      type: Object,
      default: () => {},
    },
    // 密文传参
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.initRequest && this.getList();
  },
  methods: {
    // 处理复选框
    handleSelectionChange(val) {
      this.$emit("update:checkList", val);
    },
    // 获取数据
    getList() {
      // 父组件没传url的情况
      const url = this.url;
      if (!url) {
        console.log("请求地址不存在！");
        return false;
      }
      const request_data = {
        url: this.url,
        method: this.methods,
      };
      // 参数处理
      if (JSON.stringify(this.data) !== "{}") {
        request_data.data = this.data;
      }
      if (JSON.stringify(this.params) !== "{}") {
        request_data.params = this.params;
      }
      this.$axios(request_data).then((res) => {
        this.tableData = res.data.data;
        // 处理返回数据
        this.tableData = this.formatData(this.tableData);
        // 父组件传入要执行回调函数则执行
        this.onLoad && this.$emit("onLoad", this.tableData);
      });
    },
    // 当父组件不传自动加载子组件数据时，手动调用
    handlerDataList() {
      this.getList();
    },
    // 排序函数
    sortChange({ column, prop, order }) {
      const sort_by = column.sortBy;
      // 调用远程排序的接口一般传这两个参数即可
      console.log(sort_by, order);
    },
  },
};
</script>
<style scoped>
</style>