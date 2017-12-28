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