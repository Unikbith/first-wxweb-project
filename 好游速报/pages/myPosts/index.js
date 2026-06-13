const app = getApp();

Page({
  data: {
    myPosts: [],
  },

  onShow() {
    const postList = app.globalData.postList;
    const filteredPosts = postList.slice(3);
    this.setData({
      myPosts: filteredPosts,
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