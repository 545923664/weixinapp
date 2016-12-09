//获取应用实例 
var app = getApp()
var util = require('../../utils/util.js')
var order = ['red', 'yellow', 'blue', 'green', 'red']

Page({
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        avatarUrl:userInfo.avatarUrl
      })
    })
  }
})
