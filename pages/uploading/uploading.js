// pages/uploading/uploading.js

const db = wx.cloud.database({});
const cont = db.collection('wait');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    images: [],
    upper: "",
    maxCount: 1,
    pic: "",
  },

  preview(evt){
    let current = evt.target.dataset.current;
    wx.previewImage({
      urls: this.data.images,
      current: current
    })
  },

  askRemove(evt){
    let idx = evt.target.dataset.idx;
    wx.showModal({
      title: "删除图片？",
      success: ({confirm})=>{
        if (confirm) {
          let images = this.data.images;
          images.splice(idx, 1);
          this.setData({images: images})
        }
      }
    })
    console.log(idx)
  },

  upload: function(){
    wx.chooseImage({
      count: this.data.maxCount-this.data.length,
      success: (res)=>{
        let images = res.tempFilePaths.concat(this.data.images);
        console.log(res.tempFiles)
        if(images.length<=this.data.maxCount) this.setData({images: images});
        else{
          wx.showToast({
            title: `一次只能上传${this.data.maxCount}张图片`,
            icon: "none"
          })
        }
      }
    })
  },

  submit: function(){
    if(this.data.upper.length>0){
      console.log(this.data.images, this.data.upper);
      // this.upload()
      let filePath = this.data.images[0];
      const picName = Math.random() * 1000000;
      const cloudPath = picName + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传图片] 成功：', res)
          /*that.setData({
            pic: res.fileID,
          });*/
          let fileID = res.fileID;
          let name = this.data.name;
          let upper = this.data.upper;
          db.collection("wait").add({
            data: {
              name: name,
              upper: upper,
              pic: fileID,
            },
            success: function () {
              wx.showToast({
                title: '图片存储成功',
                'icon': 'none',
                duration: 3000
              })
            },
            fail: function () {
              wx.showToast({
                title: '图片存储失败',
                'icon': 'none',
                duration: 3000
              })
            }
          }); 
        },
        fail: e => {
          console.error('[上传图片] 失败：', e)
        },
        complete: () => {
          wx.hideLoading()
        }
      });

      wx.navigateBack({
        complete: (res) => {
          wx.showToast({
            title: '打卡成功',
            icon: 'success',
            duration: 2000,
          })
        },
      })
    }else{
      wx.showToast({
        title: '名字为空',
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.setData({
      name: options.name
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