import {deviceManager, TrackModeSession} from "pili-rtc-web";
import {bsearch} from '@/util/public'
let roomToken = '';
let myRoom = '';
let tracks;
let reackID = [];
async function joinRoom (that,params){
   roomToken = params;
   // 1. 初始化一个房间的Session对象
   myRoom = new TrackModeSession();
   // 2. 将RoomToken传到joinRoomWithToken方法中
   await myRoom.joinRoomWithToken(roomToken);
   // 6.
   await publish(that,myRoom);
}

async function publish (that,myRoom){
    console.log("轨道信息---->",myRoom);
    // 4. 调用采集模块采集本地音频和视频数据，返回一个包含这些数据的Stream对象
    const localTracks = await deviceManager.getLocalTracks({
       audio:  { enabled: true, tag: "audio" },
       /*video:  { enabled: true, tag: "video", width: 1280, height: 720},*/
       screen: { enabled: true, tag: "screen", width:2000, height:1700},
    });

    // 设置音量
    tracks = localTracks;
    /*for(let i=0;i<tracks.length;i++){
      if(tracks[i].info.tag === 'audio'){
         tracks[i].setVolume(1);
         console.log(tracks[i].getVolume());
      }
    }*/

    // 5. 将刚刚的Stream对象发布到房间中
    await myRoom.publish(localTracks);
    //console.log(localTracks);
    const localElement = document.getElementById("liveVideo");
    // 采集本地的Track
    for(const localTrack of localTracks){
       // 如果这是麦克风采集的Track，外面就不播放它
       if(localTrack.info.tag == "audio") continue;
       // 调用Track对象的play方法在这个元素下播放视频轨
       localTrack.play(localElement,true);
       reackID.push(localTracks[0].mediaTrack.id);
       reackID.push(localTracks[1].mediaTrack.id);
       //reackID.push(localTracks[2].mediaTrack.id);
       reackID = Array.from(new Set(reackID));
    }
    /**
     * 进入直播间后将直播间的用户
     * userId添加到users数组中
    * */
    that.users = myRoom.users.map( item => {
        if(!that.users.includes(item.userId)){
            return item.userId
        }
    })
    /** 监听直播间有新用户进来
     *  如果有用户进来就把新用
     *  户userid加入到users数组中
     * */
    myRoom.on("user-join",user => {
      if(!that.users.includes(user.userId)){
        that.users.unshift(user.userId);
      }
    })
    /** 监听直播间有新用户退出
     *  将退出直播间的用户userid从users
     *  数组中删除
     * */
    myRoom.on("user-leave",user => {
      let index = bsearch(that.users,user.userId);
      that.users.splice(index,1);
    })

}
// 离开房间
const signOutRoom = ()=>{
   myRoom.leaveRoom();
}

// 取消发布并释放音视频轨
const unPublishLive = () => {
   // 1. 取消音视频发布
   myRoom.unpublish(tracks.map(track => track.info.trackId));
   // 2. 释放音视频轨迹
   for(const track of tracks){
     track.release();
     track.once("ended", () => {
         console.log("track ended!");
     })
   }
   // 静音 黑屏
   myRoom.muteTracks([
    { trackId:reackID[0], muted: false },
    { trackId:reackID[1], muted: false},
    { trackId:reackID[2], muted: false},
   ]);
}
export default {
  joinRoom,
  signOutRoom,
  unPublishLive
};
