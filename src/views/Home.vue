<template>
  <a-table :column="column" selection index url="/api/name/">
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
        {
          type: "function",
          label: "URL地址",
          prop: "date",
          // 这里可以将后台返回的数据进行格式化处理
          callback: (data) => {
            return data.date;
          },
        },
        { label: "姓名", prop: "name" },
        { label: "性别", prop: "gender" },
        // 插槽
        {
          type: "slot",
          label: "操作",
          prop: "operation",
          slot_name: "operation",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    toView(data) {
      console.log(data);
    },
  },
};
</script>
