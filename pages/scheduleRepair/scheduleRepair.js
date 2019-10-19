let app = getApp();
Page({
  data: {
    appData: app.globalData,
    userid:'',
    orgid:'',
    schList:{
      list:[

      ]
    },
    //可操作用户id
    mainList:[],
  },
  onLoad() {
    //获取登录用户
      this.setData({
      //corpId: app.globalData.corpId,
      userid: app.globalData.appUser.id,
      orgid:app.globalData.appOrg.id
    })
    //获取公司的主要负责人的钉钉id
    //var _orgid=this.data.orgid;
    //this.getMainPerson(_orgid);
  },

  //获取公司的主要负责人的钉钉id
  // getMainPerson(e){
  //   var that=this;
  //   var _orgid=e;
  //   var userlist=[];
  //     dd.httpRequest({
  //         url: app.globalData.domain+'/negotiateding/getAppUser',
  //         method: 'GET',
  //         data: {orgId: _orgid},
	// 	  headers: {
	// 		  'eticket': app.globalData.eticket
	// 	  },
  //         dataType: 'json',
  //         success: (res) => {
  //           var list=res.data.result;
  //           for(var i=0;i<list.length;i++){
  //               userlist.push(list[i].ddUserId)
  //           }
  //            var _mainList ='mainList';

  //           that.setData({
  //             [_mainList]:userlist
  //           })
  //           },
  //      })
  // },


  onShow(e){
    //获取公司Id
    //var orgid="xiesi001";
    var orgid=this.data.orgid;
    var status=app.globalData.statusList.tobenegotiated;//-------------------*---------------------------------------最终结束改为 =4
    var status_pass=app.globalData.statusList.pass;//-------------------*---------------------------------------最终结束改为 =4
    var status_refuse=app.globalData.statusList.refuse;

    var _userid=this.data.userid;

    //获取进行中的列表：
    this.getlist(orgid,_userid);
 },

// 获取页面数据
  getlist:function(orgid,_userid){
      var that=this;
       dd.httpRequest({
          url: app.globalData.domain+'/scheRe/getList',
          method: 'GET',
          data: {orgId: orgid,userId:_userid},
		  headers: {
			  'eticket': app.globalData.eticket
		  },
          dataType: 'json',
          success: (res) => {
          (res.data)
              var suList =res.data.result;
              var newArray=[];
              for(var i=0;i<suList.length;i++){
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
                if(suList[i].status==app.globalData.statusList.waitingQuote){
                    statusName="正在询价"
                }
                if(suList[i].status==app.globalData.statusList.Purchaseabolish){
                    statusName="采购废止"
                }
                if(suList[i].status==app.globalData.statusList.tobenegotiated){
                    statusName="待议价"
                }
                if(suList[i].status==app.globalData.statusList.completeBargaining){
                    statusName="待审批"
                }
                if(suList[i].status==app.globalData.statusList.pass){
                    statusName="通过"
                }
                if(suList[i].status==app.globalData.statusList.refuse){
                    statusName="拒绝"
                }
                
                  newArray.push({
                    "id":suList[i].id,
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
               var tr="schList.list"
               that.setData({
                        [tr]: newArray,
                      });
            },
           
       })
  },

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

    var detailUrl="/pages/scheduleRepair/scheduleDetail/scheduleDetail?id="+_id;

    
    // //检验权限人员
    // for(var i = 0;i<_mlist.length;i++){
    //   if(_mlist[i]==userid){//是否为责任人
         
    //      dd.navigateTo({
    //         url:detailUrl,
    //     })

    //   }else{
    //     this.getNegotiatePersonList(_id,detailUrl);
    //   }
    // }

        dd.navigateTo({
            url:detailUrl,
        })
              

   },
  //  getNegotiatePersonList(e,evl){
  //    var detailUrl=evl;
  //      dd.httpRequest({
  //         url: app.globalData.domain+'/negotiateding/getNagotiaPersonList',
  //         method: 'GET',
  //         data: {id:e},
  //         headers: {
  //           'eticket': app.globalData.eticket
  //         },
  //         dataType: 'json',
  //         success: (res) => {
  //           var _userid=this.data.userid;
  //           var arr=res.data.result;
  //           if(arr==null){
  //              dd.alert({content: "尚未操作该订单权限！"});
  //           }else{
  //              for(var i=0;i<arr.length;i++){
  //             //判断当前登录id是否在里面
  //             if(_userid==arr[i].ddUserId){
  //                 dd.navigateTo({
  //                     url:detailUrl,
  //                 });  
  //                 break;              
  //              }
  //              if(i==arr.length-1){
  //                  dd.alert({content: "尚未操作该订单权限！"});
  //              }
  //            };
  //           }
  //           },
           
  //      })
  //  }
});
