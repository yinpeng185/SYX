// pages/follow/follow.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '关注', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    kg: false,
    dishi: true,
    showView: false,
    navH: app.globalData.navHeight,
    iddd: '',
    hname: '',
    dec: '',
    img: '',
    rimg: "",
  },

  goto_detail: function (e) {
    let article = e.currentTarget.dataset.id;
    let shu = e.currentTarget.dataset.shu;
    let userhid = e.currentTarget.dataset.userhid;
    if (shu > 0) {
      wx.navigateTo({
        url: '/pages/comment/comment?id=' + article + '&shu=' + shu + '&userhid=' + userhid,
      });
    } else {
      this.setData({
        pl: true
      })
    }

  },

  get_profit: function (e) { //  点击地址获取收益
    let comment_id = e.currentTarget.dataset.id;
    let longitude = e.currentTarget.dataset.longitude;
    let latitude = e.currentTarget.dataset.latitude;
    let name = e.currentTarget.dataset.name;
    let address = e.currentTarget.dataset.address;
    let img = e.currentTarget.dataset.img;
    
    wx.request({
      url: app.globalData.url + 'Profit/userProfit',
      method: 'GET',
      data: {
        user_id: app.globalData.userInfo.id,
        comment_id: comment_id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(data) {
        console.log(data)

      }
    });

    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: name,
      address: address
    })

    wx.request({
      url: app.globalData.url + 'Search/address',
      method: 'GET',
      data: {
        user_id: app.globalData.userInfo.id,
        address: address,
        addressname:name,
        xpoint: latitude,
        ypoint: longitude,
        image: img,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(data) {
        console.log(data)
        console.log("关注图片", data)
        console.log(name)
        console.log(address)

      }
    });



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
    this.setData({
      navH: app.globalData.navHeight,
      show_fenxiang: false,
      avatarUrl: app.globalData.userInfo.avatarUrl,
    })
    this.get_list_info();
  },

  get_list_info: function () {
    var that = this;
    console.log(app.globalData);
    wx.request({
      url: app.globalData.url + 'Home/userGuanzhu',
      method: 'GET',
      data: {
        user_id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('关注信息')
        console.log(res.data);
        // console.log(res.data.image)
        let sub_data = res.data;
        for (let i = 0; i < sub_data.length; ++i) {
          if (sub_data[i].description.length > 70) {
            sub_data[i].description = sub_data[i].description.substr(0, 70) + '...';
          }
        }
        that.setData({
          guanzhuInfo: res.data,
        })

      },
      fail: function (data) {
        console.log(data);
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  showfxqx: function () {

    this.setData({
      show_fenxiang: false
    })
  },

  showfx: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.idd);
    this.setData({
      show_fenxiang: true,
      iddd: e.currentTarget.dataset.idd,
      hname: e.currentTarget.dataset.hname,
      dec: e.currentTarget.dataset.dec,
      img: e.currentTarget.dataset.img,
      rimg: e.currentTarget.dataset.rimg,
    })
  },
  // /生成海报
  share: function () {
    // console.log(this.data.details.image[0])
    wx.navigateTo({
      url: '/pages/index/details/share/index?id=' + this.data.iddd + '&urlimg=' + this.data.img[0] + '&r_image=' + this.data.rimg + '&name=' + this.data.dec
    })

    this.setData({
      show_fenxiang: false,
    })

  },
  // 海报返回

  // /生成 长图
  chshare: function () {
    wx.navigateTo({
      url: '/pages/index/details/chshare/index?id=' + this.data.iddd + '&urlimg=' + this.data.img + '&r_image=' + this.data.rimg + '&name=' + this.data.hname
    })
    this.setData({
      show_fenxiang: false,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 点赞、评论、收藏开关
  onKgtop: function () {

    this.setData({
      kg: 1
    })

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
  /**取消ann */
  onQx: function () {
    console.log("onqx");
    this.setData({
      dishi: false,
    })
  },
  /**我知道按钮 */
  onWo: function () {
    console.log("onwo");
    this.setData({
      dishi: false,
    })
  },
  /**点赞和评论和收藏的开关 */

  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.get_list_info();
  },


  onPostTap: function (e) {
    console.log(e)
    var that = this;
    var hhArr = this.data.guanzhuInfo;
    var item_id = e.currentTarget.dataset.dzid;
    var item_indexx = e.currentTarget.dataset.indexx;
    console.log(item_id)
    var cookie_mid = wx.getStorageSync('zan') || []; //获取全部点赞的mid       
    if (hhArr[item_indexx]) {
      var hasChange = hhArr[item_indexx].hasChange;
      if (hasChange !== undefined) {
        var onum = hhArr[item_indexx].user_praise;
        if (!hasChange) {
          hhArr[item_indexx].user_praise = (onum - 1);
          hhArr[item_indexx].hasChange = true;
          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_praise: hhArr[item_indexx].user_praise,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);

            }
          })
        } else {


          hhArr[item_indexx].user_praise = (onum + 1);
          hhArr[item_indexx].hasChange = false;
          // console.log(hhArr[item_indexx].user_praise)

          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_praise: hhArr[item_indexx].user_praise,
              comment_id: item_id

            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);

            }
          })



        }
        for (var i = 0; i < hhArr.length; i++) {
          if (hhArr[i].id == item_id) { //遍历找到对应的id
            if (cookie_mid.includes(item_id)) { //说明已经点过赞,取消赞   
              for (var j = 0; j < cookie_mid.length; j++) {
                console.log(cookie_mid[j])
                if (cookie_mid[j] == item_id) {
                  cookie_mid.splice(j, 1); //删除取消赞的mid 
                }
              }
              // console.log(cookie_mid)
              wx.setStorageSync('zan', cookie_mid);
            } else {
              cookie_mid.unshift(item_id); //新增赞的mid
              wx.setStorageSync('zan', cookie_mid);
            }
          }
        }
        this.setData({
          guanzhuInfo: hhArr
        })
      }
    }
  },
  onPostTapc: function (e) {
    console.log(e)
    var that = this;
    var hhArr = this.data.guanzhuInfo;
    var item_id = e.currentTarget.dataset.dzid;
    var item_indexx = e.currentTarget.dataset.indexx;
    console.log(item_id)
    var cookie_mid = wx.getStorageSync('zan') || []; //获取全部点赞的mid       
    if (hhArr[item_indexx]) {
      var hasChangesc = hhArr[item_indexx].hasChangesc;
      if (hasChangesc !== undefined) {
        var onum = hhArr[item_indexx].user_collection;
        if (!hasChangesc) {
          hhArr[item_indexx].user_collection = (onum - 1);
          hhArr[item_indexx].hasChangesc = true;
          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_collection: hhArr[item_indexx].user_collection,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);

            }
          })
        } else {


          hhArr[item_indexx].user_collection = (onum + 1);
          hhArr[item_indexx].hasChangesc = false;
          // console.log(hhArr[item_indexx].user_praise)

          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_collection: hhArr[item_indexx].user_collection,
              comment_id: item_id

            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);

            }
          })



        }
        for (var i = 0; i < hhArr.length; i++) {
          if (hhArr[i].id == item_id) { //遍历找到对应的id
            if (cookie_mid.includes(item_id)) { //说明已经点过赞,取消赞   
              for (var j = 0; j < cookie_mid.length; j++) {
                console.log(cookie_mid[j])
                if (cookie_mid[j] == item_id) {
                  cookie_mid.splice(j, 1); //删除取消赞的mid 
                }
              }
              // console.log(cookie_mid)
              wx.setStorageSync('zan', cookie_mid);
            } else {
              cookie_mid.unshift(item_id); //新增赞的mid
              wx.setStorageSync('zan', cookie_mid);
            }
          }
        }
        this.setData({
          guanzhuInfo: hhArr
        })
      }
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      desc: this.data.dec,
      path: 'pages/index/details/index?id=' + this.data.iddd,
      success: function (res) {
        //这是我自定义的函数，可替换自己的操作
        util.showToast(1, '发送成功');
      },
      //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
      fail: function () {
        util.showToast(0, '朋友代付转发失败...');
      }
    }
  },

  previewImage: function (e) {
    console.log(e)
    console.log("图片放大")
    var faimg = e.currentTarget.dataset.faimg
    var index = e.currentTarget.dataset.index
    var src = e.currentTarget.dataset.src
    console.log(src)
    console.log(index)
    console.log(faimg)
    var src = faimg[index]
    wx.previewImage({
      current: src,
      urls: faimg,
    })
  },
  goto_home: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/setup/homepage/homepage?id=' + id,
    });
  },

  /**
   * 显示评论框
   */
  onShowCommentTap: function (e) {


    this.setData({
      show_comment: true,
    });
  },

  /**
   * 隐藏评论框
   */
  onHideCommentTap: function () {
    this.setData({
      show_comment: false
    });
  },
  onCommentSubmit: function (e) {
    this.setData({
      show_comment: false
    });
  },
})