// pages/buyTicket/buyTicket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pleaseChoose:"请先选座",
    confirmChoose:"确认选座",
    sessionMsg:{},
    month:0,
    date:0,
    isToday:"",
    beforeChange:[],
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
    }else{
      this.setData({
        theOnlyId: wx.getStorageSync("theOnlyId")
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
          sessionId:res.data._id,
          sessionMsg:res.data,
          month: sessionMonth,
          date: sessionDate,
          isToday:str,
          beforeChange: res.data.videoHall[0].seat,
          seatsList:res.data.videoHall[0].seat,
          theatreName: res.data.theatre[0].name,
          videoHallId:res.data.videoHall[0]._id
        })
      }
    })
  },
  chooseSeat(e){
    let that = this;
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
            that.setData({
              chooseSeats: [],
              seatsList: that.data.beforeChange
            })
          } else if (res.cancel) {
            that.setData({
              chooseSeats: [],
              seatsList: that.data.beforeChange
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
  confirmBuy(){
    let that = this;
    let confirmSeatsList = this.data.seatsList;
    for (let row in confirmSeatsList){
      for (let line in confirmSeatsList[row]){
        if (confirmSeatsList[row][line].b == 2){
          confirmSeatsList[row][line].b = 1
        }
      }
    }
    wx.request({
      url: "http://127.0.0.1:8088/videoHall/update",
      data:{
        _id: that.data.videoHallId,
        seat: confirmSeatsList
      },
      success:(res)=>{
         wx.request({
          url: "http://127.0.0.1:8088/session/find",
          data: {
            _id: that.data.sessionId,
            submitType: "findJoin",
            ref: ["videoHall", "movie", "theatre"]
          },
          success: (res) => {
            console.log(res)
            that.setData({
              seatsList: res.data.videoHall[0].seat,
              chooseSeats: []
            })
          }
        })
      }
    })
   
  }
})