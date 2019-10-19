let app = getApp();
Page({
  data: {
    userlist: [],
    checkedUserCount: 0,
    allUserCount: 0,
    allChecked: false,
    checkedUserList: [],
    appData: app.globalData,
  },
  onLoad() {
    this.setData({
      userlist:app.globalData.userlist,
      allUserCount:app.globalData.userlist.length,
    })
  },
  onSubmit(e) {
    // dd.alert({
    //   content: `你选择的框架是 ${e.detail.value.libs.join(', ')}`,
    // });
   

    app.globalData.checkedUserList = this.data.checkedUserList;

      dd.navigateBack({
          delta: 1
        })
    // dd.setStorage({
    //   key: 'approveuserlist',
    //   data: this.data.checkedUserList,
    //   success: function() {
    //     console.log("userlist.setStorage.success");
        
    //   }
    // });
    
  },
    checkAll() {
    if (!this.data.allChecked) {
      for (var index in this.data.userlist) {
        var swe = 'userlist[' + index + '].checked';
        this.setData({
          [swe]: true,
          checkedUserCount: this.data.allUserCount,
          checkedUserList: this.data.userlist,
        })
      }
      this.setAllChecked(true);
    } else {
      for (var index in this.data.userlist) {
        var swe = 'userlist[' + index + '].checked';
        this.setData({
          [swe]: false,
          checkedUserCount: 0,
          checkedUserList: [],
        })
      }
      this.setAllChecked(false);
    }

    app.globalData.checkedUserList = this.data.checkedUserList;
    // dd.setStorage({
    //   key: 'approveuserlist',
    //   data: this.data.checkedUserList,
    //   success: function() {
        
    //   }
    // });

  },
  onChange(e) {
  },
  checkboxChange(e) {
    var ind = e.target.dataset.iddx;
    var swe = 'userlist[' + ind + '].checked';
    var oldState = this.data.userlist[ind].checked;
    //封装操作的用户ID和头像
    var actionUser = {
      name: this.data.userlist[ind].name,
      userid: this.data.userlist[ind].userid,
      avatar: this.data.userlist[ind].avatar
    }
    if (oldState == true) {
      var newCheckedUserCount = this.data.checkedUserCount - 1;

      //查找该对象在checkedUserlist中的下标：
      var checkedUserList = this.data.checkedUserList;
      var actionIndex = 0;
      for (var u = 0; u < checkedUserList.length; u++) {
        if (checkedUserList[u].userid == actionUser.userid) {
          actionIndex = u;
        }
      }
      checkedUserList.splice(actionIndex, 1);

      this.setData({
        [swe]: false,
        checkedUserCount: newCheckedUserCount,
        checkedUserList: this.data.checkedUserList,
      })
      if (this.data.allUserCount > this.data.checkedUserCount) {
        this.setAllChecked(false);
      }
    } else if (oldState == false) {
      var newCheckedUserCount = this.data.checkedUserCount + 1;
      this.data.checkedUserList.push(actionUser);
      this.setData({
        [swe]: true,
        checkedUserCount: newCheckedUserCount,
        checkedUserList: this.data.checkedUserList,
      })
      if (this.data.allUserCount == this.data.checkedUserCount) {
        this.setAllChecked(true);
      }
    } else if (typeof (oldState) == "undefined") {
      var newCheckedUserCount = this.data.checkedUserCount + 1;
      this.data.checkedUserList.push(actionUser);
      this.setData({
        [swe]: true,
        checkedUserCount: newCheckedUserCount,
        checkedUserList: this.data.checkedUserList,
      })
      if (this.data.allUserCount == this.data.checkedUserCount) {
        this.setAllChecked(true);
      }

    }
  },
  setAllChecked(para) {
    this.setData({
      allChecked: para,
    })
  }, 
  onShow() {
    // var approversList = dd.getStorageSync({ key: 'approveuserlist' });
    var appCheckedUserList = app.globalData.checkedUserList;
    var thisUserList = this.data.userlist;

    // dd.getStorage({
    //   key: 'approveuserlist',
    //   success: function(res) {
    //     console.log("userlist.onShow..getStorage..");
    //     console.log(res.data);
    //     if(res.data){
    //         StorageCheckedUserList = res.data;
    //     }
    //   },
    //   fail: function(res){
    //     dd.alert({content: res.errorMessage});
    //   }
    // });

if (appCheckedUserList && appCheckedUserList.length>0) {
      if (appCheckedUserList.length == thisUserList.length) {
        this.setData({
          allChecked: true
        })

      for(var i=0;i<thisUserList.length;i++){
        var thisCheck = 'userlist['+i+'].checked';
        this.setData({
          [thisCheck]: true,
        })
      }

      }else{
        console.log("res.data.length != this.data.userlist.length");
            for(var j=0;j<appCheckedUserList.length;j++){
              var thisCheckedUserId = appCheckedUserList[j].userid;
              for(var o=0;o<thisUserList.length;o++){
                var thisUserId = thisUserList[o].userid;
                if(thisCheckedUserId == thisUserId){
                  var str = 'userlist['+o+'].checked';
                  this.setData({
                    [str]: true,
                  })
                }
              }
            }
      }


      this.setData({
        checkedUserList: appCheckedUserList,
        checkedUserCount: appCheckedUserList.length,
      })

      
    }

    
    
  },
});
