Page({  
   data:{
  array:['办公用品','生活用品','情趣用品'],
  priceList:{index:0,higher:333,lower:121,avg:565 },
  objectArray: [
      {
        id: 0,
        name: '圆珠笔',
      },
      {
        id: 1,
        name: '毛笔',
      },
      {
        id: 2,
        name: '港币',
      },
      {
        id: 3,
        name: '铅笔',
      },
    ],
    arrIndex: 0,
    index: 0,
    iconSize: [20, 30, 40, 50, 60],
    iconColor: [
      'red', 'yellow', 'blue', 'green'
    ],
    iconType: [
      'success',
    ],
    priceList:{
      lower:10,
      higher:99,
      avg:55,
    }
  } ,   
bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value,
    });
  },
  bindObjPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex: e.detail.value,
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
});
