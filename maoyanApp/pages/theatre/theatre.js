//logs.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theatreList:[],
    isInput:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let thisData = this;
    wx.request({
      url: 'http://127.0.0.1:8088/theatre/find',
      data: { 
        submitType: "findJoin",
        ref: ["videoHall"]
      },
      success: function (res) {
        thisData.setData({
          theatreList: res.data
        })
      }
    })
  },


  inInput(){
    console.log("in")
    this.setData({
      isInput:false
    })
  },

  outInput(){
    console.log("out")
    this.setData({
      isInput: true
    })
  },

  location() {
    wx.navigateTo({
      url: "/pages/location/location"
    })
  },

  toSearch(){
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },

  toTheatreInfo(e){
    console.log(e.currentTarget.dataset.theid)
    let addUrl = "/pages/movieTheatre/theatreInfo/theatreInfo?theId=" + e.currentTarget.dataset.theid
    wx.navigateTo({
      url: addUrl
    })
  }

})
