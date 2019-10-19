let app = getApp();
Page({
  data: {
    frontPageIddx:'',
    itemTypes:{
    list: [],
    }
  },
  onLoad(option){
    console.log("option",option)
    this.setData({
      frontPageIddx: option.iddx,
      //frontPageIddxx: option.iddxx,

    })
    //获取分类第一层数据：
    var that = this;
    dd.httpRequest({
       headers: { 
		  'eticket': app.globalData.eticket
        },
    url: app.globalData.domain+'/item/getTypeFirst',
    method: 'GET',
    data: {
      
    },
    dataType: 'json',
    success: function(res) {
      that.setData({
        'itemTypes.list': res.data.result,
      })
    },
    fail: function(res) {
      console.log("fail")
      alert("获取数据失败，请稍后再试");
    },
    complete: function(res) {
      console.log("conplete")
    }
});
  },
  onReady(e){

  },
  onShow(e){
    console.log("onShow....");
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
  clickItemType(e){
    var that=this;
    var theId = e.target.dataset.cid;
    var dataPath = this.getDataPath(theId);
    var str = this.getChangeDataStr(dataPath);
    var str1 = str+".open";
    var str2 = str+".list";
    var obj = this.getDataObjByPath(dataPath);
    if(!obj.open && obj.canOpen){
      //去获取子类型：
      //如果已经有数据就不去获取数据了，
      if(obj.list && obj.list.length>0){
          that.setData({
            [str1]: true,
          })
      }else{
        dd.showLoading({
          content: '获取数据中...',
        });
            dd.httpRequest({
               headers: { 
		  'eticket': app.globalData.eticket
        },
            url: app.globalData.domain+'/item/getTypeByParentId',
            method: 'GET',
            data: {
              id:theId,
            },
            dataType: 'json',
            success: function(res) {
              var list = res.data.result;
              that.setData({
                [str2]: list,
                [str1]: true,
              })
              dd.hideLoading();
            },
            fail: function(res) {
              console.log("fail");
              dd.showToast({
                type: 'exception ',
                content: '获取数据失败，请稍后再试',
                duration: 2000,
                success: () => {
                  // dd.alert({
                  //   title: 'toast 消失了',
                  // });
                },
              });
              dd.hideLoading();
            },
            complete: function(res) {
              console.log("conplete")
              dd.hideLoading();
            }
        });
      }
    }else if(obj.canOpen){
      this.setData({
        [str1]: false,
      })
      //还需要把子类型关闭。。。。。
    }else{
      //关闭页面并传值
      console.log("dd",obj)
      dd.showLoading({
          content: '获取该种类的物料数据中...',
        });
      let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];//arr.pageArray.purchaseArray[INDEX].typeName
          //var str1 = 'arr.pageObjectArray['+this.data.frontPageIddx+']purTopArray['+this.data.frontPageIddxx+'].typeName';
          var str1 ='arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray[0].typeName';
          //var str2 = 'arr.pageObjectArray['+this.data.frontPageIddx+']purTopArray['+this.data.frontPageIddxx+'].typeId';
          var str2 ='arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray[0].typeId';
          prevPage.setData({
               [str1]: obj.name,
               [str2]: obj.id,
          })
            console.log("obj",obj)
//去获取该分类下面的物料
      dd.httpRequest({
         headers: { 
		  'eticket': app.globalData.eticket
        },
            url: app.globalData.domain+'/item/getItemByTypeId',
            method: 'GET',
            data: {
              id:obj.id,
            },
            dataType: 'json',
            success: function(res) {
             //修改线下采购页面的itemArray
              var str3 = 'arr.itemArray';
              var str4 = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray[0].itemName';
              var str5 = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray[0].norms';
              var str6 = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray[0].unit';
              var str7 = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray[0].count';
              var resultList = res.data.result;
              if(resultList && resultList.length>0){
                var firstObj = resultList[0];

                prevPage.setData({
                    [str4]: firstObj.name,
                    })

               

                if(firstObj.materialspec){
                   prevPage.setData({
                    [str5]: firstObj.materialspec,
                    })
                }else{
                  prevPage.setData({
                    [str5]: '',
                    })
                }

                if(firstObj.pkMeasdoc){
                  prevPage.setData({
                    [str6]: firstObj.pkMeasdoc,
                    })
                }else{
                  prevPage.setData({
                    [str6]: '',
                    })
                }

              prevPage.setData({
                [str7]: 1,
              })


              }
              prevPage.setData({
               [str3]: res.data.result,
              })

              dd.hideLoading();

              dd.navigateBack({
               delta: 1,
              })
            },
            fail: function(res) {
              console.log("fail");
              dd.hideLoading();
              dd.showToast({
                type: 'exception ',
                content: '获取数据失败，请稍后再试',
                duration: 2000,
                success: () => {
                  dd.navigateBack({
                    delta: 1,
                })
                },
              });
            },
            complete: function(res) {
              dd.hideLoading();
            }
        });
          
    }
    
  //发起查询单一供应商
  dd.httpRequest({
     headers: { 
		  'eticket': app.globalData.eticket
        },
      url: app.globalData.domain+'',
      method: 'GET',
      data: {
        id:obj.id,
      },
      dataType: 'json',
      success: function(res) {
        
      }
  })
    
  },
  getDataPath(id){
    var theList = this.data.itemTypes.list;
    var firstIndex = 0;
    var secIndex = 0;
    var threeIndex = 0;
    var fourIndex = 0;
    var fiveIndex = 0;
    for(var i=0;i<theList.length;i++){
      firstIndex = i;
      var dataId=theList[i].id;
      console.log("查询的id:"+id);
      console.log("遍历id："+dataId);
      if(id == dataId){
        return firstIndex;
      }
      var secList = theList[i].list;
      if(secList && secList.length>0){
          for(var j=0;j<secList.length;j++){
            secIndex = j;
            var secDataId = secList[j].id;
            if(id == secDataId){
              return firstIndex + '-' + secIndex;
            }
            var threeList = secList[j].list;
            if(threeList && threeList.length>0){
              for(var a=0;a<threeList.length;a++){
                threeIndex = a;
                var threeId = threeList[a].id;
                if(id == threeId){
                  return firstIndex+'-'+secIndex+'-'+threeIndex;
                }
                var fourList = threeList[a].list;
                if(fourList && fourList.length>0){
                  for(var e=0;e<fourList.length;e++){
                    fourIndex = e;
                    if(id == fourList[e].id){
                      return firstIndex+'-'+secIndex+'-'+threeIndex+'-'+fourIndex;
                    }
                    var fiveList = fourList[e].list;
                    if(fiveList && fiveList.length>0){
                      for(var v=0;v<fiveList.length;v++){
                          fiveIndex = v;
                          if(id == fiveList[v].id){
                            return firstIndex+'-'+secIndex+'-'+threeIndex+'-'+fourIndex+'-'+fiveIndex;
                          }
                      }
                    }
                  }
              }
              }
            }
          } 
      }
    }
  },
  getChangeDataStr(dataPath){
    console.log("contain:");
    console.log(app.strContain(dataPath,"-"));
    if(!app.strContain(dataPath,"-")){
      return "itemTypes.list["+dataPath+"]";
    }
    var indexs = dataPath.split("-");
    var result = "itemTypes"
    for(var i=0;i<indexs.length;i++){
        result += ".list["+indexs[i]+"]"
    }
    return result;
  },
  getDataObjByPath(dataPath){
    if(!app.strContain(dataPath,"-")){
      var obj = this.data.itemTypes.list[dataPath];
      return obj;
    }

    var tempObj = [];
    var indexs = dataPath.split("-");
    for(var i=0;i<indexs.length;i++){
        if(i!=0){
            tempObj = tempObj.list[indexs[i]];
        }else{
          tempObj = this.data.itemTypes.list[indexs[i]];
        }
    }
    return tempObj;
  }

 
})
