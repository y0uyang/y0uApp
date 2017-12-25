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
    totalProfession:0
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
          yesterday: randomNum
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
        for(let i of res.data){
          if(isNaN(i.grade)){
            totalPro+=1;
          }else{
            totalPeo+=1;
          }
        }
        let profAry = res.data.reverse()
        thisd.setData({
          profList: profAry.slice(0, 3),
          disList: res.data.slice(0,3),
          totalPeople: totalPeo,
          totalProfession: totalPro
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
  }
})