<template>
  <a-table ref="table" @onLoad="onLoad" :column="column" :checkList.sync="checkList" :init-request="true" selection index url="/api/name/" :params="params" :formatData="formatData">
    <template v-slot:operation="slot">
      <el-button type="primary" @click="toView(slot.data)">查看</el-button>
      <el-button type="danger">删除</el-button>
    </template>
  </a-table>
</template>

<script>
export default {
  name: "HomeView",
  components: {
    "a-table": () => import("@/components/table"),
  },
  data() {
    return {
      column: [
        { label: "姓名", prop: "name" },
        {
          type: "function",
          label: "性别",
          prop: "gender",
          sortable: "custom",
          sort_by: "a.xxx",
          callback: (data) => {
            return data.gender;
          },
        }, //sortable设为custom为远程排序，设置sortby属性时，按照传递的参数进行排序
        // 插槽
        {
          type: "slot",
          label: "操作",
          prop: "operation",
          slot_name: "operation",
          //自定义表头
          render_header: (h, { column, $index }) => {
            return (
              <div>
                <p>操作</p>
                <el-input value="123" />
              </div>
            );
          },
        },
      ],
      data: { name: "王五" },
      params: { name: "张三" },
      checkList: [], //表格复选框数据
    };
  },
  mounted() {
    //父组件延迟两秒后调用接口
    // setTimeout(() => {
    //   this.$refs.table.handlerDataList();
    // }, 2000);
  },
  methods: {
    // 测试点击查看
    toView(data) {
      console.log(data);
    },
    // 传入子组件的回调函数
    onLoad(data) {
      console.log(data);
    },
    // 传入子组件的处理数据格式函数
    formatData(data) {
      data.forEach((item) => {
        item.name = "张三";
      });
      return data;
    },
  },
  watch: {
    // 监听复选框数据变化
    checkList: {
      handler(val) {
        console.log(val);
      },
    },
  },
};
</script>
