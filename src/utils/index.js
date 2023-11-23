/*
 * @Author: daidai
 * @Date: 2022-02-23 08:59:26
 * @LastEditors: daidai
 * @LastEditTime: 2022-02-24 17:11:58
 * @FilePath: \big-screen-vue-datav\src\utils\index.js
 */

/**
 * @param {Function} fn 防抖函数
 * @param {Number} delay 延迟时间
 */
export function debounce(fn, delay) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time, fmt) {
  if (!time) return '';
  else {
    const date = new Date(time);
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return fmt;
  }
}
export function formatBJTimeToUtcTime() {
  // 处理成为时间戳
  let timestamp = new Date().getTime();
  timestamp = timestamp / 1000;
  // 增加8个小时，北京时间比utc时间多八个时区
  timestamp = timestamp - 8 * 60 * 60;

  // 时间戳转为时间
  let date = new Date(parseInt(timestamp) * 1000);
  let YY = date.getFullYear() + '-';
  let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;
}

