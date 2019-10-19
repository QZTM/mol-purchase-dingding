let app = getApp();
Page({
  data: {
    appData: app.globalData,
    //可以上传的图片的个数，默认5张
    approveStatusName: '',
    approversList: [
      
    ],
    arr: {
      pageObjectArray: [{
        //头部模板数组：
        purTopArray: [
          // {
          //   typeName: '类型1',
          //   itemName: '商品1',
          //   typeIndex: 0,
          //   nameIndex: 0,
          //   norms: '测试规格',
          //   count: 20,
          //   unit: '吨',
          //   //历史采购最低价、最高价、平均价
          //   hisPurLow: 2109,
          //   hisPurHigh: 2300,
          //   hisPurAvg: 2200,

          // },
          //  {
          //   typeName: '类型2',
          //   itemName: '商品2',
          //   typeIndex: 0,
          //   nameIndex: 0,
          //   norms: '测试规格',
          //   count: 20,
          //   unit: '吨',
          //   //历史采购最低价、最高价、平均价
          //   hisPurLow: 2109,
          //   hisPurHigh: 2300,
          //   hisPurAvg: 2200,

          // }
        ],
        //商家数组
        sellerArray: [
          // {
          //   name: 'xxxx有限公司1',
          //   inquiryUrl: ['/images/load/add-1.png','/images/load/add-1.png','/images/load/add-1.png','/images/load/add-1.png','/images/load/add-1.png'],
          //   autoRec: true,
          //   checked: true,
          //   //商家报价
          //   quote: 2230,
          //   ddUserId: 'manager1158',
          // },
          // {
          //   name: 'xxx有限公司2',
          //   inquiryUrl: [],
          //   autoRec: false,
          //   checked: false,
          //   //商家报价
          //   quote: 2250,
          //   ddUserId: '266752374326324047',
          // },
          // {
          //   name: 'xxxx有限公司3',
          //   inquiryUrl: [],
          //   autoRec: false,
          //   checked: false,
          //   //商家报价
          //   quote: 2200,
          //   ddUserId: '',
          // },
        ],
        //备注说明
        

      },],
      remarks: '',
      
      src: '/images/load/underline_download.png',
    },
    // 审核人的头像
    
  },
  // //总添加明细
  // addObjTemple() {
  //   var newObj = {
  //     purTopArray: [
  //       {
  //         typeName: this.data.firstItemTypeName,
  //         itemName: this.data.firstItemName,
  //         typeIndex: 0,
  //         nameIndex: 0,
  //         norms: '',
  //         count: 0,
  //         unit: '',
  //         hisPurLow: 0,
  //         hisPurHigh: 0,
  //         hisPurAvg: 0,
  //       }
  //     ],
  //     sellerArray: [
  //       {
  //         name: 'xxxx有限公司1',
  //         price: 0,
  //         inquiryUrl: [],
  //         autoRec: true,
  //         checked: true,
  //         quote: 3000,
  //         ddUserId: '',
  //       },
  //       {
  //         name: 'xxxx有限公司2',
  //         price: 0,
  //         inquiryUrl: [],
  //         autoRec: false,
  //         checked: false,
  //         quote: 2000,
  //         ddUserId: '',
  //       },
  //       {
  //         name: 'xxxx有限公司3',
  //         price: 0,
  //         inquiryUrl: [],
  //         autoRec: false,
  //         checked: false,
  //         quote: 1000,
  //         ddUserId: '',
  //       },
  //     ],
  //   };
  //   this.data.arr.pageObjectArray.push(newObj);
  //   this.setData({
  //     'arr.pageObjectArray': this.data.arr.pageObjectArray,
  //   });
  // },
  //添加商品明细（上面的商品类型、名称等）
  // addPurTemple(e) {
  //   var actionIndexa = e.target.dataset.iddx;
  //   this.data.arr.pageObjectArray[actionIndexa].purTopArray.push({
  //     typeName: this.data.firstItemTypeName,
  //     itemName: this.data.firstItemName,
  //     typeIndex: 0,
  //     nameIndex: 0,
  //     norms: '',
  //     count: 0,
  //     unit: '',
  //     hisPurLow: 0,
  //     hisPurHigh: 0,
  //     hisPurAvg: 0,
  //   });
  //   var ObjArrayLength = this.data.arr.pageObjectArray[actionIndexa].purTopArray.length;
  //   var newIndex = ObjArrayLength - 1;
  //   var temp_str4 = 'arr.pageObjectArray[' + actionIndexa + '].purTopArray';
  //   this.setData({
  //     [temp_str4]: this.data.arr.pageObjectArray[actionIndexa].purTopArray,
  //   })
  // },
  
 
  
  
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
  onLoad() {
    //去缓存中获取数据：
    var res = app.globalData.purchaseDetailObj;
    if(res){
        var pageObj = res;
        if(pageObj){
            this.setData({
              approversList: pageObj.approves,
              'arr.pageObjectArray': pageObj.pageObj,
              remarks: pageObj.remarks,
              approveStatusName: app.getStatusName(pageObj.status),
            })
        }
    }
    
  },
  onReady() {
    
    
  },
  onShow() {
   

  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
    app.globalData.purchaseDetailObj={};
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
 

});
