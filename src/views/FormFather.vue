<template>
  <a-form :item="form_item" :field="form_field"></a-form>
</template>

<script>
export default {
  name: "myform",
  components: {
    "a-form": () => import("@/components/form"),
  },
  data() {
    return {
      //form表单item的属性
      form_item: [
        { type: "input", prop: "name", label: "名字", required: true },
        { type: "select", prop: "sex", label: "性别", required: true },
        { type: "input", prop: "age", label: "年龄", required: true },
      ],
      //form字段，用于绑定v-model
      form_field: {
        name: "",
        sex: "",
        age: "",
      },
    };
  },
};
</script>
