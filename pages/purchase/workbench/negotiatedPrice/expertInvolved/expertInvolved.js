let app = getApp();
Page({
  data: {
    //评审费用
    expertReward:"",
    //订单id
    purId:"",
    //公司id
    supplierId:"",
    //公司名称
    supplierName:"",
    //是否为单商家采购
    multimerchant:"",
    //评审奖励
    expertReward:"",
    expertList:[
      {
        id:"",
        name:"",
        expertGrade:"",
        recommendReason:"",
        mobile:"",
      }
    ]
  },
  onLoad(option) {
    var that=this;
    that.setData({
      purId:option.purId,
      supplierId:option.supplierId,
      supplierName:option.supplierName,
      multimerchant:option.multimerchant,
      expertReward:option.expertReward
    })
    console.log("onload")
    console.log(that.data)
    var _supplierId=that.data.supplierId;
    // dd.getStorage({
    //   key: _supplierId,
    //   success: function(res) {
    //     //dd.alert({content: '获取成功：' + res.data.cityName});
    //     console.log(res);
    //     if(res.data==null){
         
    //     }else{
    //       console.log( '缓存获取成功：');
    //       var _expertList=res.data.expertList;
    //       that.setData({
    //         expertList:_expertList
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     dd.alert({content: res.errorMessage});
       
    //   }
    // });
    that.getExpert();

    //---------------------------改
    //先从缓存中找，没有就后端请求
   
  },
  submit:function(e){
    
    var that=this;
    var _supplierId=that.data.supplierId;
    var _expertList=that.data.expertList;
    
    var _mu=that.data.multimerchant;
    if(_mu=="true"){
        console.log("多商家");
        //获取app中的选中供应商
        //var appSupplierCheckedList = app.globalData.supplierCheckedList;
        //获取app中的选中专家
        var appExpertCheckedList = app.globalData.expertCheckedList;
        if(appExpertCheckedList!=null && appExpertCheckedList.length>0){
          for(var i=0;i<appExpertCheckedList.length;i++){
            if(appExpertCheckedList[i].suId==_supplierId){
              appExpertCheckedList.splice(i,1);
              if(i!=0){
                i--;
              }
            }
          }
          for(var i=0;i<_expertList.length;i++){
            if(_expertList[i].checked==true){
              appExpertCheckedList.push({suId:_supplierId,exId:_expertList[i].id});
            }
          }
          app.globalData.expertCheckedList = appExpertCheckedList;
        
        }else{
          var expertCheckedList=[];
          for(var i=0;i<_expertList.length;i++){
            if(_expertList[i].checked==true){
              expertCheckedList.push({suId:_supplierId,exId:_expertList[i].id});
            }
          }
          app.globalData.expertCheckedList = expertCheckedList;
        }
        dd.navigateBack({
              delta: 1
        })
    }else{
        console.log("单商家");
        //存公司id
        //var supplierCheckedList=[];
        var _supplierId=that.data.supplierId;
        //supplierCheckedList.push(_supplierId);
        //app.globalData.supplierCheckedList = supplierCheckedList;

        //定义存放选择的专家id的list
        //var _expertList=that.data.expertList;
        var expertCheckedList=[];
        
        //遍历，找到为true的;
        for(var i=0;i<_expertList.length;i++){
          if(_expertList[i].checked==true){
            expertCheckedList.push({suId:_supplierId,exId:_expertList[i].id});
          }
        }
        console.log(expertCheckedList);

        app.globalData.expertCheckedList = expertCheckedList;
        dd.navigateBack({
              delta: 1
        })
    }
   
  },

  


  //查询推荐专家
  getExpert: function(e) {
    //获取app中的选中专家
    var appExpertCheckedList = app.globalData.expertCheckedList;
    console.log("后台查询推荐专家方法执行！")
    var that=this;
    var _purId=that.data.purId;
    var _supplierId=that.data.supplierId;
    dd.httpRequest({

       url: app.globalData.domain+'/negotiateding/getExpert',
          method: 'GET',
          data: {purId:_purId,supplierId:_supplierId
          },
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
        success: function (res) {
          console.log(res.data.result);
          var _list=res.data.result;
          if(appExpertCheckedList!=null && appExpertCheckedList.length>0){
            console.log("app 有存值")
            for(var i=0;i<_list.length;i++){
              for(var j=0;j<appExpertCheckedList.length;j++){
                if(_list[i].id == appExpertCheckedList[j].exId && _supplierId==appExpertCheckedList[j].suId){
                  _list[i].checked=true;
                }
              }
            }
            that.setData({
              expertList:_list
            })
          }else{
            console.log("app 没有存值")
            if(_list!=null){
              for(var i=0;i<_list.length;i++){
                _list[i].checked=false;
              }
              that.setData({
                expertList:_list
              })
            }else{
              dd.alert({content: "没有专家推荐该报价！"});
            }
            
          }
          console.log("data:");
          
          console.log(that.data);
        }
    })
   
  },

  callExpert:function(e){
    console.log(e);
    dd.showCallMenu({
                    phoneNumber:e.target.dataset.index, // 期望拨打的电话号码
                    code: "+86", // 国家代号，中国是+86
                    showDingCall: true, // 是否显示钉钉电话
                    success:function(res){   
                    },
                    fail:function(err){
                    }
                });
  },

  selectExpert:function(e){
    var expertId=e.target.dataset.id
    var _list=this.data.expertList;
    for(var i=0;i<_list.length;i++){
      if(expertId==_list[i].id){
        _list[i].checked=!_list[i].checked;
      }
    }
    this.setData({
      expertList:_list
    })
  }
});
