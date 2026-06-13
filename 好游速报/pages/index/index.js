// pages/index/index.js
const app = getApp();

Page({
  data: {
    imageUrls: [
      '/images/imageIcon/米塔.jpg',
      '/images/imageIcon/三角洲行动.jpg',
      '/images/imageIcon/无畏契约.jpg',
      '/images/imageIcon/胜利女神.jpg',
      '/images/imageIcon/道友请留步.jpg',
      '/images/imageIcon/迷途之光.jpg',
    ],
    postList: [],
  },

  onShow() {
    this.setData({
      postList: app.globalData.postList,
    });
  },
  previewImage(event) {
    const currentUrl = event.currentTarget.dataset.url;
    wx.previewImage({
      current: currentUrl,
      urls: this.data.imageUrls,
    });
  },
});