// pages/messages/messages.js
var app = getApp()
var lcPostData='{"id":1,"qty":2}'
Page({
  data: {
    list: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      var that = this
      wx.request({
          url: 'http://localhost:8080/queryMesage/queryMesage', 
          data: {},  
          method: 'GET',   
          success: function(res){    
            that.setData({
              list: res.data
            })      
          }
    }); 
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
}),
wx.request({
          url: 'http://localhost:8080/queryMesage/queryMesage', 

          data: {},  
          method: 'GET',   
          success: function(res){  
          console.info("lujing="+res);  
           list:res.data      
          }
    });

