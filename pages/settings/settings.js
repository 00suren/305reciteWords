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

  onShow:function(){
    if(app.globalData.loginState == true){
      this.setData({
        avatarUrl: app.globalData.userInfo.avatar,
        nickname: app.globalData.userInfo.name,
      })
    }
  },

  showMyNote: function () {
    if(app.globalData.loginState==true){
      wx.navigateTo({
        url: '../note/getnoteList/getnoteList'
      })
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon:'none',
        duration: 1000
      })
    }

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
      url: './feedback/index'
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
                    app.globalData.loginState = true;
        
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

                    wx.request({
                      url: 'https://00suren.top:8010/user',
                      data: JSON.stringify(wx.getStorageSync('userInfo')),
                      method: 'POST',
                      success: res => {
                        console.log(res)
                        app.globalData.userInfo = this.data.userInfo
                      },
                      fail: err => {
                        console.log(err)
                      }
                    })
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
