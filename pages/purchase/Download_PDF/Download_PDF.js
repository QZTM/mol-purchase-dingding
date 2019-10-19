Page({
  data: {
    ennable:false,
    url:null,
    file_name:null
  },
  onLoad(e) {
     this.data.url=e.url//获取下载路径
     var url_var=e.url;
     var str=url_var.split('/');

     this.setData({
       file_name:str[str.length-1],//获取文件名
      ennable:false//不启动webview
      
    })
    
  },
  tapname()//用户点击下载pdf时
  {
    this.setData({
      ennable:true
    })
  },
  cloes()
  {
   // dd.redirectTo()
   dd.navigateBack({
   delta: 2   //返回页面
   })
  }

});
