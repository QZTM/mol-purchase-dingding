let app = getApp();
Page({
  data: {
    appData: app.globalData,
    //可以上传的图片的个数，默认5张
    firstItemTypeName: '',
    firstItemName: '',
    canUpImageCount: 5,
    approversList: [],
    arr: {
      
      pageObjectArray: [{
        //头部模板数组：
        purTopArray: [
          {
            typeName: '',
            itemName: '',
            norms: '',
            count: 0,
            unit: '',
            //历史采购最低价、最高价、平均价
            hisPurLow: 2109,
            hisPurHigh: 2300,
            hisPurAvg: 2200,
            platForm:''
          }
        ],
        //商家数组
        sellerArray: [
          // {
          //   plat:'天猫',
          //   name: 'xxxx有限公司1',
          //   inquiryUrl: ['http://photocdn.sohu.com/20120613/Img345541308.jpg','http://photocdn.sohu.com/20120613/Img345541308.jpg','http://photocdn.sohu.com/20120613/Img345541308.jpg','http://photocdn.sohu.com/20120613/Img345541308.jpg','http://photocdn.sohu.com/20120613/Img345541308.jpg'],
          //   autoRec: true,
          //   checked: true,
          //   //商家报价
          //   quote: 2230,
          //    link:'www.ceshilianjie1.com',
          //   ddUserId: 'manager1158',
          // },
          
        ],
        //备注说明
      },],
      remarks: '',
      //商品分类及商品
      applyCause:'',
      itemArray:[],
     
    },
    // 审核人的头像
    
  },
  //总添加明细
  addObjTemple() {
    var newObj = {
      purTopArray: [
        {
          typeName: '',
          itemName: '',
          norms: '',
          count: 0,
          unit: '',
          hisPurLow: 0,
          hisPurHigh: 0,
          hisPurAvg: 0,
        }
      ],
      sellerArray: [
      ],
    };
    this.data.arr.pageObjectArray.push(newObj);
    this.setData({
      'arr.pageObjectArray': this.data.arr.pageObjectArray,
    });
    console.log("增加",this.data.arr.pageObjectArray)
  },
  
  changeNorms(e){
    this.changeTool(e,e.target.dataset.iddx,'purTopArray',e.target.dataset.iddxx,'norms',e.detail.value);
  },
  changeCount(e){//this.data.arr.pageObjectArray[].purTopArray.count,
    // this.changeTool(e,e.target.dataset.iddx,'purTopArray',e.target.dataset.iddxx,'count',e.detail.value);
    console.log("数量",e.detail.value)
    var num=e.detail.value;
    var countIndex = e.target.dataset.iddx
    console.log("iddx",countIndex)
    var _count='arr.pageObjectArray['+countIndex+'].purTopArray[0].count'
    this.setData({
      [_count]:num
    })
    console.log(this.data.arr.pageObjectArray)
  },
  changeUnit(e){
    this.changeTool(e,e.target.dataset.iddx,'purTopArray',e.target.dataset.iddxx,'unit',e.detail.value);
  },
  changeTool(e,iddx,arrayName,iddxx,name,newValue){
    var temp_str = 'arr.pageObjectArray[' + iddx + '].'+arrayName+'[' + iddxx + '].'+name;
    if(name=='count'){
      newValue=newValue*1;
    }
    this.setData({
      [temp_str]: newValue,
    });
  },
  // 选择商品来源平台
  selectPlatForm(e){
    //供货平台
    var _platform=e.currentTarget.dataset['platfrom']
    
    var index = e.currentTarget.dataset.iddx
    var this_platform='arr.pageObjectArray['+index+'].purTopArray[0].platForm'
    this.setData({
      [this_platform]:_platform
    })
    console.log("数据：",this.data.arr.pageObjectArray)
    // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    // ！！！！！！！！！！！！！！！！！！！！！！！！调用爬虫this.data.arr.purTopArray['+iddx+'].platForm
  },
  //获取系统相册图片
  chooseImage(e) {
    var iddx = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    var alreadyCount = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl.length;
    var upCount = this.data.canUpImageCount-alreadyCount;
    dd.chooseImage({
      count: upCount,
      success: (res) => {
        var imagePaths = res.filePaths;
      if(imagePaths){
              for(var j=0;j<imagePaths.length;j++){
                this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl.push(imagePaths[j]);
              }
            var temp_str = 'arr.pageObjectArray[' + iddx + '].sellerArray[' + sellerIndex + '].inquiryUrl';
            this.setData({
                [temp_str]:this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl,
            })
          }
       this.uploadImgs(iddx,sellerIndex);
      },
    })
  },
  uploadImg(url){
  console.log('url',url)
    return new Promise((resolve,reject)=>{
      dd.uploadFile({
            url: app.globalData.domain+'/file/upload',
            fileType: 'image',
            fileName: 'file',
            filePath: url,
            success: (res) => {
              var objj = JSON.parse(res.data);
              resolve(app.globalData.domain+objj.result);
            },
          });
          })
            
         },
  uploadImgs(){
    //uploadImgs(iddx,sellerIndex){
    // var urls = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl;
    // var that = this;
    //   var result = [];
    //   var upCount = 0;

    //     var promiseArray = [];
    //     for (var i = 0; i < urls.length; i++) {
    //         promiseArray.push(this.uploadImg(urls[i]));
    //     }
    //     Promise.all(promiseArray).then(function(data) {
    //       console.log(data);
    //       var str = 'arr.pageObjectArray['+iddx+'].sellerArray['+sellerIndex+'].inquiryUrl';
    //       that.setData({
    //           [str]: data,
    //      })

    //              })
    var list=this.data.arr.pageObjectArray;
    console.log('list',list)
    var promiseArray=[];
    for (var i =0 ; i<list.length;i++){
      var list_list=list[i].sellerArray;
      console.log('list_list',list_list)
      for(var j=0;j<list_list.length;j++){
        var list_list_list=list_list[j].inquiryUrl
          for(var k=0;k<list_list_list.length;k++){
            var value =list_list_list[k];
           // console.log('value',value)
           var re=this.uploadImg(value).then(function(e){
              console.log('返回的路径',e)
           })
           
            promiseArray.push(this.uploadImg(value))
          }
      }
    }
  console.log('promiseArray',promiseArray)
    Promise.all(promiseArray).then(function(data) {
          console.log('data',data);
          var str = 'arr.pageObjectArray['+iddx+'].sellerArray['+sellerIndex+'].inquiryUrl';
          that.setData({
              [str]: data,
         })
                
  
        })
  },
  //预览图片
  previewImage(e) {
    var iddx = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    var imageIndex = e.target.dataset.imageIndex;
    dd.previewImage({
      current: imageIndex,
      urls: this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl,
    });
  },
  //发起钉钉电话
  callSeller(e){
    var iddx = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    console.log("callSeller()...");
    //获取该商家的userId
    var ddUserId = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].ddUserId;
            dd.callUsers({
            users: [ddUserId], //用户列表，工号
            success:function(res){   
            },
            fail:function(err){
            }
        })
  },
  //选中某商家
  checkThisSeller(e) {
    var actionIndexa = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    var length = this.data.arr.pageObjectArray[actionIndexa].sellerArray.length;
    for (var j = 0; j < length; j++) {
      var temp_str = "arr.pageObjectArray[" + actionIndexa + "].sellerArray[" + j + "].checked"
      this.setData({
        [temp_str]: false,
      })
    }
    var temp_str2 = "arr.pageObjectArray[" + actionIndexa + "].sellerArray[" + sellerIndex + "].checked";
    this.setData({
      [temp_str2]: true,
    })
  },
  sellerChangeQuote(e){
    var actionIndexa = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    var newQ = e.detail.value*1;
    var temp_str = "arr.pageObjectArray[" + actionIndexa + "].sellerArray[" + sellerIndex + "].quote";
    this.setData({
      [temp_str]: newQ,
    })
  },
  remarkInput(e){
    var remark = e.detail.value;
    this.setData({
      'arr.remarks':remark,
    })
    console.log("aa",this.data.arr)
  },
  getRealUrl(url){
      dd.httpRequest({
        url: app.globalData.domain+'/upload/image',
        filePath: url,
        name: 'file',
        headers: {
        'content-type': 'multipart/form-data',
		'eticket': app.globalData.eticket
      },
        method: 'POST',
        data: {
          imagePath: url,
        },
        success: function(res) {
         
          dd.alert({content: res}); 
          console.log(res);
           return res.data.result;
        },
      })
  },
  subPruData(e){
    var that =this;
    //  this.uploadImgs();
     //var urla = app.globalData.domain+'/underApprove/start';
    var urla = app.globalData.domain+'/onlineApprove/start';
     var pageObj = that.data.arr.pageObjectArray;

    // for(var u=0;u<pageObj.length;u++){
    //   var sellers = pageObj[u].sellerArray;
    //   for(var p=0;p<sellers.length;p++){
    //     var imgUrls = sellers[p].inquiryUrl;
    //     if(imgUrls && imgUrls.length > 0){
    //       for(var i=0;i<imgUrls.length;i++){
    //           //上传图片r
    //           var aurl = imgUrls[i];

    //           var newUrl = this.getRealUrl(aurl);

 
    //       }
    //     }
    //   }
    // }

     var approves = that.data.approversList;
     if(approves.length<1){
       dd.alert({content: "请选择审批人！"});
       return;
     }
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json",
		  'eticket': app.globalData.eticket
        },
          url:urla,
          method: 'POST',
          data: 
            JSON.stringify({
            pageObj: pageObj,remarks: that.data.arr.remarks,approves:approves,applyCause:that.data.arr.applyCause
          }),
          dataType: 'json',
          success: (res) => {
             dd.alert({content:'提交成功'});
            var newArr={
               pageObjectArray: [{
                  purTopArray: [
                    {
                      typeName: '',
                      itemName: '',
                      norms: '',
                      count: 0,
                      unit: '',
                      hisPurLow: 0,
                      hisPurHigh: 0,
                      hisPurAvg: 0,
                    }
                  ],
                  sellerArray: [
                  ],
                },],
                remarks: '',
                applyCause:'',
                itemArray:[],
            }
          that.setData({
            'arr':newArr
          })
          },
          fail: (res) => {
            console.log("httpRequestFail---", res)
            dd.alert({ content: JSON.stringify(res) });
          },
          complete: (res) => {
            dd.hideLoading();
          }

        });
  },
  removeUser(e){
    var userid = e.target.dataset.ruserid;
    var checkedUsers = this.data.approversList;
    for(var i=0;i<checkedUsers.length;i++){
        var aUserId = checkedUsers[i].userid;
        console.log("要删除的userid:"+userid+",,循环中的userid:"+aUserId);
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
      url: "/pages/biz/pages/all-approver-list/all-approver-list"
    })
  },
  onLoad(options) {
    dd.getSystemInfo({
      success: (res) => {
        this.setData({
          systemInfo: res,
        })

      }
    });
    var applycau=options.applycau;
    console.log('传递的参数',applycau);
    this.setData({
      'arr.applyCause':applycau
    })
  },
  onReady() {
    
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
  getUser() {
    dd.navigateTo({
      url: "/pages/biz/pages/userList/userList"
    })
  },
  //采购名称变动
    bindObjNameChange(e){
      console.log("eeee",e)
    var actionIndexa = e.target.dataset.iddx;
    var that=this;
    // //先清除
    var _sList=that.data.arr.pageObjectArray[actionIndexa].sellerArray;
    _sList.splice(0,_sList.length)
    // var _sList='this.data.arr.pageObjectArray['+actionIndexa+'].sellerArray';
    // var s=[];
    // that.setData({
    //   [_sList]:s
    // })
    console.log("清除",that.data.arr.pageObjectArray[actionIndexa].sellerArray)
    var newItemNameIndex = e.detail.value;
    var newItemName = this.data.arr.itemArray[newItemNameIndex].name;
    var newItemnorms = this.data.arr.itemArray[newItemNameIndex].materialspec;
    var newItemUnit = this.data.arr.itemArray[newItemNameIndex].pkMeasdoc;
    var temp_str2 = 'arr.pageObjectArray[' + actionIndexa + ']purTopArray[0].itemName';
    var temp_str3 = 'arr.pageObjectArray[' + actionIndexa + ']purTopArray[0].norms';
    var temp_str4 = 'arr.pageObjectArray[' + actionIndexa + ']purTopArray[0].unit';
    var temp_str5 = 'arr.pageObjectArray[' + actionIndexa + ']purTopArray[0].count';
    this.setData({
      [temp_str2]: newItemName,
    });
    if(newItemnorms){
       this.setData({
          [temp_str3]: newItemnorms,
        });
    }else{
      this.setData({
          [temp_str3]: '',
        });
    }
    if(newItemUnit){
      this.setData({
          [temp_str4]: newItemUnit,
        });
    }else{
      this.setData({
          [temp_str4]: '',
        });
    }

    this.setData({
          [temp_str5]: 1,
        });
        //采购名称变动，发起网络请求，调取爬虫数据
        var _goodsName=this.data.arr.pageObjectArray[actionIndexa].purTopArray[0].itemName;
        var _itemType=this.data.arr.pageObjectArray[actionIndexa].purTopArray[0].typeName;
        var _orderRule='OrderBySalesVolume';
        var _count='1';
        console.log("_goodsName",_goodsName);
        var _url= app.globalData.domain+'/getNetItemList';
        dd.httpRequest({
          headers:{
              "Content-Type": "application/json",
		      'eticket': app.globalData.eticket
          },
          url:_url,
          method:"GET",
          data:{
            goodsName:_goodsName,itemType:_itemType,orderRule:_orderRule,count:_count
          },
          dataType: 'json',
          success:function(e){
            var reList =e.data.result;
            console.log("relist",e)
            console.log(" app.globalData.eticket", app.globalData.eticket);
            // var _sellerList=[];
            for(var i=0;i<reList.length;i++){
              if(reList[i].dataChannel=='JingDong'){
                reList[i].dataChannel='京东';
              }
               if(reList[i].dataChannel=='PinDuoDuo'){
                reList[i].dataChannel='拼多多';
              }
               if(reList[i].dataChannel=='TianMao'){
                reList[i].dataChannel='天猫';
              }
              var newSellerListOne={
                plat:reList[i].dataChannel,
                name:reList[i].name,
                inquiryUrl:reList[i].inquiryUrl,
                autoRec:reList[i].autoRec,
                checked:reList[i].checked,
                quote:reList[i].quote,
                link:reList[i].link,
                ddUserId:"null"
              }
              console.log("newSellerListOne",newSellerListOne)
              that.data.arr.pageObjectArray[actionIndexa].sellerArray.push(newSellerListOne);
              var _add='arr.pageObjectArray['+actionIndexa+'].sellerArray'
              that.setData({
                [_add]:that.data.arr.pageObjectArray[actionIndexa].sellerArray
              })
            }
            
            // 店铺名称
            // 价格
            // 链接
            // 图片
          }
        })
    },

    goToChooseItemType(e){
    var iddx = e.target.dataset.iddx;
    console.log("e",e)
    console.log("iddx",iddx)
    dd.navigateTo({
      url:'/util/grid/onlineItemType/onlineItemType'+"?iddx="+iddx
    })
  }
});
