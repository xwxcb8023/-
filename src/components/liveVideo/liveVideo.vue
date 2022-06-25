<template>
    <div class="video_Content_Box" id="cover">
         <div id="liveVideo"></div>
         <div class="bottomLine">
             <span class="time">01:30:00</span>
             <span class="iconfont" :class="playBtn" @click="playOrSuspend"></span>
             <span class="iconfont" :class="stopBtn" v-if="isAdmin" @click="StopEventFun"></span>
             <span class="iconfont" :class="videoSize" @click="videoSizeEvent"></span>
             <span class="iconfont voice"></span>
         </div>
    </div>
</template>
<script>
import {GET_ROOM_TOKEN} from '@/router/urlPath'
import {fullScreen,exitFullScreen} from '@/util/public'
import localFlow from '@/assets/js/liveVideo/localFlow'
import subscribe from '@/assets/js/liveVideo/subscribe'
import {mapState,mapActions} from "vuex"
export default {
  name: "liveVideo.vue",
  data (){
    return {
      isAdmin:true,            // 是不是管理员
      roomToken:'',            // 直播间秘钥
      ifPlay:true,             // 是否播放
      playBtn:'suspend',       // 播放按钮样式
      ifStop:false,            // 是否停止直播
      stopBtn:'stopbtn1',      // 停止直播按钮样式
      video_default_Size:true, // 是否全屏
      videoSize:'enlarge',     // 全屏按钮样式
      users:[],
      room:this.$route.params.roomName,
    }
  },
  watch:{
    users:{
       deep:true,
       handler:function (n,o) {
          let users = JSON.parse(JSON.stringify(n));
          console.log(users);
       }
    }
  },
  computed:{
    ...mapState(['RoomToken','myRoom'])
  },
  created() {
    // 当前用户是不是管理员身份
    this.isAdmin = this.$route.params.user === 'admin' ? true:false;
  },
  mounted() {
    let params = {
      roomName:this.$route.params.roomName,
      userid:this.$route.params.userid,
      user:this.$route.params.user
    };
    let promise = this.axios.post(GET_ROOM_TOKEN,params);
    promise.then(res => {
        this.roomToken = res.data;
        // 将roomtoken写入数据中心
        this.saveRoomToken(this.roomToken);
        this.goJoinNow(this.RoomToken);
    }).catch(err => {
         console.log(err);
    })
  },
  destroyed(){
     // 当前用户是否是管理员身份退出房间
     if(this.isAdmin){
       localFlow.signOutRoom();
     }else{
       subscribe.signOutRoom();
     }
  },
  methods: {
    /**发送一个action写入直播间秘钥
     * saveRoomToken action写入方法
     */
     ...mapActions(['saveRoomToken']),
     /**分别进入直播间
      * roomToken 直播间秘钥
      */
     goJoinNow(roomToken){
        if(this.$route.params.user === "admin"){
          // 管理员加入房间
          localFlow.joinRoom(this,roomToken);
        }else{
          // 普通用户加入房间
          subscribe.joinRoom(this,roomToken);
        }
     },
     /**
      * 暂停 or 播放
      */
     playOrSuspend (){
        this.ifPlay = !this.ifPlay;
        this.playBtn = this.ifPlay ? 'suspend':'play'
     },
    /**
     * 停止直播
     */
     StopEventFun (){
        if(this.ifStop) return
        this.ifStop = true;
        this.stopBtn = this.ifStop ? 'stopbtn2':'stopbtn1';
        localFlow.unPublishLive();
     },
    /**
     * 视频是否全屏
     */
     videoSizeEvent(){
        this.video_default_Size = !this.video_default_Size;
        this.videoSize = this.video_default_Size ? 'enlarge':'narrow';
        let element = document.getElementById("cover");
        this.video_default_Size ? exitFullScreen(element):fullScreen(element);
     },
     /**
      * 停止直播
      */
     StopPublishing (){
        localFlow.unPublishLive()
     }

  }
}
</script>
<style scoped>
#liveVideo{width:100%;height:100%;position:relative}
.video_Content_Box{height:100%; position:relative}
.bottomLine{width:100%;height:3.1rem;z-index:11;display:table;position:absolute;left:0px;bottom:0px;background:#1d1d1d}
.bottomLine .time{float:left; margin:1.2rem 0 0 1rem; font-size:.8rem;color:#adadad}
.voice{width:1.5rem;height:1.5rem;font-size:25px;float:right;position:relative;top:.8rem;right:2.8rem;color:#adadad;}
.voice:before{content:'\e63f'}
.enlarge{width:1.5rem;height:1.5rem;font-size:19px;float:right;position:relative;top:1rem;right:1rem;color:#adadad;}
.enlarge:before{content:'\e658'}
.stopbtn1{padding:.1rem;color:#adadad;font-size:23px; float:left;margin:.8rem 0 0 .8rem;}
.stopbtn1:before{content:'\e63d'}
.stopbtn2{padding:.1rem;color:#666;font-size:23px; float:left;margin:.8rem 0 0 .8rem;}
.stopbtn2:before{content:'\e63d'}
.suspend{padding:.1rem;color:#adadad;font-size:20px; float:left;margin:.9rem 0 0 1rem;}
.suspend:before{content:'\e63c'}
.play{padding:.1rem;color:#adadad;font-size:20px; float:left;margin:.9rem 0 0 1rem;}
.play:before{content:'\e65d'}
.narrow{width:1.5rem;height:1.5rem;font-size:17px;float:right;position:relative;top:1.1rem;right:1rem;color:#adadad;}
.narrow:before{content:'\e640'}
</style>
