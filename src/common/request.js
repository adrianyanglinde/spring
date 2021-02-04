
//import message from '../components/Message';
import { isJSON } from './utils';
import qs from 'qs';
import mock from '../common/mock';
const useMock = false;
import 'whatwg-fetch'

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  501: '服务器不支持当前请求所需要的某个功能。',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

const reg = /[^\/]+(\?)/g;
const request = {
  json(rs, url) {
    try{
      if (rs) {
        if(useMock){
          return rs;
        }else{
          const jsonRs = isJSON(rs) ? rs.json() : rs;
          return jsonRs;
        }
      }
    }catch(e){
      const errortext = '返回数据不是标准的json格式，程序猿快来修复！！！';
      const error = new Error(errortext);

      const quesIndex = url.indexOf('?');
      if (quesIndex > 0) {
        url = url.substring(0, quesIndex);
      }
      const path = url.split('/').splice(3).join('/');
      error.url = path;
      error.name = '接口返回数据出错';
      throw error;
    }
  },

  // 通过判断当前返回的状态值，决定是返回参数还是抛出异常
  checkStatus(rs) {
    if (rs.status >= 200 && rs.status < 300) {
      return rs;
    }

    const errortext = codeMessage[rs.status] || rs.statusText;
    const error = new Error(errortext);
    error.name = rs.status;
    const errorUrl = rs.url.split('/').pop().split('?')[0];
    error.url = errorUrl;
    error.rs = rs;
    throw error;
  },

  errorThrow(error, url) {
    // 处理接口返回的数据格式错误的逻辑
    if (error.name) {
      //alert(error.message);
      // notification.error({
      //   message: `${error.name}: ${error.url ? error.url : url.match(reg) || url.split('/').splice(4).join('/')}`,
      //   description: error.message,
      // });
    } else if ('stack' in error && 'message' in error) {
      const errorDes = '出现问题了，程序猿快来修复！！！';
      //alert(error.message);
      // notification.error({
      //   message: `请求错误: ${error.message}`,
      //   description: errorDes,
      // });
    }
  },

  fetch(url, init){

    // console.group();
    // console.log("请求url:",url);
    // console.log("请求init:",init);
    // console.groupEnd();

    if(useMock){
      const re = mock(url, init)
      return re;
    }else{
      return window.fetch(url, init);
    }
  },

  requestWithNoBody(method, url, credentials) {
    const init = {
      method,
      mode: 'cors'
    };
    if (credentials) {
      init.credentials = credentials;
    }
    return this.fetch(url, init)
      .then((rs) => this.checkStatus(rs, url))
      .then((rs) => this.json(rs, url))
      // .then((jsonRs) => this.checkCode(jsonRs, url))
      .catch((error) => this.errorThrow(error, url));
  },

  requestWithBody(method, url, body, contentType, credentials = false,bodyType = "json") {

    const init = bodyType == "file" ? {
      method,
      mode: 'cors',
      body: body,
    } : {
      method,
      mode: 'cors',
      body: bodyType === "json" ? qs.stringify(body) : body,
      headers: {
        'content-type' : contentType ? contentType : 'application/x-www-form-urlencoded;charset=utf-8',
      }
    };
    if (credentials) {
      init.credentials = credentials;
    }
    return this.fetch(url, init)
          .then((rs) => this.checkStatus(rs, url))
          .then((rs) => this.json(rs, url))
          // .then((jsonRs) => this.checkCode(jsonRs, url))
          .catch((error) => this.errorThrow(error, url));
  },

  get(url, credentials = 'include') {
      return this.requestWithNoBody('GET',url, credentials);
  },

  post(url, body, contentType, credentials = 'include',bodyType) {
    return this.requestWithBody('POST',url, body, contentType, credentials,bodyType);
  }
};

export default request;
