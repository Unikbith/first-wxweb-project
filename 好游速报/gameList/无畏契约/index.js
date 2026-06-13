const app = getApp();
Page({
  data: {
    imageUrls: [
      '/images/无畏契约/1.jpg',
      '/images/无畏契约/2.jpg',
      '/images/无畏契约/3.jpg',
      '/images/无畏契约/4.jpg'
    ],
    comments: [],
    commentContent: '',
    commentNum: 0,
  },
  onLoad() {
    this.setData({
      comments: app.getComments(),
      commentNum: app.getCommentNum(),
    });
  },
  onCommentInput(e) {
    this.setData({
      commentContent: e.detail.value,
    });
  },
  submitComment() {
    const { commentContent } = this.data;
    const success = app.addComment(commentContent);
    if (success) {
      this.setData({
        comments: app.getComments(),
        commentNum: app.getCommentNum(),
        commentContent: '',
      });
    }
  },

  bookMark(e) {
    const postId = e.currentTarget.dataset.id;
    app.bookMark(postId);
  },

  previewImage(event) {
    const currentUrl = event.currentTarget.dataset.url;
    wx.previewImage({
      current: currentUrl,
      urls: this.data.imageUrls
    });
  }
});