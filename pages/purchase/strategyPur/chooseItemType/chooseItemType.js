// let app = getApp();
// Page({
//   data: {
//     frontPageIddx:'',
//     itemTypes:{
//     list: [],
//     }
//   },
//   onLoad(option){
//     this.setData({
//       frontPageIddx: option.iddx,
//       //frontPageIddxx: option.iddxx,

//     })
//     //获取分类第一层数据：
//     var that = this;
//     dd.httpRequest({
//        headers: { 
// 		  'eticket': app.globalData.eticket
//         },
//     url: app.globalData.domain+'/item/getTypeFirst',
//     method: 'GET',
//     data: {
      
//     },
//     dataType: 'json',
//     success: function(res) {
//       that.setData({
//         'itemTypes.list': res.data.result,
//       })
//     },
//     fail: function(res) {
//       console.log("fail")
//       alert("获取数据失败，请稍后再试");
//     },
//     complete: function(res) {
//       console.log("conplete")
//     }
// });
//   },
//   onReady(e){

//   },
//   onShow(e){
//     console.log("onShow....");
//   },
//   onHide() {
//     // 页面隐藏
//   },
//   onUnload() {
//     // 页面被关闭
//   },
//   onTitleClick() {
//     // 标题被点击
//   },
//   onPullDownRefresh() {
//     // 页面被下拉
//   },
//   onReachBottom() {
//     // 页面被拉到底部
//   },
//   clickItemType(e){
//     var that=this;
//     var theId = e.target.dataset.cid;
//     var dataPath = this.getDataPath(theId);
//     var str = this.getChangeDataStr(dataPath);
//     var str1 = str+".open";
//     var str2 = str+".list";
//     var obj = this.getDataObjByPath(dataPath);
//     if(!obj.open && obj.canOpen){
//       //去获取子类型：
//       //如果已经有数据就不去获取数据了，
//       if(obj.list && obj.list.length>0){
//           that.setData({
//             [str1]: true,
//           })
//       }else{
//         dd.showLoading({
//           content: '获取数据中...',
//         });
//             dd.httpRequest({
//                headers: { 
// 		  'eticket': app.globalData.eticket
//         },
//             url: app.globalData.domain+'/item/getTypeByParentId',
//             method: 'GET',
//             data: {
//               id:theId,
//             },
//             dataType: 'json',
//             success: function(res) {
//               var list = res.data.result;
//               that.setData({
//                 [str2]: list,
//                 [str1]: true,
//               })
//               dd.hideLoading();
//             },
//             fail: function(res) {
//               console.log("fail");
//               dd.showToast({
//                 type: 'exception ',
//                 content: '获取数据失败，请稍后再试',
//                 duration: 2000,
//                 success: () => {
//                   // dd.alert({
//                   //   title: 'toast 消失了',
//                   // });
//                 },
//               });
//               dd.hideLoading();
//             },
//             complete: function(res) {
//               console.log("conplete")
//               dd.hideLoading();
//             }
//         });
//       }
//     }else if(obj.canOpen){
//       this.setData({
//         [str1]: false,
//       })
//       //还需要把子类型关闭。。。。。
//     }else{
//       //关闭页面并传值
//       console.log("dd",obj)
//       dd.showLoading({
//           content: '获取该种类的物料数据中...',
//         });
//       let pages = getCurrentPages();
//           let prevPage = pages[pages.length - 2];//arr.pageArray.purchaseArray[INDEX].typeName
//           //var str1 = 'arr.pageObjectArray['+this.data.frontPageIddx+']purTopArray['+this.data.frontPageIddxx+'].typeName';
//           var str1 ='arr.pageArray.purchaseArray['+this.data.frontPageIddx+'].typeName';
//           //var str2 = 'arr.pageObjectArray['+this.data.frontPageIddx+']purTopArray['+this.data.frontPageIddxx+'].typeId';
//           var str2 ='arr.pageArray.purchaseArray['+this.data.frontPageIddx+'].typeId';
//           prevPage.setData({
//                [str1]: obj.name,
//                [str2]: obj.id,
//           })
//             console.log("obj",obj)
// //去获取该分类下面的物料
//       dd.httpRequest({
//          headers: { 
// 		  'eticket': app.globalData.eticket
//         },
//             url: app.globalData.domain+'/item/getItemByTypeId',
//             method: 'GET',
//             data: {
//               id:obj.id,
//             },
//             dataType: 'json',
//             success: function(res) {
//              //修改线下采购页面的itemArray
//               var str3 = 'arr.itemArray';
//               var str4 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].itemName';
//               var str5 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].norms';
//               var str6 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].unit';
//               var str7 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].count';
//               var str8 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].brandName';
//               var str9='arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].materialId';
//               var resultList = res.data.result;
//               if(resultList && resultList.length>0){
//                 var firstObj = resultList[0];

