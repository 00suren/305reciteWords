const app = getApp()

Page({
  onLoad:function(){ 
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


  onGetUserInfo: function () {
    wx.getSetting({
      success: res => {
        console.log(res.authSetting);
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: () => {
              wx.getUserInfo({
                success: res => {
                  console.log(res)
                  this.setData({
                    avatarUrl:res.userInfo.avatarUrl,
                    nickname:res.userInfo.nickName
                  })
                },
                fail: err => {
                  console.log(err)
                }
              })
            },
            fail: err => {
              console.log(err)
            }
          })
        }
        else {
          console.log("登录失败");
          wx.showToast({
            title: '请授予权限',
            icon: 'none'
          })

        }
      },
      fail: err => {
        console.err;
      }
    })
  }

})
