// pages/settings/detail/detail.js
Page({
  data: {},
  onLoad: function(option) {

    const word = option.content

    wx.request({
      //url: `https://api.shanbay.com/bdc/search/?word=${word}`,
      url: `https://00suren.top:8010/word/get/${word}`,
      data: {},
      method: 'GET',
      success: res => {
        const data = res.data.data
        this.setData({
          content: data.english,
          pron: data.sent,
          definition: data.chinese
        })
      }
    })
  }
})
