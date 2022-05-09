<template>
  <div>
    <el-select v-model="value"></el-select>
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
};
</script>

<style lang="scss" scoped>
</style>>

</style>