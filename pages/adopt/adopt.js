// pages/adopt/adopt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animalData:{
      id: 0,
      name: "小白",
      alias:[ ],
      avatarId: 123,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(!(options.name && options.id)){
      wx.showToast({
        title: '参数错误',
        icon: "none",
        duration: 2000,

      })
    }else{
      this.setData({name: options.name, id: options.id})
    }
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

  }
})