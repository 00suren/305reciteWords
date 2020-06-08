// pages/note/editnote/editnote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    wordid:null,
    wordcontent:null,
    noteid:null,
    notecontent:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.wordid = parseInt(options.wordId)
    this.data.wordcontent = options.wordContent
    this.data.noteid = options.noteId
    this.data.notecontent = options.noteContent
    console.log(options)
  },
  onShow:function(){
    this.setData({
      notecontent:this.data.notecontent
    })
  },

  editNote:function(e){
     //获取输入的笔记内容
     let noteContentNew = e.detail.value
     wx.request({
       url: 'https://00suren.top:8010/note',
       data:{
         "wxid":app.globalData.userInfo.wxid,
         "wordid":this.data.wordid,
         "notecontent": noteContentNew,
         "wordcontent":this.data.wordcontent,
         "noteid":this.data.noteid
       },
       method:'PUT',
       success: res=>{
         console.log(res)
         wx.showToast({
           title: '修改笔记成功',
           icon: 'success',
           duration:1000
         })
         // wx.navigateBack({
         //   delta:1
         // })
       },
       fail:err=>{
         console.log(err)
         wx.showToast({
           title: '修改笔记失败',
           icon: 'none',
           duration: 1000
         })
       }
     })
   wx.navigateBack({
       delta:1
     })
   
  }
})