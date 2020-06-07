// pages/note/addnote/addnote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.wordid = parseInt(options.wordId)
    console.log(options.wordId)
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    if(app.globalData.loginState == false){
      console.log("请先登录")
    }
  },

  addNote:function(e){
    let noteContent = e.detail.value
    wx.request({
      url: 'https://00suren.top:8010/note',
      data:{
        "wxid":app.globalData.userInfo.wxid,
        "wordid":this.data.wordid,
        "notecontent": noteContent
      },
      method:'POST',
      success: res=>{
        console.log(res)
        wx.showToast({
          title: '添加笔记成功',
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
          title: '添加笔记失败',
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