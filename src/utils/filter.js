import Vue from "vue";

const toDouble = function(val) {
    return val >= 10 ? val : `0${val}`;
};
/**
 * 全局过滤器
 * 手机中间四位隐藏
 * @param {string} str 11位手机号码
 */
Vue.filter("hidephone", str => {
    return str.substr(0, 3) + "****" + str.substr(7);
});
/**
 * 全局过滤器
 * 格式化时间函数
 * @param {string} str 时间戳
 */
Vue.filter("formatDate", str => {
    if (!str){
        return '-'
    }
    str = new Date(str * 1000);
    let year = str.getFullYear();
    let month = toDouble(str.getMonth() + 1);
    let day = toDouble(str.getDate());
    let hour = toDouble(str.getHours());
    let minute = toDouble(str.getMinutes());
    let Seconds = toDouble(str.getSeconds());
    let val = `${year}-${month}-${day} ${hour}:${minute}:${Seconds}`;
    return val;
});

/**
 * 全局过滤器
 * 格式化时间函数-到天
 * @param {string} str 时间戳
 */
Vue.filter("formatDate_day", str => {
    if (!str){
        return '-'
    }
    str = new Date(str * 1000);
    let year = str.getFullYear();
    let month = toDouble(str.getMonth() + 1);
    let day = toDouble(str.getDate());
    let hour = toDouble(str.getHours());
    let minute = toDouble(str.getMinutes());
    let Seconds = toDouble(str.getSeconds());
    let val = `${year}-${month}-${day}`;
    return val;
});
