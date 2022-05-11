<template>
  <div>
    <el-select v-model="val" @change="handleChange" :remote-method="getData" :multiple="multiple" :remote="fetch_search" :filterable="fetch_search">
      <el-option v-for="item in option" :key="item[props.label]" :value="item[props.value]" :label="item[props.label]"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    // 绑定的v-model
    value: {
      type: [String, Number],
      default: "",
    },
    // 配置项
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      val: "", //子组件将父组件传值重新定义一遍，防止直接修改props中的值
      option: [],
      // 默认的配置项
      props: {
        label: "label",
        value: "value",
      },
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.val = newVal;
      },
      immediate: true,
    },
    config: {
      handler(newVal) {
        // 有值的话初始化配置项
        newVal && this.initOption();
        newVal && this.initProps();
      },
      immediate: true, //立即执行
    },
  },
  computed: {
    // 请求地址
    url() {
      return this.config?.url;
    },
    // 请求方式
    methods() {
      return this.config?.methods || "get";
    },
    // 是否为异步请求select
    init_request() {
      return this.config?.init_request;
    },
    //远程搜索的字段
    keyword() {
      return this.config?.keyword || "keyword";
    },
    // 是否多选
    multiple() {
      return this.config?.multiple;
    },
    // 远程筛选
    fetch_search() {
      return this.config?.fetch_search;
    },
  },
  methods: {
    handleChange() {
      // 值变化后通知父组件进行同步更改;
      this.$emit("update:value", this.val);
    },
    initOption() {
      // 如果为异步select,请求完数据退出函数
      if (this.init_request) {
        this.getData();
        return;
      }
      const option = this.config.options;
      // 初始化父组件传的配置项
      if (option && Array.isArray(option) && option.length > 0) {
        this.option = option;
      }
    },
    // 请求远程数据
    getData(value) {
      const url = this.url;
      if (!url) {
        console.log("请求地址不存在！");
        return false;
      }
      const request_data = {
        url: this.url,
        method: this.methods,
      };
      // 参数处理
      if (this.methods === "get") {
        request_data.params = value ? { [this.keyword]: value } : {};
      }
      if (this.methods === "post") {
        request_data.data = value ? { [this.keyword]: value } : {};
      }
      this.$axios(request_data).then((res) => {
        this.option = res.data.data;
      });
    },
    //初始化props,针对于传的字段不为label和value型
    initProps() {
      //拿到父组件的配置项
      const option = this.config.props;
      // 拿到子组件的配置默认项的键值
      const keys = Object.keys(this.props);
      if (
        option &&
        Object.prototype.toString.call(option) === "[object Object]"
      ) {
        // 遍历父组件传的默认项
        for (const key in option) {
          if (keys.includes(key)) {
            this.props[key] = option[key];
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>>

</style>