Page({
  data: {
  },

  search: e => {
    let content = e.detail.value
    wx.request({
      //url: `https://api.shanbay.com/bdc/search/?word=${content}`,
      url: `https://00suren.top:8010/word/get/${content}`,
      data: {},
      method: 'GET',
      success: res => {
        console.log(res);
        if (res.data.code == 200 ) {
          wx.navigateTo({
            url: `./detail/detail?content=${content}`
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '对不起，查询不到该词信息',
            showCancel: false
          })
        }
      },
    })
  },

  help: () => {
    wx.showModal({
      title: '提示',
      content: '输入单词后点击回车键即可查询',
      showCancel: false
    })
  }
})
