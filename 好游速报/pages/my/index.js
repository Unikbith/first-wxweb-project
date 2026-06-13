const app = getApp();
Page({
    data:{
        userInfo:{
            avatarUrl:"/images/头像.jpg", 
            nickName:"登录/注册",       
        },
        loginStatus:false  
    },
    getUserProfile(){
        wx.getUserProfile({
          desc: '用于用户登录',
          success:(res)=>{ 
              const userInfo=res.userInfo;
              this.setData({
                  userInfo:res.userInfo,
                  loginStatus:true
              });
              app.globalData.userInfo = userInfo;
              app.globalData.loginStatus = true;
              wx.showToast({
                title: '登录成功',
                icon:'success',
                duration:1000
              });
          },
        })
    }
})