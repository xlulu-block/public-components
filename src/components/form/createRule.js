const createRule = (data) => {
  data.forEach((item) => {
    //   遍历数据，如果require为true，说明需要校验
    // 检测类型是一个数组
    let rules_array = []; //规则数组
    if (item.required) {
      const rule = {
        required: true,
        message: item.message || createMessage(item), //传了msg就发用mes，没有就用默认的
      };
      rules_array.push(rule);
    }
    item.rules = rules_array;
  });
  console.log(data);
  return data;
};
// 针对于没有传message的情况;
const createMessage = (data) => {
  let msg = "";
  switch (data.type) {
    case "input":
      msg = "请输入";
      break;
    case "select":
      msg = "请选择";
      break;
    default:
      break;
  }
  return `${msg}${data.label}`;
};
export default createRule;
