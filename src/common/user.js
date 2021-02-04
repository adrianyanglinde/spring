import $ from 'jquery';
import {
    API,
    post
} from './http';
import {
    getQueryString,
    setSessionStorage,
    toast
} from './utils';


/**
 * 登录操作
 */
export const setAuth = () => {
    let code = getQueryString('code');
    let defer = $.Deferred();
    if(code){
        return post(API.GET_ACCESS_TOKEN,{code:code},true)
        .then(result=>{
            setSessionStorage('spToken',result.info.openid);
            if(result.info.isBind * 1){
                setSessionStorage('spIsBind','true');
                defer.resolve();
            }else{
                window.location.href = `/login/`;
            }
        })
    }else{
        let REDIRECT_URI = encodeURI(API.REDIRECT_URI);
        //alert(`${API.jumpWXAuth}?uri=${REDIRECT_URI}`);
        window.location.href = `${API.jumpWXAuth}?uri=${REDIRECT_URI}`;
    }
};

/**
 * 注册操作
 */
export const register = () => {
    window.location.href = API.REGIST;
};

/**
 * 退出操作
 * @returns {Promise<void>}
 */
export const logout = async () => {
    window.location.href = API.LOGOUT;
};



  
  