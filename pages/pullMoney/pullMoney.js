//pullMoney.js
//获取应用实例
var app = getApp()
Page({
    data: {
    inputValue: '',
    balance1: ''
  },
  
  //事件处理函数
  bindSub: function(e){
    wx.request({
        url: 'http://localhost:8080/AddMoneyApi/outmoney', 
        data: {
            money:e.detail.value.money
        },  
        method: 'GET',
        success: function(res){
         if(res.data==true){
         wx.navigateTo({
          url: '../index/index'
         })     
         }else{
           wx.showToast({  
            title: '有病啊!',  
            icon: 'loading',  
            duration: 1000  
            })  
         }     
        }
        });
  },
  bindBack: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
   onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
         console.info("lg="+userInfo)
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
        balance1: res.data.balance
      })      
    }
    }); 

    })
  }
})