//                 prevPage.setData({
//                     [str4]: firstObj.name,
//                     })

//                 prevPage.setData({
//                    [str8]:firstObj.pkBrand
//                 })
//                 prevPage.setData({
//                   [str9]:firstObj.pkMaterial
//                 })

//                 if(firstObj.materialspec){
//                    prevPage.setData({
//                     [str5]: firstObj.materialspec,
//                     })
//                 }else{
//                   prevPage.setData({
//                     [str5]: '',
//                     })
//                 }

//                 if(firstObj.pkMeasdoc){
//                   prevPage.setData({
//                     [str6]: firstObj.pkMeasdoc,
//                     })
//                 }else{
//                   prevPage.setData({
//                     [str6]: '',
//                     })
//                 }

//               prevPage.setData({
//                 [str7]: 1,
//               })


//               }
//               prevPage.setData({
//                [str3]: res.data.result,
//               })

//               dd.hideLoading();

//               dd.navigateBack({
//                delta: 1,
//               })
//               console.log("选择物品的data：",that.data)
//             },
//             fail: function(res) {
//               console.log("fail");
//               dd.hideLoading();
//               dd.showToast({
//                 type: 'exception ',
//                 content: '获取数据失败，请稍后再试',
//                 duration: 2000,
//                 success: () => {
//                   dd.navigateBack({
//                     delta: 1,
//                 })
//                 },
//               });
//             },
//             complete: function(res) {
//               dd.hideLoading();
//             }
//         });
          
//     }
    
//   //发起查询单一供应商
//   dd.httpRequest({
//      headers: { 
// 		  'eticket': app.globalData.eticket
//         },
//       url: app.globalData.domain+'',
//       method: 'GET',
//       data: {
//         id:obj.id,
//       },
//       dataType: 'json',
//       success: function(res) {
        
//       }
//   })
    
//   },
//   getDataPath(id){
//     var theList = this.data.itemTypes.list;
//     var firstIndex = 0;
//     var secIndex = 0;
//     var threeIndex = 0;
//     var fourIndex = 0;
//     var fiveIndex = 0;
//     for(var i=0;i<theList.length;i++){
//       firstIndex = i;
//       var dataId=theList[i].id;
//       console.log("查询的id:"+id);
//       console.log("遍历id："+dataId);
//       if(id == dataId){
//         return firstIndex;
//       }
//       var secList = theList[i].list;
//       if(secList && secList.length>0){
//           for(var j=0;j<secList.length;j++){
//             secIndex = j;
//             var secDataId = secList[j].id;
//             if(id == secDataId){
//               return firstIndex + '-' + secIndex;
//             }
//             var threeList = secList[j].list;
//             if(threeList && threeList.length>0){
//               for(var a=0;a<threeList.length;a++){
//                 threeIndex = a;
//                 var threeId = threeList[a].id;
//                 if(id == threeId){
//                   return firstIndex+'-'+secIndex+'-'+threeIndex;
//                 }
//                 var fourList = threeList[a].list;
//                 if(fourList && fourList.length>0){
//                   for(var e=0;e<fourList.length;e++){
//                     fourIndex = e;
//                     if(id == fourList[e].id){
//                       return firstIndex+'-'+secIndex+'-'+threeIndex+'-'+fourIndex;
//                     }
//                     var fiveList = fourList[e].list;
//                     if(fiveList && fiveList.length>0){
//                       for(var v=0;v<fiveList.length;v++){
//                           fiveIndex = v;
//                           if(id == fiveList[v].id){
//                             return firstIndex+'-'+secIndex+'-'+threeIndex+'-'+fourIndex+'-'+fiveIndex;
//                           }
//                       }
//                     }
//                   }
//               }
//               }
//             }
//           } 
//       }
//     }
//   },
//   getChangeDataStr(dataPath){
//     console.log("contain:");
//     console.log(app.strContain(dataPath,"-"));
//     if(!app.strContain(dataPath,"-")){
//       return "itemTypes.list["+dataPath+"]";
//     }
//     var indexs = dataPath.split("-");
//     var result = "itemTypes"
//     for(var i=0;i<indexs.length;i++){
//         result += ".list["+indexs[i]+"]"
//     }
//     return result;
//   },
//   getDataObjByPath(dataPath){
//     if(!app.strContain(dataPath,"-")){
//       var obj = this.data.itemTypes.list[dataPath];
//       return obj;
//     }

