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
    expertList:[
      {
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
      multimerchant:option.multimerchant
    })
    console.log("onload")
    console.log(that.data)
    var _supplierId=that.data.supplierId;
    dd.getStorage({
      key: _supplierId,
      success: function(res) {
        //dd.alert({content: '获取成功：' + res.data.cityName});
        console.log(res);
        if(res.data==null){
          that.getExpert();
        }else{
          console.log( '缓存获取成功：');
          var _expertList=res.data.expertList;
          that.setData({
            expertList:_expertList
          })
        }
      },
      fail: function(res){
        dd.alert({content: res.errorMessage});
       
      }
    });


    //---------------------------改
    //先从缓存中找，没有就后端请求
   
  },

  submit:function(e){
    var that=this;

    //将所有专家存入缓存，
    //区别在与checked 是否为true
    var _supplierId=that.data.supplierId;
    var _purId=that.data.purId;
    // var newList=[];
    //所有专家
    var _list=that.data.expertList;
    //多或单状态
    var _mu=that.data.multimerchant;
    var supplierList=[];
    console.log("多商家状态："+_mu)
    if(_mu=="true"){
      //多商家
      console.log("多商家执行");
      //将 公司id--> 专家list 存入缓存
      that.saveExpertListInCache(_supplierId,_list);
      //取出缓存中的   订单id-->公司idList   将页面公司id  存入list
      dd.getStorage({
        key: _purId,
        success: function(res) {
          if(res.data!=null){
            supplierList=res.data.supplierList;
            supplierList.push(_supplierId)
            that.saveIdListInCache(_purId,supplierList)
          }else{
            supplierList.push(_supplierId)
            that.saveIdListInCache(_purId,supplierList)
          }
          
          // dd.navigateBack({
          //   delta: 1
          // })
        },
        fail: function(res){
          dd.alert({content: res.errorMessage});
        }
      });
    }else{
      console.log("单商家处理")
      //获取缓存，整个删除
      dd.getStorage({
        key: _purId,
        success: function(res) {
          if(res.data!=null){
            var _sL=res.data.supplierList;
            for(var i=0;i<_sL.length;i++){
              that.removeExpertFromCache(_sL[i]);
            }
          }
          
          supplierList.push(_supplierId);
          that.removeIdListFromCache(_purId);
          that.saveIdListInCache(_purId,supplierList);
          that.saveExpertListInCache(_supplierId,_list);
        },
        fail: function(res){
          dd.alert({content: res.errorMessage});
        }
      });
      //单商家处理 
      // dd.navigateBack({
      //       delta: 1
      // })
    }
    // for(var i=0;i<_list.length;i++){
    //   if(_list[i].checked == true){
    //     newList.push(_list[i]);
    //   }
    // }
    // console.log(newList);
    // dd.setStorage({
    //   key: 'selectExpert',
    //   data: {
    //     newList
    //   },
    //   success: function() {
    //     // dd.alert({content: '写入成功'});
    //     console.log("缓存写入成功！");
    //      dd.navigateBack({
    //       delta: 1
    //     })
    //   }
    // });
  },

  //存入缓存（公司的id）
  saveIdListInCache(_key,e){
    console.log("公司缓存方法执行")
    dd.setStorage({
      key: _key,
      data: {
        supplierList:e
      },
      success: function() {
        // dd.alert({content: '写入成功'});
        console.log("公司缓存方法写入成功！");
      }
    });
  },
  //存入缓存（专家）
  saveExpertListInCache(_key,e){
    console.log("缓存专家方法执行")
    dd.setStorage({
      key: _key,
      data: {
        expertList:e
      },
      success: function() {
        // dd.alert({content: '写入成功'});
        console.log("缓存专家方法写入成功！");
        //  dd.navigateBack({
        //   delta: 1
        // })
      }
    });
  },
  //删除缓存（公司）
  removeIdListFromCache(_key){
    console.log("删除公司缓存方法执行"+_key)
    dd.removeStorageSync({
      key: _key,
    })
  },
  //删除缓存同步方法（专家）
  removeExpertFromCache(_key){
    console.log("删除缓存专家方法执行")
    dd.removeStorageSync({
      key: _key,
    });
  },


  //查询推荐专家
  getExpert: function(e) {
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
          for(var i=0;i<_list.length;i++){
            _list[i].checked=false;
          }
          that.setData({
            expertList:_list
          })
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
