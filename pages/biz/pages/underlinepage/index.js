let app = getApp();
Page({
  data: {
    appData: app.globalData,
    choosedItemTypeName: '',
    applyCause: '',
    //可以上传的图片的个数，默认5张
    firstItemTypeName: '',
    firstItemName: '',
    canUpImageCount: 5,
    approversList: [],  
    actionItemList: [],
    video:{
      videoWidth: 460,
    },
    arr: {
      pageObjectArray: [{
        //头部模板数组：
        purTopArray: [
          {
            typeName: '',
            itemId:'',
            itemName: '',
            typeId: 0,
            itemIndex: 0,
            nameIndex: 0,
            typeIndex: '',
            norms: '',
            count: 1,
            unit: '吨',
            //历史采购最低价、最高价、平均价
            hisPurLow: '',
            hisPurHigh: '',
            hisPurAvg: '',

          }
        ],
        //商家数组
        sellerArray: [
          {
            name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: true,
            checked: true,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: '',
          },
          {
            name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: false,
            checked: false,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: '',
          },
          {
            name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: false,
            checked: false,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: '',
          },
        ],
        //备注说明
        

      },],
      remarks: '',
      //商品分类及商品
      itemType:{
        
      },
      
      src: '/images/load/underline_download.png',
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
            itemId:'',
            typeId: 0,
            itemIndex: 0,
            nameIndex: 0,
            typeIndex: '',
            norms: '',
            count: 1,
            unit: '吨',
            //历史采购最低价、最高价、平均价
            hisPurLow: '',
            hisPurHigh: '',
            hisPurAvg: '',
        }
      ],
      sellerArray: [
        {
          name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: true,
            checked: true,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: '',
        },
        {
          name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: false,
            checked: false,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: '',
        },
        {
          name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: false,
            checked: false,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: '',
        },
      ],
    };
    this.data.arr.pageObjectArray.push(newObj);
    this.setData({
      'arr.pageObjectArray': this.data.arr.pageObjectArray,
    });
  },
  //添加商品明细（上面的商品类型、名称等）
  addPurTemple(e) {
    var actionIndexa = e.target.dataset.iddx;
    this.data.arr.pageObjectArray[actionIndexa].purTopArray.push({
     typeName: '',
            itemName: '',
            itemId:'',
            typeId: 0,
            itemIndex: 0,
            nameIndex: 0,
            typeIndex: '',
            norms: '',
            count: 1,
            unit: '吨',
            //历史采购最低价、最高价、平均价
            hisPurLow: '',
            hisPurHigh: '',
            hisPurAvg: '',
    });
    var ObjArrayLength = this.data.arr.pageObjectArray[actionIndexa].purTopArray.length;
    var newIndex = ObjArrayLength - 1;
    var temp_str4 = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray';
    this.setData({
      [temp_str4]: this.data.arr.pageObjectArray[actionIndexa].purTopArray,
    })
  },
  //采购商品类型变更事件：
  bindPickerChange(e) {
    //操作的第几个？
    var actionIndexa = e.target.dataset.iddx;
    var actionIndexaa = e.target.dataset.iddxx;
    var newTypeId = e.detail.value;
    //选择的采购类型下标
    var temp_str = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].typeId';
    var temp_str2 = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].nameIndex';
    var temp_str3 = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].typeName';
    var temp_str4 = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].itemName';

    console.log('picker发送选择改变，携带值为', e.detail.value);

    this.setData({
      //设置当前采购名称下标为0
      [temp_str2]: 0,
      //设置当前采购类型下标：
      [temp_str]: newTypeId,
      [temp_str3]: this.data.arr.itemArray[newTypeId].name,
      [temp_str4]: this.data.arr.itemArray[newTypeId].items[0].name,
    });

  },
  //采购商品规格变更事件
  bindObjPickerChangeItemSpec(e){
    var clickIndex = e.detail.value;
    console.log('picker发送选择改变，携带值为', clickIndex);
    var actionIndexa = e.target.dataset.iddx;
    var actionIndexaa = e.target.dataset.iddxx;
    var typeIndex = e.target.dataset.typeIndex;
    var nameIndex = e.target.dataset.nameIndex;

    var newItem = this.data.arr.itemType[typeIndex][nameIndex].itemList[clickIndex];
    console.log("newItem");
    console.log(newItem);
    var itemIndex = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].itemIndex';
    var itemId = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].itemId';
    var norms = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].norms';
    var unit = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].unit';
    var count = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].count';
    var hisPurLow = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].hisPurLow';
    var hisPurHigh = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].hisPurHigh';
    var hisPurAvg = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].hisPurAvg';
    

    this.setData({ [itemIndex] : clickIndex });
    this.setData({ [itemId] : newItem.pkMaterial });
    this.setData({ [norms] : newItem.materialspec?newItem.materialspec:'' });
    this.setData({ [unit] : newItem.pkMeasdoc?newItem.pkMeasdoc:'' });
    this.setData({  [count]: 1 });
    this.setData({  [hisPurLow]: newItem.historyLow?newItem.historyLow:''  });
    this.setData({  [hisPurHigh]: newItem.historyHigh?newItem.historyHigh:''  });
    this.setData({  [hisPurAvg]: newItem.historyLevel?newItem.historyLevel:''  });

  },
  //采购商品名称变更事件
  bindObjPickerChange(e) {
    var clickIndex = e.detail.value;
    console.log('picker发送选择改变，携带值为', clickIndex);
    var actionIndexa = e.target.dataset.iddx;
    var actionIndexaa = e.target.dataset.iddxx;
    var typeIndex = e.target.dataset.typeIndex;
    var newItemName = this.data.arr.itemType[typeIndex][clickIndex].name;
    var newItemId = this.data.arr.itemType[typeIndex][clickIndex].itemList[0].pkMaterial;
    var newItemnorms = this.data.arr.itemType[typeIndex][clickIndex].itemList[0].materialspec;
    var newItemUnit = this.data.arr.itemType[typeIndex][clickIndex].itemList[0].pkMeasdoc;
    var newItemHisPurLow = this.data.arr.itemType[typeIndex][clickIndex].itemList[0].historyLow;
    var newItemHisPurHigh = this.data.arr.itemType[typeIndex][clickIndex].itemList[0].historyHigh;
    var newItemHisPurAvg = this.data.arr.itemType[typeIndex][clickIndex].itemList[0].historyLevel;
   
    var itemName = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].itemName';
    var itemId = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].itemId';
    var itemIndex = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].itemIndex';
    var nameIndex = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].nameIndex';
    var norms = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].norms';
    var unit = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].unit';
    var count = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].count';
    var hisPurLow = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].hisPurLow';
    var hisPurHigh = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].hisPurHigh';
    var hisPurAvg = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray[' + actionIndexaa + '].hisPurAvg';
    
    this.setData({ [itemName] : newItemName });
    this.setData({ [itemId] : newItemId });
    this.setData({ [itemIndex] : 0 });
    this.setData({ [nameIndex] : clickIndex });
    this.setData({  [norms]: newItemnorms?newItemnorms : '' });
    this.setData({  [unit]: newItemUnit?newItemUnit : '' });
    this.setData({  [count]: 1 });
    this.setData({  [hisPurLow]: newItemHisPurLow?newItemHisPurLow : 1 });
    this.setData({  [hisPurHigh]: newItemHisPurHigh?newItemHisPurHigh : 1 });
    this.setData({  [hisPurAvg]: newItemHisPurAvg?newItemHisPurAvg : 1 });
    
  },
  changeNorms(e){
    this.changeTool(e,e.target.dataset.iddx,'purTopArray',e.target.dataset.iddxx,'norms',e.detail.value);
  },
  changeCount(e){
    this.changeTool(e,e.target.dataset.iddx,'purTopArray',e.target.dataset.iddxx,'count',e.detail.value);
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
  //获取系统相册图片
  chooseImage(e) {
    var iddx = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    var alreadyCount = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl.length;
    var upCount = this.data.canUpImageCount-alreadyCount;
    var that=this;
      that.ddChooseImage(upCount).then(function(data){
          var imagePaths = data;
          if(imagePaths){
                for(var j=0;j<imagePaths.length;j++){
                    that.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl.push(imagePaths[j]);
                }
              var temp_str = 'arr.pageObjectArray[' + iddx + '].sellerArray[' + sellerIndex + '].inquiryUrl';
                    that.setData({
                      [temp_str]:that.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl,
                    })
              
            }
            that.uploadImgs(iddx,sellerIndex);
      },function(error){
      })
  },
ddChooseImage(upCount){
  return new Promise((resolve,reject)=> {
    dd.chooseImage({
        count: upCount,
        success: (res) => {
          resolve(res.filePaths);
        },
      });
  })
},
uploadImg(url){
  return new Promise((resolve,reject)=>{
      dd.uploadFile({
            url: app.globalData.domain+'/file/upload',
            header: {
              'eticket': app.globalData.eticket
            },
            name: 'file',
            fileName: 'file',
            fileType: 'image',
            filePath: url,
            success: (res) => {
              var objj = JSON.parse(res.data);
              resolve(app.globalData.domain+objj.result);
            },
          });
          })
            
         },

  uploadImgs(iddx,sellerIndex){
    var urls = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl;
    var that = this;
      var result = [];
      var upCount = 0;

        var promiseArray = [];
        for (var i = 0; i < urls.length; i++) {
            console.log("++url:")
            console.log(urls[i])
            promiseArray.push(that.uploadImg(urls[i]));
        }
        Promise.all(promiseArray).then(function(data) {
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
  deleteImage(e) {
  var that = this;
  var iddx = e.target.dataset.iddx;
  var sellerIndex = e.target.dataset.sellerIndex;
  var imageIndex = e.target.dataset.imageIndex;
  var images = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].inquiryUrl;
  var filePath = e.target.dataset.url;
  var setStr = 'arr.pageObjectArray['+iddx+'].sellerArray['+sellerIndex+'].inquiryUrl';
  app.confirm('','确定要删除此图片吗？','确定','取消').then(function(res){
    if(res == 'true'){
      app.delFileSync(filePath).then(function(data){
        images.splice(imageIndex,1);
        that.setData({
          [setStr] :images,
        })
      })
    }
  })
 
 },
 delVideo(e){
   var that = this;
  var iddx = e.target.dataset.iddx;
  var sellerIndex = e.target.dataset.sellerIndex;
  var videoUrl = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].videoUrl;
  var filePath = e.target.dataset.url;
  var setStr = 'arr.pageObjectArray['+iddx+'].sellerArray['+sellerIndex+'].videoUrl';
  app.confirm('','确定要删除此录像吗？','确定','取消').then(function(res){
    if(res == 'true'){
      app.delFileSync(filePath).then(function(data){
        that.setData({
          [setStr] :'',
        })
      })
    }
  })
 },
 

  //发起钉钉电话
  callSeller(e){
    var iddx = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    console.log("callSeller()...");
    var callable = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].callAble;
//     dd.chooseDingTalkDir({
//     success: (res) => {
//         /* data结构
//          {"data":
//             [
//                 {
//                     "spaceId": "" //被选中的空间id
//                     "path": "", // 被选中的文件夹路径
//                     "dirId": "", //被选中的文件夹id
//                 }
//             ]
//          }
//        */
//       console.log("dd.chooseDingTalkDir:");
//       console.log(res);
//     },
//     fail: (err) =>{
//         dd.alert({
//             content:JSON.stringify(err)
//         })
//     }
// })
    if(!callable){
      dd.showToast({
        type: 'none',
        content: '联系方式格式不正确',
        duration: 1000,
        success: () => {
          return ;
        },
      });
      return ;
    }
    //获取该商家的userId
    var ddUserId = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].ddUserId;
        dd.showCallMenu({
          phoneNumber: this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].phone, // 期望拨打的电话号码
          code: '+86', // 国家代号，中国是+86
          showDingCall: true, // 是否显示钉钉电话
          success:function(res){ 
            console.log("dd.showCallMenu.success");  
            console.log(res);
          },
          fail:function(err){
            console.log("dd.showCallMenu.fail");  
          }
      });
  },
  toRecod(e){
    var that=this;
    var iddx = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    var videoUrl = 'arr.pageObjectArray['+iddx+'].sellerArray['+sellerIndex+'].videoUrl';
    var videoHttpUrl = this.data.arr.pageObjectArray[iddx].sellerArray[sellerIndex].videoUrl;
    var oldVideoUrl = '';
    if(videoHttpUrl){
      oldVideoUrl = videoHttpUrl;
    }

        dd.chooseVideo({
        sourceType: ['camera'],
        maxDuration: 60,
        success:(res)=> {
          //console.log("res.filePath...."+res.filePath);
          that.setData({
            'video.videoWidth': res.width,
          })
          dd.showLoading({
            content: '上传录像中...',
          });
          that.uploadVideo(res.filePath).then(function(data){
              console.log("调用完uploadVideo方法回去的网络路径："+data);
              that.setData({
                [videoUrl]: data,
              });
              if(oldVideoUrl){
                app.delFileSync(oldVideoUrl).then();
              }
              dd.hideLoading();
          });
          
          
        },
        fail: (err)=> {
          console.log(err)
        }
      })
  },
