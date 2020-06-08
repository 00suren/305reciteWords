const app = getApp()
Page({
  data: {
    content: null,
    pron: null,
    definition: null,
    audioUrl: null,
    worldListMax: 999,
    vocListMax: 12346,
    word_push:new Array(5),
    count:0
  },

  onLoad: function(){
    this.next();
  },

  show: function () {
    this.setData({
      showNot: true
    })
  },

  next: function () {
    this.countJudge().then(res=>{
      console.log(this.data.word_push);
    }).catch(err=>{
      console.log("赋值")
      this.setData({
        showNot: false,
        content: this.data.word_push[this.data.count].english,
        pron: this.data.word_push[this.data.count].sent,
        definition: this.data.word_push[this.data.count].chinese
      })
      }).then(res => {
        console.log("赋值")
        this.setData({
          showNot: false,
          content: this.data.word_push[this.data.count].english,
          pron: this.data.word_push[this.data.count].sent,
          definition: this.data.word_push[this.data.count].chinese
        })
      }).then(res=>{
      console.log(this.data.count)
      this.data.count++;
    })

  },

  getword:function(){
    var that = this;
    return new Promise(function(resolve,reject){
      wx.request({
        url: `https://00suren.top:8010/word/push`,
        data: {},
        method: 'GET',
        success: res=>{
          resolve(res);
        }
      })
    })
  
  },
  
  countJudge:function(){
    var that = this;
    return new Promise(function (resolve, reject) {
      if (that.data.count % 5 === 0) {
        console.log("count清零")
        that.data.count %= 5;
        that.getword().then((res) => {
          that.data.word_push = res.data.data;
          resolve(res);
        })
      }
      else{
        console.log("count不清零")
        reject(reject);
      }
    })
  },

  addNote:function(e){
    if(app.globalData.loginState==true){
      var currentWord = this.data.word_push[this.data.count-1]
      wx.navigateTo({
        url: `../note/addnote/addnote?wordId=${currentWord.id}&wordContent=${currentWord.english}`
      })
      this.next();
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon:'none',
        duration: 1000
      })
    }


  }
})
