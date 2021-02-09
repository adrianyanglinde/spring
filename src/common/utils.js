/**
 * 判断是否为一个JSON
 * @param str
 * @returns {boolean}
 */
export const isJSON = (str) => {
  if (typeof str != 'object') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return true;
};


/**
 * 删除左右两端的空格
 * @param {*} str 
 */
export const trim = (str) => { 
　　return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 函数节流
 * @param {Function} doSomething 
 * @param {Number} wait 
 */
export const throttle = (doSomething, wait) => {
  var timeout,
      _this,
      _arguments,
      previous = 0;

  var later = function() {
      previous = +new Date();
      timeout = null;
      doSomething.apply(_this, _arguments);
  };
  var throttled = function() {
      var now = +new Date();
      //下次触发 doSomething 剩余的时间
      var remaining = wait - (now - previous),
          _this = this;
      _arguments = arguments;
      // 如果没有剩余的时间了
      if (remaining <= 0) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          doSomething.apply(_this, _arguments);
      } else if (!timeout) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}


/**
 * json转key=value格式
 * @param param
 * @returns {string}
 */
export const jsonToParams = (param) => {
  let result = "";
  for (let name in param) {
    if (typeof param[name] != 'function') {
      result += "&" + name + "=" + encodeURI(param[name]);
    }
  }
  return result.substring(1)
};

/**
 * 写入cookie
 * @param name
 * @param value
 */
export const setCookie = (name, value) => {
  var Days = 1;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
};

/**
 * 读取cookie
 * @param name
 * @returns {*}
 */
export const getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};

/**
 * 删除cookie
 * @param name
 */
export const delCookie = (name) => {
  setCookie(name, "");
};


/**
 * 写入sessionStorage
 * @param name
 */
export const setSessionStorage = (key,value) => {
  if(window.sessionStorage){
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * 读取sessionStorage
 * @param name
 */
export const getSessionStorage = (key) => {
  if(window.sessionStorage){
    return window.sessionStorage.getItem(key);
  }
};

/**
 * 删除sessionStorage
 * @param name
 */
export const removeSessionStorage = (key,value) => {
  if(window.sessionStorage){
    return window.sessionStorage.removeItem(key, value);
  }
};

/**
 * 清除sessionStorage
 */
export const clearSessionStorage = () => {
  if(window.sessionStorage){
      window.sessionStorage.clear();
  }
}

/**
 * 写入localStorage
 * @param name
 */
export const setLocalStorage = (key,value) => {
  if(window.localStorage){
      window.localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * 读取localStorage
 * @param name
 */
export const getLocalStorage = (key) => {
  if(window.localStorage){
      return window.localStorage.getItem(key);
  }
  return null;
}

/**
 * 删除localStorage
 * @param {*} key 
 */
export const removeLocalStorage = (key) => {
  if(window.localStorage){
    return window.localStorage.removeItem(key);
  }
}

/**
 * 清除所有localStorage
 * @param name
 */
export const clearAllLocalStorage = () => {
  if(window.localStorage){
      window.localStorage.clear();
  }
}

/**
 * 是否是空对象
 * @param {*} obj 
 */
export const isOwnEmpty = (obj) => { 
    for(var name in obj) 
    { 
        if(obj.hasOwnProperty(name)) 
        { 
            return false; 
        } 
    } 
    return true; 
}; 

/**
 * 
 * @param {Number} timestamp 
 * @param {Srting} formats 
 * formats格式包括
    1. Y-m-d
    2. Y-m-d H:i:s
    3. Y年m月d日
    4. Y年m月d日 H时i分
 */
export const dateFormat = (timestamp,formats) => {
  
  formats = formats || 'Y-m-d';

  var zero = function (value) {
      if (value < 10) {
          return '0' + value;
      }
      return value;
  };

  var myDate = timestamp? new Date(timestamp): new Date();

  var year = myDate.getFullYear();
  var month = zero(myDate.getMonth() + 1);
  var day = zero(myDate.getDate());

  var hour = zero(myDate.getHours());
  var minite = zero(myDate.getMinutes());
  var second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
      return ({
          Y: year,
          m: month,
          d: day,
          H: hour,
          i: minite,
          s: second
      })[matches];
  });
};

/**
 * 防止xss和sql注入
 * @param {String} s 
 */
export const stripscript = (s) =>{ 
  var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
  var rs = ""; 
  for (var i = 0; i < s.length; i++) { 
  rs = rs+s.substr(i, 1).replace(pattern, ''); 
  }
  return rs;
};

/**
 * 获取url参数
 * @param {String} name 
 */
export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  var q = window.location.pathname.substr(1).match(reg_rewrite);
  if(r != null){
      return unescape(r[2]);
  }else if(q != null){
      return unescape(q[2]);
  }else{
      return null;
  }
}


if (!Array.prototype.find) {
  Array.prototype.find = function (callback) {
      return callback && (this.filter(callback) || [])[0];
  };
}

if (!Array.prototype.filter){
  Array.prototype.filter = function(fun /*, thisArg */){
      "use strict";
      if (this === void 0 || this === null)
          throw new TypeError();
      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function")
          throw new TypeError();
      var res = [];
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++){
          if (i in t){
              var val = t[i];
              if (fun.call(thisArg, val, i, t))
              res.push(val);
          }
      }
      return res;
  };
}



export const toast = (msg,duration) => {
	duration=isNaN(duration)?3000:duration;
	var self = document.getElementById("j-toast");
	if(self){
		return false;
	}
  var o = document.createElement('div');
  var m = document.createElement('div');
  o.id = "j-toast";
  o.className = "toast-wrap"
  m.className = "toast";
  m.innerHTML = msg;
	//m.style.cssText="max-width:60%;min-width: 200px;padding:10px 14px;color: rgb(255, 255, 255);line-height: 24px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 14px;";
  o.appendChild(m);
  document.body.appendChild(o);
	setTimeout(function() {
		var d = 0.5;
		o.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
		o.style.opacity = '0';
		setTimeout(function() { document.body.removeChild(o) }, d * 1000);
	}, duration);
}

