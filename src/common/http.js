import $ from 'jquery';
import {
  toast,
  getSessionStorage
} from './utils';
import {
  setAuth
} from './user';
import useMock from './mock';

const isMock = false;
const env = "test";
let HOST = "";
switch (env) {
  case "dev":
    HOST = "";
    break;
  case "test":
    HOST = "https://college.4399tech.com/LCT";
    break;
  case "online":
    HOST = "https://college.4399tech.com";
    break;
  default:
    break;
}

export const API = {
  START_ANSWER : `${HOST}/spring/springactivity/startAnswer`,
  GET_QUESTION : `${HOST}/spring/springactivity/getQuestion`,
  SUBMIT_ANSWER : `${HOST}/spring/springactivity/submitAnswer`,
  LAST_SUBMIT : `${HOST}/spring/springactivity/lastSubmit`,
  GET_PAGE_INFO : `${HOST}/spring/springactivity/getPageInfo`,
  GET_RANK_LIST : `${HOST}/spring/springactivity/getRankList`,
  WRITE_PAY_ACCOUNT : `${HOST}/spring/springactivity/writePayAccount`,

  GET_ACCESS_TOKEN : `${HOST}/wap/wapindex/getAccessToken`,
  jumpWXAuth : `${HOST}/wap/wapindex/jumpWXAuth`,
  REDIRECT_URI : `${HOST}/spring/index.html`
}

const checkCode = result => {
  if(result.code !== 1000){
    const error = {statusText : result.msg}
    throw error;
  }else{
    return result
  }
}

export const post = (url,params = {},withoutToken = false) => {
  console.log(url,"params:",params);
  let p;
  
  let token = getSessionStorage('spToken');
  
  // if(!withoutToken && !token){
  //   setAuth();
  // }
  if(isMock){
    p = new Promise((resolve, reject) => {
      resolve(useMock(url))
    });
  }else{
    p = $.ajax({
      type: 'POST',
      url: url,
      data: params,
      headers: withoutToken ? {} : {
        token: token
      },
      dataType: 'json'
    })
  }
  return p
  .then(result=>checkCode(result))
  .catch(error=>{
    toast(error.statusText);
  });
}

export const get = (url,params = "") => {
  console.log(url,"params:",params);
  let p;
  if(isMock){
    p = new Promise((resolve, reject) => {
      resolve(useMock(url))
    });
  }else{
    p = $.ajax({
      type: 'GET',
      url: url,
      data: params,
      dataType: 'json'
    })
  }
  return p
  .then(result=>checkCode(result))
  .catch(error=>{
    toast(error.statusText);
  });
}




