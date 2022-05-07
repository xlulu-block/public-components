<template>
  <div>switch开关</div>
</template>

<script>
export default {
  name: "com-switch",
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