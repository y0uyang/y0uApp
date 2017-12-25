// pages/movieTheatre/movieTheatre/theatreInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate:0,
    currentMovieNum: 0,
    theatreInfo:{},
    currentMovieId:"",
    currentTheId:"",
    currentMovieInfo:{},
    combo:[],
    isUpMovie:[],
    backImg:"yaoyaoling.jpg",
    sessionListAry:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let curMovieId = wx.getStorageSync("movieId").id;
    if(!curMovieId)curMovieId = options.movieId;
    if (!curMovieId) curMovieId = "5a387c4227acae3e4c3d153b";    
    console.log(options)
    this.setData({
      currentMovieId: options.movieId,
      currentTheId:options.theId
    })
    let thisd = this;
    wx.request({
      url: "http://127.0.0.1:8088/theatre/find",
      data:{
        _id: thisd.data.currentTheId
      },
      success(res){
        thisd.setData({
          theatreInfo:res.data,
          combo: res.data.movieCombo
        })
      }
    })
    wx.request({
      url: "http://127.0.0.1:8088/movie/find",
      success(res) {
        thisd.setData({
          isUpMovie: res.data
        })
      }
    })
    console.log(curMovieId)
    wx.request({
      url: "http://127.0.0.1:8088/movie/find",
      data:{
        _id:curMovieId,
      },
      success(res){
        console.log(res)
        thisd.setData({
          currentMovieInfo: res.data
        })
      }
    })
    wx.request({
      url: "http://127.0.0.1:8088/session/find",
      data: {
        movie: thisd.data.currentMovieId,
        theatre: thisd.data.currentTheId,
        submitType: "findJoin",
        ref: ["videoHall"]
      },
      success(res) {
        console.log(res.data)
        thisd.setData({
          sessionListAry: res.data
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
  scroll(e){
    this.setData({
      currentMovieNum:parseInt(e.detail.scrollLeft / 90)
    })
    let thisd = this;
    if (this.data.currentMovieId != this.data.isUpMovie[parseInt(e.detail.scrollLeft / 90)]._id){
      wx.request({
        url: "http://127.0.0.1:8088/movie/find",
        data:{
          _id: this.data.isUpMovie[parseInt(e.detail.scrollLeft / 90)]._id
        },
        success(res){
          thisd.setData({
            currentMovieInfo: res.data,
            backImg:res.data.movieImg,
            currentMovieId:res.data._id
          })
          wx.request({
            url: "http://127.0.0.1:8088/session/find",
            data:{
              movie: thisd.data.currentMovieId,
              theatre: thisd.data.currentTheId,
              submitType: "findJoin",
              ref: ["videoHall"]
            },
            success(res){
              console.log(res.data)
              thisd.setData({
                sessionListAry:res.data
              })
            }
          })
        }
      })
    }
  },
  changeDate(e){
    this.setData({
      currentDate: e.target.dataset.num
    })
  },

  chooseSeat(e){
    let addUrl = '/pages/buyTicket/buyTicket?theOnlyId=' + e.target.dataset.item._id
    wx.navigateTo({
      url: addUrl,
    })
  }
})