
import $ from 'jquery';
import Bscroll from 'better-scroll';
//import Router from '../src/common/router';
import {
  post,
  API
} from '../src/common/http';
import {
  toast, 
  setSessionStorage,
  getSessionStorage,
  throttle
} from '../src/common/utils';
import {
  setAuth
} from '../src/common/user';
import "./sass/index.scss";




let hasNext = 0;  //是否有下一题
let preId = 0;    //当前题目id
let finalId = 0;  //最终提交答案id
let lock = false;  //是否在间隔时间内

const renderRank = data => {
  let html = "",htmlEgg = "";
  if(data.rankList.length <= 0){
    html = `<div class="rank-empty">列表为空</div>`;
  }else{
    html = data.rankList.map((item,index) => `
    <li>
      <span class="item-rank item-rank-${index+1}">
        ${index <= 2 ? `<i>${item.rank}</i>` : item.rank}
      </span>
      <span class="item-name">${item.username}</span>
      <span class="item-score">${item.scores}分</span>
    </li>`).join("");
  }
  if(data.gotEggList && data.gotEggList.length > 0){
    htmlEgg = `<i></i>${data.gotEggList.join("、")}触发锦鲤奖励`
  }
  $(".rank-list").html(`
    <div class="rank-mask-top"></div>
    <ul>${html}</ul>
    <div class="rank-mask-btm"></div>
  `);
  $(".rank-egg").html(htmlEgg);
}


const contentTemp = (id,data) => {
  const temp = {
    'rule' : (data)=>`
      <div class="dialog-close j-close" data-id="${id}"></div>
      <div class="rule-top"></div>
      <div class="rule-mid">
        <div class="rule-cont">
          <div class="rule-title">活动规则</div>
          <div class="rule-wrap">
            <ul class="rule-list">
              <li><i></i>活动时间：09：00-21：00</li>
              <li><i></i>每次共50题，每题<span>1分</span>，满分50分</li>
              <li><i></i>活动当天每人共有<span>3次</span>答题机会，取最高分计分（最高不超过50分）</li>
              <li><i></i>答题中途可选择结束答题，已答分数仍然有效</li>
              <li><i></i>活动期间，设置实时“英雄榜”对分数进行排名，若分数相同，则按答题用时顺序排名</li>
              <li><i></i>活动截止后，再次扫描二维码进入活动页面，如已上榜会自动弹出需填写支付宝账号的界面，于正月<span>初七</span>统一发放奖励</li>
              <li><i></i>奖金设置：<br>
                  第1-3名              奖金188元<br>
                  第4-10名            奖金128元<br>
                  第11-30名           奖金 88元<br>
                  第31-100名         奖金 18元<br>
                  第101-200名       奖金  8 元<br>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rule-btm"></div>
    `
  }
  return temp[id](data);
}
const showDialog = (id,data,cb) => {
 
  const temp = `
  <div class="dialog dialog-${id}">
    ${contentTemp(id,data)}
  </div>
  <div class="dialog-mask"></div>
  `;

  setTimeout(()=>{
    $(`#j-dialog-${id}`).html(temp).show();
    cb && cb();
    //$(`#j-dialog-${id}`).show();
  },0)
  $(`body`)[0].className = "hidden";
  
}
const hideDialog = (id) => {
  $(`#j-dialog-${id}`).html("").hide();
  $(`body`)[0].className = "";
}



/**入口 */
const enter = () => {
  // setTimeout(()=>{
  //   $(".head-douwa").addClass("bounce_1");
  // },1000)
  // setSessionStorage('spToken',"azd0ZDZiMmh3TjI1ME9VSlVka3BNU0VRNE1IQk9WWGhKWVVkblVURTBRUT09");
  // setSessionStorage('spIsBind',"1");
  let token = getSessionStorage("spToken");
  let isBind = getSessionStorage("spIsBind");
  if(token && isBind){
    init();
  }else{
    setAuth().then(()=>{init();});
    //init();
  }
}

const getPageData = () => {
  post(API.GET_PAGE_INFO)
  .then(result=>{
    let {config} = result.info;
    if(config.hasNext==1){
      $(".page-rank").addClass("hasNextSession");
    }
    $(".head-tab a").eq(0).click();
  })
}

const store = {
  session1 : null,
  session2 : null
}

const getRankList = (index) => {
  if(store[`session${index}`]){
    renderRank(store[`session${index}`]);
    return false;
  }
  post(API.GET_RANK_LIST,{session_id:+index})
  .then(result=>{
    renderRank(result.info);
    store[`session${index}`]=result.info
  })
}



/**初始化 */
const init = () => {
  
  getPageData();

  $(document).on("click",'.j-close',function(){
    hideDialog($(this).data("id"));
    let isOver = $("j-isOver").html();
    if(isOver==-1){
      $("#j-dialog-count").show();
    }
  })
  $(document).on("click",'.j-rule',function(){
    showDialog("rule",{},initRuleScroll);
    let isOver = $("j-isOver").html();
    if(isOver==-1){
      $("#j-dialog-count").hide();
    }
  })
  $(document).on("click",'.head-tab a',function(){
    let index = $(this).data("index");
    $(this).addClass("cur").siblings().removeClass("cur");
    getRankList(index)
  })

}

const initRuleScroll = () => {
  // if(bsscroll){
  //   bsscroll.refresh();
  // }else{
    new Bscroll(".rule-wrap", {
      startY: 0,
      click: true,
      scrollX: false,
      // 忽略竖直方向的滚动
      scrollY: true,
      scrollbar: {
        fade: false,
        interactive: false // 1.8.0 新增
      },
      eventPassthrough: "horizontal"
    })
  //}
}

$(document).ready(function () {
  
  
  enter();

});

