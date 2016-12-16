// pages/missionInnfo/missionInnfo.js     
Page({
  data:{
    modalHidden: true,
    modalHidden2: true,
    gametask:'',
    id :'',
    userid :''
  },
  //弹出确认框  
   modalTap: function(e) {
      this.setData({
          modalHidden: false
        })
  }, 
  //点击确定 
  confirm_one: function(e) {  
    var that = this;
    var tid = e.currentTarget.dataset.tid;
    var userid = 9;
    
     wx.request({
     url: "http://localhost:8080/gameTask/addTaskGold",  
     method: 'GET',
     data: {userid:userid,id:tid,},  
     header: {'Content-Type': 'application/json'},  
     success: function(res) {
          
          console.log(res)

        that.setData({  
          
          modalHidden: true,  
          toast1Hidden:false,        
          notice_str: '提交成功'
        });
        //确定
        that.modalTap2(e);
      },
      
    })
    
  },  
  //点击取消
  cancel_one: function(e) { 
    console.log(e);  
    this.setData({  
      modalHidden: true,  
      toast1Hidden:false,  
      notice_str: '取消成功'  
    });  
  }, 
  modalChange: function(e) {
    this.setData({
      modalHidden: true
    })
  },
  modalTap2: function(e) {
    var that= this;
    var userid = that.data.userid;
    var id = that.data.id;
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqq***********9999999/res')
    console.log(e)
    wx.request({
              url: 'http://localhost:8080/gameTask/queryOne', 
              data: {
                userid:userid,
                id:id
              },
              method: 'GET',
              success: function(res){ 
                  console.info(res);
                    that.setData({
                    gametask: res.data
                  })
              }
      });
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function(e) {
    this.setData({
      modalHidden2: true
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var userid = 9;
    var that=this;
    var tat = options.taskcontent;

    if(id!=''||id!=null){
      wx.request({
              url: 'http://localhost:8080/gameTask/queryOne', 
              data: {
                userid:userid,
                id:id
              },
              method: 'GET',
              success: function(res){ 
                  console.info(res);
                    that.setData({
                    gametask: res.data,
                    id:res.data.id,
                    userid:res.data.userid
                  })
              }
      })
          console.log("参数+=============================="+options.id);
      }else{
          console.log("出错了");
      }
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
