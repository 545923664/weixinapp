// pages/games/games.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
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
  onUnload:function(){
    // 页面关闭
  }
}), wx.request({
        url: 'http://localhost:8080/room/roomListAPI', 
        method: 'GET', 
        data: {"cityname":"张三"},  
        success: function(res){  
        console.info("lujing="+res);
                  
    }
}); 