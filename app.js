// app.js

const hotapp = require('./utils/hotapp.js')
// hotapp.setDebug(true)


App({
  onLaunch: function(){
    // 调用 API 从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  //初始化hotapp，使用自己的hotappkey（注册地址：https://weixin.hotapp.cn/api）
  hotapp.init('hotapp758548033');
  },
  getUserInfo: function(cb) {
    if (this.globalData.userInfo==null) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              console.log(res)
              typeof cb == "function" && cb(this.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo:{
      name: wx.getStorageSync('userInfo').name,
      wxid: wx.getStorageSync('userInfo').wxid,
      avatar: wx.getStorageSync('userInfo').avatar,
    },
    loginState: wx.getStorageSync('logState') ,
    hotapp: hotapp // 这里作为一个全局变量, 方便其它页面调用
  }
})
