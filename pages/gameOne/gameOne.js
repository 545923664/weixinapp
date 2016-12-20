// pages/gameOne/gameOne.js
//获取应用实例
var app = getApp()
function countdown(that,rId) {  
 var second = that.data.second  
 if (second <= 0) {  
  that.setData({  
   second: "游戏开始..."  
  });  
 setTimeout(function () {
                that.quit(rId);
              }, 3000);  
  return; 
 }
  
 var time = setTimeout(function(){  
  that.setData({  
   second: second - 1  
  });  
  countdown(that,rId);  
 }  
 ,1000)  
}  
Page({
  selected: function (e) {
    this.menu_static = e.currentTarget.id;
    var ruleId = e.currentTarget.dataset.ruleid;
    var that = this;
    wx.request({
      url: 'http://localhost:8080/gameRuleInfo/getGameRuleInfo',
      method: 'GET',
      data: { ruleId: ruleId },
      success: function (res) {
        console.log(res.data)
        that.setData({
          ruleInfo: res.data.gameRuleInfo,
          imgurl: res.data.gameRuleInfo.imgurl,
          odds: res.data.odds
        });
      }
    });
  },
  addGame: function (e) {
    var ruleId = e.currentTarget.dataset.ruleid;
    var roomId = e.currentTarget.dataset.roomid;
    var nickname = e.currentTarget.dataset.nickname;
    var unitprice = e.currentTarget.dataset.unitprice;
    var that = this;

    wx.request({
      url: 'http://192.168.15.118:8080/betorlottery/bet',
      method: 'GET',
      data: { ruleId: ruleId, roomId: roomId, nickname: nickname, unitprice: unitprice },
      success: function (res) {
        if (res.data.flag) {
          wx.sendSocketMessage({
            //  data: res.data.id
            data: true
          })
        }
      }
    });
    /*  wx.connectSocket({
       url: 'ws://192.168.15.118:8080/oss/mywebsocket.do'
     })
    wx.onSocketOpen(function (res) {
       console.log('WebSocket连接已打开！')
       
       wx.sendSocketMessage({
           data:"1221212"
       })
     })*/

  },
  quit: function (rId) {
    console.log("aaaaaaaaaaaaaaaaaaaaaa" +rId);
    this.setData({
      loadingHidden: true
    });
    //跳转到指定页面  不关闭当前页面
    wx.redirectTo({
      url: '../olottery/olottery?roomId='+rId
    })

  },
  quitGame: function (e) {
    var infoid = e.currentTarget.dataset.infoid;
    var userId = e.currentTarget.dataset.userid;
    var that = this;

    wx.request({
      url: 'http://localhost:8080/room/quitRoom',
      method: 'GET',
      data: { infoid: infoid, userId: userId },
      success: function (res) {
        console.log(res.data.flag)

        wx.sendSocketMessage({
          data: true
        })
      }
    });


  },
  
  data: {
    userInfo: {},
    roles: '',
    ruleInfo: '',
    odds: '',
    roomId: '',
    gameusers: {},
    imgurl: '',
    loadingHidden: true,
    second: 10  
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var rId = options.roomId
    console.log(rId)
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        that.setData({
          userInfo: res.userInfo,
          roomId: rId
        });
      }
    })
    wx.request({
      url: 'http://localhost:8080/gameRuleInfo/getGameRuleInfos',
      method: 'GET',
      data: { roomId: rId },
      success: function (res) {
        console.log(res.data.gameRuleInfos)
        that.setData({
          roles: res.data.gameRuleInfos,
          ruleInfo: res.data.gameRuleInfo,
          odds: res.data.odds,
          gameusers: res.data.infos
        });
      }
    });
    //创建一个 WebSocket 连接。
    wx.connectSocket({
      url: 'ws://192.168.15.118:8080/oss/mywebsocket.do'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: true
      })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })

    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data)
      if (res.data) {//刷新列表
        //获取用户压中游戏的信息
        wx.request({
          url: 'http://localhost:8080/betorlottery/getInfos',
          method: 'GET',
          data: { roomId: rId },
          success: function (res) {

            that.setData({
              gameusers: res.data.infos
            });
            if (res.data.infos.length == 3) {
              console.log("**********************" + res.data.infos.length)
              that.setData({
                loadingHidden: false
              });
              countdown(that,rId)
              /*setTimeout(function () {
                that.quit(rId);
              }, 3000);
               that.setData({
                 loadingHidden: false
               });
               var that = this;
               setTimeout(function () {
                 that.setData({
                   loadingHidden: true
                 });
                 that.quit(rId);
               }, 3000);*/
            }
          }
        });
      }
    })


    //调用应用实例的方法获取全局数据
    /* app.getUserInfo(function(userInfo){
       //更新数据
       that.setData({
         userInfo:userInfo
       })
     })*/
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})