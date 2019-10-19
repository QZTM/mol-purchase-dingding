let app = getApp();


//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名

Page({
  data: {
    corpId: '',
    authCode: '',
    user:{

    },
    hideList: true,

    yunPur: {
      list: [
        {
          "icon": "../../images/purchase/caigou-2.png",
          "text": "进行中",
          "url": "/pages/purchase/strategyPur/strategyPur",
        },
        {
          "icon": "../../images/purchase/caigou-3.png",
          "text": "已完成",
          "url": "/pages/purchase/enquiryPur/enquiryPur",
        },
        {
          "icon": "../../images/purchase/caigou-4.png",
          "text": "历史采购",
          "url": "/pages/purchase/singleSource/singleSource",
        },
      ],
      columnNum: 3
    },
  },

  onLoad() {
    this.setData({
      corpId: app.globalData.corpId,
      user: app.globalData.user,
    })

// dd.getStorage({
//       key: 'currentCity',
//       success: function (res) {
//         let avatar = res.data.avatar
//         let userName = res.data.userName
//         _this.setData({
//           avatar: avatar,
//           userName: userName,
//         })
//       },
//       fail: function (res) {
//         dd.alert({ content: res.errorMessage });
//       }
//     });

  },
});
