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
    that.getExpert();


   
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

 
});
