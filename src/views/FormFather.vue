<template>
  <div>
    <a-form :item="form_item" :field="form_field" :button="button_item" :before-submit="submitForm"></a-form>
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
          value_type: "phone",
          max: 11,
          //额外的校验规则
          // rules: [
          //   {
          //     min: 11,
          //     max: 11,
          //     message: "长度在11 个字符",
          //     trigger: "blur",
          //   },
          // ],
        },
        {
          type: "select",
          prop: "class_room",
          label: "教室",
          options: [
            { label: "国际化", value: 1 },
            { label: "绿化", value: 2 },
            { label: "沙漠化", value: 3 },
          ],
        },
      ],
      //form字段，用于绑定v-model
      form_field: {
        phone: "",
        class_room: "",
      },
      // 按钮
      button_item: [
        { label: "提交", key: "submit", type: "success" },
        {
          label: "重置",
          key: "cancel",
          type: "danger",
          callback: (data) => this.cancel(data),
        },
        { label: "其他", key: "other", type: "primary" },
      ],
    };
  },
  methods: {
    submitForm() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 2000);
      });
    },
    cancel(data) {
      console.log(data);
    },
  },
};
</script>
