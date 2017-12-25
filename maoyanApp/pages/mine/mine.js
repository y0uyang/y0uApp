Page({
  data: {
    
  },

  call(){
    wx.makePhoneCall({
      phoneNumber:"10105335"
    })
  },
  myCard() {
    wx.navigateTo({
      url: '/pages/myCard/myCard',
    })
  },
  myWantMovie(){
    wx.navigateTo({
      url: '/pages/mine/myWant/myWant',
    })
  },
  watchedMovie(){
    wx.navigateTo({
      url: '/pages/mine/watched/watched',
    })
  },
  
})