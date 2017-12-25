// pages/buyTicket/buyTicket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionMsg:{},
    month:0,
    date:0,
    isToday:"",
    seatsList:[],
    chooseSeats:[],
    theatreName:"",
    theOnlyId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.theOnlyId){
      this.setData({
        theOnlyId: options.theOnlyId
      })
    }
    wx.request({
      url: "http://127.0.0.1:8088/session/find",
      data:{
        _id: this.data.theOnlyId,
        submitType: "findJoin",
        ref: ["videoHall","movie","theatre"]
      },
      success:(res)=>{
        let today = new Date;
        let sessionDate = res.data.date.substr(8, 2);
        let sessionMonth = res.data.date.substr(5, 2);
        let str="";
        switch (sessionDate - today.getDate() ){
          case 0: 
            str = "今天";
            break;
          case 1:
            str = "明天";
            break;
          case 2:
            str = "后天";
            break;
          default:
            str = "上映日期"
        }
        wx.setNavigationBarTitle({
          title: res.data.movie[0].chineseName
        })
        this.setData({
          sessionMsg:res.data,
          month: sessionMonth,
          date: sessionDate,
          isToday:str,
          seatsList:res.data.videoHall[0].seat,
          theatreName: res.data.theatre[0].name
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
  chooseSeat(e){
    //行
    let row = e.target.dataset.row ;
    //列
    let line = e.target.dataset.line ;
    // let choosedSeat = 
    let nowChoose = (row + 1) + "排" + (line + 1) + "座";
    let newChoosedSeats = [...this.data.chooseSeats];
    let isSameSeat = true;
    if (newChoosedSeats.length<4){
      for (let i in newChoosedSeats){
        if(nowChoose == newChoosedSeats[i]){
          newChoosedSeats.splice(i,1);
          isSameSeat = false;
          break;
        }
      }
      if(isSameSeat){
        newChoosedSeats.push(nowChoose)
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '最多只能选择4个座位',
        success:(res) => {
          if (res.confirm) {
            this.onLoad();
            this.setData({
              chooseSeats: []
            })
          } else if (res.cancel) {
            this.onLoad();
            this.setData({
              chooseSeats: []
            })
          }
        }
      })
    }
    let newAry = [...this.data.seatsList];
    if (newAry[row][line].b == 2){
      newAry[row][line].b = 0;
    }
    else if (newAry[row][line].b == 0){
      newAry[row][line].b = 2;
    }
    this.setData({
      seatsList: newAry,
      chooseSeats:newChoosedSeats
    })
  },
})