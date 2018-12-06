// pages/my/setup/setup.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '设置', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    showModalStatus: false
  },
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function() {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭抽屉
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    // 显示抽屉
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      userInfo: app.globalData.userInfo,

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  // 分享
  showfx: function() {
    this.setData({
      show_fenxiang: true
    })
  },

  showfxqx: function() {
    this.setData({
      show_fenxiang: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  gerxxTop: function() {
    wx.navigateTo({
      url: './information/information',
    })
  },

  dzTop: function() {
    wx.navigateTo({
      url: './mypraise/mypraise',
    })
  },
  privacyTop: function() {
    wx.navigateTo({
      url: './privacy/privacy',
    })
  },

  newsTop: function() {
    wx.navigateTo({
      url: './news/news',
    })
  },
  opinionTop: function() {
    wx.navigateTo({
      url: './opinion/opinion',
    })
  },
  aboutshaiTop: function() {
    wx.navigateTo({
      url: './aboutshai/aboutshai',
    })
  },

  shpTop: function() {
    wx.navigateTo({
      url: './shopcoo/shopcoo',
    })
  },

  homepageTop: function() {
    wx.navigateTo({
      url: './draft/draft',
    })
  },

  share: function() {
    wx.navigateTo({
      url: '../share/index?id=' + this.data.userInfo.id + '&urlimg=' + this.data.userInfo.avatarUrl + '&name=' + this.data.userInfo.nickName
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log(this.data.userInfo.id)
    // if (options.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(options.target)
    // }
    return {
      desc: '江湖救急，还请贵人伸手相助啊!',
      path: '/pages/my/setup/homepage/homepage?id='+ this.data.userInfo.id,

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

 
})