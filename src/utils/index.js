/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 格式化时间函数
 * @param {(Object|string|number)}时间戳
 * @param {string} 转换类型 默认年 月 日 时 分 秒
 * @returns {string}
 */

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    });
    return time_str
}

/**
 * 格式化时间函数
 * @param {number} 时间戳参数
 * @param {string} option 类型参数
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * js实现下载功能
 * @param {string} url 下载地址
 * @param {string} filename 保存名称
 */
export function download(url, filename, isNewWindow) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = true;
    eleLink.style.display = 'none';
    eleLink.href = url;
    isNewWindow && (eleLink.target = '_blank');
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink)
}

/**
 * 手动截取 GET 方式请求的参数
 */
export function getRequestData() {
    var url = window.location.href; //获取url中"?"符后的字串
    var index = url.indexOf("?");
    var theRequest = new Object();
    if (index != -1) {
        var str = url.substr(index + 1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 * 平滑滚动到页面顶部
 */
export function scrollToTop() {
    // const c = document.documentElement.scrollTop || document.body.scrollTop;
    // if (c > 0) {
    //     window.requestAnimationFrame(scrollToTop);
    //     window.scrollTo(0, c - c / 8);
    // }
    document.documentElement.scrollTop = document.body.scrollTop = 0
}
