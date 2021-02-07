import { API } from "./http";

const mock = (url) => {
  if (new RegExp(API.GET_ACCESS_TOKEN).test(url)) {
    return  {
      "info": {
          "openid": "azd0ZDZiMmh3TjI1ME9VSlVka3BNU0VRNE1IQk9WWGhKWVVkblVURTBRUT09",
          "isBind": 1
      },
      //"token": "d6jq*b3U2R1E0amlNaE5UdFAtVEh6MjMyRWtMMWI2WQ==",
      "code": 1000,
      "msg": "操作成功"
    }
    // return {
    //     "code": -1000,
    //     "msg": "活动未开始哦"
    // }
  }
  if (new RegExp(API.START_ANSWER).test(url)) {
    return  {
      "info": {
          "id": "1"
      },
      "code": 1000,
      "msg": "操作成功"
    }
    // return {
    //     "code": -1000,
    //     "msg": "活动未开始哦"
    // }
  }
  if (new RegExp(API.GET_QUESTION).test(url)) {
    return {
      "info": {
        "id": "5",
        "question_type": "2",
        "question": "计算机病毒是一种破坏计算机功能或者毁坏计算机中所存储数据的。",
        "choices": [
            {
              "id" : "1",
              "choice" : "木马"
            },
            {
              "id" : "11",
              "choice" : "程序代码"
            },
            {
              "id" : "13",
              "choice" : "远程控制软件"
            }
        ],
        "next":1,
        "record_id": "6"
      },
      "code": 1000,
      "msg": "操作成功"
    }
  }
  if (new RegExp(API.SUBMIT_ANSWER).test(url)) {
    return {
      "info": {
          "isRight": 0,
          "rightAnswer": "13"
      },
      "code": 1000,
      "msg": "操作成功"
    }
  }
  if (new RegExp(API.LAST_SUBMIT).test(url)) {
    return {
      "info": {
          "scores": 1,
          "total_time": "0h10m0s",
          "got_egg": 1
      },
      "code": 1000,
      "msg": "操作成功"
    }
    // return {
    //     "code": -1000,
    //     "msg": "活动未开始哦"
    // }
  }
  if (new RegExp(API.GET_PAGE_INFO).test(url)) {
    return {
      "info": {
          "userInfo": {
              "username": "叶碧林",
              "email": "yebilin@4399inc.com",
              "empno": "3674"
          },
          "config": {
              "start": 1613145600,  
              "end": 1612748100,
              "curTime" : 1612683237,
              "session_id": 1,
              "isOver": 0  //-2-未开始大于1天；-1-未开始小于1天；0-进行中；1-已结束
          },
          "gameInfo": {
              "scores": 0,
              "rank": 0,
              "leaveTimes": 3
          }
      },
      "code": 1000,
      "msg": "操作成功"
    }
  }
  if (new RegExp(API.GET_RANK_LIST).test(url)) {
    return {
      "info": [
        {
          "user_id": "1060",
          "username": "秦文芳",
          "rank": 1,
          "scores": 1
        },
        {
          "user_id": "1060",
          "username": "秦文芳",
          "rank": 1,
          "scores": 1
        },
        {
          "user_id": "1060",
          "username": "秦文芳",
          "rank": 1,
          "scores": 1
        },
        {
          "user_id": "1060",
          "username": "秦文芳",
          "rank": 1,
          "scores": 1
        },
        {
          "user_id": "1060",
          "username": "秦文芳",
          "rank": 1,
          "scores": 1
        },
        {
          "user_id": "1060",
          "username": "秦文芳",
          "rank": 1,
          "scores": 1
        },
        {
          "user_id": "1060",
          "username": "秦文芳",
          "rank": 1,
          "scores": 1
        },
      ],
      "code": 1000,
      "msg": "操作成功"
    }
  }
};

export default mock;
