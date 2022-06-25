<template>
  <div class="topStyle">
     <header class="topContentLine" :class="top.topbgStatus">
       <router-link :to="home"><img :src="top.logo"/> </router-link>
       <nav class="wcschoolMeun">
         <ul class="transitions">
         <router-link to="" tag="li" class="iconfont icon-shouye home" :class="top.menuStatus"><span>首页</span></router-link>
         <router-link to="" tag="li" class="iconfont icon-daohang menu" :class="top.menuStatus"><span>导航</span></router-link>
         <router-link to="" tag="li" class="iconfont icon-iconset0481 playing" :class="top.menuStatus"><span>开讲了</span></router-link>
         <router-link to="" tag="li" class="iconfont icon-shipin pastVideo" :class="top.menuStatus"><span>往期视频</span></router-link>
         </ul>
       </nav>
       <div class="search">
          <input type="text" class="inputbox" :class="top.inputStatus" v-model="value" placeholder="想要搜点什么~"/>
          <label class="hotsearch" :style="hot">热搜榜</label>
          <button type="button" class="iconfont searchbtn searchicon1">搜一搜</button>
       </div>
       <div class="userLoginOrRegister">
           <div class="itemBox" :class="top.item"><h4 class="iconfont icon-shangchuan1 upload"></h4><h3>供稿</h3></div>
           <div class="itemBox" :class="top.item"><h4 class="iconfont icon-history01 history"></h4><h3>观看记录</h3></div>
           <div class="itemBox" :class="top.item" v-if="loginIf">
             <h4 class="iconfont icon-iconyonghu users"></h4>
             <h3>
               <span @click="loginOrRegister(1)">登录</span> |
               <span @click="loginOrRegister(2)">注册</span>
             </h3>
           </div>
           <div class="itemBox" style="cursor:auto" v-else>
              <div class="LoginUserImg"><img :src="getUserInfo.images"/></div>
              <userbox v-if="login"/>
           </div>
       </div>
     </header>
     <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="728px"
      center>
        <!--<span>需要注意的是内容是默认不居中的</span>-->
        <div class="longinContent"><LoginRegister ref="sendLogin" @closeFunc="closeDia"/></div>
     </el-dialog>
  </div>
</template>
<script>
import userbox from "@/components/public/userbox"
// 引用头部样式
import '@/assets/css/public/top.css';
// 静态资源路径
import {topPath} from '@/util/staticPath'
// 公共方法
import {getScrollTop,topStatus} from '@/util/public'
import {mapState,mapGetters,mapActions} from "vuex"
import LoginRegister from "@/components/public/loginRegister"
import Cookie from 'js-cookie'
import {GET_USER_TYPE} from '@/router/urlPath'
export default {
    components:{
      userbox,
      LoginRegister
    },
    name: "topComponent.vue",
    data (){
      return {
        home:'/',
        value:'',
        loginIf:true,
        login:true,
        top:'',
        hot:{
          backgroundImage:"url("+topPath.hotsearch+")",
          backgroundPosition:"left center",
          backgroundSize:".8rem 1rem",
          backgroundRepeat:"no-repeat"
        },
        centerDialogVisible:false,
        config:undefined
      }
    },
    mounted() {
       if(this.$route.path === '/' || this.$route.path === '/home'){
         this.top = {...topStatus.haveBanner};
         // 监听scroll事件并执行pageScrollTop回调
         window.addEventListener('scroll',this.pageScrollTop,true);
       }else {
         this.top = {...topStatus.notBanner}
       }
       this.showUserInfo();
       this.getUserTypeList();
    },
    computed:{
       ...mapState(['userinfo']),
       ...mapGetters(['getUserInfo']),
    },
    methods:{
      ...mapActions(['getUserType']),
      // 监听滚动条位置
      pageScrollTop (){
        let topScroll = getScrollTop();
        if(topScroll > 50){
           this.top = {...topStatus.notBanner}
        }else{
           this.top = {...topStatus.haveBanner}
        }
      },
      // 登录注册
      loginOrRegister(type){
         this.centerDialogVisible = true
         if(this.centerDialogVisible){
           setTimeout(()=>{
             this.$refs.sendLogin.registerFunc(type === 1 ? false:true);
           },10)
         }
      },
      // 关闭登录弹窗
      closeDia(){
        this.centerDialogVisible = false
        this.showUserInfo();
      },
      // 是否显示用户图像
      showUserInfo(){
        if(this.getUserInfo !== null){
          this.loginIf = false;
          this.login = true;
        }
      },
      // 获取用户类型列表
      getUserTypeList(){
        /**获取用户类型**/
        this.axios.get(GET_USER_TYPE).then(result => {
          if(result.code !== 0) return;
          // 将用户类型列表存入vuex中
          this.getUserType(result.data);
        });
      }
    },
    destroyed (){
       // 销毁scroll事件
       window.removeEventListener('scroll',this.pageScrollTop)
    }
}
</script>
<style>
.el-dialog__body{padding:0px !important;}
.topStyle .el-dialog{
  margin-top:0px !important;background:none;box-shadow:0 1px 3px rgba(0,0,0,0);
  position:absolute !important;left:50%;top:50%;transform:translate(-50%,-50%);
}
.topStyle .el-dialog__header{position:relative;z-index:1}
.longinContent{position:relative;top:-30px;}
</style>
