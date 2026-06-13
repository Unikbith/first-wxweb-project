const app = getApp();
Page({
    data:{
        imageUrls:
        [
            '/images/三角洲行动/1.jpg',
            '/images/三角洲行动/2.jpg',
            '/images/三角洲行动/3.jpg',
            '/images/三角洲行动/4.jpg'
        ],
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
        const postId = e.currentTarget.dataset.id; // 获取当前帖子的 ID
        app.bookMark(postId); // 调用全局的收藏方法
      },
    previewImage(event){
        const currentUrl = event.currentTarget.dataset.url;
        wx.previewImage({
            current: currentUrl,
            urls: this.data.imageUrls
        })
    }
})
