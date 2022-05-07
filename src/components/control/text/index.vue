<template>
  <div>文本</div>
</template>

<script>
export default {
  name: "com-text",
  props: {
    prop: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
</style>