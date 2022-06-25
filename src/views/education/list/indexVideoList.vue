<template>
  <div>
     <ul class="listUls">
        <li class="video">
           <div class="videoImg"><img src="@/assets/img/test.jpg"><div class="cover"></div></div>
           <div class="itemCont">
                 <div class="hoverStatus">
                     <div class="textBox">
                        <h2>微专业课程图片JAVA高级架构师</h2>
                        <p>介绍：Java高级架构师，精通JAVA/高并发/微服务/分布式/中间件，微专业课程图片</p>
                     </div>
                     <div class="payBtnLine">
                       <label>讲师：黄老师<span>已签约</span></label>
                       <el-button type="success" @click="goToLiveRoadcast('roomname','Randy','admin')" class="iconfont icons" round>免费试听</el-button>
                       </div>
                 </div>
                 <div class="defaultItem">
                     <h2>微专业课程图片JAVA高级架构师</h2>
                     <p><span>层级：中级</span> <span>章节：25</span></p>
                     <div class="labels">
                       <label>Spring mybites</label><label>Spring</label>
                       <label>Spring boot</label><label>Spring mybites</label>
                     </div>
                     <div class="listIcon">
                       <span class="iconfont">&#xe7d8; 300</span>
                       <span class="iconfont">&#xe62c; 520</span>
                       <div class="itemPrice">￥<span>199.00</span></div>
                     </div>
                 </div>
           </div>
        </li>
        <li class="video">
            <div class="videoImg"><img src="@/assets/images/plumeria.jpg"><div class="cover"></div></div>
          <div class="itemCont">
            <div class="hoverStatus">
              <div class="textBox">
                <h2>微专业课程图片JAVA高级架构师微专业课程图片JAVA高级架构师微专业课程图片JAVA高级架构师</h2>
                <p>介绍：Java高级架构师，精通JAVA/高并发/微服务/分布式/中间件，
                  微专业课程图片Java高级架构师，精通JAVA/高并发/微服务/分布式/中间件，微专业课程图片微专业课程图片</p>
              </div>
              <div class="payBtnLine">
                <label>讲师：黄老师<span>已签约</span></label>
                <el-button type="success" @click="goToLiveRoadcast('roomname','Imax','user')" class="iconfont icons" round>免费试听</el-button>
              </div>
            </div>
            <div class="defaultItem">
              <h2>微专业课程图片JAVA高级架构师</h2>
              <p><span>层级：中级</span> <span>章节：25</span></p>
              <div class="labels">
                <label>Spring mybites</label><label>Spring</label>
                <label>Spring boot</label><label>Spring mybites</label>
              </div>
              <div class="listIcon">
                <span class="iconfont">&#xe7d8; 300</span>
                <span class="iconfont">&#xe62c; 520</span>
                <div class="itemPrice">￥<span>369.00</span></div>
              </div>
            </div>
          </div>
        </li>
        <li class="video">3</li>
        <li class="video">4</li>
        <li class="video">
           <div class="videoImg"><img src="@/assets/images/plumeria.jpg"></div>
        </li>
       <li class="video">
         <div class="videoImg"><img src="@/assets/images/plumeria.jpg"></div>
       </li>
       <li class="video">4</li>
       <li class="video">
         <div class="videoImg"><img src="@/assets/images/plumeria.jpg"></div>
       </li>
       <li class="video">
         <div class="videoImg"><img src="@/assets/images/plumeria.jpg"></div>
       </li>
       <li class="video">
         <div class="videoImg"><img src="@/assets/images/plumeria.jpg"></div>
       </li>
       <li class="video">
         <div class="videoImg"><img src="@/assets/images/plumeria.jpg"></div>
       </li>
     </ul>
  </div>
</template>

<script>
export default {
  name: "indexVideoList.vue",
  data (){
     return {
       title: '直播中',

     }
  },
  mounted() {
    document.title = this.title
  },
  methods: {
    goToLiveRoadcast (room,userid,permission){
      this.$router.push({
         name:'liveroadcast',
         params:{
           roomName:room,
           userid:userid,
           user:permission
         }
      });
    }
  }
}
</script>

