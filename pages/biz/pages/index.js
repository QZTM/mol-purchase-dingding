let app = getApp();
Page({
  data: {
    pageName: 'biz/index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    inputVal:"",
   items: [
      {name: '/pages/biz/pages/underlinepage/index', value: '线下', },
      {name: '/pages/biz/pages/onlinepage/index', value: '线上'},
   ],
   submitValue:[
     {
       "input":"",
       "radio-group":""
     }
   ]
  },
  onLoad(){
    
  },
   onSubmit(e) {  
    dd.alert({
      content: `${JSON.stringify(e.detail.value)}`,
    }); 
  },
  tapname:function(){
     dd.navigateTo ({
      
    })
  },
  radioChange(e) {
    dd.navigateTo({
      url: e.detail.value+'?applycau='+this.data.inputVal,
    })
    
  },
  changeInputVal(e){
    this.setData({
      inputVal: e.detail.value
    })
    console.log('input',this.data.inputVal)
  }
  
  



});
	