// pages/mine/watched/watched.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: "http://127.0.0.1:8088/movie/find",
      success: (res) => {
        console.log(res.data[2])
        this.setData({
          wantsMovieList: [res.data[3]],
        })
      }
    })
  },

})