let app = getApp();
Page({

  //最后传输的数据是
  //1.  公司id（选择），物料id（选择），订单id（已知） 负责人说明
  //2.  {
  //   订单id:'',
  //   shuoming:'',
  //   wuping:{
  //     'wuliao1':"gongsiid"
  //     'wuliao1':"gongsiid"
  //     'wuliao1':"gongsiid"
  //   }
  // }
  data: {
    //corpId: '',
    //authCode: '',
    //订单id
    id:"",
    //当前登录对象 钉钉id
    useridcurrent:'',
    //云采购定义的用户id
    appUserId:'',
    pur:{
       
    },
    materielList:{
      list:[],
      quoteSupplierList:[//订单对象
      // [[{gongsi:'A',isShow:false,totalMoney:999,intelligentRecommendation:true,"supplyCycle":33,recoReason:"报价最低","shortSupplyCycle":"供货周期短","expertRecommendation":"专家推荐","highestQuotation":"报价最高"}],[{itemName:"美特斯","quote":33,"priceChange":"50%","reason":"没钱啦"},{itemName:"美迪斯","quote":133},{itemName:"美安慰"}]],//公司
      // [[{gongsi:'B',isShow:false,totalMoney:999,intelligentRecommendation:false}],[{itemName:"bu","priceChange":"50%","reason":"没钱啦"},{itemName:"DD"},{itemName:"SA"}]],
      // [[{gongsi:'C',isShow:false,totalMoney:999,intelligentRecommendation:false}],[{itemName:"美d斯"},{itemName:"美s斯"},{itemName:"美a"}]]
    ],
    },
   
    //
    
   //是否管理员  //是否拥有提价权限
   isAdmin:false,
   //展示第一个向下拉
   isShow:false,
   //选择的拨打电话用户id
   approversList:[],
   //多商家采购状态
   multimerchant:false,
   //被选中的公司id ,更换其他公司时改变状态(仅为单商家操作使用)
   checkedGongSiId:'',
   //
   explainCache:'',
   //发送到后台的对象
   targetObj:{
    purId:'',
    explain:'',
    materIdToSupplierId:[],
    supplierToExpert:[],
   },
   //评审奖励
   expertReward:"",
  },
  onLoad(option) {
    //获取登录用户
    //   this.setData({
    //   corpId: app.globalData.corpId,
    //   user: app.globalData.user,
    // })
    


      
    this.setData({
      id:option.id,
      useridcurrent:option.userid,
      orgid:option.orgid,
      appUserId: app.globalData.appUser.id,
    })
    //console.log("option:"+option.userid);
    //console.log("option-DATA:"+JSON.stringify(this.data.approversList));

    //判断当前登录对象是否在approversList中
    //var userList=JSON.stringify(this.data.approversList);

    // for(var i=0;i<userList.length;i++){
    // console.log("option-DATA:"+userList[i].userid);
    //   if(userList[i].userid==option.userid){
    //   }else{
    //      dd.alert({content: "您没有权限操作订单"});
    //     return;
    //   }
    // }
    
    // 判断是不是管理员
   
    this.showPage();
    //this.administratorOrNot(option.orgid);

  },
  administratorOrNot(e){
    var that=this;
    var _orgid=e;
    var _appUserId=that.data.appUserId;
    var _buychannelId=that.data.buyChannelId;

    dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getAppUser',
          method: 'GET',
          data: {orgId:_orgid,buyChannelId:_buychannelId},
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
          success: (res) => {
            console.log(res)
            console.log("管理员："+res.data.result.id+"appuserid:"+_appUserId);
            var administratorId=res.data.result.id;
                if(_appUserId==administratorId){
                  that.setData({
                    isAdmin:true
                  })
                }
            },
           
       })
       //console.log("管理员：+"+this.data.isAdmin)
  },

  //发送页面详情请求
  showPage(){
     
    var that=this;
    var _id=that.data.id;
    var new_mlist=[];
       dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getPur',
          method: 'GET',
          data: {id:_id},
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',


          success:(res)=>{
            //console.log("getPur:"+JSON.stringify(res));
            var statusName="";
           var pur=res.data.fyPurchase;
           that.setData({
              expertReward:pur.expertReward,
              buyChannelId:pur.buyChannelId
           })

           //调用方法
           that.administratorOrNot(that.data.orgid);

           
            console.log("pur"+JSON.stringify(pur))
           if(pur.status==4){
              statusName="等待议价";
           }
          that.setData({
            "pur.title":pur.applyCause,
            "pur.orderNumber":pur.orderNumber,
            "pur.quoteCounts":pur.quoteCounts,
            "pur.createTime":pur.createTime,
            "pur.goodsType":pur.goodsType,
            "pur.status":pur.status,
            "pur.payMent":pur.payMent,
            "pur.supplyCycle":pur.supplyCycle,
            "pur.statusName":statusName,
            "pur.staffId":pur.staffId
          })

          //mlist
          var mlist=pur.goodsDetail;
          var i=JSON.parse(mlist);
          var mmlist=i.purchaseArray;
          //console.log("mmlist",mmlist)
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
          // console.log("newlist",new_mlist)
           var str='materielList.list';
          that.setData({
            [str]:new_mlist
          })
            console.log("------------------------")
// *-------------------------------------------------
          var map=res.data.map;
          // var dataObj="quoteSupplierObj";
          var new_mapObj={};
          var new_gongsiNameAndTotalMoney={};
          var meigewupingbaojiaList=[];
          var gongsimingchenghezongjiaList=[];
          var gongsiList=[];
          var _quoList=[];
          //console.log("pur:"+JSON.stringify(pur))

           var mlist=pur.goodsDetail;
          var i=JSON.parse(mlist);
          var mmlist=i.purchaseArray;
          // console.log("mmlist",mmlist)
          var totalMoney=0;
          var supplyCycle=0;
          
          var gsIndex=0;
          //设置智能推荐的公司的总价
          var bijiaoTotalMoney=0;
          //设置比较最大值
          var _bijiaoMaxMoney=0;
          //设置供货周期最小值
          var _minSupplyCycle=0;
          //专家推荐 另算------------------------------------<带有 _的都是拿来比较的值
          
          //设置智能推荐的公司key（公司id）
          var _topKey="";
          //记录被选中的公司id
          var _checkedGongSiId="";

          //周期
          var sc=0;
          var sc_gsId="";
          //报价最低
          var minmoney=0;
          var minmoneyId="";
          //报价最高
          var maxmoney=0;
          var maxmoneyId="";
          //专家
          var zhuanjia='';
          var zhuanjiaId="";

          
          for(var key in map){
             //console.log("key："+key+"map:"+JSON.stringify(map))
            var map_list=map[key];
              totalMoney=0;
              // console.log("map_list"+JSON.stringify(map_list))
              // console.log("mmlist"+JSON.stringify(mmlist))

              for(var j=0;j<map_list.length;j++){
                for(var i=0;i<mmlist.length;i++){
                  // console.log("公司报价表第"+j+"循环"+JSON.stringify(map_list[j].pkMaterialId))
                  // console.log("订单表第"+i+"循环"+JSON.stringify(mmlist[i].materialId))
                if(map_list[j].pkMaterialId==mmlist[i].materialId){
                  //-
                   totalMoney+=mmlist[i].count*1*(map_list[j].quote*1);
                   supplyCycle=map_list[j].supplyCycle;
                   zhuanjia=map_list[j].expertRecommendation;
                   //-
                   //判断价格变化
                    var priceboolean=false;// true 表示增长，false 表示降低
                    var priceChange=0;
                    var nowquote=map_list[j].quote;
                    var lastquote=map_list[j].lastQuotePrice;
                    if(lastquote !=0 ){
                        if(lastquote-nowquote>0){
                          priceboolean=true;
                          priceChange=(lastquote-nowquote)/lastquote*100
                        }else{
                          priceboolean=false;
                          priceChange=(nowquote-lastquote)/lastquote*100;
                          
                        }
                        priceChange=priceChange.toFixed(2)
                    }
                    
                  
                     //专家推荐
                     new_mapObj={
                    "itemName":mmlist[i].itemName,
                    "norms":mmlist[i].norms,
                    "count":mmlist[i].count,
                    "quote":map_list[j].quote,
                    "reason":map_list[j].reason,
                    "pkSupplierId":map_list[j].pkSupplierId,
                    "supplierSalesmanId":map_list[j].supplierSalesmanId,
                    "oneMoney":mmlist[i].count*1*(map_list[j].quote*1),
                    "checkStatus":false,
                    "pkMaterialId":mmlist[i].materialId,
                    "disabled":false,//选中一个，其他公司同类的不可选择
                    "priceboolean":priceboolean,
                    "priceChange":priceChange,
                     }
                  meigewupingbaojiaList.push(new_mapObj);
                   
                   }

                  //console.log("addList:",addList);
                }
              }
          //  console.log("key+",meigewupingbaojiaList)
            
            
            if(minmoney==0){
             
                 new_gongsiNameAndTotalMoney={
                      "gongsi":"",
                      "gongsiId":key,
                      "isShow":false,
                      "isChecked":false,
                      "totalMoneys":totalMoney,
                      "supplyCycle":supplyCycle,
                      "intelligentRecommendation":false,//是否为智能推荐
                      "recoReason":"",//推荐缘由
                      "expertRecommendation":"",
                      "highestQuotation":"",
                      "shortSupplyCycle":"",
                      "expertAgreeCounts":map_list[0].expertAgreeCounts//专家推荐都人数
                    }
              
              // console.log("if====1")
              //"supplyCycle":33,recoReason:"报价最低","shortSupplyCycle":"供货周期短",
              //"expertRecommendation":"专家推荐","highestQuotation":"报价最高"

              //第一家，开始设置为智能推荐，
              //每家公司的头信息
              sc=supplyCycle;
              sc_gsId=key;
              minmoney=totalMoney;
              minmoneyId=key;
              maxmoney=totalMoney;maxmoneyId=key;
              if(zhuanjia==1){
                zhuanjiaId=key;
              }
             
              //bijiaoTotalMoney=totalMoney;
              //_bijiaoMaxMoney=totalMoney;
              //_minSupplyCycle=supplyCycle;
              //_topKey=key;//智能推荐跟着报价最低走
              //_checkedGongSiId=key;
            }else{
              
                
             
                  new_gongsiNameAndTotalMoney={
                      "gongsi":"",
                      "gongsiId":key,
                      "isShow":false,
                      "isChecked":false,
                      "totalMoneys":totalMoney,
                      "supplyCycle":supplyCycle,
                      "intelligentRecommendation":false,//是否为智能推荐
                      "recoReason":"",//推荐缘由
                      "expertRecommendation":"",
                      "highestQuotation":"",
                      "shortSupplyCycle":"",
                       "expertAgreeCounts":map_list[0].expertAgreeCounts//专家推荐都人数
                    }
              
                 
                  if(supplyCycle*1<sc*1){
                        sc=supplyCycle;
                        sc_gsId=key;
                      }
                      if(totalMoney<minmoney){
                        minmoney=totalMoney;
                        minmoneyId=key;
                      }
                      if(totalMoney>maxmoney){
                        maxmoney=totalMoney;
                        maxmoneyId=key;
                      }
                      if(zhuanjia==1){
                        zhuanjiaId=key;
                      }

            }
            // this.setData({
            //   checkedGongSiId:_checkedGongSiId
            // })
           
            
             gsIndex++;
            gongsimingchenghezongjiaList.push(new_gongsiNameAndTotalMoney);

             gongsiList.push(gongsimingchenghezongjiaList);
             gongsiList.push(meigewupingbaojiaList);
             //console.log("gongsiList:"+gongsiList)
            

             _quoList.push(gongsiList);
             //console.log("ddddd:"+JSON.stringify(_quoList))

             //清空
             gongsimingchenghezongjiaList=[];
             meigewupingbaojiaList=[];
             gongsiList=[];
             totalMoney=0;
            
            //console.log("记号,,,,"+sc_gsId,maxmoneyId,minmoneyId,zhuanjiaId)//1 1 3 3
            //一家公司循环完成后放入到list中
            
          }
          //根据标记的id，更改推荐
          
          //sc_gsId 供货周期最短
          var _mtlist=[];
          var paiXuList=[];
          var _id=this.data.id;
         
          for(var k=0;k<_quoList.length;k++){
            console.log("aaaaa",_quoList[k])
            //console.log(k+"公司id："+(_quoList[k][0][0].gongsiId)+"-----top key:"+_topKey)
            if(_quoList[k][0][0].gongsiId==minmoneyId){
              //minmoneyId 更改智能推荐 true，是否选中，true，报价最低 data中checkedGongSiId记录id，tarobj赋值
              _quoList[k][0][0].intelligentRecommendation=true;
              _quoList[k][0][0].recoReason="报价最低";
              _quoList[k][0][0].isChecked=true;
              that.setData({
                checkedGongSiId:_quoList[k][0][0].gongsiId,
              })
              var _qlist=_quoList[k][1];
              for(var b=0;b<_qlist.length;b++){
                 _mtlist.push({
                  materId:_qlist[b].pkMaterialId,
                  supplierId:_quoList[k][0][0].gongsiId
               })
              }
            }
            if(_quoList[k][0][0].gongsiId==maxmoneyId){
               //maxmoneyId 报价最高
              _quoList[k][0][0].highestQuotation="报价最高"
            }
            if(_quoList[k][0][0].gongsiId==zhuanjiaId){
               //zhuanjiaId 专家推荐
              _quoList[k][0][0].expertRecommendation="专家推荐"
            }
            if(_quoList[k][0][0].gongsiId==sc_gsId){
               //sc_gsId 供货周期最短
              _quoList[k][0][0].shortSupplyCycle="供货周期最短"
            }
          }
            var obj={
                 purId:_id,
                 materIdToSupplierId:_mtlist
               };
               that.setData({
                 targetObj:obj
               })
          //排序
          paiXuList=this.paixu(_quoList);
          //console.log("_quolist,,,,"+JSON.stringify(paiXuList))
          var st='materielList.quoteSupplierList'
          that.setData({
            [st]:paiXuList,
           // checkedGongSiId:_checkedGongSiId
          })
             console.log("data:",that.data)

         
//*------------------------------------------------------
          }
          
       })
  },
  //添加公司详细数组到排序数组
  paixu(e){
    var tuijianlist=[];
    var _remove=[];
    var notuijianList=[]
    for(var i=0;i<e.length;i++){
      if(e[i][0][0].recoReason!="" ||e[i][0][0].highestQuotation!="" ||e[i][0][0].expertRecommendation!="" ||e[i][0][0].shortSupplyCycle!="" ){
        tuijianlist.push(e[i]);
      }else{
        notuijianList.push(e[i]);
      }
    }
    for(var k=0;k<tuijianlist.length;k++){
      if(tuijianlist[k][0][0].recoReason !=""){
        _remove=tuijianlist.splice(k,1);
      }
    }
    var list1=_remove.concat(tuijianlist);

    var list=list1.concat(notuijianList);
    var gsIndex=0;
    for(var y=0;y<list.length;y++){
      list[y][0][0].gongsi=String.fromCharCode(gsIndex + 65),
      gsIndex++;
    }

    return list;

  },
  //切换图片
  toggle(e) {
    console.log("图片，"+JSON.stringify(e));
    console.log("图片11111，"+e.target.dataset.index);
    var _isShow= !this.data.isShow;
    this.setData({
      isShow:_isShow,
    })
},
  toggleQuote(e) {
    //console.log("图片，"+JSON.stringify(e));
   // console.log("图片11111，"+e.target.dataset.index);
    var ind=e.target.dataset.index;
    var iss= this.data.materielList.quoteSupplierList[ind][0][0].isShow
    var isss='materielList.quoteSupplierList['+ind+'][0][0].isShow'
    //console.log("isshow的值："+iss);
    var _quoisShow= !iss;
    this.setData({
      [isss]:_quoisShow,
    })
  },
  // callSeller(e){
  //    var id =this.data.corpId;
  //     dd.callUsers({
  //     users: ['176362820473062530'], //用户列表，工号
  //     success:function(res){
  //       console.log("succ",res)
  //     },
  //     fail:function(err){
  //       console.log("fail",res)
  //     }
  // })
  // },
  getUser() {
    dd.navigateTo({
      url: "/pages/purchase/workbench/templet/getCallUserList/getCallUserList"
      
    })
  },
  
  removeUser(e){
    var userid = e.target.dataset.ruserid;
    var checkedUsers = this.data.approversList;
    for(var i=0;i<checkedUsers.length;i++){
        var aUserId = checkedUsers[i].userid;
        if(userid == aUserId){

        this.data.approversList.splice(i,1);
        this.setData({
          approversList: this.data.approversList,
        })

        this.setData({
          'appData.checkedUserList': this.data.aproversList,
        })

        // dd.setStorage({
        //   key: 'approveuserlist',
        //   data: this.data.approversList,
        //   success: function() {
        
        //   }
        // });
      return;
        }
    };
  },
  seeAllApprovers(e){
     dd.navigateTo({
      url: "/pages/purchase/workbench/templet/seeAllCaller/seeAllCaller"
    })
  },
  onShow() {
    // 页面显示
    var appCheckedUserList = app.globalData.checkedUserList;
    //console.log(appCheckedUserList.length);
    if(appCheckedUserList && appCheckedUserList.length>=0){
           this.setData({
            approversList: appCheckedUserList,
        })
    }
    // var approversList = dd.getStorageSync({ key: 'approveuserlist' });
    // this.setData({
    //         approversList: approversList.data,
    //     })
    // console.log(this.data.approversList);

  },

  //非多商家模式选择供应商
  selectSupplier(e){
      console.log("非多商家模式选择供应商:"+JSON.stringify(e));
      //选择的公司id
      var supplierId=e.target.dataset.id;
      console.log("非多商家模式选择供应商:"+supplierId);
      //订单id
      var _id=this.data.id;

      var _obj={
          'purId':_id,
          'materIdToSupplierId':[],
      }

      var _mlist=this.data.materielList.quoteSupplierList;
      var _materIdToSupplierId=[];


        console.log("aaaaaaaa111:"+JSON.stringify(_mlist[0][0]));
        console.log("aaaaaaaa111:"+JSON.stringify(_mlist[1][0]));
        var _cGSId=this.data.checkedGongSiId;
        //修改公司是否被选中
        for(var i=0;i<_mlist.length;i++){


          //修改上次选择的公司
          if(_cGSId!=null&&_cGSId!=""){
            if(_mlist[i][0][0].gongsiId==_cGSId){
              var st=this.data.materielList.quoteSupplierList[i][0][0].isChecked
              //console.log("222222---",st)
              var _st=!st;
              var str='materielList.quoteSupplierList['+i+'][0][0].isChecked';
              this.setData({
                [str]:_st,
              })
            }
          }


          //修改最新的公司
          if(_mlist[i][0][0].gongsiId==supplierId){
            var st=this.data.materielList.quoteSupplierList[i][0][0].isChecked
            console.log("222222---",st)
            var _st=!st;
            var str='materielList.quoteSupplierList['+i+'][0][0].isChecked'
            this.setData({
                [str]:_st,

            //记录选中的公司id
            checkedGongSiId:supplierId
              })
          }

          
        }

        var yList=_mlist[0][1];
        
        for(var y=0;y<yList.length;y++){
          var _materId=yList[y].pkMaterialId;
        console.log("aaaaaaaa:"+JSON.stringify(_materId));

          _materIdToSupplierId.push({
             materId:_materId,
             supplierId:supplierId
          }        
          )
        }    
      _obj.materIdToSupplierId=_materIdToSupplierId;
      this.setData({
        targetObj:_obj
      })
     
       console.log("data++++",JSON.stringify(this.data.targetObj))
  
  },

  //大数据
  getBigData(e){
    console.log("大数据："+JSON.stringify(e));
     console.log("公司id："+e.target.dataset.index);
     //公司id
     var _supplierId =e.target.dataset.index;
     //订单id
     //var _purId=this.data.id; 
     //物料id

     //将该公司的报价信息传递到下一页面
     var _mlist=this.data.materielList.quoteSupplierList;
     var suppQuoteList=[];

     for(var i=0;i<_mlist.length;i++){
        var xList=_mlist[i];
            //console.log("aaaaaaaa"+i+":"+JSON.stringify(xList[0][0].gongsiId));
            //console.log("bbbbbb"+i+":"+JSON.stringify(xList));
            if(xList[0][0].gongsiId==_supplierId){
            //console.log("aaaaaaaa进来了");

              suppQuoteList.push(_mlist[i]);
            }

     }
     var suppQuoteListString=JSON.stringify(suppQuoteList);

     var _ma=JSON.stringify(this.data.materielList.list)
    //  var bigDataUrl="/pages/purchase/workbench/negotiatedPrice/bigDataShow/bigDataShow?supplierId="+_supplierId+"&maList="+_ma;
     var bigDataUrl="/pages/purchase/workbench/negotiatedPrice/bigDataShow/bigDataShow?supplierId="+_supplierId+"&maList="+_ma+"&suppQuoteList="+suppQuoteListString;
      dd.navigateTo({
          url:bigDataUrl,
      });  
      
  },


  //专家评审
  getExpertReview(e){
    //console.log("专家评审："+JSON.stringify(e));
    //订单id
    var _purId=this.data.id; 
    //公司id
    var _supplierId =e.target.dataset.index;
    //公司名称
    var _supplierName=e.target.dataset.name;
    //评审奖励
    var _expertReward=this.data.expertReward;
    //是否为单商家采购
    var _multimerchant= this.data.multimerchant;
    var bigDataUrl="/pages/purchase/workbench/negotiatedPrice/expertInvolved/expertInvolved?supplierId="+_supplierId+"&purId="+_purId+"&supplierName="+_supplierName+"&multimerchant="+_multimerchant+"&expertReward="+_expertReward;
    dd.navigateTo({
        url:bigDataUrl,
    });  
  },

  //多商家采购开关
  switchChange (e){
    this.clear();
    console.log('switchChange 事件，值:', e.detail.value);
    this.setData({
      multimerchant:e.detail.value
    })

    

    //切换到多商家采购,禁止单商家操作
    //将选择的供应商isChecked改变
    if(e.detail.value){
      //将选择的供应商清空，
      var newObj=[];
      this.setData({
        'targetObj.materIdToSupplierId':newObj
      }) 
      console.log("data++++",JSON.stringify(this.data.targetObj))

      var _cgsId= this.data.checkedGongSiId;
       if(_cgsId!=null&_cgsId!=""){
       var _mlist=this.data.materielList.quoteSupplierList;
        for(var i=0;i<_mlist.length;i++){


          //修改上次选择的公司
            if(_mlist[i][0][0].gongsiId==_cgsId){
              var st=this.data.materielList.quoteSupplierList[i][0][0].isChecked
              console.log("222222---",st)
              var _st=!st;
              var str='materielList.quoteSupplierList['+i+'][0][0].isChecked';
              this.setData({
                [str]:_st,
                
                //将data中的checkedGongSiId 也清空
                checkedGongSiId:''
              })
            }
          }
      }
    }else{
     
      //切换到单个商家采购,禁止多商家操作
      this.intelligentRecommendation();
      //选中智能推荐（报价最低）  将disable 状态改为false
     //这里-----------------------------------------添加一对一，修改ischecked属性
                        //254行开始，公司头部信息添加专家推荐，等剩余三中排序属性，按照排序属性进行排列

      //重置选中状态为false
      var _quoList=this.data.materielList.quoteSupplierList;
      console.log("++++++",JSON.stringify(_quoList));
       for(var i=0;i<_quoList.length;i++){
         console.log("ddddd",_quoList[i][1])
         var _wulist=_quoList[i][1];
         for(var y=0;y<_wulist.length;y++){
           var ss='materielList.quoteSupplierList['+i+'][1]['+y+'].checkStatus';
           var s2='materielList.quoteSupplierList['+i+'][1]['+y+'].disabled';
           this.setData({
             [ss]:false,
             [s2]:false
           })
         }
       }

    }
    console.log("data_多商家采购开关",JSON.stringify(this.data))
  },

  //设置智能推荐选中，以及传输的对象内容为智能推荐公司的对应关系
  intelligentRecommendation(){

    //设置值
    var _mtlist=[];
    //订单id
    var _id =this.data.id;
     var _quoList=this.data.materielList.quoteSupplierList;
      console.log("++++++",JSON.stringify(_quoList));
       for(var i=0;i<_quoList.length;i++){
          if(_quoList[i][0][0].intelligentRecommendation){

            //设置被选中
            var st='materielList.quoteSupplierList['+i+'][0][0].isChecked';
            this.setData({
              [st]:true,

            //被选中的公司id ,更换其他公司时改变状态
              checkedGongSiId:_quoList[i][0][0].gongsiId
            })
            //console.log("智能推荐："+JSON.stringify(_quoList[i][1][0]))
            var _list=_quoList[i][1];
            for(var k=0;k<_list.length;k++){
               console.log("智能推荐："+JSON.stringify(_list[k].pkMaterialId))
               _mtlist.push({
                  materId:_list[k].pkMaterialId,
                  supplierId:_quoList[i][0][0].gongsiId
               })
            }
          }
       }

       var _ob={
         purId:_id,
         materIdToSupplierId:_mtlist
       };
       this.setData({
         targetObj:_ob    
       })
  },

  //选择具体物料
  onChange(e) {
      console.log("调用了勾选物料的事件，"+JSON.stringify(e))
      //是否勾选
      var _check =e.detail.value;
      //购买公司的物料
      //公司
      var _gongsiId=e.target.dataset.gongsiId;
      //物料id
      var _materId=e.target.dataset.pkMaterialId;
      //判断是否勾选
      if(_check){
          console.log("勾选")
          //true 存入data中tarObj中，将其他公司该物料disable 改为 true
          var _tarObj=this.data.targetObj;
          var arr =_tarObj.materIdToSupplierId;
          //订单id
          var _id=this.data.id;
          arr.push({
            materId:_materId,
            supplierId:_gongsiId
          });
          var obj={
            purId:_id,
            materIdToSupplierId:arr
          }
          this.setData({
            targetObj:obj          
          })

          //将其他公司该物料disable 改为 true
          var _quoList=this.data.materielList.quoteSupplierList;

          
          
          for(var i=0;i<_quoList.length;i++){
            
            //console.log("quotelisttttt:"+JSON.stringify(_quoList[i][0][0].gongsiId))
            if(_gongsiId!=_quoList[i][0][0].gongsiId){
              var _mmlist=_quoList[i][1];
              for(var k=0;k<_mmlist.length;k++){
                  //console.log("quotelistyyyyy:"+JSON.stringify(_mmlist[k]));
                  if(_materId==_mmlist[k].pkMaterialId){//materielList.quoteSupplierList['+i+'][0][0].isChecked
                    var st='materielList.quoteSupplierList['+i+'][1]['+k+'].disabled';
                    this.setData({
                      [st]:true
                    })
                  }
              }
            }else{
              //修改选中的物料状态checkStatus为true
              var _mmlist=_quoList[i][1];
              for(var k=0;k<_mmlist.length;k++){
                if(_materId==_mmlist[k].pkMaterialId){
                  var st='materielList.quoteSupplierList['+i+'][1]['+k+'].checkStatus';
                    this.setData({
                      [st]:true
                    })
                }
              }
            }
          }
      }else{
      //false  从tarobj中删除，将将其他公司该物料disable 改为 false
          console.log("取消勾选")
          var _tarObj=this.data.targetObj;
          var arr =_tarObj.materIdToSupplierId;
          //订单id
          var _id=this.data.id;
          for(var i=0;i<arr.length;i++){
            if(arr[i].materId==_materId && arr[i].supplierId==_gongsiId){
              arr.splice(i,1);
            }
          }

           //将其他公司该物料disable 改为 false
          var _quoList=this.data.materielList.quoteSupplierList;
          
          for(var i=0;i<_quoList.length;i++){
            
            //console.log("quotelisttttt:"+JSON.stringify(_quoList[i][0][0].gongsiId))
            if(_gongsiId!=_quoList[i][0][0].gongsiId){
              var _mmlist=_quoList[i][1];
              for(var k=0;k<_mmlist.length;k++){
                  //console.log("quotelistyyyyy:"+JSON.stringify(_mmlist[k]));
                  if(_materId==_mmlist[k].pkMaterialId){//materielList.quoteSupplierList['+i+'][0][0].isChecked
                    var st='materielList.quoteSupplierList['+i+'][1]['+k+'].disabled';
                    this.setData({
                      [st]:false
                    })
                  }
              }
            }
          }
      }
   

       console.log("data++++",JSON.stringify(this.data.targetObj))


  },

  callUser(e){
    console.log("打电话",this.data.approversList);
    //订单id
    var _id=this.data.id;
    var userList=this.data.approversList;
    if(userList.length<1){
      dd.alert({content: "请在右边选择视频对象"});
       return;
    }else{
      var callId=[];
      for(var i=0;i<userList.length;i++){
          callId.push(userList[i].userid);
      }
      dd.callUsers({
      users:callId, //用户列表，工号
    
      success:function(res){
          
            dd.httpRequest({
              url: app.globalData.domain+'/negotiateding/saveNagotiaPersonList',
              method: 'GET',
              data: {id: _id,callId:callId},
          headers: {
            'eticket': app.globalData.eticket
          },
              dataType: 'json',
              success: (res) => {
               
              },
              
          })
      },
      fail:function(err){
        
      }
  })
    }
  },
  //负责人说明
  explain(e){
    console.log("负责人说明："+JSON.stringify(e))
    var ex=e.detail.value;
    //暂存到data中
    this.setData({
      explainCache:ex
    })

    // var _ob=this.data.targetObj;
    // _ob.explain=ex;
    // this.setData({
    //   targetObj:_ob
    // })
    console.log("负责人说明1："+JSON.stringify(this.data.explainCache))
    console.log("tar"+JSON.stringify(this.data.targetObj))

   
  },

  //清除缓存
  clear(){
   console.log("清除1")

   var appExpertCheckedList = app.globalData.expertCheckedList;
   appExpertCheckedList=[];
   app.globalData.expertCheckedList = appExpertCheckedList;
   console.log("清除2")
   console.log(app.globalData.expertCheckedList )
  },

  //提交时获取的数据
  getCache(){
      var  appExpertCheckedList = app.globalData.expertCheckedList;
      return appExpertCheckedList;

  },

  
  //提交数据
  submit(e){
   var that=this;
   dd.showLoading({
     content:'提交中...',
     delay:0,
     success:function(){
       

        //获取app.js中工作流的key
        //var _processKey=app.globalData.processKey;
        //订单id
        var _id =that.data.id;
        var _materId=that.data.targetObj;
        //判断是不是物料已经选择完毕
        var _mCount=that.data.materielList.quoteSupplierList[0][1].length;
        var _oCount=_materId.materIdToSupplierId.length;

        var _explainCache=that.data.explainCache;
        if(_explainCache.length<=0){
          dd.hideLoading();
          dd.alert({
              content: '请填写负责人说明！',
            });
            return;
        }
        _materId.explain=_explainCache
        if(_mCount!=_oCount){
      
        return;
        }
        var flag= that.getCache();
        console.log("4")
        if(flag!=null){
          console.log(flag)
          that.clear();
          console.log("缓存删除成功！");
        }
        var _userId=that.data.appUserId;
        var _orgId =that.data.orgid;
        var _buyChannelId=that.data.buyChannelId;
        //查询公司id 订单类型 登录人 对应的 审批key
        dd.httpRequest({
          url: app.globalData.domain+'/ac/getActKey',
          method: 'GET',
          data:{
              orgId:_orgId,
              buyChannelId:_buyChannelId,
              userId:_userId,
          },
          headers: {
              "Content-Type": "application/json",
             'eticket': app.globalData.eticket
          },
          dataType: 'json',
          success: (res) => {
            console.log("成功")
            console.log(res)
            if(res.data.success){
              console.log("保存")
              var _processKey=res.data.result.purchaseActiveKey;
              //保存订单信息
              dd.httpRequest({
                url: app.globalData.domain+'/negotiateding/save',
                method: 'POST',
                data:JSON.stringify({
                    purId:_materId.purId,explain:_materId.explain,materIdToSupplierId:_materId.materIdToSupplierId,supplierToExpert:flag
                }),
                headers: {
                    "Content-Type": "application/json",
                  'eticket': app.globalData.eticket
                },
                dataType: 'json',
                success: (res) => {
                  console.log("下面工作流")
                  //开启工作流
                  dd.httpRequest({
                        url: app.globalData.domain+'/ac/start',
                        method: 'POST',
                        data:{
                            processKey:_processKey,
                            businessKey:_id
                        },
                        headers: {
                          
                            'eticket': app.globalData.eticket
                        },
                        dataType: 'json',
                        success: (cs) => {
                              dd.hideLoading();
                              console.log("res:"+JSON.stringify(res))
                              if(res.data.success){
                                dd.alert({
                                content: res.data.result,
                                  success: () => {
                                  //   dd.navigateBack({
                                  //   url:"/pages/purchase/workbench/tobenegotiated/tobenegotiated",
                                  // })
                                  dd.switchTab({
                                    url:'/pages/purchase/purchase'
                                  })
                                  }
                              });
                              }else{
                                dd.alert({
                                content: res.data.message,
                                success: () => {
                                  //   dd.navigateBack({
                                  //   url:"/pages/purchase/workbench/tobenegotiated/tobenegotiated",
                                  // })
                                  dd.switchTab({
                                    url:'/pages/purchase/purchase'
                                  })
                                  }
                              });
                            
                              }  
                        }
                    })
                    //---工作流
                  
                    
                }
          })
            }else{
              dd.hideLoading();
              dd.alert({
                content: res.data.message,
              });
            }
            
          },
          fail:(res)=>{
            dd.hideLoading();
            console.log("查询失败")
            console.log(res)
            dd.alert({
              content: '',
            });
          }
        })
     }
   })
    

    
    
  }
});

