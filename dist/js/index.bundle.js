(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.get=t.post=t.API=void 0;var o=a(n(0)),i=n(2),s=n(4);a(n(7));function a(e){return e&&e.__esModule?e:{default:e}}var r="";r="https://college.4399tech.com/LCT";t.API={START_ANSWER:r+"/spring/springactivity/startAnswer",GET_QUESTION:r+"/spring/springactivity/getQuestion",SUBMIT_ANSWER:r+"/spring/springactivity/submitAnswer",LAST_SUBMIT:r+"/spring/springactivity/lastSubmit",GET_PAGE_INFO:r+"/spring/springactivity/getPageInfo",GET_RANK_LIST:r+"/spring/springactivity/getRankList",GET_ACCESS_TOKEN:r+"/wap/wapindex/getAccessToken",jumpWXAuth:r+"/wap/wapindex/jumpWXAuth",REDIRECT_URI:r+"/spring/index.html"};var c=function(e){if(1e3!==e.code)throw{statusText:e.msg};return e};t.post=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];console.log(e,"params:",t);var a=(0,i.getSessionStorage)("spToken");return n||a||(0,s.setAuth)(),o.default.ajax({type:"POST",url:e,data:t,headers:n?{}:{token:a},dataType:"json"}).then((function(e){return c(e)})).catch((function(e){(0,i.toast)(e.statusText)}))},t.get=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";console.log(e,"params:",t);return o.default.ajax({type:"GET",url:e,data:t,dataType:"json"}).then((function(e){return c(e)})).catch((function(e){(0,i.toast)(e.statusText)}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=(t.isJSON=function(e){if("object"!=(void 0===e?"undefined":o(e)))try{var t=JSON.parse(e);return!("object"!=(void 0===t?"undefined":o(t))||!t)}catch(e){return!1}return!0},t.trim=function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},t.throttle=function(e,t){var n,o,i=0,s=function(){i=+new Date,n=null,e.apply(void 0,o)};return function(){var a=+new Date,r=t-(a-i),c=this;o=arguments,r<=0?(n&&(clearTimeout(n),n=null),i=a,e.apply(c,o)):n||(n=setTimeout(s,r))}},t.jsonToParams=function(e){var t="";for(var n in e)"function"!=typeof e[n]&&(t+="&"+n+"="+encodeURI(e[n]));return t.substring(1)},t.setCookie=function(e,t){var n=new Date;n.setTime(n.getTime()+864e5),document.cookie=e+"="+escape(t)+";domain=cp.4399.studio;path=/;expires="+n.toGMTString()});t.getCookie=function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null},t.delCookie=function(e){i(e,"")},t.setSessionStorage=function(e,t){window.sessionStorage&&window.sessionStorage.setItem(e,JSON.stringify(t))},t.getSessionStorage=function(e){if(window.sessionStorage)return window.sessionStorage.getItem(e)},t.removeSessionStorage=function(e,t){if(window.sessionStorage)return window.sessionStorage.removeItem(e,t)},t.clearSessionStorage=function(){window.sessionStorage&&window.sessionStorage.clear()},t.setLocalStorage=function(e,t){window.localStorage&&window.localStorage.setItem(e,JSON.stringify(t))},t.getLocalStorage=function(e){return window.localStorage?window.localStorage.getItem(e):null},t.removeLocalStorage=function(e){if(window.localStorage)return window.localStorage.removeItem(e)},t.clearAllLocalStorage=function(){window.localStorage&&window.localStorage.clear()},t.isOwnEmpty=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},t.dateFormat=function(e,t){t=t||"Y-m-d";var n=function(e){return e<10?"0"+e:e},o=e?new Date(e):new Date,i=o.getFullYear(),s=n(o.getMonth()+1),a=n(o.getDate()),r=n(o.getHours()),c=n(o.getMinutes()),u=n(o.getSeconds());return t.replace(/Y|m|d|H|i|s/gi,(function(e){return{Y:i,m:s,d:a,H:r,i:c,s:u}[e]}))},t.stripscript=function(e){for(var t=new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"),n="",o=0;o<e.length;o++)n+=e.substr(o,1).replace(t,"");return n},t.getQueryString=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=new RegExp("(^|/)"+e+"/([^/]*)(/|$)","i"),o=window.location.search.substr(1).match(t),i=window.location.pathname.substr(1).match(n);return null!=o?unescape(o[2]):null!=i?unescape(i[2]):null};Array.prototype.find||(Array.prototype.find=function(e){return e&&(this.filter(e)||[])[0]}),Array.prototype.filter||(Array.prototype.filter=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var o=[],i=arguments.length>=2?arguments[1]:void 0,s=0;s<n;s++)if(s in t){var a=t[s];e.call(i,a,s,t)&&o.push(a)}return o});t.toast=function(e,t){if(t=isNaN(t)?3e3:t,document.getElementById("j-toast"))return!1;var n=document.createElement("div"),o=document.createElement("div");n.id="j-toast",n.className="toast-wrap",o.className="toast",o.innerHTML=e,n.appendChild(o),document.body.appendChild(n),setTimeout((function(){n.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",n.style.opacity="0",setTimeout((function(){document.body.removeChild(n)}),500)}),t)}},function(e,t,n){(e.exports=n(9)(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"index.scss",sourceRoot:""}])},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.logout=t.register=t.setAuth=void 0;var o,i=n(0),s=(o=i)&&o.__esModule?o:{default:o},a=n(1),r=n(2);t.setAuth=function(){var e=(0,r.getQueryString)("code"),t=s.default.Deferred();if(e)return(0,a.post)(a.API.GET_ACCESS_TOKEN,{code:e},!0).then((function(e){(0,r.setSessionStorage)("spToken",e.info.openid),1*e.info.isBind?((0,r.setSessionStorage)("spIsBind","true"),t.resolve()):window.location.href="/login/"}));var n=encodeURI(a.API.REDIRECT_URI);window.location.href=a.API.jumpWXAuth+"?uri="+n},t.register=function(){window.location.href=a.API.REGIST},t.logout=async function(){window.location.href=a.API.LOGOUT}},function(e,t,n){"use strict";var o=f(n(0)),i=f(n(6)),s=n(1),a=n(2),r=n(4);n(8);var c=f(n(12)),u=f(n(13)),l=f(n(14)),d=f(n(15));f(n(16));function f(e){return e&&e.__esModule?e:{default:e}}var p={start:new Audio(c.default),next:new Audio(l.default),error:new Audio(u.default),correct:new Audio(d.default)},m=1,g=2,h=3,v=["A","B","C","D"],w=0,S=0,y=!1,_=0,T=function(){(0,s.post)(s.API.GET_QUESTION,{preId:+w}).then((function(e){var t,n,i,s;y=!1,w=+e.info.id,+e.info.next,t=e.info,n='<ul class="question-options">\n    '+t.choices.map((function(e,t){return'\n    <li class="item" data-value="'+e.id+'">\n      <span class="item-select"><i></i></span>\n      <span class="item-title">\n        <span class="item-num">'+v[t]+".</span>\n        "+e.choice+"\n      </span>\n    </li>"})).join("")+"\n  </ul>",i='\n  <div class="question" \n    data-id="'+t.id+'" \n    data-type="'+t.question_type+'"\n    data-record="'+t.record_id+'"\n  >\n    <div class="question-title">'+t.question+"</div>\n    "+(t.question_type==h?'<div class="question-subject">\n    <div class="question-input">\n      <input type="text" placeholder="输入谜底"/><i></i>\n    </div>\n  </div>':n)+"\n  </div>",s='\n    <a href="javascript:;" class="btn-back j-back">结束答题</a>\n    <a href="javascript:;" class="btn-confirm j-confirm">确定</a>\n    '+(0==t.next?'<a href="javascript:;" class="btn-next j-next" style="display:none;">下一题</a>':'<a href="javascript:;" class="btn-submit j-submit" style="display:none;">提交</a>')+"\n  ",(0,o.default)(".game-bottom").html(s),(0,o.default)(".frame-mid").html(i)}))},A=function(){(0,s.post)(s.API.GET_PAGE_INFO).then((function(e){var t,n;_=+e.info.userInfo.leave_times,t=e.info.userInfo,n='\n    <span class="item-rank">'+t.rank+'</span>\n    <span class="item-name">'+t.username+'</span>\n    <span class="item-score">'+t.scores+"分</span>\n  ",(0,o.default)(".rank-me").html(n)})),(0,s.post)(s.API.GET_RANK_LIST).then((function(e){return t=e.info,n="",n=t.length<=0?'<li class="rank-empty">列表为空</li>':t.map((function(e){return'\n    <li>\n      <span class="item-rank">'+e.rank+'</span>\n      <span class="item-name">'+e.username+'</span>\n      <span class="item-score">'+e.scores+"分</span>\n    </li>"})).join(""),void(0,o.default)(".rank-list ul").html(n);var t,n})).then((function(){(0,o.default)(".rank-list li").length>0&&new i.default(".rank-list",{startY:0,click:!0,scrollX:!1,scrollY:!0,scrollbar:{fade:!1,interactive:!1},eventPassthrough:"horizontal"})})),(0,o.default)(document).on("click",".btn-start",(function(){_<=0?(0,a.toast)("您已经没有次数了哦~"):(0,s.post)(s.API.START_ANSWER).then((function(e){p.start.play(),(0,o.default)(".page-game").show(),(0,o.default)(".page-home").hide(),S=+e.info.id,T()}))})),(0,o.default)(document).on("click",".j-next",(function(){p.next.play(),T()})),(0,o.default)(document).on("click",".j-submit",(function(){(0,s.post)(s.API.LAST_SUBMIT,{id:S}).then((function(e){var t,n;S=0,y=!1,0,w=0,t=e.info,n='\n  <div class="popup-main">\n    <div class="popup-close j-close">关闭</div>\n    <div class="">分数：'+t.scores+'</div>\n    <div class="">时间：'+t.total_time+"</div>\n    "+(1==t.got_egg?'<div class="">这里有个彩蛋</div>':"")+'\n  </div>\n  <div class="popup-mask"></div>\n  ',(0,o.default)("#j-popup").html(n).show()}))})),(0,o.default)(document).on("click",".j-close",(function(){(0,o.default)("#j-popup").html("").hide(),S=0,y=!1,0,w=0,(0,o.default)(".page-home").show(),(0,o.default)(".page-game").hide()})),(0,o.default)(document).on("click",".j-back",(function(){(0,s.post)(s.API.LAST_SUBMIT,{id:S}),S=0,y=!1,0,w=0,(0,o.default)(".page-home").show(),(0,o.default)(".page-game").hide()})),(0,o.default)(document).on("click",".question-options .item",(function(){if(!y){var e=(0,o.default)(".question").data("type");if(e==m){if((0,o.default)(this).hasClass("selected"))return;(0,o.default)(this).addClass("selected").siblings().removeClass("selected")}e==g&&((0,o.default)(this).hasClass("selected")?(0,o.default)(this).removeClass("selected"):(0,o.default)(this).addClass("selected"))}})),(0,o.default)(document).on("click",".j-confirm",(function(){var e=(0,o.default)(".question"),t=e.data("type"),n=[];if(t==h){if(""==(n=o.default.trim(e.find("input").val())))return void(0,a.toast)("您还未填写哦~")}else{if(e.find(".selected").length<=0)return void(0,a.toast)("您还未选择哦~");e.find(".selected").each((function(e,t){var i=(0,o.default)(t).data("value");n.push(i+";")})),n=(n=n.join("")).substr(0,n.length-1)}var i={question_id:+e.data("id"),question_type:+e.data("type"),record_id:+e.data("record"),answer:n};(0,s.post)(s.API.SUBMIT_ANSWER,i).then((function(n){y=!0,(0,o.default)(".j-confirm").hide().next().show();var i=n.info.isRight,s=n.info.rightAnswer;if(1==i?p.correct.play():p.error.play(),t==h)e.find(".question-input input").attr("readonly",!0),1==i?e.find(".question-input").addClass("correct"):e.find(".question-input").addClass("error");else if(1==i)e.find(".selected").removeClass("selected").addClass("correct");else if(t==m)e.find(".selected").removeClass("selected").addClass("error"),e.find(".item[data-value="+s+"]").removeClass("error").addClass("correct");else{var a=s.split(";");e.find(".item").each((function(e,t){var n=(0,o.default)(t),i=n.data("value")+"";a.indexOf(i)>-1?n.hasClass("selected")?n.removeClass("selected").addClass("correct"):n.addClass("error"):n.hasClass("selected")&&n.removeClass("selected").addClass("error")}))}}))}))};(0,o.default)(document).ready((function(){(0,r.setAuth)().then((function(){A()}))}))},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1);t.default=function(e){return new RegExp(o.API.GET_ACCESS_TOKEN).test(e)?{info:{openid:"azd0ZDZiMmh3TjI1ME9VSlVka3BNU0VRNE1IQk9WWGhKWVVkblVURTBRUT09",isBind:1},code:1e3,msg:"操作成功"}:new RegExp(o.API.START_ANSWER).test(e)?{info:{id:"1"},code:1e3,msg:"操作成功"}:new RegExp(o.API.GET_QUESTION).test(e)?{info:{id:"5",question_type:"2",question:"计算机病毒是一种破坏计算机功能或者毁坏计算机中所存储数据的。",choices:[{id:"1",choice:"木马"},{id:"11",choice:"程序代码"},{id:"13",choice:"远程控制软件"}],next:0,record_id:"6"},code:1e3,msg:"操作成功"}:new RegExp(o.API.SUBMIT_ANSWER).test(e)?{info:{isRight:0,rightAnswer:"1;13"},code:1e3,msg:"操作成功"}:new RegExp(o.API.LAST_SUBMIT).test(e)?{info:{scores:1,total_time:"0h10m0s",got_egg:1},code:1e3,msg:"操作成功"}:new RegExp(o.API.GET_PAGE_INFO).test(e)?{info:{config:{start:"2021-02-01 12:00",end:"2021-02-05 12:00",session_id:"1"},userInfo:{username:"秦文芳",scores:1,rank:1,leave_times:2}},code:1e3,msg:"操作成功"}:new RegExp(o.API.GET_RANK_LIST).test(e)?{info:[{user_id:"1060",username:"秦文芳",rank:1,scores:1},{user_id:"1060",username:"秦文芳",rank:1,scores:1},{user_id:"1060",username:"秦文芳",rank:1,scores:1},{user_id:"1060",username:"秦文芳",rank:1,scores:1},{user_id:"1060",username:"秦文芳",rank:1,scores:1},{user_id:"1060",username:"秦文芳",rank:1,scores:1},{user_id:"1060",username:"秦文芳",rank:1,scores:1}],code:1e3,msg:"操作成功"}:void 0}},function(e,t,n){var o=n(3);"string"==typeof o&&(o=[[e.i,o,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0},s=n(10)(o,i);o.locals&&(e.exports=o.locals),e.hot.accept(3,(function(){var t=n(3);if("string"==typeof t&&(t=[[e.i,t,""]]),!function(e,t){var n,o=0;for(n in e){if(!t||e[n]!==t[n])return!1;o++}for(n in t)o--;return 0===o}(o.locals,t.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");s(t)})),e.hot.dispose((function(){s()}))},,,,function(e,t,n){"use strict";n.r(t),t.default=n.p+"audios/click1.mp3"},function(e,t,n){"use strict";n.r(t),t.default=n.p+"audios/click2.mp3"},function(e,t,n){"use strict";n.r(t),t.default=n.p+"audios/click3.mp3"},function(e,t,n){"use strict";n.r(t),t.default=n.p+"audios/click4.mp3"},function(e,t,n){"use strict";n.r(t),t.default=n.p+"audios/click5.mp3"}],[[5,1,2]]]);