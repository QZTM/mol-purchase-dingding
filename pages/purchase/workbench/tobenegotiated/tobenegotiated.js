let app = getApp();
Page({
  data: {
    pageNum:1,
    pageSize:10,
    none:false,
    userid:'',
    orgid:'',
    schList:{
      list:[

      ]
    },
    //可操作用户id
    mainList:[],
    //用户操作是否是上拉刷新
    upFlush:false,
  },
  onLoad() {
    //获取登录用户
      this.setData({
      //corpId: app.globalData.corpId,
      userid: app.globalData.appUser.id,
      orgid:app.globalData.appOrg.id
    })
    //获取公司的主要负责人的钉钉id
    var _orgid=this.data.orgid;
    //this.getMainPerson(_orgid);
    console.log("....:",888)
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
    var _pageNum=this.data.pageNum;
    var _pageSize=this.data.pageSize;
    var _upFlush=this.data.upFlush;
    //获取进行中的列表：
    this.getlist(_pageNum,_pageSize,_upFlush);
 },

// 获取页面数据
  getlist:function(pageNum,pageSize,upFlush){
      //获取公司Id
      //var orgid="xiesi001";
      var orgid=this.data.orgid;
      var status=app.globalData.statusList.tobenegotiated;//-------------------*---------------------------------------最终结束改为 =4
      var _userid=this.data.userid;
      var that=this;
       dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getList',
          method: 'GET',
          data: {orgId:orgid,status:status,userId:_userid,pageNum:pageNum,pageSize:pageSize},
		  headers: {
			  'eticket': app.globalData.eticket
		  },
          dataType: 'json',
          success: (res) => {
          console.log(res.data)
              var suList =res.data;
              if(suList.length>0 && suList!=null){
                var _list=that.data.schList.list;
                var newArray=[];
                if(_list.length>0 && _list!=null){
                  //var newArray=_list;
                    console.log("原始数据不为空")
                    if(upFlush!=false){
                      console.log("上拉刷新操作")
                      newArray=_list;
                    }
                }
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
                  if(suList[i].status==status){
                      statusName="等待议价"
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
                console.log("ssssss:")
                console.log(newArray)
                var tr="schList.list"
                  that.setData({
                      [tr]: newArray,
                    });
                  dd.hideLoading();
              }else{
                dd.hideLoading();
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

    var detailUrl="/pages/purchase/workbench/negotiatedPrice/negotiatedPrice?id="+_id+"&userid="+userid+"&orgid="+_orgid;

    
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
     console.log("nadao"+e);
     var detailUrl=evl;
     console.log("de:"+detailUrl)
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
              console.log(i+"次数 ："+arr[i].ddUserId)
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
   },
   //页面上拉加载更多
   onReachBottom(){
     var that=this;
     var _upFlush=that.data.upFlush;
     _upFlush=!_upFlush;
     dd.showLoading({
        content: '拼命加载中...',
        success:function(e){
            var _num=that.data.pageNum;
            var _size=that.data.pageSize;
            _num++;
            that.setData({
              pageNum:_num
            })
            console.log("再次发送请求")
            that.getlist(_num,_size,_upFlush);
        },
        fail:function(e){
          dd.hideLoading();
          dd.alert({content: "error！"});
        }
      });
     
   },
});
