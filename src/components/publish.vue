<template>
    <div>
      <div id="localtracks" style="width:100%;height:100vh;background:#000"></div>
      <!-- 这里引入我们的 SDK -->
      <button @click="openRoom">加入房间</button>
      <button @click="liveRoom" style="z-index:100;position:relative">退出房间</button>
    </div>
</template>

<script>
import {deviceManager, TrackModeSession} from "pili-rtc-web";

export default {
  name: "publish.vue",
  data () {
    return {
      //RoomToken:"iHw6T150PvKoxtmyqAhrY40GJxkKFsU61kwNNDcC:jwUW5_64fFcN-PFu4qe5jvN1jSs=:eyJhcHBJZCI6ImV6cjg5ZDJ0MyIsInJvb21OYW1lIjoiUmFuZHkiLCJ1c2VySWQiOiJJbWF4IiwiZXhwaXJlQXQiOjE1OTI3OTM3MTAsInBlcm1pc3Npb24iOiJ1c2VyIn0=",
      RoomToken:"",
      myRoom:""
    }
  },
  methods:{
     liveRoom (){
       let res = this.myRoom.leaveRoom();
       console.log("退出来了",res);
     },
     openRoom (){
       let that = this;
       let params = {roomName:"Randy",userid:"hdfgfdg",user:"admin"};
       let promise = that.axios.post("/getKey/roomtoken",params).then(res=>{
         console.log("成功返回",res.data.data);
         that.RoomToken = res.data.data;
         that.joinRoom ();
       }).catch(err =>{
         console.log("失败返回",err);
       });
     },
     async joinRoom (){
       let that = this;
       // 1. 初始化一个房间的Session对象
       that.myRoom = new TrackModeSession();
       // 2. 将RoomToken传到joinRoomWithToken方法中
       await that.myRoom.joinRoomWithToken(that.RoomToken);
       // 6.调用音视频采集函数
       await that.publish(that.myRoom);
     },
    // 3. 实现一个publish函数用于采集并发布自己的媒体流
    async publish (myRoom){
      // 4. 调用采集模块采集本地音频和视频数据，返回一个包含这些数据的Stream对象
      const localTracks = await deviceManager.getLocalTracks({
        audio:  { enabled: true, tag: "audio" },
        video:  { enabled: true, tag: "video", width: 1280, height: 720},
        screen: { enabled: true, tag: "screen", width:2000, height:1700},
      });
      console.log("调起摄像头");
      console.log("track 1 tag is", localTracks[0].info.tag);
      console.log(localTracks[0].info.track);
      // 5. 将刚刚的Stream对象发布到房间中
      await myRoom.publish(localTracks);
      const localElement = document.getElementById("localtracks");
      // 采集本地的Track
      for(const localTrack of localTracks){
        // 如果这是麦克风采集的Track，外面就不播放它
        if(localTrack.info.tag == "audio") continue;
        // 调用Track对象的play方法在这个元素下播放视频轨
        localTrack.play(localElement,true);
      }

    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
