Page({
  data:{
   approvalList:{
     headSrc:'/images/purchase/caigou-1.png',
     application:'测试申请事由',
     type:'测试采购类型',
     name:'测试采购名称',
     speci:'测试规格',
     num:'测试数量',
     unit:'测试单位',
     totalMoney:'999',
     histroylower:330,
     histroyheigher:2228,
     histroyavg:254,
     remarks:'这是一条备注说明',
     sellerList:[
       {
         sellerName:'测试商家一',
         price:'测试商家一价格',
         lower:19,
         heigher:2100,
         avg:1100,
         link:'测试商家一链接',
         sellerSrc:'/images/purchase/caigou-2.png',
       },
       {
          sellerName:'测试商家2',
         price:'测试商家2价格',
         lower:9,
         heigher:200,
         avg:100,
         link:'测试商家2链接',
         sellerSrc:'/images/purchase/caigou-1.png',
       },
     ]
   },
   },
  onLoad() {
      //  屏幕宽度
     dd.getSystemInfo({
       success:(res) =>{
         this.setData({
           systemInfo:res,
         })
       }
     })
  },
  // 审批的结果处理
  radioChange: function(e) {
    console.log('你选择的框架是：', e.detail.value)
  },
  // 意见
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  //备注
  beizhuTextAreaBlur: function(e){
    console.log(e.detail.value)
  }
});
