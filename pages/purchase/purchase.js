let app = getApp();
Page({
  data: {
    isAjax:true,
    userid:'',
    orgid:'',
    userName:'',
    appData: app.globalData,
    systemInfo:{},
    background: ['1', '2', '3'],
    msgList:[],
    workbenchPur: {
            list: [
                {
                    "icon": 0,
                    "text": "待审批",
                    "status":"completeBargaining",
                    "url": "/pages/purchase/workbench/tobeapproved/tobeapproved",
                },
                 {
                    "icon": 0,
                    "text": "待议价",
                    "status":"tobenegotiated",
                    "url": "/pages/purchase/workbench/tobenegotiated/tobenegotiated",
                },
                 {
                    "icon":0,
                    "text": "已审批",
                    "status":"passOrNot",
                    "url": "/pages/purchase/workbench/approved/approved",
                },
                 {
                    "icon": 0,
                    "text": "已议价",
                    "status":"completeBargaining",
                    "url": "/pages/purchase/workbench/completeBargainingList/completeBargainingList",
                },
                 {
                    "icon": 0,
                    "text": "被抄送",
                    "status":"chaosong",
                    "url": "/pages/purchase/workbench/copied/copied",
                },
                
            ],
            columnNum: 5
    },
    localPur: {
            list: [
                {
                    "icon": "../../images/purchase/caigou-1.png",
                    "text": "本地采购",
                    "url": "/pages/biz/pages/index",
                },
            ],
            columnNum: 3
    },
    yunPur: {
      list: [
                {
                    "icon": "../../images/purchase/caigou-2.png",
                    "text": "战略采购",
                    "url": "/pages/purchase/strategyPur/strategyPur",
                },
                {
                    "icon": "../../images/purchase/caigou-3.png",
                    "text": "询价采购",
                    "url": "/pages/purchase/enquiryPur/enquiryPur",
                },
                {
                    "icon": "../../images/purchase/caigou-4.png",
                    "text": "单一来源",
                    "url": "/pages/purchase/singleSource/singleSource",
                },
                {
                    "icon": "../../images/purchase/caigou-3.png",
                    "text": "加工",
                    "url": "/pages/purchase/machining/machining",
                },
                {
                    "icon": "../../images/purchase/caigou-4.png",
                    "text": "维修",
                    "url": "/pages/purchase/repair/repair",
                },
            ],
            columnNum: 3
    },
    yunBids: {
      list: [
                {
                    "icon": "../../images/purchase/caigou-5.png",
                    "text": "公告",
                    "url": "/pages/purchase/onlineBids/onlineBids",
                },
            ],
            columnNum: 3
    },
    vendorSearch: {
      list: [
                {
                    "icon": "../../images/purchase/caigou-6.png",
                    "text": "产品类",
                    "url": "/pages/purchase/producerMaterial/producerMaterial",
                },
                {
                    "icon": "../../images/purchase/caigou-7.png",
                    "text": "设备类",
                    "url": "/pages/purchase/equipment/equipment",
                },
                 {
                    "icon": "../../images/purchase/one_peijian.png",
                    "text": "配件类",
                    "url": "/pages/purchase/installationKit/installationKit",
                },
                
            ],
            columnNum: 3
    },
    bargain:{
       list: [
                
                {
                    "icon": "../../images/purchase/caigou-7.png",
                    "text": "议价",
                    "url": "/pages/purchase/bargain/bargain",
                },
                
            ],
            columnNum: 3
    },
  },
  onLoad(){
    //  this.setData({
    //   userid: app.globalData.appUser.id,
    //   orgid:app.globalData.appOrg.id
    // })
   
    var sysInfo = app.globalData.systemInfo;
      this.setData({
        msgList: [
         { ind:"1",url: "url", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代xxxxxxxxxxxxxxxx" },
         { ind:"2",url: "url", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
         { ind:"3",url: "url", title: "公告：你想和一群有志青年一起过生日嘛？" }
         ],
        systemInfo:sysInfo,
     });

     

    
  },
  handleItemTap(e) {
       dd.navigateTo({
      url: e.currentTarget.id,
    })
  },
  onReady(){
     var that=this;
     if(app.globalData.appUser&&app.globalData.appOrg){
       that.setData({
           id:app.globalData.appUser.id,
           orgid:app.globalData.appOrg.id,
           userName:app.globalData.appUser.userName,
         });
          //调用方法查询count
        var _id=that.data.id;
        var _orgid=that.data.orgid;
        var _username=that.data.userName;
        //发送请求，
        var appList=app.globalData.statusList;

        //待议价
        var status_tobene=appList.tobenegotiated;
        that.showCount(_orgid,status_tobene,null,_id,"tobenegotiated");

          //已议价  待审批
        var status_complete=appList.completeBargaining;
        that.showCount(_orgid,status_complete,null,_id,"completeBargaining");

        //待审批
        that.showCount_shengPi(_id,"completeBargaining");

          //通过
        var status_pass=appList.pass;
          //拒绝
        var status_refuse=appList.refuse;
        that.showCount(_orgid,status_pass,status_refuse,_id,"passOrNot");
     }else{
      var timeSet=setInterval(function(){
      if(app.globalData.appUser&&app.globalData.appOrg){
        clearInterval(timeSet);
        that.setData({
          id:app.globalData.appUser.id,
          orgid:app.globalData.appOrg.id,
          userName:app.globalData.appUser.userName,
        });
         //调用方法查询count
        var _id=that.data.id;
        var _orgid=that.data.orgid;
        var _username=that.data.userName;
        //发送请求，
        var appList=app.globalData.statusList;

        //待议价
        var status_tobene=appList.tobenegotiated;
        that.showCount(_orgid,status_tobene,null,_id,"tobenegotiated");

          //已议价  待审批
        var status_complete=appList.completeBargaining;
        that.showCount(_orgid,status_complete,null,_id,"completeBargaining");

          //通过
        var status_pass=appList.pass;
          //拒绝
        var status_refuse=appList.refuse;
        that.showCount(_orgid,status_pass,status_refuse,_id,"passOrNot");

        //待审批
        that.showCount_shengPi(_id,"completeBargaining");

       }
      },100)
      
     }
  },
  onShow(){
    var ob={
            list: [
                {
                    "icon": 0,
                    "text": "待审批",
                    "status":"completeBargaining",
                    "url": "/pages/purchase/workbench/tobeapproved/tobeapproved",
                },
                 {
                    "icon": 0,
                    "text": "待议价",
                    "status":"tobenegotiated",
                    "url": "/pages/purchase/workbench/tobenegotiated/tobenegotiated",
                },
                 {
                    "icon":0,
                    "text": "已审批",
                    "status":"passOrNot",
                    "url": "/pages/purchase/workbench/approved/approved",
                },
                 {
                    "icon": 0,
                    "text": "已议价",
                    "status":"completeBargaining",
                    "url": "/pages/purchase/workbench/completeBargainingList/completeBargainingList",
                },
                 {
                    "icon": 0,
                    "text": "被抄送",
                    "status":"chaosong",
                    "url": "/pages/purchase/workbench/copied/copied",
                },
                
            ],
            columnNum: 5
    }
    
    this.setData({
      workbenchPur:ob,
      isAjax:true
    })
    this.onReady();
  
  },
 


  showCount(x,y,z,m,n){
    var that=this;
    dd.httpRequest({
      url: app.globalData.domain+'/negotiateding/getList',
      method: 'GET',
      data: {orgId:x,status: y,secondStatus:z,userId:m},
      headers: {
        'eticket': app.globalData.eticket
      },
      dataType: 'json',
      success: (res) => {
        var _list =that.data.workbenchPur.list;
        for(var i=0;i<_list.length;i++){
          
          if(_list[i].status==n && _list[i].text!="待审批"){
            var st='workbenchPur.list['+i+'].icon';
            that.setData({
              [st]:res.data.length,
            })
          }
        }

      },

  })
  },
  //待审批
  showCount_shengPi(e,n){
      var aj=this.data.isAjax;
      if(aj){
        this.setData({
          isAjax:!aj
        })
      }else{
        return;
      }
      var that=this;
      
      var id=e;
      console.log("id"+id)
      var arr=[];
      dd.httpRequest({
            url: app.globalData.domain+'/ac/task',
            method: 'GET',
            data: {assignee:id},
            headers: {
              'eticket': app.globalData.eticket
            },
            dataType: 'json',
            success: (res) => {
                var reList=res.data.result;
                var _list =that.data.workbenchPur.list;
                
                //设置数量
                for(var i=0;i<_list.length;i++){
                  if(_list[i].text == "待审批" && _list[i].status==n ){
                    var st='workbenchPur.list['+i+'].icon';
                    that.setData({
                      [st]:res.data.result.length,
                    })

                  //将relist存入缓存中
                  dd.setStorage({
                    key:'myTask',
                    data:reList,
                    success:function(){
                      
                    },
                    fail: function(res){
                      dd.alert({content: res.errorMessage});
                    }
                  })
                    
                   
                  }
                }
            }
      })
  }
})