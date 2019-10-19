import uCharts from '/pages/purchase/workbench/templet/ucharts/u-charts.js';
let app = getApp();
var _self;
var canvaColumn = null;
var canvaColumnB=null;
Page({
  data: {
    cWidth: 750,
    cHeight: 500,
    pixelRatio:1,
    pur:
      {
        "gongsi":"",
        "gongsiId":"",
        "itemName":"",
        "norms":"",
        //涨幅
        "gain":"20",
        "gainStatus":"0",//1为涨幅，2为降幅,0为无变化 
        "quote":"333",
        "reason":"非官方股份",
        "quote_lastTime":"",
        "quote_lowest":"",
        "quote_lowest_time":"",
        "quote_heighest":"",
        "quote_heighest_time":"",
        "gainInAll":"20",
        "gainStatusInAll":"",//1为涨幅，2为降幅,0为无变化 
        "quoteLastTimeInAll":"",
        "quoteLowestInAll":"",
        "quoteLowestTimeInAll":"",
        "quoteHeighestInAll":"",
        "quoteHeighestTimeInAll":"",

        
      }
    
  },
  onLoad: function (option) {
    this.stringToObj(option);
    _self=this;
    this.cWidth=750;
    this.cHeight=500; 
    this.pixelRatio=2;
    this.getServerData();

    console.log("data============:"+JSON.stringify(_self.data))
  },

  //将上一页面的string 转换为obj
  stringToObj(option){
    var _malist="";
    
    this.setData({
       supplierId: option.supplierId,
       maList:option.maList,
       suppQuoteList:option.suppQuoteList
    }),
    
    _malist=JSON.parse(this.data.maList);
    var mList=[];
    for(var i =0;i<_malist.length;i++){
      mList.push({
        'pkMaterialId':_malist[i].pkMaterialId,
         'nameAndNorms':_malist[i].itemName+_malist[i].norms
       // 'nameAndNorms':_malist[i].itemName

      })
    } 
    this.setData({
      maList:mList,
      pkMaterialId:mList[0].pkMaterialId,
    })

  },

    getDetailMessage(e){
       
          //e为物料id
          var _pkMaterialId=e;
          //console.log("第一次id："+_pkMaterialId)

          var _suppQuoteList="";
          _suppQuoteList=JSON.parse(this.data.suppQuoteList);
          //console.log("公司报价2："+JSON.stringify(_suppQuoteList)+"-----:物料id："+_pkMaterialId)
          for(var i=0;i<_suppQuoteList.length;i++){
             console.log("dddddddddddddd:",_suppQuoteList[0][0][0].gongsi)
              var _mmli=_suppQuoteList[i][1];
              for(var v=0;v<_mmli.length;v++){
              //console.log("///----3----"+JSON.stringify(_mmli[v]))
                if(_mmli[v].pkMaterialId==_pkMaterialId){
                  console.log("进来了。。。。。。。。。。。")
                  
                  this.setData({
                    "pur.gongsi":_suppQuoteList[0][0][0].gongsi,
                    "pur.gongsiId":_suppQuoteList[0][0][0].gongsiId,
                    'pur.itemName':_mmli[v].itemName,
                    'pur.norms':_mmli[v].norms,
                    'pur.quote':_mmli[v].quote,
                    'pur.reason':_mmli[v].reason,
                    'pur.gain':_mmli[v].gain
                  })
                }
              }
          }
        // }
        // console.log("data:"+JSON.stringify(this.data))
    },

  getServerData: function(e) {

   
    // console.log("物料历史价格查询1"+e);

     var _supplierId=this.data.supplierId;
     var _pkMaterialId="";
    if(typeof(e)=='undefined'){
      _pkMaterialId=this.data.pkMaterialId;
    }else{   
      _pkMaterialId=e.target.dataset.index;
    }
     this.getDetailMessage(_pkMaterialId);

    //查询物料所属在该公司的历史报价
    dd.httpRequest({

       url: app.globalData.domain+'/negotiateding/getBigDate',
          method: 'GET',
          data: {supplierId:_supplierId,pkMaterialId:_pkMaterialId
          },
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
        success: function (res) {
          //console.log("shuju"+res.data.data)
          //console.log("数据1："+JSON.stringify(res.data))
          //console.log("数据2："+JSON.stringify(res.data.data))
          //console.log("数据3："+JSON.stringify(res.data.data.LineA))

          let Column = { categories: [], series: [] };
          //Column.categories = res.data.data.LineB.categories;
          //Column.series = res.data.data.LineB.series;
          
          Column.categories = res.data.result.categories;
          Column.series = res.data.result.series;

          

          //console.log("column-1-->:"+Column)
           //console.log("column-2-->:"+JSON.stringify(Column))
          //自定义标签颜色和字体大小
          Column.series[0].textColor = 'red';
          Column.series[0].textSize = 18;
          _self.showColumn("LineA", Column);
          //上次价格
          var _lastMoneyList=Column.series[0].data;
          var _lastMoneyList_2=[];

          
          var _lastTimeMoney=0;
          _lastTimeMoney=_lastMoneyList[_lastMoneyList.length-1];
          //往期最低
          var _quote_lowest=0;
          //往期最高 
          var _quote_heighest=0

          _lastMoneyList_2=_lastMoneyList;
          //_lastMoneyList_2.sort();
          var max=_lastMoneyList_2[0];
          var min=_lastMoneyList_2[0];
          for(var n=0;n<_lastMoneyList_2.length;n++){
              if(_lastMoneyList_2[n]>max){
                max=_lastMoneyList_2[n];
              }
              _lastMoneyList_2[n]<min?min=_lastMoneyList_2[n]:null
             
          }



          _quote_lowest=min;
          _quote_heighest=max;
          _self.setData({
            'pur.quote_lastTime':_lastTimeMoney,
            'pur.quote_lowest':_quote_lowest,
            'pur.quote_heighest':_quote_heighest,
          })

          var _quote_lowest_index=_lastMoneyList.indexOf(_quote_lowest);
          //console.log("最低价的index:"+_quote_lowest_index);
          var _quote_heighest_index=_lastMoneyList.indexOf(_quote_heighest);
          //console.log("最低价的index:"+_quote_heighest_index);
          //日期：
          var _dataList=Column.categories;
          var _quoteLowestDate=_dataList[_quote_lowest_index];
          var _quoteHeighestDate=_dataList[_quote_heighest_index];
          _self.setData({
            'pur.quote_lowest_time':_quoteLowestDate,
            'pur.quote_heighest_time':_quoteHeighestDate
          })


        },
        fail: () => {
          console.log("查询失败，请重试！");
        },
    });


    //查询物料往期所以公司的报价
    dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getBigDate',
          method: 'GET',
          data: {pkMaterialId:_pkMaterialId
          },
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
        success: function (res) {
          let Column = { categories: [], series: [] };
          //Column.categories = res.data.data.LineB.categories;
          //Column.series = res.data.data.LineB.series;
          
          Column.categories = res.data.result.categories;
          Column.series = res.data.result.series;

          

          console.log("column-1-->:"+Column)
           console.log("column-2-->:"+JSON.stringify(Column))
          //自定义标签颜色和字体大小
          Column.series[0].textColor = 'red';
          Column.series[0].textSize = 18;
          _self.showColumnLineB("LineB", Column);
           //上次价格
          var _lastMoneyList=Column.series[0].data;
          var _lastMoneyList_2=[];

          
          var _lastTimeMoney=0;
          _lastTimeMoney=_lastMoneyList[_lastMoneyList.length-1];
          //往期最低
          var _quote_lowest=0;
          //往期最高 
          var _quote_heighest=0

          _lastMoneyList_2=_lastMoneyList;
          //_lastMoneyList_2.sort();
          var max=_lastMoneyList_2[0];
          var min=_lastMoneyList_2[0];
          for(var n=0;n<_lastMoneyList_2.length;n++){
              if(_lastMoneyList_2[n]>max){
                max=_lastMoneyList_2[n];
              }
              _lastMoneyList_2[n]<min?min=_lastMoneyList_2[n]:null
             
          }
         

          _quote_lowest=min;
          _quote_heighest=max;
          var _gainAllStatus=0;
          var _gainAll=0;
          //比较上次涨幅
          var _quote=_self.data.pur.quote;
           console.log("xxxxxxxxxxxxxxxw---_lastTimeMoney:"+_lastTimeMoney+"quote",_quote)
          if(_lastTimeMoney<_quote){
             console.log("xxxxxxxxxxxxxxx---:"+"<")
            
              _gainAllStatus=1;
              if(_lastTimeMoney!=0&&_lastTimeMoney!=null){
                _gainAll=_quote/_lastTimeMoney*100
              }else{
                _gainAll=0;
              }
             
          }else if(_lastTimeMoney>_quote){
             console.log("xxxxxxxxxxxxxxx---:>")
             _gainAllStatus=1;
              if(_lastTimeMoney!=0&&_lastTimeMoney!=null){
                _gainAll=_quote/_lastTimeMoney*100
              }else{
                _gainAll=0;
              }
          }else{
             console.log("xxxxxxxxxxxxxxx---:=")

             _gainAllStatus=0;
              _gainAll=0;
          }
         



          _self.setData({
            'pur.quoteLastTimeInAll':_lastTimeMoney,
            'pur.quoteLowestInAll':_quote_lowest,
            'pur.quoteHeighestInAll':_quote_heighest,
            "pur.gainInAll":_gainAll,
            "pur.gainStatusInAll":_gainAllStatus
          })

          var _quote_lowest_index=_lastMoneyList.indexOf(_quote_lowest);
          //console.log("最低价的index:"+_quote_lowest_index);
          var _quote_heighest_index=_lastMoneyList.indexOf(_quote_heighest);
          //console.log("最低价的index:"+_quote_heighest_index);
          //日期：
          var _dataList=Column.categories;
          var _quoteLowestDate=_dataList[_quote_lowest_index];
          var _quoteHeighestDate=_dataList[_quote_heighest_index];
          _self.setData({
            'pur.quoteLowestTimeInAll':_quoteLowestDate,
            'pur.quoteHeighestTimeInAll':_quoteHeighestDate
          })
          console.log("data-"+JSON.stringify(_self.data.pur))
        },
         fail: () => {
          console.log("查询失败，请重试！");
        },
    })
  },
  showColumn(canvasId, chartData) {
    canvaColumn = new uCharts({
      $this: _self,
      canvasId: canvasId,
      type: 'line',
      fontSize: 11,

      legend: {show:true},
      dataLabel:true,
      dataPointShape:true,
      background: '#FFFFFF',

      pixelRatio: _self.pixelRatio,
      categories: chartData.categories,
      series: chartData.series,
      animation: false,
      enableScroll: true,//开启图表拖拽功能
     xAxis: {
        disableGrid:false,
						type:'grid',
						gridType:'dash',
						itemCount:4,
						scrollShow:true,
						scrollAlign:'left',
						scrollBackgroundColor:'#F7F7FF',
						scrollColor:'#DEE7F7',
      },
      yAxis: {
       gridType:'dash',
						splitNumber:8,
						min:10,
						max:180,
            format:(val)=>{return val.toFixed(0)+'元'}
      },
      // dataLabel: true,
      width: this.cWidth,
      height: this.cHeight,
      extra: {
						lineStyle: 'straight'
					},
    });

  },
   showColumnLineB(canvasId, chartData) {
    canvaColumnB = new uCharts({
      $this: _self,
      canvasId: canvasId,
      type: 'line',
      fontSize: 11,

      legend: {show:true},
      dataLabel:true,
      dataPointShape:true,
      background: '#FFFFFF',

      pixelRatio: _self.pixelRatio,
      categories: chartData.categories,
      series: chartData.series,
      animation: false,
      enableScroll: true,//开启图表拖拽功能
     xAxis: {
        disableGrid:false,
						type:'grid',
						gridType:'dash',
						itemCount:4,
						scrollShow:true,
						scrollAlign:'left',
						scrollBackgroundColor:'#F7F7FF',
						scrollColor:'#DEE7F7',
      },
      yAxis: {
       gridType:'dash',
						splitNumber:8,
						min:10,
						max:180,
            format:(val)=>{return val.toFixed(0)+'元'}
      },
      // dataLabel: true,
      width: this.cWidth,
      height: this.cHeight,
      extra: {
						lineStyle: 'straight'
					},
    });

  },
  touchColumn(e) {
    canvaColumn.showToolTip(e, {
      format: function (item, category) {
        if (typeof item.data === 'object') {
          return category + ' ' + item.name + ':' + item.data.value
        } else {
          return category + ' ' + item.name + ':' + item.data
        }
      }
    });
  },
  touchLineA(e){
    canvaColumn.scrollStart(e);
  },
  moveLineA(e) {
    canvaColumn.scroll(e);
  },
  touchEndLineA(e) {
    canvaColumn.scrollEnd(e);
    //下面是toolTip事件，如果滚动后不需要显示，可不填写
    canvaColumn.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data 
      }
    });
  },
  touchLineB(e){
    canvaColumnB.scrollStart(e);
  },
  moveLineB(e) {
    canvaColumnB.scroll(e);
  },
  touchEndLineB(e) {
    canvaColumnB.scrollEnd(e);
    //下面是toolTip事件，如果滚动后不需要显示，可不填写
    canvaColumnB.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data 
      }
    });
  },

  wuliaoMessageSearch(e){
    console.log("物料历史价格查询"+e)
    console.log("物料历史价格查询2"+JSON.stringify(e.target.targetDataset.index))
  }
})