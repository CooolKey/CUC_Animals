// pages/gallery/gallery.js

const db = wx.cloud.database({});
const cont = db.collection('photos');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo_cnt:0,
    photo_now:0,
    photos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    db.collection('photos').count({
      success:res =>{
        //console.log("wtf:"+res.total)
        this.setData({
          photo_cnt: res.total
        })
        //console.log(this.data.photo_cnt)
      }
    })
    db.collection('photos').get({
      success:res =>{
        this.setData({
          photos:res.data,
          photo_now:20
        })
      }
    })
  },

  askSave(evt){
    let pic = evt.currentTarget.dataset.pic;
    wx.showModal({
      title: "保存图片到相册",
      success: ({confirm})=>{
        if (confirm) {
          wx.cloud.downloadFile({
            fileID: pic,
            success: res => {
              console.log('下载成功', res)
              this.saveImage(res.tempFilePath)
            },
            fail: res => {
              console.log('下载失败', res)
            }
          })
        }
      }
    })
  },
  saveImage(imgUrl){
    wx.saveImageToPhotosAlbum({
      filePath:imgUrl,
      success(res) { 
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000,
        })
      },
      fail(res) {
        console.log('保存失败', res)
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
    if (this.data.photo_cnt <= this.data.photo_now) {
      //console.log(this.data.photo_cnt+"<="+this.data.photo_now)
      wx.showToast({
        icon: 'none',
        title: '没有更多～'
      })
      }
      else{
        wx.showLoading({
          title: '加载中...',
          duration: 1000
        }),
  
        db.collection('photos').skip(this.data.photo_now).get()
        .then(res => {
          //console.log(res);
          let newdata = this.data.photos.concat(res.data);
          //console.log("newdata:"+newdata);
          let adddata = this.data.photo_now;
          adddata = adddata + 20;
          this.setData({
            photo_now: adddata,
            photos: newdata
          })
          //console.log(this.data.photo_now,this.data.photos)
        })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})