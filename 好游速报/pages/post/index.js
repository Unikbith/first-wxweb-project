// pages/post/index.js
const app = getApp();

Page({
  data: {
    imagePaths: [],
    postTitle: '',
    postContent: '',
    postGame:'',
    imageIcon:'',
  },
  onTapSelectIcon() {
    this.selectImageIcon();
  },
  // 输入标题
  titleInput(e) {
    this.setData({
      postTitle: e.detail.value,
    });
  },

  gameInput(e) {
    this.setData({
      postGame: e.detail.value,
    });
  },

  // 输入正文
  contentInput(e) {
    this.setData({
      postContent: e.detail.value,
    });
  },

  // 发帖
  send() {
    if (!app.globalData.userInfo || !app.globalData.loginStatus) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000,
        });
        setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/index',
            });
          }, 900);
        return;
      }
    const { postTitle, postContent, postGame, imagePaths, imageIcon} = this.data;  
    const postId = new Date().getTime();
    app.globalData.postList.push({
      id: postId,
      gameName:postGame,
      title: postTitle,
      content: postContent,
      imageIcon:[imageIcon],
      images: imagePaths,
    });
    wx.showToast({
      title: '发帖成功',
      icon: 'success',
    });
    this.setData({
        postTitle: '',
        postContent: '',
        postGame: '',
        imageIcon: '',
        imagePaths: [],
      });
    setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index',
        });
      }, 900);
  },

  selectImage() {
    const that = this;
    wx.chooseMedia({
      count: 3,
      mediaType: ['image'],
      sourceType: ['album'],
      success(res) {
        if (res.tempFiles && res.tempFiles.length > 0) {
          const tempFilePaths = res.tempFiles.map((file) => file.tempFilePath); // 获取所有图片路径
          that.setData({
            imagePaths: tempFilePaths, // 保存到 data 中
          });
        } else {
          console.error('未选择图片');
        }
      },
      fail(err) {
        console.error('选择图片失败', err);
      },
    });
  },

  selectImageIcon() {
    const that = this;
    wx.showToast({
      title: '请选择图标',
      icon:'none',
    })
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success(res) {
        const tempFilePath = res.tempFiles[0].tempFilePath;
          that.setData({
            imageIcon: tempFilePath, // 保存到 data 中
        });
    }
})
},

  previewImage(e) {
    const { index } = e.currentTarget.dataset;
    const { imagePaths } = this.data;
    if (imagePaths.length === 0) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none',
      });
      return;
    }
    wx.previewImage({
      current: imagePaths[index], // 当前点击的图片
      urls: imagePaths, // 所有图片
    });
  },
});