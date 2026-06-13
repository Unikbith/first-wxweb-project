const app = getApp();

Page({
  data: {
    myBookMarks: [],
  },

  onShow() {
    const postList = app.globalData.postList;
    const bookMarkList = app.globalData.bookMarkList;
    const filteredPosts = postList.filter(post => bookMarkList.includes(Number(post.id)));
    this.setData({
      myBookMarks: filteredPosts,
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