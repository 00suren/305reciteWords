// pages/note/getnoteList/getnoteList.js
const app = getApp()
Page({
  data:{
    noteList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    wx.request({
      url: `https://00suren.top:8010/note/${app.globalData.userInfo.wxid}`,
      body:{},
      method:'GET',
      success:res=>{
        console.log(res);
        this.setData({
          noteList:res.data.data
        })
      }
    })
  },

  editNote:function(event){
    var currentNote = this.data.noteList[event.currentTarget.dataset.index]
    wx.navigateTo({
      url: `../editnote/editnote?noteId=${currentNote.noteid}&wordContent=${currentNote.wordcontent}&wordId=${currentNote.wordid}&noteContent=${currentNote.notecontent}`
    })
  },
 
  deleteNote:function(event){
    wx.request({
      url: `https://00suren.top:8010/note/${this.data.noteList[event.currentTarget.dataset.index].noteid}`,
      data:{},
      method:'DELETE',
      success:res=>{
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon:'success',
          duration:1000
        })
      },
      fail:err=>{
        console.log(err)
        wx.showToast({
          title: '删除失败',
          icon:'none',
          duration:1000
        })
      }
    })
    this.data.noteList.splice(event.currentTarget.dataset.index,1);
    this.setData({
      noteList:this.data.noteList
    })
  }

})