const regPhone = /^1[3456789]\d{9}$/;
const regEmail = /1/;
/**
 * 校验手机号
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function validatorPhone(rule, value, callback){
    if(regPhone.test(value)) {
        callback()
    }else{
        callback(new Error("请输入11位数字的手机号"))
    }
}

/**
 * 校验邮箱
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
 export function validatorEmail(rule, value, callback){
    if(regEmail.test(value)) {
        callback()
    }else{
        callback(new Error("请输入11位数字的手机号"))
    }
}