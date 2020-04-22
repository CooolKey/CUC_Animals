// pages/searchDetail/searchDetail.js

const db = wx.cloud.database({});
const cont = db.collection('animals');
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animal_cnt:0,
    animal_now:0,
    animals:[],
    keyword:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keyword=options.keyword
    this.data.keyword=keyword
    //console.log(this.data.keyword)
    db.collection('animals').where(
      _.or([
      {
        name:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        status:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        color:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        sex:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        type:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        personality:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        look:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        health:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      }
    ])
    ).count({
      success:res =>{
        //console.log("wtf:"+res.total)
        this.setData({
          animal_cnt: res.total
        })
        //console.log(this.data.animal_cnt)
      }
    })
    db.collection('animals').where(
      _.or([
      {
        name:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        status:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        color:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        sex:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        type:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        personality:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        look:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      },
      {
        health:{								
          $regex:'.*' + keyword + '.*',
          $options: 'i'
        }
      }
    ])
    ).get({
      success:res =>{
        this.setData({
          animals:res.data,
          animal_now:20
        })
      }
    })
  },

  viewAnimalDetail: function(e) {
    var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../animalDetail/animalDetail?id=" + data.id
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
    var keyword=this.data.keyword
    if (this.data.animal_cnt <= this.data.animal_now) {
      //console.log(this.data.animal_cnt+"<="+this.data.animal_now)
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
  
        db.collection('animals').where(
          _.or([
          {
            name:{								
              $regex:'.*' + keyword + '.*',
              $options: 'i'
            }
          },
          {
            status:{								
              $regex:'.*' + keyword + '.*',
              $options: 'i'
            }
          },
          {
            color:{								
              $regex:'.*' + keyword + '.*',
              $options: 'i'
            }
          },
          {
            sex:{								
              $regex:'.*' + keyword + '.*',
              $options: 'i'
            }
          },
          {
            type:{								
              $regex:'.*' + keyword + '.*',
              $options: 'i'
            }
          },
          {
            personality:{								
              $regex:'.*' + keyword + '.*',
              $options: 'i'
            }
          },
          {
            look:{								
              $regex:'.*' + keyword + '.*',
              $options: 'i'
            }
          },
          {
            health:{								
              $regex:'.*' + keyword + '.*',
              $options: 'i'
            }
          }
        ])
        ).skip(this.data.animal_now).get()
        .then(res => {
          console.log(res);
          let newdata = this.data.animals.concat(res.data);
          //console.log("newdata:"+newdata);
          let adddata = this.data.animal_now;
          adddata = adddata + 20;
          this.setData({
            animal_now: adddata,
            animals: newdata
          })
          //console.log(this.data.animal_now,this.data.animals)
        })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})