<style scoped>
.listUls{width:100%;height:auto;background:#fff; justify-content: space-between; display:flex;flex-wrap:wrap;}
.listUls .video{height:auto;background:#fff; margin-top:.8rem; border-radius:.3rem; position:relative}
.video:hover .hoverStatus{opacity:1 !important;}
.video:hover .cover{background:rgba(0,0,0,0);}
.cover{background:rgba(0,0,0,.25);transition:all 0.2s linear 0s; width:100%;height:100%;position: absolute;left:0px;top:0px;}
.videoImg{width:100%;position: relative; transition:0.5s;border-top-left-radius:.3rem;border-top-right-radius:.3rem; overflow:hidden}
.videoImg img{width:100%; display:block;object-fit:cover;transition: 0.5s;}
.video:hover{transform:scale(1.02);box-shadow:0rem .6rem 1rem .8rem rgba(0,0,0,.08);z-index:12}
.video:before{border:1px solid #e5e5e5; border-radius:.3rem;content: " ";border-radius:6px;position: absolute;left: 0; top: 0;right: 0;height:200%; width:200%;color: #D9D9D9;
-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scale(0.5);transform: scale(0.5); }

.textBox{width:100%;text-align:left; padding:.8rem .85rem .6rem .85rem;box-sizing:border-box}
.textBox h2{width:100%;max-height:42px;font-size:15px;color:#000;line-height:1.3rem;overflow:hidden;
  text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;}
.textBox p{width:100%;max-height:60px; font-size:13px;color:#adadad;line-height:20px;margin:.4rem 0 0 0;overflow:hidden;
text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;}
.payBtnLine{width:100%;height:52px; padding:.3rem 0 .5rem 0;position:absolute;bottom:.7rem;}
.icons{ border-color:#00be06;transition:all .2s; float:right;margin:1.2rem .8rem;cursor:pointer; font-size:15px; background:#00be06}
.icons:active{background:#00ca06;}
.icons:after{content:'\e63b'}
.icons:hover{background:#00ca06}
.payBtnLine label{float:left;color:#adadad;font-size:12px; position:absolute;bottom:.2rem;left:1rem;}
.payBtnLine label span{position:relative;top:-.15rem;left:.5rem; padding:3px 3px 2px 4px;font-size:10px;box-sizing:border-box;border-radius:5px;color:#00be06}
.payBtnLine label span:before{border:1px solid #00be06;content: " ";border-radius:6px;position: absolute;left: 0; top: 0;right: 0;height:200%; width:200%;color: #D9D9D9;
  -webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scale(0.5);transform: scale(0.5); }
.defaultItem{width:100%;font-size:16px;color:#000;padding:.85rem .85rem 0 .85rem;box-sizing:border-box;
  border-top-left-radius:.3rem;border-top-right-radius:.3rem;}
.defaultItem h2{width:100%;font-size:15px;color:#000;text-align:left;}
.defaultItem p{width:100%;color:#999;font-size:12px;text-align:left;padding:.5rem 0;}
.defaultItem p span{margin:0 1.8rem 0 0;}
.defaultItem .labels{max-height:56px; text-align:left}
.defaultItem label{padding:3px 8px;font-size:12px;color:#b7b6b6;background:#eee;margin:0 8px 8px 0;display:inline-block; border-radius:50px;}
.defaultItem .listIcon{width:100%;height:48px; position:relative;top:.2rem; padding:0 0 .2rem 0; font-size:13px !important;text-align:left;overflow: hidden}
.defaultItem .listIcon span{margin-top:.6rem; color:#afafaf;padding:6px 2rem 2px 0;font-size:13px !important; display:inline-block; float:left}
.defaultItem .listIcon .itemPrice{text-align:left; position:absolute;top:.2rem; right:0rem;color:#00be06;font-size:12px;}
.defaultItem .listIcon .itemPrice span{font-size:18px !important;color:#00be06; padding:0px;float:none}
.itemCont{position:relative}
.hoverStatus{opacity:0;transition:all 0.2s linear 0s; background:#fff;z-index:10; position:absolute;bottom:0px;
  left: 0px;height:100%;border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;}

</style>
