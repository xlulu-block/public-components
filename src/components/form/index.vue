<template>
  <el-form :model="field" ref="form" label-width="80px">
    <template v-for="item in form_item">
      <el-form-item :key="item.prop" :label="item.label" :rules="item.rules" :prop="item.prop">
        <component :value.sync="field[item.prop]" :is="!item.type ? 'com-text': `com-${item.type}`" :config="item" />
      </el-form-item>
    </template>
    <el-form-item>
      <el-button v-for="item in button" :key="item.key" :type="item.type" @click="handleButton(item)" :loading="item.loading">{{item.label}}</el-button>
    </el-form-item>
  </el-form>
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
import createRule from "./createRule.js";
export default {
  name: "myfromCom",
  // 动态组件
  components: {
    ...modules,
  },
  props: {
    item: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
      default: () => {},
    },
    button: {
      type: Array,
      default: () => [],
    },
    // 提交请求
    beforeSubmit: Function,
    // 取消
  },
  data() {
    return {
      form_item: [], //表单item的属性内容
    };
  },
  beforeMount() {
    //   初始化父组件传过来的属性，并进行格式化，添加校验规则
    this.form_item = createRule(this.item);
  },
  methods: {
    // 按钮事件
    handleButton(data) {
      switch (data.key) {
        case "submit":
          this.submit(data);
          break;
        case "cancel":
          this.cancel(data);
          break;
        default:
          this.next(data);
          break;
      }
    },
    // 提交表单
    submit(data) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (typeof this.beforeSubmit === "function") {
            this.$set(data, "loading", true);
            this.beforeSubmit()
              .then((response) => {
                this.$set(data, "loading", false);
              })
              .catch(() => {
                this.$set(data, "loading", false);
              });
          }
        }
      });
    },
    // 重置
    cancel(data) {
      this.$refs.form.resetFields();
      data.callback && data.callback(data);
    },
    // 其他事件
    next() {
      console.log("其他事件");
    },
  },
};
</script>
