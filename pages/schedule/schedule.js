let app = getApp();
Page({ 
  
 /** 
  * 页面的初始数据 
  */
 data: { 
  winWidth:0, 
  winHeight:0, 
  currentTab:0,
  scheduleList:{
    list:[
      
    ]
  },
  // 已完成
  schedule_overList:{
    list:[
      
    ]
  }
 }, 
  
 /** 
  * 生命周期函数--监听页面加载 
  */
 onLoad: function (options) { 
  var that = this; 
  
  /** 
   * 获取系统信息 
   */
  dd.getSystemInfo({ 
  
   success: function (res) { 
    that.setData({ 
     winWidth: res.windowWidth, 
     winHeight: res.windowHeight 
    }); 
   } 
  
  });


  



 }, 
 onShow(e){
    //获取进行中的列表：
    this.getList(0);
 },
 bindChange: function (e) { 
  
  var that = this; 
  that.setData({ currentTab: e.detail.current+"" }); 
  this.getList(e.detail.current);
 }, 
 swichNav: function (e) { 
  
  var that = this; 
  
  if (this.data.currentTab === e.target.dataset.current) { 
   return false; 
  } else { 
   that.setData({ 
    currentTab: e.target.dataset.current 
   }) 
  } 

  this.getList(e.target.dataset.current);

 },
 getList(e){
        var state = '';
        var stateName = "";
        if(e == 0){
            state = "0,1";
        }else{
            state = "2,3,4";
        }

        var resultList = [];

     dd.httpRequest({
          url: app.globalData.domain+'/progress/getScheduleList',
          method: 'POST',
		  headers: {
			  'eticket': app.globalData.eticket
		  },
          data: {state: state,},
          dataType: 'json',
          success: (res) => {
            if(res.data.success){
              resultList = res.data.result;

              var str2 = "";
              if(e == 0){
                str2 = 'scheduleList.list';
              }else{
                str2 = 'schedule_overList.list';
              }

              this.setData({
                [str2]:[],
              })
              if(resultList){
                var newArray = [];
                for(var i=0;i<resultList.length;i++){
                    var resultState = resultList[i].status;
                    var resultStateName = "";

                    resultStateName = app.getStatusName(resultState);
                newArray.push({
                     "purType":resultList[i].goodsType,
                    "item":resultList[i].goodsName,
                    "count":resultList[i].goodsQuantity,
                    "unit":resultList[i].goodsBranch,
                    "state":resultStateName,
                    "goType":"local",
                    "processInstanceId": resultList[i].processInstanceId,
                    "userId": resultList[i].staffId,
                  });
                  
                }
                    var str3 = "";
                  if("0,1" == state){
                       str3 = 'scheduleList.list';
                  }else{
                       str3 = 'schedule_overList.list';
                  }
                      this.setData({
                        [str3]: newArray,
                      });

                     
              }
             

            }
          },
          fail: (res) => {
            dd.alert({ content: JSON.stringify(res) });
          },
          complete: (res) => {
            dd.hideLoading();
          }

        });
 },
 /** 
  * 页面相关事件处理函数--监听用户下拉动作 
  */
 onPullDownRefresh: function () { 
  
 }, 
  
 /** 
  * 页面上拉触底事件的处理函数 
  */
 onReachBottom: function () { 
  
 }, 
  
 /** 
  * 用户点击右上角分享 
  */
 onShareAppMessage: function () { 
  
 },
 toSeePurDetail(e){
   var goType = e.target.dataset.gotype;
   var userId = e.target.dataset.userId;
   var processInstanceId = e.target.dataset.piid;
   var url="";
    if("local"==goType){
      url='/pages/schedule/underlineApproveScheduleDetail/underlineApproveScheduleDetail';
    }else if("yun"==goType){
      url='/pages/schedule/onloadDetail/onloadDetail';
    }

  //去后端获取该审批实例的详情，获取到以后赋值给全局变量
   dd.httpRequest({
          url: app.globalData.domain+'/progress/getProgress/'+processInstanceId,
          method: 'GET',
          data: {userId: userId,},
		  headers: {
			  'eticket': app.globalData.eticket
		  },
          dataType: 'json',
          success: (res) => {
            if(res.data.success){
              var objj = JSON.parse(res.data.result);

            app.globalData.purchaseDetailObj=objj;
            }
          },
          fail: (res) => {
            dd.alert({ content: JSON.stringify(res) });
          },
          complete: (res) => {
            dd.hideLoading();
          }
        });

   dd.navigateTo({
      url:url,
   })


// var url = e.target.dataset.url;
// app.globalData.url = url;
// dd.navigateTo   ({
//   url: '/pages/schedule/ApproveDetailPage/ApproveDetailPage',
// })

 },
 
})