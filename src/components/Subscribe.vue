<template>
    <div>
      <div id="remotetracks" style="width:100%;height:100vh;background:#000"></div>
      <button @click="openRoom">加入房间</button>
    </div>
</template>

<script>
import {StreamModeSession, TrackModeSession} from "pili-rtc-web";

export default {
  name: "Subscribe.vue",
  data () {
    return {
      //RoomToken:"iHw6T150PvKoxtmyqAhrY40GJxkKFsU61kwNNDcC:_3z3ZhuRSzvldHQqrzIWB45c3PM=:eyJhcHBJZCI6ImV6cjg5ZDJ0MyIsInJvb21OYW1lIjoiUmFuZHkiLCJ1c2VySWQiOiJ4d3hjYjgwMjMiLCJleHBpcmVBdCI6MTU5Mjc5MzcxMCwicGVybWlzc2lvbiI6InVzZXIifQ==",
      RoomToken:"",
      myRoom:""
    }
  },
  mounted() {

  },
  methods:{
    openRoom (){
      let that = this;
      let params = {roomName:"Randy",userid:"abcdefj123",user:"user"};
      that.axios.post("/getKey/roomtoken",params).then(res=>{
        console.log("成功返回",res.data.data);
        that.RoomToken = res.data.data;
        that.joinRoom ();
      }).catch(err=>{
        console.log("失败返回",err);
      });
    },
    async joinRoom (){
      // 1. 初始化一个房间的Session对象
      const myRoom = new TrackModeSession();
      // 2. 将RoomToken传到joinRoomWithToken方法中
      await myRoom.joinRoomWithToken(this.RoomToken);
      // 6.
      this.autoSubsrcibe (myRoom);
    },
    /**
     * 实时检测房间的 TrackInfo 变化并在合适的时机调用 subscribe
     * myRoom 房间的session (会话)对象
    * */
    autoSubsrcibe (myRoom){
      const trackInfoList = myRoom.trackInfoList;
      /**
       * 调用下面的subscribe方法
       * */
      this.subscribe(myRoom,trackInfoList)
      .then(() => {
         console.log("subscribe success!");
      }).catch( err => {
         console.error("subscribe error",err);
      });
      /**
       * 添加事件监听，当房间中出现新的Track时就会触发，
       * 参数是TrackInfo列表
      * */
      myRoom.on("track-add", trackInfoList => {
          this.subscribe(myRoom,trackInfoList)
            .then(() => {
              console.log("subscribe success!");
            }).catch( err => {
            console.error("subscribe error",err);
          });
      })
    },

    /**
     * 传入音视频轨并播放媒体
     * myRoom 房间的session (会话)对象
     * trackInfoList 音视频轨信息列表
    */
    async subscribe (myRoom,trackInfoList){
       /**
        * 通过传入的TrackId调用订阅方法发起订阅，
        * 成功返回相应的Track对象(远端的Track列表)
       */
       const remoteRracks = await myRoom.subscribe(trackInfoList.map(info => info.trackId));
       /**
        * 选择一个元素用于播放订阅的音视频
       */
       const remoteElement = document.getElementById("remotetracks");
       for(const remoteTrack of remoteRracks){
         remoteTrack.play(remoteElement);
       }
    }
  }
}
</script>

<style scoped>

</style>
