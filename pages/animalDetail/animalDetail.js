// pages/animalDetail/animalDetail.js

const db = wx.cloud.database({});
const cont = db.collection('animals');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animalData:{}
  },

  /*animalState(state){
    console.log("WTF")
    return this.states[state];
  },

  toAdoptPage(){
    wx.navigateTo({url: `/pages/adopt/adopt?id=${this.data.animalData.id}&name=${this.data.animalData.name}`})
  },*/

  clockIn: function(e) {
    /*我想能在每次打卡时获取打卡地点，也有助于我们跟踪小动物
    wx.getLocation({success: (res)=>{
      save(res)
    }})
    */
    var data = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset.name)
		wx.navigateTo({
			url: "../uploading/uploading?name=" + data.name
		})
  },

  viewGallery: function(e) {
    var data = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset.name)
		wx.navigateTo({
			url: "../animalGallery/animalGallery?name=" + data.name
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

/*
  setAnimalData(id){
    this.setData({
      animalData: wx.cloud.callFunction({
        name: "animalData",
        data: {
          id: id
        }
      })
    })
  },
*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    db.collection('animals').doc(id).get({
      success:res =>{
        this.setData({
          animalData:res.data
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

  }
})