const app = getApp();

Page({
  data: {
    userComments: [],
  },
  onLoad() {
    this.setData({
      userComments: app.getUserComments(),
    });
  },
});