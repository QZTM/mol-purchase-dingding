/**设置全局变量，并在onLaunch方法中赋值 */
App({//E应用逻辑
  globalData: {
    id:"",
    corpId:'',
    authCode:'',
    //手机系统信息
    systemInfo: {},
    //域名或者ip
    domain: '',  
    //用户信息，userName,userId,avatar,position
    user: {},
    userlist: [],
    checkedUserList: [],
    //order表单状态码
    statusList:{
      //正在询价
      "waitingQuote":1,
      //采购废止
      "Purchaseabolish":3,
      //待议价
      "tobenegotiated":4,
      //已议价  待审批
      "completeBargaining":6,
      //通过
      "pass":7,
      //拒绝
      "refuse":8
    },
    //工作流的key
    processKey:'csprocessId2'
  },
  onLaunch(options) {
    //开发者后台设置的安全域名
    var that = this;
    //that.globalData.domain='http://127.0.0.1:8082';
    //that.globalData.domain='http://127.0.0.1:8083';
    //that.globalData.domain='http://2a529045z1.qicp.vip';
    //that.globalData.domain='http://fyycg1.vaiwan.com';
    that.globalData.domain='http://140.249.22.202:8082';
    // 第一次打开，监听E应用初始化	当E应用初始化完成时触发，全局只触发一次
    // options.query == {number:1}
    console.info('app.js...onLaunch()...');
    that.globalData.corpId = options.query.corpId;
    //获取系统消息并存入全局变量
    dd.getSystemInfo({
      success: (res) => {
        that.globalData.systemInfo = res;
      }
    })
    //获取authCode,成功后登陆并获取token
    dd.getAuthCode({
      success: (res) => {
        var urla = that.globalData.domain+"/app/login";
        that.globalData.authCode = res.authCode;
        dd.httpRequest({
          url:urla,
          method: 'POST',
          data: {
            authCode: res.authCode
          },
          dataType: 'json',
          success: (res) => {
            var eticket = res.data.result.eticket;
            var ddUser = res.data.result.ddUser;
            var appUser = res.data.result.user;
            var ddOrg = res.data.result.ddOrg;
            var appOrg = res.data.result.org;
            var userlist = res.data.result.ddUsersOfDept;
            that.globalData.user = ddUser;
            that.globalData.eticket = eticket;
            that.globalData.appUser = appUser;
            that.globalData.ddOrg = ddOrg;
            that.globalData.appOrg = appOrg;
            that.globalData.userlist = userlist;
          },
          fail: (res) => {
            dd.alert({ content: JSON.stringify(res) });
          },
          complete: (res) => {
            dd.hideLoading();
          }

        });
      },
      fail: (err) => {
        dd.alert({ content: JSON.stringify(err) })
      }
    })
  },

  onShow(options) {
    // 从后台被 scheme 重新打开.监听E应用显示	当E应用启动，或从后台进入前台显示时触发
    // options.query == {number:1}2222
   
  },
  getStatusName(options){
    var resultState = options;
    var resultStateName = '';
    if("0" == resultState){
                        resultStateName = "等待审批";
                    }else if("1" == resultState){
                      resultStateName = "等待审批";
                    }else if("2" == resultState){
                        resultStateName = "审批通过";
                    }
                    else if("3" == resultState){
                        resultStateName = "驳回";
                    }
                    else if("4" == resultState){
                        resultStateName = "驳回";
                    }
      return resultStateName;

  },
  strContain(str,abc){
    if(str.length<=abc.length){
      return false;
    }
    for(var i=0;i<str.length-(abc.length-1);i++){
      var astr = str.substring(i,i+abc.length);
      if(abc == astr){
        return true;
      }
    }
    return false;
  },
  //弱提示
  showToast(content,type,duration,complete){
    return new Promise((resolve,reject)=>{
      dd.showToast({
      type: type,
      content: content,
      duration: duration,
      success: (res) => {
        resolve(res);
      },
      fail:(res) => {
        reject(res);
      },
      complete:() => {
        complete
      }
    });

  })
  },
  //确认框
  confirm(title,content,confirmButtonText,cancelButtonText,){
    return new Promise((resolve,reject) => {
      dd.confirm({
      title: title,
      content: content,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      success: (result) => {
        resolve(`${result.confirm}`);
      },
    });
    })
  },
  //删除服务器中的资源文件
  delFileSync(fileHttpPath){
   var delUrl = this.globalData.domain+"/file/del";
   return new Promise((resolve,reject)=>{
//删除服务器中对应的图片：
    dd.httpRequest({
      url:delUrl,
      method:'post',
      data: {
          _method:"DELETE",
          filePath:fileHttpPath,
      },
      headers: {
        'eticket': this.globalData.eticket
      },
      // method:'delete',
      success:function(res){
        console.log("del  ...success");
        resolve(res);
        
      }
      ,fail:function(res){
      }
    })
  })
 },
 styleRequestPromise(url,methodType,data,headers){
   return new Promise((resolve,reject)=>{
//自定义异步请求方法
    dd.httpRequest({
      url:url,
      method:methodType,
      data: data,
      headers: headers,
      // method:'delete',
      success:function(res){
        resolve(res);
      }
      ,fail:function(res){
        reject(res);
      }
    })
  })
 }
});
