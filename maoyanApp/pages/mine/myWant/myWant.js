// pages/mine/myWant/myWant.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wantsMovieList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: "http://127.0.0.1:8088/movie/find",
      data:{
        isLike:"true"
      },
      success:(res)=>{
        this.setData({
          wantsMovieList:[...res.data],
        })
      }
    })
  },

})