<template>
  <div class="videoPageContent">
    <div class="topLine">
       <liveVideoTop @CancelRelease="cancelpublish"/>
    </div>
    <div class="contentBody">
         <div class="courseCatalogBox" :class="transtions">
             <catalog/>
             <button class="openBtn open iconfont" :class="catalogStatus" @click="CatalogTranstion">目录</button>
         </div>
       <div class="videoContent" @click="eventFunc">
            <!--直播视频组件-->
            <liveVideo ref="callBack"/>
       </div>
       <div class="chatContent chatPosition" :class="chatPosition">
           <div class="shrink iconfont" :class="chatIcon" :style="shrink" @click="chatBox"></div>
           <el-row class="wcschool-live">
             <el-col :span="24">
               <el-tabs v-model="activeName" @tab-click="handleClick">
                   <el-tab-pane label="课堂互动" name="first">
                       <!--课堂互动组件-->
                       <weChat/>
                   </el-tab-pane>
                   <el-tab-pane label="课堂成员" name="second">
                       <!--课堂成员组件-->
                       <chatList/>
                   </el-tab-pane>
               </el-tabs>
             </el-col>
           </el-row>
       </div>
    </div>
  </div>
</template>

<script>
import liveVideoTop from "@/components/liveVideo/liveVideoTopLine";
import liveVideo from "@/components/liveVideo/liveVideo";
import weChat from "@/components/liveVideo/weChat";
import chatList from "@/components/liveVideo/chatList";
import catalog from "@/components/liveVideo/catalog";
export default {
  components :{
    liveVideoTop,
    liveVideo,
    weChat,
    chatList,
    catalog,
  },
  name: "liveroadcast.vue",
  data(){
    return {
      activeName: 'first',
      flag:false,
      transtions:'CatalogTranstion-leave-to',
      catalogStatus:'open',
      shrink:{
        backgroundImage:'url('+require('@/assets/images/shrink.png')+')',
        backgroundPosition:'right center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'auto 100%'
      },
      chatflag:true,
      chatPosition:'shrinkopen',
      chatIcon:'shrinkIcon1'
    }
  },
  watch:{
    transtions(news,old){
      console.log(news,old);
    }
  },
  methods: {
    // 停止发布tranck
    cancelpublish (){
       this.$refs.callBack.StopPublishing();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 目录显示隐藏动画
    CatalogTranstion (){
      if(this.flag){
        this.transtions = 'CatalogTranstion-leave-to';
        this.flag = false;
        this.catalogStatus = 'open';
      }else{
        this.transtions = 'CatalogTranstion-center-to';
        this.flag = true;
        this.catalogStatus = 'close';
      }
    },

    // 打开聊天框
    chatBox (){
       if(this.chatflag){
          this.chatPosition = 'shrinkclose';
          this.chatflag = false;
          this.chatIcon = 'shrinkIcon2'
       }else{
          this.chatPosition = 'shrinkopen';
          this.chatflag = true;
          this.chatIcon = 'shrinkIcon1'
       }
    },
    // 点击视频区域触发的事件
    eventFunc (){
      // 隐藏目录区域
      this.flag = true;
      this.CatalogTranstion ();
    }
  }
}
</script>

<style scoped>
.videoPageContent{display:flex; height:100vh; flex-direction:column;position:relative}
.topLine{width:100%;height:3.2rem; background:#1d1d1d}
.contentBody{flex:1; display:flex;overflow:hidden;position:relative;}
.videoContent{flex:auto; background:#020202;}
.chatContent{width:19rem;display:flex;position:relative; background:#333333}
.wcschool-live{width:100%;}
.wcschool-live div{height:100%;}
.courseCatalogBox{width:18rem;height:100vh;position:absolute;left:-18rem;z-index:1; background:#1a1a1a}
.courseCatalogBox .openBtn{width:2.6rem;height:5.3rem;position:absolute;top:50%;bottom:50%;right:-2.6rem;
transform:translate(0%,-80%);border-top-right-radius:4px;border-bottom-right-radius:4px; color:#aaa;font-size:14px;text-align:left;padding:0 23px 0 9px; box-sizing:border-box;
background:rgba(0,0,0,.8);line-height:22px; border:none; cursor:pointer; outline:none}
.open:after{content:'\e631';font-size:.7rem;font-weight:lighter; position:absolute;top:2.05rem;right:.3rem;}
.close:after{content:'\e631';font-size:.7rem; transform:rotate(180deg); font-weight:lighter; position:absolute;top:2.05rem;right:.3rem;}
.openBtn:hover{background:rgba(0,0,0,.7);}
.CatalogTranstion-center-to{animation:opencatalog .2s linear 0s forwards;}
@keyframes opencatalog {
  0%{left:-18rem;}
  100%{left:0px;}
}
.CatalogTranstion-leave-to{animation:closecatalog .2s linear 0s forwards;}
@keyframes closecatalog {
  0%{left:0px;}
  100%{left:-18rem;}
}
.shrink{width:18px;height:130px;color:#a8a8a8;cursor:pointer; position:absolute;top:50%;bottom:50%;left:-18px;margin:auto;}
.shrinkclose{animation:closeChat .2s linear 0s forwards}
@keyframes closeChat{
  0%{margin-right:0rem;}
  100%{margin-right:-19rem;}
}
.shrinkopen{animation:openChat .2s linear 0s forwards}
@keyframes openChat{
  0%{margin-right:-19rem;}
  100%{margin-right:0rem;}
}
.shrinkIcon1:before{content:'\e638'; font-size:1.2rem; position:absolute;line-height:130px;left:0px;}
.shrinkIcon2:before{content:'\e60a'; font-size:1.2rem; position:absolute;line-height:130px;left:0px;}
</style>