//     var tempObj = [];
//     var indexs = dataPath.split("-");
//     for(var i=0;i<indexs.length;i++){
//         if(i!=0){
//             tempObj = tempObj.list[indexs[i]];
//         }else{
//           tempObj = this.data.itemTypes.list[indexs[i]];
//         }
//     }
//     return tempObj;
//   },

// // *---------------------
// searchItemType(e){
//         var that = this;
//         console.log("根据关键字搜索物料类型");
//         var key = this.data.searchValue;

//         if(!key){
//           app.showToast("请输入想要查询的内容",'fail',2000,function(){});
//           return ;
//         }

//              dd.showLoading({
//               content: '搜索中，请稍后...',
//             });

//             that.getSearchItemByKey(key).then(function(res){
//                 console.log("发起异步请求搜索后的返回值：");
//                 console.log(res);

//                 if(res.data.result.length == 0){
//                   dd.hideLoading({});
//                   app.showToast("没有搜索到相似的物料类型",'fail',2000,function(){});
//                   return ;
//                 }

//               that.setData({
//                 'oldItemTypes.list' : that.data.itemTypes.list,
//                 'itemTypes.list':res.data.result,
//               })
//               dd.hideLoading({});

//             },function(res){
//                 app.showToast("通信异常，请稍后再试",'fail',2000,function(){});
//             })
//     },
// getTypeByParentIdPromise(TypeId){
//   var url = app.globalData.domain+'/item/getTypeByParentId';
//   var methodType = "GET";
//   var data = {id:TypeId};
//   var headers = {'eticket': app.globalData.eticket};
//   return app.styleRequestPromise(url,methodType,data,headers);
// },

// getTopTypePromise(typeId){
//   var url = app.globalData.domain+"/item/getTopType";
//   var methodType = "GET";
//   var data = {'typeId':typeId};
//   var headers = {'eticket': app.globalData.eticket};
//   return app.styleRequestPromise(url,methodType,data,headers);
// },

// getItemByTypeIdPromise(typeId){
//   var url = app.globalData.domain+'/item/getItemByTypeId';
//   var methodType = "GET";
//   var data = {id : typeId};
//   var headers = {'eticket': app.globalData.eticket};
//   return app.styleRequestPromise(url,methodType,data,headers);
// },
// getSearchItemByKey(key){
//   var url = app.globalData.domain+'/item/searchItemTypeByKey'; 
//   var methodType = "GET";
//   var data = {key : key};
//   var headers = {'eticket': app.globalData.eticket};
//   return app.styleRequestPromise(url,methodType,data,headers);
// },
// searchInputInput(e){
//   var newValue = e.detail.value;
//   var oldItemTypes = this.data.oldItemTypes;
//   if(oldItemTypes){
//       if(!newValue){
//       this.setData({
//         'itemTypes.list':oldItemTypes.list,
//       })
//   }
//   }
  
// },
// changeSearchValue(e){
//   console.log("搜索框失去焦点事件：");
//   console.log(e);
//   this.setData({
//     'searchValue' : e.detail.value
//   })
// },
 
