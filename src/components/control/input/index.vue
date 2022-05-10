<template>
  <div>
    <el-input v-model="val" :maxlength="config.max" @input="inputEnter"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      val: "",
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.val = newVal;
      },
      // 立即监听
      immediate: true,
    },
  },
  methods: {
    inputEnter() {
      this.$emit("update:value", this.val);
    },
  },
};
</script>

<style scoped>
</style>