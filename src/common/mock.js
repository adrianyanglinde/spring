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
        "question_type": "3",
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
          "isRight": 1,
          "rightAnswer": "13"
      },
      "code": 1000,
      "msg": "操作成功"
    }
  }
  if (new RegExp(API.LAST_SUBMIT).test(url)) {
    return {
      "info": {
          "rank": 100,
          "scores": 1,
          "totalTime": "0h10m0s",
          "gotEgg": 1
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
              "username": "秦文芳",
              "email": "qinwenfang@4399inc.com",
              "empno": "3088"
          },
          "toast": {
              "rank": 1,
              "gotAward": 1,
              "isWrote": 1,
              "money": 188
          },
          "config": {
              "start": 1612780200,
              "end": 1612749300,
              "session_id": 1,
              "hasNext": 1,
              "isOver": 0,
              "curTime": 1612780195
          },
          "gameInfo": {
              "scores": 200,
              "rank": 2,
              "leaveTimes": 2
          }
      },
      "code": 1000,
      "msg": "操作成功"
    }
  }
  if (new RegExp(API.WRITE_PAY_ACCOUNT).test(url)) {
    return  {
      "code": 1000,
      "info": {
        "config": {
          "start": 1612780200,
          "end": 1612749300,
          "session_id": 2,
          "hasNext": 1,
          "isOver": -1,
          "curTime": 1612780195
        }
      },
      "msg": "操作成功"
    }
  }
  if (new RegExp(API.GET_RANK_LIST).test(url)) {
    return {
      "info": {
          "rankList": [
              {
                  "username": "秦文芳",
                  "scores": 34,
                  "rank": 1
              },
              {
                  "username": "秦文芳",
                  "scores": 34,
                  "rank": 1
              },
              {
                "username": "秦文芳",
                  "scores": 34,
                  "rank": 1
              },
              {
                  "username": "秦文芳",
                  "scores": 34,
                  "rank": 1
              },
              {
                "username": "秦文芳",
                "scores": 34,
                "rank": 1
            },
            {
                "username": "秦文芳",
                "scores": 34,
                "rank": 1
            },
            {
              "username": "秦文芳",
                "scores": 34,
                "rank": 1
            },
            {
                "username": "秦文芳",
                "scores": 34,
                "rank": 1
            },
            {
              "username": "秦文芳",
              "scores": 34,
              "rank": 1
          },
          {
              "username": "秦文芳",
              "scores": 34,
              "rank": 1
          },
          {
            "username": "秦文芳",
              "scores": 34,
              "rank": 1
          },
          {
              "username": "秦文芳",
              "scores": 34,
              "rank": 1
          },
              {
                  "username": "叶碧林",
                  "scores": 4,
                  "rank": 2
              }
          ],
          "gotEggList": [
              "叶碧林",
              "秦文芳"
          ]
      },
      "code": 1000,
      "msg": "操作成功"
    }
  }
};

export default mock;
