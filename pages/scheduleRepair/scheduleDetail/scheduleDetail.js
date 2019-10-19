let app = getApp();

Page({
  data: {
    //订单id
    id:'',
    //展示
    isShow:true,
    //订单是否通过（展示确认供应商的条件）
    isPass:false,
    //订单对象
    materielList:{
      list:[],
    },
    //状态名称
    statusName:'',
    //订单类型
    buyChannelName:'',
    //公司 信息  包括所属公司的采购物料
    supplier:[],
    //审核人
    callListUsers:[
    
    ],
     
    //审核人以及意见
    appvoverList:[
      
    ]
    

  },
  onLoad(option) {
    this.setData({
      id:option.id
    });
    this.getComment(this.data.id);
    this.getpur(this.data.id);
    this.getShengHeRen();
  },
  //获取流程审核人
  getShengHeRen(){
    var _org=app.globalData.appOrg.id;
    var that=this;
      dd.httpRequest({
          url: app.globalData.domain+'/scheRe/getApproveList',
          method: 'GET',
          data: {orgId: _org},
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
          success: (res) => {
              var slist=res.data.result;
              var ddList=app.globalData.userlist;

              var overList=[];
              for(var i = 0;i<slist.length;i++){
                for(var j=0;j<ddList.length;j++){
                  if(slist[i].ddUserId == ddList[j].userid){
                    overList.push(ddList[j]);
                  }
                }
              }
              var ss='callListUsers'
              that.setData({
                [ss]:overList
              })
              console.log("获取流程审核人"+JSON.stringify(that.data))

          }
      })
  },
  //请求审核评论数据
  getComment(e){
    var that=this;
    var list=[];
     dd.httpRequest({
          url: app.globalData.domain+'/scheRe/getComment',
          method: 'GET',
          data: {purId: e},
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
          success: (res) => {
            console.log("res:"+JSON.stringify(res.data.result));
            var reList=res.data.result;
            if(reList!=null){
              console.log("进来")
                for(var i=0;i<reList.length;i++){
             

                  if(reList[i]!=null){
                     console.log("进来",reList[i].message)
                    var obj={
                    'userid':reList[i].userId,
                    'message':reList[i].message
                  }

                  list.push(obj);
                  console.log("list"+list)
                  }
                  
                }

                var ss='appvoverList';
                that.setData({
                  [ss]:list
                })
              }
          }
     })
  },

  //物料等请求数据
  getpur(e){
    var that=this;
    dd.httpRequest({
          url: app.globalData.domain+'/scheRe/getPur',
          method: 'GET',
          data: {id: e},
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
          success: (res) => {
              var pur=res.data.result.pur;
              // that.setData({
              //   pur:pur
              // });
              var statusName='';
              var buyChannelName='';
              if(pur.buyChannelId==3){
                    buyChannelName="战略采购"
                }
                if(pur.buyChannelId==4){
                    buyChannelName="询价采购"
                }
                if(pur.buyChannelId==5){
                    buyChannelName="单一来源"
                }
                if(pur.buyChannelId==6){
                    buyChannelName="加工维修"
                }
                that.setData({
                  buyChannelName:buyChannelName
                })
              if(pur.status==app.globalData.statusList.waitingQuote){
                    statusName="正在询价"
                }
                if(pur.status==app.globalData.statusList.Purchaseabolish){
                    statusName="采购废止"
                }
                if(pur.status==app.globalData.statusList.tobenegotiated){
                    statusName="待议价"
                }
                if(pur.status==app.globalData.statusList.completeBargaining){
                    statusName="待审批"
                }
                if(pur.status==app.globalData.statusList.pass){
                    statusName="通过"
                }
                if(pur.status==app.globalData.statusList.refuse){
                    statusName="拒绝"
                }
                that.setData({
                  statusName:statusName
                })
                 var mlist=pur.goodsDetail;
                var i=JSON.parse(mlist);
                var mmlist=i.purchaseArray;
                //console.log("mmlist",mmlist)
                var new_mlist=[];
                for(var i=0;i<mmlist.length;i++){
                    //console.log("bianli")
                    //console.log("i:",mmlist[i].itemName)
                    new_mlist.push({
                      "index":i+1,
                      "itemName":mmlist[i].itemName,
                      "unit":mmlist[i].unit,
                      "count":mmlist[i].count,
                      "typeName":mmlist[i].typeName,
                      "norms":mmlist[i].norms,
                      "pkMaterialId":mmlist[i].materialId,
                    })
                  }
                  //console.log("newlist",JSON.stringify(new_mlist))
                   var str='materielList.list';
                  that.setData({
                    [str]:new_mlist
                  });
                 


                  var quote=res.data.result.quote;
                  var supplier=res.data.result.supplier;
                   for(var j=0;j<supplier.length;j++){
                     supplier[j].qsList=[];
                   }
                  //console.log("quote:",JSON.stringify(quote))
                  //console.log("supplier:",JSON.stringify(supplier));
                  var qsList=[];
                  //循环公司list
                  for(var j=0;j<supplier.length;j++){
                    //循环quotelist
                    for(var i=0;i<quote.length;i++){
                      //循环newList
                       for(var k=0;k<new_mlist.length;k++){
                          if(supplier[j].pkSupplier==quote[i].pkSupplierId && quote[i].pkMaterialId==new_mlist[k].pkMaterialId){
                             //console.log("进来了",supplier[j].pkSupplier,quote[i].pkSupplierId,quote[i].pkMaterialId,new_mlist[k].pkMaterialId )
                             var qsObj=new_mlist[k];
                             qsObj.quote=quote[i].quote;
                             qsList=supplier[j].qsList;
                             qsList.push(qsObj);
                             //supplier[j].qs=qsList;
                             qsList=[];
                          }
                       }
                    }
                  }

                  var totalMoney=0;
                  //添加总价
                  for(var i=0;i<supplier.length;i++){
                      var _qsList=supplier[i].qsList;
                      for(var j=0;j<_qsList.length;j++){
                        var oneMoney=_qsList[j].count*_qsList[j].quote;
                        supplier[i].qsList[j].oneMoney=oneMoney;
                        totalMoney+=oneMoney;
                      }
                      supplier[i].totalMoney=totalMoney;
                      totalMoney=0;
                  }
                  that.setData({
                    supplier:supplier
                  })
                  


                 
                  //console.log("data"+JSON.stringify(that.data.supplier))
                  // }
                  
          }//success
    })
  },

  //联系供应商
  callSupp(e){
    //公司id
    var _id=e.target.dataset.id;
    var _purId=this.data.id;
    //查询公司业务员list
    dd.httpRequest({
              url: app.globalData.domain+'/scheRe/findSaleManList',
              method: 'GET',
              data: {supplierId: _id,purId:_purId},
              headers: {
                'eticket': app.globalData.eticket
              },
              dataType: 'json',
              success: (res) => {
               console.log("业务员："+JSON.stringify(res.data.result))
               var tele=res.data.result.phone;
                if(tele=="" || tele==null){
                  dd.alert({content: "该组织没有预留电话号码"});
                  return;
                }
                dd.showCallMenu({
                    phoneNumber: '19862385935', // 期望拨打的电话号码
                    code: tele, // 国家代号，中国是+86
                    showDingCall: true, // 是否显示钉钉电话
                    success:function(res){   
                    },
                    fail:function(err){
                    }
                });
              },
              
          })
    //订单id  报价的业务员id
    //电话号码
   
    //console.log("phone"+tele)
   
   
  }
});
