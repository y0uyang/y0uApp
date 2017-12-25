// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchMovieList:[],
  },

  back(){
    wx.navigateBack();
  },
  searchMovie(e){
    this.setData({
      searchMovieList:[]
    })
    console.log(e.detail.value)
    let searchText = e.detail.value;
    let resoult = [];
    wx.request({
      url: "http://127.0.0.1:8088/movie/find",
      data:{
        chineseName: searchText
      },
      success:(res)=>{
        this.setData({
          searchMovieList: [...this.data.searchMovieList,...res.data]
        })
      }
    })
    wx.request({
      url: "http://127.0.0.1:8088/theatre/find",
      data: {
        chineseName: searchText
      },
      success: (res) => {
        this.setData({
          searchMovieList: [...this.data.searchMovieList, ...res.data]
        })
      }
    })
  }
})