// pages/movieTheatre/movieTheatre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theatreList:[],
    movieId:'',
    currentDate:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieId:options.movieId
    })
    let thisd = this;
    wx.setNavigationBarTitle({
      title: options.name
    })
    wx.request({
      url: "http://127.0.0.1:8088/movie/find",
      data:{
        _id: options.movieId,
        submitType: "findJoin",
        ref: ["theatre"]
      },
      success(res){
        thisd.setData({
          theatreList: res.data.theatre
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  theatreInfo(e){
    let urlAdd = '/pages/movieTheatre/theatreInfo/theatreInfo?theId=' + e.currentTarget.dataset.theatre._id + "&movieId=" + this.data.movieId;
    wx.navigateTo({
      url: urlAdd,
    })
  },
  changeDate(e) {
    this.setData({
      currentDate: e.target.dataset.num
    })
  },
})