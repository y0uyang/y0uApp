//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbar:["热映","待映"],
    //0是热映，1是待映
    currentTab:0,
    movieList:[],
    wantMovieList:[],
    city:"成都"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let thisData = this;
    wx.request({
      url: 'http://127.0.0.1:8088/movie/find', 
      data:{
        // submitType: "findJoin",
        // ref: ["theatre"]
      },
      success: function (res) {
        if (thisData.data.currentTab==0){
          thisData.setData({
            movieList : res.data
          })
          res.data.sort(function (a, b) {//按照想看人数
            return b.wants - a.wants;
          })
          thisData.setData({
            wantMovieList:res.data
          })
        }
      }
    })
  },

  changeCity(city){
    this.setData({
      city: city
    })
  },

  //事件处理函数
  searchPage() {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  location() {
    wx.navigateTo({
      url: "/pages/location/location"
    })
  },
  navbarTap(e){
    this.setData({
      currentTab:e.currentTarget.dataset.idx
    })
  },
  changeLike(e){
    let thisData = this;
    wx.request({
      url: 'http://127.0.0.1:8088/movie/find',
      data:{
        _id: e.target.dataset.id
      },
      success: function (res) {
        let change;
        if(res.data.isLike == "true") {
          change = "false"
        }else{
          change = "true"
        }
        wx.request({
          url: 'http://127.0.0.1:8088/movie/update',
          data: {
            _id: res.data._id,
            isLike:change
          },
          success: function (res) {
            wx.request({
              url: 'http://127.0.0.1:8088/movie/find',
              success: function (res) {
                if (thisData.data.currentTab == 0) {
                  thisData.setData({
                    movieList: res.data
                  })
                }else{
                  res.data.sort(function (a, b) {//按照想看人数
                    return b.wants - a.wants;
                  })
                  thisData.setData({
                    wantMovieList: res.data
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  getMovieInfo(e){
    wx.setStorageSync("movieId", e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/movieInfo/movieInfo',
    })
  },
  movieTheatre(e){
    let urlAdd = "/pages/movieTheatre/movieTheatre?movieId=" + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.moviename;
    wx.setStorageSync("movieId", e.currentTarget.dataset.id)
    wx.navigateTo({
      url: urlAdd,
    })
  }
})
