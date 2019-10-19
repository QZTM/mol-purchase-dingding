let app = getApp();
Page({
  data: {
    checkedUserList: [],
    checkedUserCount: 0,
    appData: app.globalData,
  },
  onLoad() {
    

  },
  onShow(){
      var StorageCheckedUserList = app.globalData.checkedUserList;
    // dd.getStorage({
    //   key: 'approveuserlist',
    //   success: function(res) {
    //     console.log("all-approver-list.onShow..getStorage..");
    //     console.log(res.data);
    //     if(res.data){
    //         StorageCheckedUserList = res.data;
    //     }
    //   },
    //   fail: function(res){
    //     dd.alert({content: res.errorMessage});
    //   }
    // });
    if(StorageCheckedUserList && StorageCheckedUserList.length>0){
        this.setData({
    checkedUserList: StorageCheckedUserList,
    checkedUserCount: StorageCheckedUserList.length,
  })
    }
  
  },
  removeUser(e){
    var userid = e.target.dataset.ruserid;
    var checkedUsers = this.data.checkedUserList;
    for(var i=0;i<checkedUsers.length;i++){
        var aUserId = checkedUsers[i].userid;
        console.log("要删除的userid:"+userid+",,循环中的userid:"+aUserId);
        if(userid == aUserId){

        this.data.checkedUserList.splice(i,1);
        this.setData({
          checkedUserList: this.data.checkedUserList,
        })


        this.setData({
          'appData.checkedUserList': this.data.checkedUserList,
        })
        // dd.setStorage({
        //   key: 'approveuserlist',
        //   data: this.data.checkedUserList,
        //   success: function() {
        
        //   }
        // });
      return;
        }
    };
  }
});
