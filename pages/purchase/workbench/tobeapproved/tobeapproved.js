let app = getApp();
Page({
  data: {
    userid:'',
    orgid:'',
    schList:{
      list:[

      ]
    },
    //可操作用户id
    mainList:[],
    //业务id
    arr:[]
    
  },
  onLoad(option) {
    //获取登录用户
      this.setData({
      //corpId: app.globalData.corpId,
      userid: app.globalData.appUser.id,
      orgid:app.globalData.appOrg.id,
      userName:app.globalData.appUser.userName,
    });
    var that=this;
    //获取公司的主要负责人的钉钉id
    //var _orgid=this.data.orgid;
    //this.getMainPerson(_orgid);
    //将缓存中的myTask拿出来
    
     var _username=this.data.userName;
    //查询当前个人任务
    //this.getTaskQuary(_username);
    
    
  },

  //获取公司的主要负责人的钉钉id
  getMainPerson(e){
    var that=this;
    var _orgid=e;
    var userlist=[];
      dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getAppUser',
          method: 'GET',
          data: {orgId: _orgid},
		  headers: {
			  'eticket': app.globalData.eticket
		  },
          dataType: 'json',
          success: (res) => {
            var list=res.data.result;
            for(var i=0;i<list.length;i++){
                userlist.push(list[i].ddUserId)
            }
             var _mainList ='mainList';

            that.setData({
              [_mainList]:userlist
            })
            },
       })
  },


  onShow(e){
   
    //获取公司Id
    //var orgid="xiesi001";
    var orgid=this.data.orgid;
    var status=app.globalData.statusList.completeBargaining;//-------------------*---------------------------------------最终结束改为 =4
    var _userid=this.data.userid;
    //获取进行中的列表：  将当前个人任务中的数组传递过来
    //this.getlist(orgid,status,_userid);
    
    this.getlist(status);
 },


 getlist:function(e){
      var that=this;
      dd.getStorage({
          key:'myTask',
          success:function(res){
            var relist=res.data;
            console.log("relist"+JSON.stringify(relist))
            if(relist==null || relist.length==0){
              dd.alert({content: '尚未需审核的订单！'});
              return;
            }
            var _arr=[];
            for(var i=0;i<relist.length;i++){
              _arr.push(relist[i].businessKey)
            }
          

          dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getTaskList',
          method: 'GET',
          data: {arr: _arr},
          headers: {
            'eticket': app.globalData.eticket
          },
              dataType: 'json',
              success: (res) => {
              
                  var suList =res.data;
                  var newArray=[];
                  for(var i=0;i<suList.length;i++){
                    for(var j=0;j<relist.length;j++){
                      if(suList[i].id == relist[j].businessKey){
                          var buyChannelName="";
                          var statusName="";
                          if(suList[i].buyChannelId==3){
                              buyChannelName="战略采购"
                          }
                          if(suList[i].buyChannelId==4){
                              buyChannelName="询价采购"
                          }
                          if(suList[i].buyChannelId==5){
                              buyChannelName="单一来源"
                          }
                          if(suList[i].buyChannelId==6){
                              buyChannelName="加工维修"
                          }
                          if(suList[i].status==e){
                              statusName="等待审批"
                          }
                          
                          newArray.push({
                              "id":suList[i].id,
                              "taskId":relist[j].id,
                              "processInsId":relist[j].processInsId,
                              "title":suList[i].applyCause,
                              "orderNumber":suList[i].orderNumber,
                              "buyChannelId":suList[i].buyChannelId,
                              "goodsType":suList[i].goodsType,
                              "status":suList[i].status,
                              "buyChannelName":buyChannelName,
                              "statusName":statusName,
                              "createTime":suList[i].createTime
                          })
                      } 
                    }
                  }
                  var tr="schList.list"
                  that.setData({
                            [tr]: newArray,
                          });
                },
              
       })
          }
    })
  

    
    
       
  },
// 获取页面数据
  // getlist:function(orgid,status,_userid){
  //     var that=this;
  //      dd.httpRequest({
  //         url: app.globalData.domain+'/negotiateding/getList',
  //         method: 'GET',
  //         data: {orgId: orgid,status:status,userId:_userid},
	// 	  headers: {
	// 		  'eticket': app.globalData.eticket
	// 	  },
  //         dataType: 'json',
  //         success: (res) => {
  //         console.log(res.data)
  //             var suList =res.data;
  //             var newArray=[];
  //             for(var i=0;i<suList.length;i++){
  //               var buyChannelName="";
  //               var statusName="";
  //               if(suList[i].buyChannelId==3){
  //                   buyChannelName="战略采购"
  //               }
  //               if(suList[i].buyChannelId==4){
  //                   buyChannelName="询价采购"
  //               }
  //               if(suList[i].buyChannelId==5){
  //                   buyChannelName="单一来源"
  //               }
  //               if(suList[i].buyChannelId==6){
  //                   buyChannelName="加工维修"
  //               }
  //               if(suList[i].status==status){
  //                   statusName="等待审批"
  //               }
                
  //                 newArray.push({
  //                   "id":suList[i].id,
  //                   "title":suList[i].applyCause,
  //                   "orderNumber":suList[i].orderNumber,
  //                   "buyChannelId":suList[i].buyChannelId,
  //                   "goodsType":suList[i].goodsType,
  //                   "status":suList[i].status,
  //                   "buyChannelName":buyChannelName,
  //                   "statusName":statusName,
  //                   "createTime":suList[i].createTime
  //                 })
  //             }
  //              var tr="schList.list"
  //              that.setData({
  //                       [tr]: newArray,
  //                     });
  //                      console.log(this.data)
  //           },
           
  //      })
  // },

  getUserInfo(e){
    //orgid查询公司
  },

  //点击进入详情页
  tolistdetail(e){
    //订单id
    var _id =e.target.dataset.id;
    //登录用户id
    var userid=this.data.userid;
    //可登录id
    var _mlist=this.data.mainList;
    //企业id
    var _orgid=this.data.orgid;
    //流程id
    var _taskId=e.target.dataset.taskId;
    //定义id
    var _processInsId=e.target.dataset.processInsId;

    var detailUrl="/pages/purchase/workbench/tobeapproved/tobeapprovedDetail/tobeapprovedDetail?id="+_id+"&userid="+userid+"&orgid="+_orgid+"&taskId="+_taskId+"&processInsId="+_processInsId;

    
    // //检验权限人员
    // for(var i = 0;i<_mlist.length;i++){
    //   if(_mlist[i]==userid){//是否为责任人
         
    //      dd.navigateTo({
    //         url:detailUrl,
    //     })

    //   }else{
    //     this.getNegotiatePersonList(_id,detailUrl);
    //     //console.log("gogogog")
    //   }
    // }

        dd.navigateTo({
            url:detailUrl,
        })
              

   },
   getNegotiatePersonList(e,evl){
     var detailUrl=evl;
       dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getNagotiaPersonList',
          method: 'GET',
          data: {id:e},
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
          success: (res) => {
            var _userid=this.data.userid;
            var arr=res.data.result;
            if(arr==null){
               dd.alert({content: "尚未操作该订单权限！"});
            }else{
               for(var i=0;i<arr.length;i++){
              //判断当前登录id是否在里面
              if(_userid==arr[i].ddUserId){
                  dd.navigateTo({
                      url:detailUrl,
                  });  
                  break;              
               }
               if(i==arr.length-1){
                   dd.alert({content: "尚未操作该订单权限！"});
               }
             };
            }
            },
           
       })
   }
});
