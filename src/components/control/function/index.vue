<template>
  <div v-html="config.callback&&config.callback(data)"></div>
</template>

<script>
export default {
  name: "com-function",
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
  mounted() {
    console.log(this.data);
    console.log(this.prop);
    console.log(this.config);
  },
};
</script>
<style scoped>
</style>