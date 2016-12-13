// pages/missionInnfo/missionInnfo.js
var initTxt = '我是在转义换行是在转义换行符后的文字我是在转义换行是在转\n义换行符后的文字我是在转义换行换行'
            +'是在转义换行符后的文字我是在转义换行是在转义换行符后的文字我是在转义换行符前的换行是在转义换行符后的文字我'
            +'是在转义换行是在转义换行符后的文字我是在转义换行符前的符前的文字我是在转义换行符后的文字我'
            +'是在转义换行符是在转义换行符后的文字我是在转义换行是在转义换行符后的文字我是在转义换行后的文字'
            +'是在转义换行符是在转义换行符后的文字我是在转义换行是在转义换行符后的文字我是在转义换行后的文字'
            
Page({
  data:{
    txt: initTxt
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      title: options.title
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
,
wx.request({
        url: 'http://localhost:8080/gameTask/queryOne', 
        data: {},  
        method: 'GET',   
        success: function(res){  
        console.info(res);  
          data:res.data      
        }
})