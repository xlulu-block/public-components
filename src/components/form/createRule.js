import {validatorPhone,validatorEmail} from '@/utils/validator'
const createRule = (data) => {
  data.forEach((item) => {
    //   遍历数据，如果require为true，说明需要校验
    // 检测类型是一个数组
    let rules_array = []; //规则数组
    // 校验非空
    if (item.required) {
      const rule = {
        required: true,
        message: item.message || createMessage(item), //传了msg就发用mes，没有就用默认的
      };
      rules_array.push(rule);
    }
    // 校验手机号
    if(item.value_type&&item.value_type==='phone'){
    const rule = { validator: validatorPhone , trigger: 'change',required:true }
    rules_array.push(rule)
    }
    // 验证邮箱
     // 校验邮箱
     if(item.value_type && item.value_type === 'email') {
      const rule = { validator: validatorEmail , trigger: 'change' }
      rules_array.push(rule)
  }
     // 如果父组件传了额外的校验规则，判断是否为数组且长度大于0
  if(item.rules&&Array.isArray(item.rules)&&item.rules.length>0){
    // concat方法会合并两个数组并返回出去
    rules_array=rules_array.concat(item.rules)
  }
    item.rules = rules_array;
  });
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
