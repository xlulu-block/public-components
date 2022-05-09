<template>
  <el-form :model="field" ref="form" label-width="80px">
    <template v-for="item in form_item">
      <el-form-item v-if="item.type === 'input'" :key="item.prop" :label="item.label" :rules="item.rules" :prop="item.prop">
        <el-input v-model="field[item.prop]" show-password></el-input>
      </el-form-item>
      <el-form-item v-if="item.type === 'select'" :key="item.prop" :label="item.label" :rules="item.rules" :prop="item.prop">
        <el-select v-model="field[item.prop]"></el-select>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import createRule from "./createRule.js";
export default {
  props: {
    item: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
      default: () => {},
    },
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
  methods: {},
};
</script>