// })
let app = getApp();
Page({
  data: {
    frontPageIddx:'',
    frontPageIddxx:'',
    checkedTypeName: '',
    itemTypes:{
    list: [],
    },
    option:{},
    searchValue:'',
  },
  onLoad(option){

    this.setData({
      frontPageIddx: option.iddx,
      frontPageIddxx: option.iddxx,
      option: option,

    })
    //获取分类第一层数据：
    var that = this;
    dd.httpRequest({
    url: app.globalData.domain+'/item/getTypeFirst',
    method: 'GET',
    headers: {
      'eticket': app.globalData.eticket
    },
    data: {
      
    },
    dataType: 'json',
    success: function(res) {
      that.setData({
        'itemTypes.list': res.data.result,
      })
    },
    fail: function(res) {
      alert("获取数据失败，请稍后再试");
    },
    complete: function(res) {
    }
});
  },
  onReady(e){
  },
  onShow(e){
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
    var that = this;
    // 页面被下拉
    dd.httpRequest({
            url: app.globalData.domain+'/item/clearItemCache',
            method: 'DELETE',
            headers: {
              'eticket': app.globalData.eticket
            },
            data: {
              
            },
            dataType: 'json',
            success: function(res) {
              that.onLoad(that.data.option);
              dd.stopPullDownRefresh();
            },
            fail: function(res) {
              // dd.showToast({
              //   type: 'exception ',
              //   content: '更新数据失败，请稍后再试',
              //   duration: 2000,
              //   success: () => {
                  
              //   },
              // });
			  
			  app.showToast('更新数据失败，请稍后再试','exception ',2000,function(){})
			  
            },
            complete: function(res) {
            }
        });
        return;
  },
  onReachBottom() {
    // 页面被拉到底部
  },

getTypeByParentIdPromise(TypeId){
  var url = app.globalData.domain+'/item/getTypeByParentId';
  var methodType = "GET";
  var data = {id:TypeId};
  var headers = {'eticket': app.globalData.eticket};
  return app.styleRequestPromise(url,methodType,data,headers);
},

getTopTypePromise(typeId){
  var url = app.globalData.domain+"/item/getTopType";
  var methodType = "GET";
  var data = {'typeId':typeId};
  var headers = {'eticket': app.globalData.eticket};
  return app.styleRequestPromise(url,methodType,data,headers);
},

getItemByTypeIdPromise(typeId){
  var url = app.globalData.domain+'/item/getItemByTypeId';
  var methodType = "GET";
  var data = {id : typeId};
  var headers = {'eticket': app.globalData.eticket};
  return app.styleRequestPromise(url,methodType,data,headers);
},
getSearchItemByKey(key){
  var url = app.globalData.domain+'/item/searchItemTypeByKey'; 
  var methodType = "GET";
  var data = {key : key};
  var headers = {'eticket': app.globalData.eticket};
  return app.styleRequestPromise(url,methodType,data,headers);
},
searchInputInput(e){
  var newValue = e.detail.value;
  var oldItemTypes = this.data.oldItemTypes;
  if(oldItemTypes){
      if(!newValue){
      this.setData({
        'itemTypes.list':oldItemTypes.list,
      })
  }
  }
  
},
changeSearchValue(e){
  console.log("搜索框失去焦点事件：");
  console.log(e);
  this.setData({
    'searchValue' : e.detail.value
  })
},

searchItemType(e){
        var that = this;
        console.log("根据关键字搜索物料类型");
        var key = this.data.searchValue;

        if(!key){
          app.showToast("请输入想要查询的内容",'fail',2000,function(){});
          return ;
        }

             dd.showLoading({
              content: '搜索中，请稍后...',
            });

            that.getSearchItemByKey(key).then(function(res){
                console.log("发起异步请求搜索后的返回值：");
                console.log(res);

                if(res.data.result.length == 0){
                  dd.hideLoading({});
                  app.showToast("没有搜索到相似的物料类型",'fail',2000,function(){});
                  return ;
                }

              that.setData({
                'oldItemTypes.list' : that.data.itemTypes.list,
                'itemTypes.list':res.data.result,
              })
              dd.hideLoading({});

            },function(res){
                app.showToast("通信异常，请稍后再试",'fail',2000,function(){});
            })
    },




  clickItemType(e){
    var that=this;
    var theId = e.target.dataset.cid;
    var dataPath = this.getDataPath(theId);
    var str = this.getChangeDataStr(dataPath);
    var str1 = str+".open";
    var str2 = str+".list";
    var obj = this.getDataObjByPath(dataPath);

    if(obj.open){
       this.setData({
        [str1]: false,
      })
      return ;
    }

    if(obj.canOpen){
     //如果该节点未打开，并且可以打开
      if(obj.list && obj.list.length>0){
        //如果子集合大于0（说明之前获取过该节点的子节点数据，直接打开就好），把该节点状态改为true（页面图标会变为打开状态的图标）
          that.setData({
            [str1]: true,
          })
      }else{
            //这里是之前没有获取过该节点的子节点数据，那么发起请求，去后端获取子节点数据
            //显示加载图片
            dd.showLoading({
              content: '获取数据中...',
            });
            that.getTypeByParentIdPromise(theId).then(function(res){
                var list = res.data.result;
                that.setData({
                [str2]: list,
                [str1]: true,
              })
              dd.hideLoading();
            },function(){
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
            })
      }
    }else{
      //这里是点击最终分类的情况
      //关闭页面并传值
      console.log("点击的物料类型对象",obj)
      dd.showLoading({
          content: '获取该种类的物料数据中...',
      });

       let pages = getCurrentPages();
       let prevPage = pages[pages.length - 2];
      console.log("prevPage:");
      console.log(prevPage);
      console.log("1")
      //查询是否有该分类下的物料信息，如果没有去后端获取
      //改1
      //var itemArray = prevPage.data.arr.itemType[obj.id];
      var itemArray = prevPage.data.arr.itemObj[obj.id];
      console.log("去前一个页面的data中查询是否有该typeId对应的数据... ... ... ...obj.id:"+obj.id);
      console.log(itemArray);
      if(!itemArray){
      //去获取该分类下面的物料
      console.log("if(!itemArray)里面");
      console.log("2")

      that.getItemByTypeIdPromise(obj.id).then(function(res){
              console.log("getItemByTypeIdPromise,function1....res:");
              console.log(res);
              console.log("查询该类型下面的物料信息：");
              var resultList = res.data.result;
              console.log(resultList);
             //修改线下采购页面的itemType
             //改2
              var str3 = 'arr.itemObj.'+obj.id;
              prevPage.setData({
               [str3]: resultList,
              })

              //var typeName = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].typeName';
              //var typeId = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].typeId';
              //改3var str4 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].itemName';
              // var typeIndex = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].typeIndex';
              // var itemName = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].itemName';
              // var itemId = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].itemId';
              // var itemIndex = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].itemIndex';
              // var itemNameIndex = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].nameIndex';
              // var norms = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].norms';
              // var unit = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].unit';
              // var count = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].count';
              // var hisPurLow = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].hisPurLow';
              // var hisPurHigh = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].hisPurHigh';
              // var hisPurAvg = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].hisPurAvg';
              var typeIndex = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].typeIndex';
              var itemName = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].itemName';
              var itemId = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].materialId';
              var itemIndex = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].itemIndex';
              var itemNameIndex = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].nameIndex';
              var norms = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].norms';
              var unit = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].unit';
              var count = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].count';
              // var hisPurLow = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].hisPurLow';
              // var hisPurHigh = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].hisPurHigh';
              // var hisPurAvg = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].hisPurAvg';
              
              if(resultList && resultList.length>0){
                  console.log("if(resultList   resultList.length>0)分支里面：");
                  var firstItemList = resultList[0].itemList;
                  console.log("firstItemList:");
                  console.log(firstItemList);
                  if(firstItemList && firstItemList.length>0){
                    console.log("if(firstItemList    firstItemList.length>0)分支里面");
                    var firstItem = firstItemList[0];
                          console.log("firstItem:");
                          console.log(firstItem);
                          prevPage.setData(  {[itemName] : firstItem.name}  );
                          prevPage.setData(  {[itemId] : firstItem.pkMaterial}  );
                          prevPage.setData(  {[itemNameIndex] : 0}  );
                          prevPage.setData(  {[itemIndex] : 0}  );
                          prevPage.setData(  {[typeIndex] : obj.id}  );
                          prevPage.setData(  {[norms] : firstItem.materialspec?firstItem.materialspec:''}  );
                          prevPage.setData(  {[unit] : firstItem.pkMeasdoc?firstItem.pkMeasdoc:''}  );
                          prevPage.setData(  {[count] : 1   });
                         // prevPage.setData(  {[hisPurLow] : firstItem.historyLow?(firstItem.historyLow+"元/"+firstObj.pkMeasdoc):''  });
                         // prevPage.setData(  {[hisPurHigh] : firstItem.historyHigh?(firstItem.historyHigh+"元/"+firstItem.pkMeasdoc):''  });
                         // prevPage.setData(  {[hisPurAvg] : firstItem.historyLevel?(firstItem.historyLevel+"元/"+firstItem.pkMeasdoc):''  });
                }
              }
      },function(res){
        console.log("getItemByTypeIdPromise,function2....res:");
        console.log(res);
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
      }).then(function(res){
        console.log("获取顶级物料分类数据");
        console.log("....then....res:");
        console.log(res);
            that.getTopTypePromise(obj.id).then(function(resc){
                var resobj = resc.data.result;
          //改4
          //var str1 = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].typeName';
          //var str2 = 'arr.pageObjectArray['+that.data.frontPageIddx+']purTopArray['+that.data.frontPageIddxx+'].typeId';
          var str1 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].typeName';
          var str2 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].typeId';
          prevPage.setData({
               [str1]: resobj.name,
               [str2]: resobj.id,
          })


              dd.hideLoading();
              dd.navigateBack({
               delta: 1,
              })
            })
      },function(resc){
                
                dd.hideLoading();
                dd.showToast({
                type: 'exception ',
                content: '获取数据失败，请稍后再试',
                duration: 2000,
                success: () => {
                 
                },
              });
      })


    }else{
          console.log("获取顶级物料分类数据");
          that.getTopTypePromise(obj.id).then(function(resc){
          var resobj = resc.data.result;
          var str1 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].typeName';
          var str2 = 'arr.pageArray.purchaseArray['+that.data.frontPageIddx+'].typeId';
          prevPage.setData({
               [str1]: resobj.name,
               [str2]: resobj.id,
          })


              dd.hideLoading();
              dd.navigateBack({
               delta: 1,
              })
            })
    }
          
    }
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

