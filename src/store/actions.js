/**
 * 包含多个间接更新state的方法
* */
import {
  SAVE_ROOMTOKEN,
  SAVE_USER_INFO,
  SAVE_USER_TYPE
} from "./mutations-type"

export default {
   /**存储RoomToken
    * {commit} 对象
    * roomToken 房间秘钥
    */
   saveRoomToken({commit},roomToken){
      commit(SAVE_ROOMTOKEN,{roomToken});
   },
   /**存入用户信息
    * {commit} 对象
    * userinfo 用户信息
   * */
   userlogin({commit},userinfo){
     commit(SAVE_USER_INFO,{userinfo});
   },
   /**
    * {commit} 对象
    * usertype 用户类型
    **/
   getUserType({commit},usertype){
     commit(SAVE_USER_TYPE,{usertype});
   }
}
