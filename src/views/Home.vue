<template>
  <a-table></a-table>
</template>

<script>
export default {
  name: "HomeView",
  components: {
    "a-table": () => import("@/components/table"),
  },
  data() {
    return {
      column: [],
    };
  },
};
</script>
