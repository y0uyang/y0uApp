// pages/movieInfo/movieInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike:"true",
    isGoods:false,
    getMore:false,
    movieInfo:{},
    yesterday:0,
    disList:[],
    profList:[],
    totalPeople:0,
    totalProfession:0,
    curMovieId:"",
    curMovieName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let randomNum = parseInt(Math.random() * 30 + 30);
    let movieID = wx.getStorageSync("movieId")
    let thisd = this;
    wx.request({
      url: "http://127.0.0.1:8088/movie/find",
      data:{
        _id: movieID.id,
      },
      success(res){
        thisd.setData({
          movieInfo:res.data,
          yesterday: randomNum,
          isLike:res.data.isLike,
          curMovieId: res.data._id,
          curMovieName: res.data.chineseName
        })
      }
    })
    wx.request({
      url: "http://127.0.0.1:8088/discuss/find",
      data:{
        submitType: "findJoin",
        ref: ["users"]
      },
      success(res){
        let totalPeo = 0;
        let totalPro = 0;
        console.log(res.data)
        let allDis = res.data;
        for (let i of allDis){
          if(isNaN(i.grade)){
            totalPro+=1;
          }else{
            totalPeo+=1;
          }
        }
        let profAry = [...res.data].reverse()
        thisd.setData({
          profList: profAry.slice(0, 3),
          disList: allDis.slice(0,3),
          totalPeople: totalPeo,
          totalProfession: totalPro
        })
      }
    })
  },





  getMoreText(){
    this.setData({
      getMore:!this.data.getMore
    })
  },
  changeGood(e){
    this.setData({
      isGoods: !this.data.isGoods
    })
    console.log(e.target.dataset.disid)
  },
  changeLike(e){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:8088/movie/find',
      data: {
        _id: e.target.dataset.id
      },
      success: function (res) {
        let change;
        if (res.data.isLike == "true") {
          change = "false"
        } else {
          change = "true"
        }
        that.setData({
          isLike : change
        })
        wx.request({
          url: 'http://127.0.0.1:8088/movie/update',
          data: {
            _id: res.data._id,
            isLike: change
          }
        })
      }
    })
  },
  choosetheatre(){
    let urlAdd = "/pages/movieTheatre/movieTheatre?movieId=" + this.data.curMovieId + "&name=" + this.data.curMovieName;
    console.log(urlAdd)
    wx.setStorageSync("movieId", this.data.curMovieId)
    wx.navigateTo({
      url: urlAdd,
    })
  }
})