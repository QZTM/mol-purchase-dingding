import uCharts from '../ucharts/u-charts.js';
var _self;
var canvaColumn = null;
Page({
  data: {
    cWidth: 750,
    cHeight: 500,
    pixelRatio:2
  },
  onLoad: function () {
    _self=this;
    this.cWidth=750;
    this.cHeight=500;
    this.pixelRatio=2;
    this.getServerData();
  },
  getServerData: function() {
    my.request({
      url: 'https://www.ucharts.cn/data.json',
      data: {
      },
      success: function (res) {
        console.log("shuju"+res.data.data)
        console.log("数据1："+JSON.stringify(res.data))
        console.log("数据2："+JSON.stringify(res.data.data))
        console.log("数据3："+JSON.stringify(res.data.data.LineA))

        let Column = { categories: [], series: [] };
        Column.categories = res.data.data.LineB.categories;
        Column.series = res.data.data.LineB.series;
        //自定义标签颜色和字体大小
        Column.series[1].textColor = 'red';
        Column.series[1].textSize = 18;
        _self.showColumn("canvasColumn", Column);
      },
      fail: () => {
        console.log("请点击右上角【详情】，启用不校验合法域名");
      },
    });
  },
  showColumn(canvasId, chartData) {
    canvaColumn = new uCharts({
      $this: this,
      canvasId: canvasId,
      type: 'line',
      legend: true,
      fontSize: 11,
      background: '#FFFFFF',
      pixelRatio: this.pixelRatio,//工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
      animation: true,
      categories: chartData.categories,//如果节点有分类的话可以通过 data[i].category 指定每个节点的类目，类目的样式会被应用到节点样式上
      series: chartData.series,
      xAxis: {
        disableGrid: true,
      },
      yAxis: {
        //disabled:true
      },
      dataLabel: true,
      width: this.cWidth,
      height: this.cHeight,
      extra: {
        column: {
          type: 'group',
          width: this.cWidth * 0.45 / chartData.categories.length
        }
      }
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
  }
})
