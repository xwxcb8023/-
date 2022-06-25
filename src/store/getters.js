import Cookie from "js-cookie";

/**
* 服务于state
* */
export default {
  // 获取roomToken的字符长度
  RoomTokenLen(state){
     return state.RoomToken.length;
  },
  getUserInfo(state){
    return state.userinfo !== "" || Cookie.get("userinfo") ? JSON.parse(Cookie.get("userinfo")) : null;
  }
}
