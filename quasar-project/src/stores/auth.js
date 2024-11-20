import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: {
      id: null, //用户唯一标识
      username: null,//用户登录账号名
      nickname: null,//用户名
      img: null,//用户头像
    }
  }),
  getters:{
      getUser: (state) => state.user,
  },
  actions: {
    login(userInfo) {
      this.isLoggedIn = true;
      this.user.id = userInfo.id; // 存储用户 ID
      this.user.username = userInfo.username; // 存储用户名
      this.user.nickname = userInfo.nickname;
      this.user.img = userInfo.img;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = {
        id: null,
        username: null,
      }; // 重新设置用户对象
    },
  },
});
