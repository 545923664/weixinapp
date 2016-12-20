// pages/games/games.js
var app = getApp()
Page({
  data: {
    motto: '',
    list: '',
    gameRuleInfo: '',
    scrollTop: 0,
    modalHidden: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        wx.request({
          url: 'http://localhost:8080/room/roomListAPI',
          method: 'GET',
          data: { userInfo: userInfo },
          success: function (res) {
            that.setData({
              list: res.data,
              scrollTop: 0,
              motto: 123121
            });
          }
        });
      }
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../newRoom/newRoom'
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  clickMe: function (event) {//点击获取传值信息

    var tId = event.currentTarget.dataset.tid;
    var num = event.currentTarget.dataset.num;
    var cou = event.currentTarget.dataset.cou;
    var that = this;
    that.setData({
      motto: tId
    })
    if (num >= cou) {
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo;
          wx.request({
            url: 'http://localhost:8080/room/addRoomInfoAPI',
            method: 'GET',
            data: { userInfo: userInfo, roomId: tId },
            success: function (res) {
              if (res.data.result == "success") {
                //跳转到指定页面  不关闭当前页面
                wx.navigateTo({
                  url: '../gameOne/gameOne?roomId=' + tId
                })
              } else {

              }
            }
          });
        }
      })
    } else {
      this.setData({
        modalHidden: !this.data.modalHidden
      })
    }
  },
  modalBindaconfirm: function () {

    var tid = this.data.motto;


    this.setData({
      modalHidden: !this.data.modalHidden
    })

    wx.navigateTo({
      url: '../newRoom/newRoom'
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  }
})