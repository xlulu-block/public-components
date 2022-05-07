<template>
  <div>图片</div>
</template>

<script>
export default {
  name: "com-image",
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