// pages/missionList/missionList.js
Page({
  data:{
    datas:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log( 'onLoad' )
    var that = this
    //网络请求
    wx.request({
            url: 'http://localhost:8080/gameTask/queryAll', 
            data: {
            },  
            method: 'GET',   
            success: function(res){  
            console.info(res);  
            that.setData({
              datas: res.data
            })
              
            }
    })

    


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
})