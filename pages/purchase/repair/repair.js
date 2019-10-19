let app = getApp();
Page({  
   data:{
        dates: '请选择日期',
        times: '请选择时间',
        payList:["请选择","货到付款","在线支付"],
        index:0,
        items:[{name:true}],
        type:2,
    //  标记array内部的索引
    arr:{
       pageArray:{
        //申请事由
        applyCause:'',
        //截止时间
        deadLine:"",
        //供货周期
        supplyCycle:"",
        //支付方式
        payMent:"",
        //技术支持电话
        technicalSupportTelephone:"",
        //专家评审
        expertReview:"",
        //评审奖励
        expertReward:"",
        //采购物品数组
        purchaseArray:[
          {
            //物料id
            //materialId:'',
            //规格
            //typeName: '',
            //brandName:'',
            itemName: '',
            //规格
            norms: '',
            //数量
            count: 0,
            //单位
            unit: '',
          }
          ],
        // //报价商家数
        // quoteSellerNum:0,
        // //零配件供应商
        // supplierSellerNum:0,
        //备注
        remarks:''
      },
    },
    // arr--------------------
    reason:'',
    // 增加明细
    clickTimes:1,
    // 提交表单
    // subObject:[{
    //   // 采购数组
    //     purType:'发的',
    //     purBrand:'发的',
    //     purName:'嘟嘟嘟',
    //     purSpec:'试试',
    //     purNum:'啊啊',
    //     purUnit:'啊'

    // }]
   
  } ,   

  // 返回申请事由的内容
    reasonBlur:function(e){
      console.log(e.detail.value)
        var beizhu=e.detail.value;
        this.setData({
         'arr.pageArray.applyCause':beizhu
        })
        console.log("ddd",this.data.arr.pageArray)
    },
    
    //加工物品
    changeName:function(e){
     var actionIndexa=e.target.dataset.iddx;
     console.log("加工物品index",e)
     var _itemName='arr.pageArray.purchaseArray['+actionIndexa+'].itemName';
     this.setData({
       [_itemName]:e.detail.value
     })
     console.log(this.data.arr.pageArray.purchaseArray)
    },
     
    //规格
    changeNorms:function(e){
     var actionIndexa=e.target.dataset.iddx;
     var _norms='arr.pageArray.purchaseArray['+actionIndexa+'].norms';
     this.setData({
       [_norms]:e.detail.value
     })
     console.log(this.data)
    },
    //数量
   
    changeCount:function(e){
        var actionIndexa=e.target.dataset.iddx;
        
        var _count='arr.pageArray.purchaseArray['+actionIndexa+'].count';
        this.setData({
          [_count]:e.detail.value
        })
        console.log(this.data)
    },
    //单位
    changeUnit:function(e){
      var actionIndexa=e.target.dataset.iddx;
     var _unit='arr.pageArray.purchaseArray['+actionIndexa+'].unit';
     this.setData({
       [_unit]:e.detail.value
     })
     console.log(this.data)
    },

    addSellerTemple(){
       this.data.arr.pageArray.purchaseArray.push({ itemName: '',norms: '',count: 0,unit: '',});
       this.setData({
           'arr.pageArray.purchaseArray':this.data.arr.pageArray.purchaseArray
      })
    },
    deletOne(e){
      var actionIndexa=e.target.dataset.iddx;
      console.log("删除",actionIndexa)
      var array=this.data.arr.pageArray.purchaseArray;
      console.log(array);
      var st='arr.pageArray.purchaseArray';
      array.splice(actionIndexa,1);
      console.log(array);
      console.log("data",this.data.arr.pageArray.purchaseArray)

      this.setData({
          [st]:array
      })
      console.log("data",this.data.arr.pageArray.purchaseArray)
    },
   
      //供货周期
    supplyCycle:function(e){
      console.log(e)
      this.setData({
        'arr.pageArray.supplyCycle':e.detail.value
      })
    },
    //技术支持电话
    technicalSupportTelephone:function(e){
      console.log(e)
      this.setData({
        'arr.pageArray.technicalSupportTelephone':e.detail.value
      })
    },
    //专家评审
     radioChange: function(e) {
       var expertReviewDe=e.detail.value[0];
       if(expertReviewDe!=true){
         expertReviewDe=false;
       }
       console.log('你选择的框架是：',expertReviewDe)
       this.setData({
        'arr.pageArray.expertReview':expertReviewDe
      })
    },
     //评审奖励
    rewardFun:function(e){
      console.log(e)
      this.setData({
        'arr.pageArray.expertReward':e.detail.value
      })
    },
    //-------------------------------------------------------------------------------------
    //零配件供应商数量由网络传过来
    //-------------------------------------------------------------------------------------

    //意见
    remakeFun:function(e){
      this.setData({
         'arr.pageArray.remarks':e.detail.value
      })
      console.log('提交',this.data.arr.pageArray)
    },

  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
   var deal = this.data.dates+" "+this.data.times;
    console.log("deadline:"+deal);
    this.setData({
      'arr.pageArray.deadLine':deal
    })
    
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
     console.log(e.detail.value)
     this.setData({
      dates: e.detail.value
    })
    console.log("ddd")
    var deal = this.data.dates+" "+this.data.times;
    console.log("deadline:"+deal);
    this.setData({
      'arr.pageArray.deadLine':deal
    })

  },

  //  选择支付方式
  bindPayChange: function (e) {
     var index= e.detail.value;
     if(index==0){
       index++;
       dd.alert({content: "请检查支付方式"});
     }
     console.log(index)
     var pay=this.data.payList[index]
     console.log(pay)
     this.setData({
       'index':index
    })
    this.setData({
      'arr.pageArray.payMent':pay
    })
    console.log(this.data.arr)
  },
  
  


    //提交
  
  submit(e){
     var purlist=this.data.arr.pageArray.purchaseArray;
      var _staId=app.globalData.appUser.id;
      var _orgId=app.globalData.appOrg.id;
      var _type=this.data.type;
      for(var i =0;i<purlist.length;i++){
        if(purlist[i].materialId==""){
        dd.alert({content: "请选择采购物品"});
        return;
      }
      }
     if(this.data.index==0){
         dd.alert({content: "请选择支付方式"});
        return;
      }
      console.log("eeeee",JSON.stringify(this.data.arr.pageArray))
      var _url =  app.globalData.domain+'/machining/start';
      var that=this;
       dd.httpRequest({
        headers: {
          "Content-Type": "application/json",
          'eticket': app.globalData.eticket
            },
          url:_url,
          method: 'POST',
          data:
            JSON.stringify({
            pageArray:that.data.arr.pageArray,orgId:_orgId,staffId:_staId,type:_type
          }),
          dataType: 'json',
          success(res){
            console.log("res",res)
              dd.alert({content:'提交成功',
              // success: () => {
              //   dd.navigateTo({
              //   url:'/pages/purchase/purchase'
              // })
              // },
              });
              var newPage= {applyCause:'',purchaseArray:[{ materialId:'',typeName: '',brandName:'',itemName: '',norms: '',count: 0,unit: '',}],quoteSellerNum:0,supplierSellerNum:0,remarks:''};
              that.setData({
                'arr.pageArray':newPage
              })
              dd.switchTab({
                url:'/pages/purchase/purchase'
              })
          }
       })
    },


     choosePicture(){
       dd.chooseImage({
         success: (res) => {
          img.src = res.filePaths[0];
        },
       })
         
      },

      onLoad(){
        dd.getSystemInfo({
          success: (res) => {
            this.setData({
              systemInfo: res,
            })
            
          }
        });
      },
      onReady() {
        // 页面加载完成
      },
      onShow() {
        // 页面显示
      },
      onHide() {
        // 页面隐藏
      },
      onUnload() {
        // 页面被关闭
      },
      onTitleClick() {
        // 标题被点击
      },
      onPullDownRefresh() {
        // 页面被下拉
      },
      onReachBottom() {
        // 页面被拉到底部
      },
      onShareAppMessage() {
        // 返回自定义分享信息
        return {
          title: 'My App',
          desc: 'My App description',
          path: 'pages/index/index',
        };
      },
      goToChooseItemType(e){
    var iddx = e.target.dataset.iddx;
    var iddxx = e.target.dataset.iddxx;
    // this.setData({
    //   goIddx: iddx,
    //   goIddxx: iddxx,
    // })
    dd.navigateTo({
     // url:'/pages/biz/pages/underlinepage/chooseItemType/chooseItemType'+"?iddx="+iddx+"&iddxx="+iddxx
      url:'/pages/purchase/strategyPur/chooseItemType/chooseItemType'+"?iddx="+iddx
    })
  }
});

