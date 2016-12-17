Page({
  data:{
    // text:"这是一个页面"
    toastHidden:true,
    roomTitle:'',
    roomName:'',
    roomPwd:''
  },
  formBindsubmit:function(e){

    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        if(e.detail.value.roomName.length==0||e.detail.value.roomTitle.length==0){
      this.setData({
        toastHidden:!this.data.toastHidden
      })
    }else{
      /*
      this.setData({
        tip:'',
        roomName:'房间名称：'+e.detail.value.roomName,
        roomTitle:'房间标题：'+e.detail.value.roomName,
        roomPwd:'密码：'+e.detail.value.roomPwd
      })*/
      wx.request({
          url: 'http://localhost:8080/room/createRoomAPI', 
          data: {roomName:e.detail.value.roomName,
                 roomTitle:e.detail.value.roomTitle,
                 roomPwd:e.detail.value.roomPwd,
                 userInfo:userInfo  },  
          method: 'GET',   
          success: function(res){  
          if(res.data.result=="success"){
            //跳转到指定页面  不关闭当前页面
           wx.navigateTo({
              url: '../games/games'
            })
           /*
           //跳转到指定页面  关闭当前页面
           wx.navigateTo({
              url: '../games/games'
            })*/
          }else{
            this.setData({
              tip:'',
              roomName:'房间名称：'+e.detail.value.roomName,
              roomTitle:'房间标题：'+e.detail.value.roomName,
              roomPwd:'密码：'+e.detail.value.roomPwd
            })
          }    
          }
    });
    }
      }
    })


    
  },
  formReset:function(){
    this.setData({
      roomName:'',
      roomTitle:'',
      roomPwd:''
    })
  },
  toastBindChange:function(){
    this.setData({
        toastHidden:!this.data.toastHidden
    })
  }
})