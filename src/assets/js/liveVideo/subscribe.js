import {TrackModeSession} from "pili-rtc-web";
let roomToken = '';
let myRoom = '';
async function joinRoom (that,params){
   roomToken = params;
   // 1. 初始化一个房间的Session对象
   myRoom = new TrackModeSession();
   // 2. 将RoomToken传到joinRoomWithToken方法中
   await myRoom.joinRoomWithToken(roomToken);
   // 6.
   autoSubsrcibe (that,myRoom);
}
/**
 * 实时检测房间的 TrackInfo 变化并在合适的时机调用 subscribe
 * myRoom 房间的session (会话)对象
 * */
const autoSubsrcibe = (that,myRoom)=>{
  const trackInfoList = myRoom.trackInfoList;
  /**
   * 调用下面的subscribe方法
   * */
  subscribe(myRoom,trackInfoList)
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
    subscribe(myRoom,trackInfoList)
      .then(() => {

      }).catch( err => {
        console.error("subscribe error",err);
    });
  })
  /**
   * 传入音视频轨并播放媒体
   * myRoom 房间的session (会话)对象
   * trackInfoList 音视频轨信息列表
   */
  async function subscribe (myRoom,trackInfoList){
    /**
     * 通过传入的TrackId调用订阅方法发起订阅，
     * 成功返回相应的Track对象(远端的Track列表)
     */
    const remoteRracks = await myRoom.subscribe(trackInfoList.map(info => info.trackId));
    /**
     * 选择一个元素用于播放订阅的音视频
     */
    const remoteElement = document.getElementById("liveVideo");
    for(const remoteTrack of remoteRracks){
        remoteTrack.play(remoteElement);
    }
  }
}
// 离开房间
const signOutRoom = ()=>{
  myRoom.leaveRoom();
}
export default{
   joinRoom,
   signOutRoom
}
