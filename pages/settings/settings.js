const app = getApp()

Page({

  data: {
    userInfo: {
      name: "",
      wxid: "",
      avatar: ""
    },
    logged: false
  },
  onLoad:function(){ 
  },

  showMyNote: function () {
    wx.navigateTo({
      url: '../note/getnoteList/getnoteList'
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
/*    if (app.globalData.loginState==true){

    }
    else{
*/
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.login({
              success: (res) => {
                var jsCode = res.code
                wx.getUserInfo({
                  success: res => {
                    this.data.userInfo.avatar = res.userInfo.avatarUrl;
                    this.data.logged = true;
                    this.data.userInfo.name = res.userInfo.nickName;
                  console.log(app.userInfo)

                    this.setData({
                      avatarUrl: res.userInfo.avatarUrl,
                      nickname: res.userInfo.nickName
                    })
                    wx.setStorageSync('logState', this.data.logged);

                  },
                  fail: err => {
                    console.log(err)
                  }
                })

                wx.request({
                  url: `https://00suren.top:8010/login`,
                  data: {
                    'appid': 'wxa7cdc988296bfb77',
                    'secret': 'fb90be43ccd5634bdcb83b9cb5bab78d',
                    'js_code': jsCode,
                    'grant_type': 'authorization_code'
                  },
                  method: 'POST',
                  success: res => {
                    this.data.userInfo.wxid = res.data.openid;
                    wx.setStorageSync('userInfo', this.data.userInfo);
                    console.log(wx.getStorageSync('userInfo'))
                  }
                })

                wx.request({
                  url: 'https://00suren.top:8010/user',
                  data: JSON.stringify(wx.getStorageSync('userInfo')),
                  method: 'POST',
                  success: res => {
                    console.log(res)
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
    //}
    
  }

})
