const app = getApp();
Page({
  data: {
    post: null,
    comments: [],
    commentContent: '',
    commentNum: 0, 
  },

  onLoad(options) {
    const postId = Number(options.id);
    const postList = app.globalData.postList;
    const post = postList.find(item => Number(item.id) === postId); // 转换为数字进行比较
    
    if (post) {
      this.setData({ post });
    } else {
      wx.showToast({
        title: '帖子不存在',
        icon: 'none',
      });
      wx.navigateBack();
    }
    this.setData({
        comments: app.getComments(postId),
        commentNum: app.getCommentNum(postId),
      });
  },
  onCommentInput(e) {
    this.setData({
      commentContent: e.detail.value,
    });
  },
  submitComment() {
    const {commentContent, post} = this.data;
    const postId = post.id;
    const success = app.addComment(postId,commentContent);
    if (success) {
      this.setData({
        comments: app.getComments(postId),
        commentNum: app.getCommentNum(postId),
        commentContent: '',
      });
    }
  },

  bookMark(e) {
    const postId = e.currentTarget.dataset.id;
    app.bookMark(postId);
  },

  previewImage(e) {
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls: this.data.post.images,
    });
  },
});