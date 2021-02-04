
import $ from 'jquery';
import Bscroll from 'better-scroll';
//import Router from '../src/common/router';
import {
  post,
  API
} from '../src/common/http';
import {
  toast
} from '../src/common/utils';
import {
  setAuth
} from '../src/common/user';
import "./sass/index.scss";
import click1 from '../src/assets/click1.mp3';
import click2 from '../src/assets/click2.mp3';
import click3 from '../src/assets/click3.mp3';
import click4 from '../src/assets/click4.mp3';
import click5 from '../src/assets/click5.mp3';

const audios = {
  start : new Audio(click1),
  next : new Audio(click3),
  error : new Audio(click2),
  correct : new Audio(click4)
}

//const router = new Router();

const QUESTION_TYPE = {
  SINGLE : 1,
  MUTIL : 2,
  SUBJECT : 3
}
const OPTIONS_NUM = [
  'A','B','C','D'
]
let hasNext = 0;  //是否有下一题
let preId = 0;    //当前题目id
let finalId = 0;  //最终提交答案id
let lock = false;  //是否在间隔时间内
let leave_times = 0; //剩余答题次数

const renderRank = data => {
  
  let html = "";
  if(data.length <= 0){
    html = `<li class="rank-empty">列表为空</li>`;
  }else{
    html = data.map(item => `
    <li>
      <span class="item-rank">${item.rank}</span>
      <span class="item-name">${item.username}</span>
      <span class="item-score">${item.scores}分</span>
    </li>`).join("");
  }
  $(".rank-list ul").html(html);
}

const renderRankMe = data => {
  let html = `
    <span class="item-rank">${data.rank}</span>
    <span class="item-name">${data.username}</span>
    <span class="item-score">${data.scores}分</span>
  `;
  $(".rank-me").html(html);
}

const renderQuestion = data => {

  // const options = data.choices.map(item => `
  // <li>
  //   <span class="item-flag"></span>
  //   <span class="item-title">
  //     <span class="item-num">${item.split(".")[0]}.</span>
  //     ${item.split(".")[1]}
  //   </span>
  // </li>`).join("");

  const questionOption = `<ul class="question-options">
    ${data.choices.map((item,index) => `
    <li class="item" data-value="${item.id}">
      <span class="item-select"><i></i></span>
      <span class="item-title">
        <span class="item-num">${OPTIONS_NUM[index]}.</span>
        ${item.choice}
      </span>
    </li>`).join("")}
  </ul>`

  const questionSubject = `<div class="question-subject">
    <div class="question-input">
      <input type="text" placeholder="输入谜底"/><i></i>
    </div>
  </div>`

  const question = `
  <div class="question" 
    data-id="${data.id}" 
    data-type="${data.question_type}"
    data-record="${data.record_id}"
  >
    <div class="question-title">${data.question}</div>
    ${data.question_type == QUESTION_TYPE.SUBJECT ? 
      questionSubject 
      : 
      questionOption}
  </div>`;

  const btns = `
    <a href="javascript:;" class="btn-back j-back">结束答题</a>
    <a href="javascript:;" class="btn-confirm j-confirm">确定</a>
    ${data.next == 0 ? 
      `<a href="javascript:;" class="btn-next j-next" style="display:none;">下一题</a>`
      : 
      `<a href="javascript:;" class="btn-submit j-submit" style="display:none;">提交</a>`}
  `;
  
  $(".game-bottom").html(btns);
  $(".frame-mid").html(question);

}

const popup = data => {
  
  const temp = `
  <div class="popup-main">
    <div class="popup-close j-close">关闭</div>
    <div class="">分数：${data.scores}</div>
    <div class="">时间：${data.total_time}</div>
    ${data.got_egg == 1 ? `<div class="">这里有个彩蛋</div>` : ``}
  </div>
  <div class="popup-mask"></div>
  `;
  $("#j-popup").html(temp).show();
}

/**获取题目 */
const getQuestion = () => {
  post(API.GET_QUESTION,{preId:+preId})
  .then(result=>{
    lock = false;
    preId = +result.info.id;
    hasNext = +result.info.next;
    renderQuestion(result.info);
  })
}


const enter = () => {
  // let token = getSessionStorage("spToken");
  // let isBind = getSessionStorage("spIsBind");
  // if(token && isBind){
  //   init();
  // }else{
    setAuth().then(()=>{init();});
  //}
}