uploadVideo(url){
  console.log("uploadVideo(url)....url:"+url);
  return new Promise((resolve,reject)=>{
      dd.uploadFile({
            url: app.globalData.domain+'/file/upload',
            header: {
              'content-type': 'multipart/form-data',
            'eticket': app.globalData.eticket
            },
            name: 'file',
            fileName: 'file',
            filePath: url,
            success: (res) => {
              console.log("uploadVideo(url)...success...objj:");
              console.log("res:");
              console.log(res);
              console.log("res.data");
              console.log(res.data);
              var objj = JSON.parse(res.data);
              console.log(objj);
              console.log(app.globalData.domain+objj.result);
              resolve(app.globalData.domain+objj.result);
            },
          });
          })
            
         },

/**
     * 全屏改变
     */
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
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
  sellerChangeName(e){
    var actionIndexa = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    var newName = e.detail.value;
    var temp_str = "arr.pageObjectArray[" + actionIndexa + "].sellerArray[" + sellerIndex + "].name";
    this.setData({
      [temp_str]: newName,
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
  phoneChange(e){
    var actionIndexa = e.target.dataset.iddx;
    var sellerIndex = e.target.dataset.sellerIndex;
    var newQ = e.detail.value;
    var temp_str = "arr.pageObjectArray[" + actionIndexa + "].sellerArray[" + sellerIndex + "].phone";
    this.setData({
      [temp_str]: newQ,
    })
    var str2 = "arr.pageObjectArray[" + actionIndexa + "].sellerArray[" + sellerIndex + "].callAble";
    var callable = false;
    if(this.checkPhoneNum(newQ)){
      callable = true
    }
    this.setData({
      [str2]: callable,
    })
  },
  remarkInput(e){
    var remark = e.detail.value;
    this.setData({
      'arr.remarks':remark,
    })
  },
  
  
  subPruData(e){
     var urla = app.globalData.domain+'/underApprove/start';
     var pageObj = this.data.arr.pageObjectArray;
     var approves = this.data.approversList;
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
            pageObj: pageObj,remarks: this.data.arr.remarks,approves:approves,applyCause:this.data.applyCause
          }),
          dataType: 'json',
          success: (res) => {
            dd.alert({content:'提交成功'});

      //清空数据：


      var newData = [{
        //头部模板数组：
        purTopArray: [
          {
           typeName: '',
            itemName: '',
            itemId:'',
            typeId: 0,
            itemIndex: 0,
            nameIndex: 0,
            typeIndex: '',
            norms: '',
            count: 1,
            unit: '吨',
            //历史采购最低价、最高价、平均价
            hisPurLow: '',
            hisPurHigh: '',
            hisPurAvg: '',

          }
        ],
        //商家数组
        sellerArray: [
         {name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: true,
            checked: true,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: ''},
          {
           name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: false,
            checked: false,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: '',
          },
          {
            name: '',
            inquiryUrl: [],
            videoUrl:'',
            autoRec: false,
            checked: false,
            //商家报价
            quote: '',
            phone: '',
            callAble: false,
            ddUserId: '',
          },
        ],
        //备注说明
      }];
      var str1 = 'arr.pageObjectArray';
      this.setData({
        [str1]:newData,
        firstItemTypeName: '',
        firstItemName: '',
        approversList: [],
        'appData.checkedUserList': [],
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

    this.setData({
      applyCause: options.applycau,
    })
    dd.getSystemInfo({
      success: (res) => {
        this.setData({
          systemInfo: res,
        })

      }
    });
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
  goToChooseItemType(e){
    var iddx = e.target.dataset.iddx;
    var iddxx = e.target.dataset.iddxx;
    // this.setData({
    //   goIddx: iddx,
    //   goIddxx: iddxx,
    // })
    dd.navigateTo({
      url:'/pages/biz/pages/underlinepage/chooseItemType/chooseItemType'+"?iddx="+iddx+"&iddxx="+iddxx
    })
  },
  checkPhoneNum(para){
    var telephone = /^((\+86)|(86))?(13)\d{9}$/;
    var a =  /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
    console.log(a.test('0632-2306086'));
    return a.test(para);
  }

});
