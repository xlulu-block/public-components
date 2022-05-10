<template>
  <div>
    <el-select v-model="val" @change="handleChange">
      <el-option v-for="item in option" :key="item.label" :value="item.value" :label="item.label"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    // 绑定的v-model
    value: {
      type: [String, Number],
      default: "",
    },
    // 配置项
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      val: "", //子组件将父组件传值重新定义一遍，防止直接修改props中的值
      option: [],
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.val = newVal;
      },
      immediate: true,
    },
    config: {
      handler(newVal) {
        // 有值的话初始化配置项
        newVal && this.initOption();
      },
      immediate: true, //立即执行
    },
  },
  methods: {
    handleChange() {
      // 值变化后通知父组件进行同步更改;
      this.$emit("update:value", this.val);
    },
    initOption() {
      this.option = this.config.options;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>>

</style>