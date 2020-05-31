const list = require('../../data/word-list.js')
const vocList = require('../../data/vocabulary.js')
const innerAudioContext = wx.createInnerAudioContext()

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
    //从本地缓存单词表选取第一个单词
    var idx = Math.floor(Math.random() * (this.data.worldListMax)) + 1;
    console.log(idx);
    var word = list.wordList[idx]

    this.setData({
      content: word.content,
      pron: word.pron,
      definition: word.definition,
      audioUrl: null
    })
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

  addNote:function(){

  }
})
