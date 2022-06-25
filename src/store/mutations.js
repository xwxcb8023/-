import Cookie from 'js-cookie'
/**
 * 多个可以直接同步更新状态的方法对象模块
* */
import {
  SAVE_ROOMTOKEN,
  SAVE_USER_INFO, SAVE_USER_TYPE
} from "./mutations-type"
export default {
   // 存入roomtoken
   [SAVE_ROOMTOKEN](state,{roomToken}){
     state.RoomToken = roomToken;
   },
   // 存入用户信息
   [SAVE_USER_INFO](state,{userinfo}){
     state.userinfo = userinfo;
     Cookie.set('userinfo',userinfo);
   },
   // 存入用户类型
   [SAVE_USER_TYPE](state,{usertype}){
     state.usertype = usertype
   }
}
