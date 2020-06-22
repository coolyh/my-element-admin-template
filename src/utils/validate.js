/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/**
 *过滤掉非法字符
 * value  要过滤的字符串
 */
function validate(value) {
    var pattern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    if (value === '' || value === null) return false;
    if (pattern.test(value)) {
        alert("非法字符！");
        return false;
    }
    return true;
}

/**
 *防止xss和sql注入:JS特殊字符过滤正则
 * value  要过滤的字符串
 */
function filterSqlStr(value) {
    var str = "and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
    var sqlStr = str.split(',');
    var flag = true;
    for (var i = 0; i < sqlStr.length; i++) {
        if (value.toLowerCase().indexOf(sqlStr[i]) != -1) {
            alert("非法字符！");
            flag = false;
            break;
        }
    }
    return flag;
}

