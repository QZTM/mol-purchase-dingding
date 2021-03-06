let app = getApp();
Page({  
   data:{
        dates: '请选择日期',
        payList:["请选择","货到付款","在线支付"],
        index:0,
        isExpert:false,
        items:[{name:true}],
    //  标记array内部的索引
    arr_index_1:0,
    arr_index_2:0,
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
        //电子合同
        electronicContract:true,
        //采购物品数组
        purchaseArray:[
          {
            typeIndex:"",
             //物料id
            materialId:'',
            typeName: '',
            brandName:'',
            itemName: '',
            //规格
            norms: '',
            //数量
            count:'',
            //单位
            unit: '',
          }
          ],
        pkSupplier:'',
        //单一供应商
        singleSource:'',
        //电话
        telePhone:'',
        //备注
        remarks:''
      },
       itemObj:{}
      
    },
    // arr--------------------
    //公司名称
    supplierName:"",
    reason:'',
    // 增加明细
    clickTimes:1,
    
  } ,   
  // 返回申请事由的内容
    reasonBlur(e){
      console.log(e.detail.value)
        
        this.setData({
         'arr.pageArray.applyCause':e.detail.value
        })
        console.log("ddd",this.data.pageArray)
    },
    // 返回采购类型

    addSellerTemple(){
      this.data.arr.pageArray.purchaseArray.push({ materialId:'',typeName: '',brandName:'',itemName: '',norms: '',count: 0,unit: '',});
      this.setData({
          'arr.pageArray.purchaseArray':this.data.arr.pageArray.purchaseArray,
          'arr.pageArray.singleSource':'',
          'arr.pageArray.telePhone':0
      })
     
    },
    addUnderlinepageTempleCenter(){
        this.setData({
          clickTimes:this.data.clickTimes+1,     
        })
    },
    
    //采购名称变动
    bindObjNameChange(e){
    
    
    var clickIndex = e.detail.value;
    console.log('picker发送选择改变，携带值为', clickIndex);
    var actionIndexa = e.target.dataset.iddx;
    var actionIndexaa = e.target.dataset.iddxx;
    var typeIndex = e.target.dataset.typeIndex;
    var newItemName = this.data.arr.itemObj[typeIndex][clickIndex].name;
    var newItemId = this.data.arr.itemObj[typeIndex][clickIndex].itemList[0].pkMaterial;
    var newItemnorms = this.data.arr.itemObj[typeIndex][clickIndex].itemList[0].materialspec;
    var newItemUnit = this.data.arr.itemObj[typeIndex][clickIndex].itemList[0].pkMeasdoc;
   
   
    var itemName = 'arr.pageArray.purchaseArray['+actionIndexa+'].itemName';
    var itemId = 'arr.pageArray.purchaseArray['+actionIndexa+'].itemId';
    var itemIndex = 'arr.pageArray.purchaseArray['+actionIndexa+'].itemIndex';
    var nameIndex = 'arr.pageArray.purchaseArray['+actionIndexa+'].nameIndex';
    var norms = 'arr.pageArray.purchaseArray['+actionIndexa+'].norms';
    var unit = 'arr.pageArray.purchaseArray['+actionIndexa+'].unit';
    var count = 'arr.pageArray.purchaseArray['+actionIndexa+'].count';
   
    
    this.setData({ [itemName] : newItemName });
    this.setData({ [itemId] : newItemId });
    this.setData({ [itemIndex] : 0 });
    this.setData({ [nameIndex] : clickIndex });
    this.setData({  [norms]: newItemnorms?newItemnorms : '' });
    this.setData({  [unit]: newItemUnit?newItemUnit : '' });
    this.setData({  [count]: 1 });
  
    },
    //规格
    purSpec:function(e){
     var clickIndex = e.detail.value;
    console.log('picker发送选择改变，携带值为', clickIndex);
    var actionIndexa = e.target.dataset.iddx;
    var actionIndexaa = e.target.dataset.iddxx;
    var typeIndex = e.target.dataset.typeIndex;
    var nameIndex = e.target.dataset.nameIndex;
    console.log("1")
    var newItem = this.data.arr.itemObj[typeIndex][nameIndex].itemList[clickIndex];
    console.log("newItem");
    console.log(newItem);
 

    var itemId = 'arr.pageArray.purchaseArray['+actionIndexa+'].itemId';
    var itemIndex = 'arr.pageArray.purchaseArray['+actionIndexa+'].itemIndex';
    var norms = 'arr.pageArray.purchaseArray['+actionIndexa+'].norms';
    var unit = 'arr.pageArray.purchaseArray['+actionIndexa+'].unit';
    var count = 'arr.pageArray.purchaseArray['+actionIndexa+'].count';
    

    this.setData({ [itemIndex] : clickIndex });
    this.setData({ [itemId] : newItem.pkMaterial });
    this.setData({ [norms] : newItem.materialspec?newItem.materialspec:'' });
    this.setData({ [unit] : newItem.pkMeasdoc?newItem.pkMeasdoc:'' });
    this.setData({  [count]: 1 });

    },
    //数量
    changeCount:function(e){
    console.log("数量",e.detail.value)
    var num=e.detail.value;
    var countIndex = e.target.dataset.iddx
    console.log("iddx",countIndex)
    var _count='arr.pageArray.purchaseArray['+countIndex+'].count';
    this.setData({
      [_count]:num
    })
    console.log(this.data.arr.pageArray)
    },
    //单位
    purUnit:function(e){
      var actionIndexa=e.target.dataset.iddx;
     var _unit='pageArray.purchaseArray['+actionIndexa+'].unit';
     this.setData({
       [_unit]:e.detail.value
     })
     console.log(this.data.pageArray)
    },
    //报价商家数
    quoteSellerNumFun:function(e){
      console.log(e)
      this.setData({
        'pageArray.quoteSellerNum':e.detail.value
      })
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
        var _phone=e.detail.value;
        var bo=this.checkPhoneNum(_phone);
        if(bo){
          this.setData({
            'arr.pageArray.technicalSupportTelephone':_phone
          })
        }else{
          dd.alert({content: "电话号码输入有误"});
        }
        
      },
      checkPhoneNum(para){
        console.log("校验电话号码")
        console.log(para)
        var a =  /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
        return a.test(para);
      },
    //专家评审
     radioChange: function(e) {
       var expertReviewDe=e.detail.value[0];
       if(expertReviewDe!=true){
         expertReviewDe=false;
       }
       console.log('你选择的框架是：',expertReviewDe)
       this.setData({
        'arr.pageArray.expertReview':expertReviewDe,
         isExpert:expertReviewDe
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
      console.log('data')
      console.log(this.data)
    },

//  点击时间组件确定事件  
  // bindTimeChange: function (e) {
  //   console.log("谁哦按")
  //   this.setData({
  //     times: e.detail.value
  //   })
  //  var deal = this.data.dates+" "+this.data.times;
  //   console.log("deadline:"+deal);
  //   this.setData({
  //     'arr.pageArray.deadLine':deal
  //   })
    
  // },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
     console.log(e.detail.value)
     this.setData({
      dates: e.detail.value
    })
    console.log("ddd")
    var deal = this.data.dates;
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
    console.log(this.data)
  },


  //电子合同选项
   switchChange (e){
    console.log('switchChange 事件，值:', e.detail.value);
    var that =this;
    that.setData({
      'arr.pageArray.electronicContract':e.detail.value
    })
    console.log(that.data.arr)
   },



    //提交
  submit(e){

     var that=this;
     dd.showLoading({
     content:'提交中...',
     delay:0,
     success:function(){
        var _staId=app.globalData.appUser.id;
        var _orgId=app.globalData.appOrg.id;
        var _pkSupplier=that.data.supplierName; 
        //console.log(_pkSupplier)
        if( _pkSupplier==""){
          dd.hideLoading();
          dd.alert({content: "没有行业供应商"});
          return;
        }
        //申请事由
        var _applyCause=that.data.arr.pageArray.applyCause;
        if(_applyCause==''){
          dd.hideLoading();
          dd.alert({content: "申请事由不能为空"});
          return;
        }
        //截止日期**
        var _data=that.data.arr.pageArray.deadLine;
        //console.log(_data)
        if(_data==''){
          dd.hideLoading();
          dd.alert({content: "请选择截止日期"});
          return;
        }
        //供货周期
        var _supplyCycle=that.data.arr.pageArray.supplyCycle;
        if(_supplyCycle==''){
          dd.hideLoading();
          dd.alert({content: "请填写供货周期"});
          return;
        }
        //技术支持电话
        var _tst=that.data.arr.pageArray.technicalSupportTelephone;
        if(_tst=='' && that.technicalSupportTelephone){
          dd.hideLoading();
          dd.alert({content: "请填写技术支持电话"});
          return;
        }
        //需求备注
        var _remarks=that.data.arr.pageArray.remarks;
        if(_remarks==''){
          dd.hideLoading();
          dd.alert({content: "请填写需求备注"});
          return;
        }
        //专家
        var _expertReview=that.data.arr.pageArray.expertReview;
        var _expertReward=that.data.arr.pageArray.expertReward;
        if(_expertReview==true){
          if(_expertReward==''){
            dd.hideLoading();
            dd.alert({content: "请填写推荐金额"});
            return;
          }
        }
        
        var purlist=that.data.arr.pageArray.purchaseArray;
          for(var i =0;i<purlist.length;i++){
            if(purlist[i].materialId==""){
            dd.hideLoading();
            dd.alert({content: "请选择采购物品"});
            return;
          }
          }
          if(that.data.index==0){
            dd.hideLoading();
            dd.alert({content: "请选择支付方式"});
            return;
          }
          //console.log("eeeee",JSON.stringify(that.data.pageArray))
          var _url =  app.globalData.domain+'/single/start';
          dd.httpRequest({
            headers: {  
              "Content-Type": "application/json",
              'eticket': app.globalData.eticket
            },
              contentType:"application/json",
              url:_url,
              method: 'POST',
              data:
                JSON.stringify({
                pageArray:that.data.arr.pageArray,orgId:_orgId,staffId:_staId
              }),
              dataType: 'json',
              success(res){
                console.log(res)
                dd.hideLoading();
                var back=res.data.message
                dd.alert({content:back,
                  success: () => {
                    dd.switchTab({
                    url:'/pages/purchase/purchase'
                  })
                  },
                  });
                var newPagearray={applyCause:'',purchaseArray:[{materialId:'',typeName: '',brandName:'',itemName: '',norms: '',count: 0,unit: '',}],pkSupplier:"",telePhone:0,remarks:''};
                that.setData({
                  'arr.pageArray':newPagearray
                })
              }
          })
       },
       fail(){
          dd.hideLoading();
          dd.alert({content:'提交失败' })
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
          var that=this;
         console.log("页面显示")
         // 发送请求，查询相关的供应商
          var li=that.data.arr.pageArray.purchaseArray[0].typeIndex;
          var supp=that.data.supplierName;
           console.log("第一个："+li)
           console.log("第二个："+supp)
          if(supp==null ||supp ==""){
          if( li!=""){
          console.log("查询供应商")
          var _pkmaClass=that.data.arr.pageArray.purchaseArray[0].typeIndex;
          var _url=app.globalData.domain+"/single/getSupplier"
          
          dd.httpRequest({
            headers: {  
                'eticket': app.globalData.eticket
              },
                url:_url,
                method: 'GET',
                data:{
                  pkmaClass:_pkmaClass
                },
                dataType: 'json',
                success(res){
                  console.log("res")
                  console.log(res)
                  var supp = res.data.result;
                  if(supp!=null && supp.length>0){
                      var arr=[];
                      
                      for(var i=0;i<supp.length;i++){
                        var st="";
                        st=st+supp[i].name;
                        st=st+" ";
                        st=st+supp[i].industryFirst;
                        arr.push(st);
                      }
                      
                    
                      dd.showActionSheet({
                        title: '请选择智能推荐的供应商',
                        items: arr,
                        cancelButtonText: '取消好了',
                        success: (res) => {
                          // const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
                          //   dd.alert({
                          //   title: `你点了${btn}按钮`
                          // });
                          var index=res.index;
                          console.log(index)
                          var _supplierId=supp[index].pkSupplier;//公司id；
                          var _supplierName=supp[index].name;//公司名称
                          //var _supplierPhone=supp[index].telePhone;//公司电话；
                          console.log("数组")
                            console.log(_supplierId)
                            console.log(_supplierName)
                          that.setData({
                            'arr.pageArray.pkSupplier':_supplierId,
                            supplierName:_supplierName,
                          })
                        },
                      });
                  }else{
                    dd.alert({content:'未查询到相关的供应商'});
                    that.setData({
                       'arr.pageArray.pkSupplier':'',
                      supplierName:'',
                    })
                  }
                
                }
            })
          }
          }
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
        if(iddx==0){
          this.setData({
            pkSupplier:'',
            supplierName:'',
          })
        }
        var iddxx = e.target.dataset.iddxx;
        console.log("iddx",iddx)
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

