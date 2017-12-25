
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity:["上海","北京","广州","深圳","武汉","天津","西安","成都"],
    visitedCity:["成都","北京"]
  },

  changeCity(e){
    let flag = true;
    for (let city of this.data.visitedCity){
      if (city == e.target.dataset.city){
        flag = false;
        break;
      }
    }
    if (!e.target.dataset.location && flag){
      this.setData({
        visitedCity: [...this.data.visitedCity, e.target.dataset.city]
      })
    }
    
    wx.switchTab({
      url: '/pages/movie/movie',
      success(){
        wx.setStorageSync("city", e.target.dataset.city)
      }
    })
  }

})