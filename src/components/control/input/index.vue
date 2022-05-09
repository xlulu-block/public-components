<template>
  <div>
    <el-input v-model="value"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  watch: {
    value: {
      handler(newVal) {
        this.value = newVal;
      },
      // 立即监听
      immediate: true,
    },
  },
};
</script>

<style scoped>
</style>