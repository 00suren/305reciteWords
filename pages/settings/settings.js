const app = getApp()

Page({
  onLoad:function(){
    wx.request({
      url: `https://00suren.top:8010/word/push`,
      data: {},
      method: 'GET',
      success: res => {

        const data = res.data.data
        console.log(res.data.data)

      }
    })
  },
  showMyWord: function () {
    wx.showModal({
      title: '提示',
      content: '此功能暂未开放，敬请期待！',
      showCancel: false
    })
  },
  showClause: function () {
    wx.navigateTo({
      url: './clause/clause'
    })
  },
  showHelp: function () {
    wx.navigateTo({
      url: './help/help'
    })
  },
  showFeedback: function () {
    wx.navigateTo({
      url: './feedback/feedback'
    })
  },
  test: function(){
   
  }
})