/**初始化 */
const init = () => {
  
  post(API.GET_PAGE_INFO)
  .then(result=>{
    leave_times = +result.info.userInfo.leave_times;
    renderRankMe(result.info.userInfo);
  })
  
  post(API.GET_RANK_LIST)
  .then(result=>renderRank(result.info))
  .then(()=>{
    if($(".rank-list li").length > 0){
      new Bscroll(".rank-list", {
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
    }
  })
  
  $(document).on("click",'.btn-start',function(){
    if(leave_times <= 0){
      toast("您已经没有次数了哦~");
      return
    }
    post(API.START_ANSWER)
    .then(result=>{
      audios.start.play();
      $(".page-game").show()
      $(".page-home").hide()
      finalId = +result.info.id;
      getQuestion();
    })
  })
  $(document).on("click",'.j-next',function(){
    audios.next.play();
    getQuestion();
  })
  // $(".btn-start").click();
  $(document).on("click",'.j-submit',function(){
    post(API.LAST_SUBMIT,{id:finalId})
    .then(result=>{
      finalId = 0;
      lock = false;
      hasNext = 0;
      preId = 0;
      popup(result.info);
    });
  })
  $(document).on("click",'.j-close',function(){
    $("#j-popup").html("").hide();
    finalId = 0;
    lock = false;
    hasNext = 0;
    preId = 0; 
    $(".page-home").show()
    $(".page-game").hide()
  })
  $(document).on("click",'.j-back',function(){
    post(API.LAST_SUBMIT,{id:finalId});
    finalId = 0;
    lock = false;
    hasNext = 0;
    preId = 0; 
    $(".page-home").show()
    $(".page-game").hide()
  })
  $(document).on("click",'.question-options .item',function(){
    if(lock){
      return;
    }
    let type = $(".question").data("type");
    if(type == QUESTION_TYPE.SINGLE){
      if($(this).hasClass("selected")){
        return
      }
      $(this).addClass("selected")
      .siblings().removeClass("selected");
    }
    if(type == QUESTION_TYPE.MUTIL){
      if($(this).hasClass("selected")){
        $(this).removeClass("selected")
      }else{
        $(this).addClass("selected")
      }
    }
  })

  
  $(document).on("click",'.j-confirm',function(){
    let $question = $(".question");
    let type = $question.data("type");
    let answer = [];

    if(type==QUESTION_TYPE.SUBJECT){
      answer = $.trim($question.find("input").val());
      if(answer==""){
        toast("您还未填写哦~");
        return;
      }
    }else{
      if($question.find(".selected").length <= 0){
        toast("您还未选择哦~");
        return;
      }
      $question.find(".selected").each((i,item)=>{
        let value = $(item).data("value");
        answer.push(`${value};`)
      })
      answer = answer.join("");
      answer = answer.substr(0,answer.length - 1);
    }
    
    let params = {
      question_id : +$question.data("id"),
      question_type : +$question.data("type"),
      record_id : +$question.data("record"),
      answer : answer
    }
    post(API.SUBMIT_ANSWER,params)
    .then(result=>{
      lock = true;
      $(".j-confirm").hide().next().show();
      let isRight = result.info.isRight;
      let rightAnswer = result.info.rightAnswer;
      if(isRight==1){
        audios.correct.play();
      }else{
        audios.error.play();
      }
      if(type == QUESTION_TYPE.SUBJECT){
        $question.find(".question-input input").attr("readonly",true);
        if(isRight==1){
          $question.find(".question-input").addClass("correct");
        }else{
          $question.find(".question-input").addClass("error");
        }
      }else{
        if(isRight==1){
          $question.find(".selected").removeClass("selected").addClass("correct");
        }else if(type == QUESTION_TYPE.SINGLE){
          $question.find(".selected").removeClass("selected").addClass("error");
          $question.find(".item[data-value=" + rightAnswer + "]")
            .removeClass("error")
            .addClass("correct");
        }else{
          let rightAnswerArr = rightAnswer.split(";");
          $question.find(".item").each((i,option)=>{
            let $option = $(option);
            let value = $option.data("value")+"";
            if(rightAnswerArr.indexOf(value) > -1){
              if($option.hasClass("selected")){
                $option.removeClass("selected").addClass("correct");
              }else{
                $option.addClass("error");
              }
            }else{
              if($option.hasClass("selected")){
                $option.removeClass("selected").addClass("error");
              }
            }
          })
        }
      }
    })
  })
}

$(document).ready(function () {
  enter();
});

