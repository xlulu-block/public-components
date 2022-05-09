<template>
  <div>
    <a-form :item="form_item" :field="form_field"></a-form>
  </div>
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
        {
          type: "input",
          prop: "phone",
          label: "电话",
          required: true,
          value_type: "phone",
          //额外的校验规则
          rules: [
            {
              min: 11,
              max: 11,
              message: "长度在11 个字符",
              trigger: "blur",
            },
          ],
        },
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
  methods: {},
};
</script>
