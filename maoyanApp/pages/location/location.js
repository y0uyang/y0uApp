
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity: [{
      city: "上海",
      visited: true,
    }, {
      city: "北京",
      visited: true,
    }, {
      city: "广州",
      visited: false,
    }, {
      city: "深圳",
      visited: false,
    }, {
      city: "武汉",
      visited: false,
    }, {
      city: "天津",
      visited: false,
    }, {
      city: "西安",
      visited: false,
    }, {
      city: "成都",
      visited: true,
    }],
  },

  changeCity(e) {
    let idx = e.target.dataset.city
    let cityAry = this.data.hotCity;
    cityAry[idx].visited = true;
    let chooseCity = cityAry[idx].city;
    this.setData({
      hotCity: cityAry
    })
    let pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      let prePage = pages[pages.length - 2];
      //关键在这里
      prePage.changeCity(chooseCity)
    }
    wx.switchTab({
      url: '/pages/movie/movie',
    })
  }

})