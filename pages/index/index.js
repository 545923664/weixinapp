//index.js
//获取应用实例
var app = getApp()
Page({ 
  data: {
    motto: 'Hello World',
    userInfo: {},
    toView: 'red',
    scrollTop: 100,
    list: ''
  },
   tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })

    wx.request({
    url: 'http://localhost:8080/MyMesage/queryMesage/', 
    data: {},  
    method: 'GET',   
    success: function(res){    
      that.setData({
        list: res.data
      })      
    }
    }); 

    })
  }
})
