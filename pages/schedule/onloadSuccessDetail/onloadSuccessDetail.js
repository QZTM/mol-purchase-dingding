Page({
  data: {
    arr:{
      status:'等待报价',
      // 审批人头像
      checkList:[
        {
          id:0,
          src:'/images/load/add-1.png',
        },
        {
          id:1,
          src:'/images/load/online_upload.png'
        }
      ],
      // 意见
      messages:'意见就是没有意见,萨达十大大大大是的撒大大大实打实大声道阿萨达十大大多数',
      // 采购清单
      procurementList:[
        {name:'采购方式',value:'在线单一来源采购'},
        {name:'采购类型',value:'零配件'},
        {name:'品牌',value:'牌子货'},
        {name:'名称',value:'轴承'},
        {name:'规格',value:'6201'},       
        {name:'单位',value:'个'},
        // 数量需要填写
      ],
      // 供应商的采购信息
      supplierList:[
        {name:'名称',value:'山东**有限公司',unit:''},
        {name:'拖把',value:'62.5',unit:'元'},
        {name:'数量',value:'2',unit:'把'},
      ],
      // 资费信息
      cachList:[
         {name:'税后价',value:'88'},
        {name:'税费',value:'3.1'},
        {name:'总价',value:'142.6'},
      ]
    }
  },
  onLoad() {},
});
