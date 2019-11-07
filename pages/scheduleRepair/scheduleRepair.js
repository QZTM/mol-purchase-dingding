let app = getApp();
Page({
  data: {
    pageNum:1,
    pageSize:10,
    none:false,
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
    if(app.globalData.appUser==null){
          dd.alert({content: "获取用户信息失败！"});
    }
    if(app.globalData.appOrg==null){
          dd.alert({content: "获取用户信息失败！"});
    }
      this.setData({
      //corpId: app.globalData.corpId,
        userid: app.globalData.appUser.id,
        orgid:app.globalData.appOrg.id
      })
  },



  onShow(e){
    
    var newArray=[];
   
    var _pageNum=this.data.pageNum;
    var _pageSize=this.data.pageSize;
    //获取进行中的列表：
    this.getlist(_pageNum,_pageSize,newArray);
 },

// 获取页面数据
  getlist:function(pageNum,pageSize,newArray){
     var orgid=this.data.orgid;
     var _userid=this.data.userid;
      var that=this;
      dd.httpRequest({
          url: app.globalData.domain+'/scheRe/getList',
          method: 'GET',
          data: {orgId: orgid,userId:_userid,pageNum:pageNum, pageSize:pageSize},
		  headers: {
			  'eticket': app.globalData.eticket
		  },
          dataType: 'json',
          success: (res) => {
         // (res.data)
              var suList =res.data.result;
              if(suList.length>0 && suList!=null){
             
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
                if(suList[i].status==app.globalData.statusList.expertRev){
                    statusName="专家审批"
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
                dd.hideLoading();
                dd.stopPullDownRefresh();//可以停止当前页面的下拉刷新
              }else{
                dd.hideLoading();
                dd.stopPullDownRefresh();//可以停止当前页面的下拉刷新
                that.setData({
                  none:true
                })
              }
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

        dd.navigateTo({
            url:detailUrl,
        })
              

   },
   //页面上拉加载更多
   onReachBottom(){
     var that=this;
     dd.showLoading({
        content: '拼命加载中...',
        success:function(e){
          var _list=that.data.schList.list;
          var newArray=[];
          if(_list.length>0 && _list!=null){
            var newArray=_list;
          }
            var _num=that.data.pageNum;
            var _size=that.data.pageSize;
            _num++;
            that.setData({
              pageNum:_num
            })
            console.log("再次发送请求")
            that.getlist(_num,_size,newArray);
        },
        fail:function(e){
          dd.hideLoading();
          dd.alert({content: "error！"});
        }
      });
     
   },
   //下拉刷新（做这个标记的时候还没有使用这个功能）
   onPullDownRefresh(){
            //dd.alert({content: "刷新"});
            var newArray=[];
            var ss=this.data.schList.list;
            this.setData({
                [ss]:''
            })
            console.log("sch:")
            console.log(JSON.stringify(this.data.schList));
            var _num=1;
            var _size=this.data.pageSize;
            console.log("刷新..")
            this.getlist(_num,_size,newArray);
     
   }
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
