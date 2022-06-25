<template>
  <nav class="liveVideoTopLine">
     <div class="courseTitle">
         <label class="tip">当前课程：</label><span>Spring第三方拓张接口展接口源码解析</span>
         <el-button type="success" v-if="!stopBtn" class="addButton iconfont">免费报名</el-button>
     </div>
     <div class="operationOption">
         <div class="topItem">
             <!--<el-button  @click="Unpublish" v-if="stopBtn">停止发布</el-button>-->
             <div v-if="!stopBtn" class="itemsBtn">
               <el-button>给老师点赞</el-button>
               <el-button>评论</el-button>
               <el-button>分享</el-button>
               <el-button>咨询老师</el-button>
               <el-button>投诉</el-button>
               <el-button class="iconfont more"></el-button>
             </div>
             <el-button class="userItem">
               <img src="@/assets/images/user.png">
             </el-button>
         </div>
     </div>
  </nav>
</template>

<script>
export default {
  name: "liveVideoTopLine.vue",
  data(){
    return {
      stopBtn: false
    }
  },
  mounted(){
    this.stopBtn = this.$route.params.user === 'admin' ? true : false;
  },
  methods:{
    Unpublish(){
      this.$emit("CancelRelease")
    }
  }
}
</script>

<style scoped>
.liveVideoTopLine{width:100%;min-width:957px;height:3.2rem;padding:0 20px;box-sizing:border-box; display:flex;align-items:center;justify-content:center;
font-size:.95rem;font-weight:lighter; color:#aaaaaa;white-space:nowrap; position:relative}
.courseTitle {color:#aaaaaa;}
.tip{color:#f0f0f0;}
.operationOption{flex:1;}
.topItem{float:right;font-size:.9rem;display:flex;align-items:center}
.topItem button{float:left;padding:0px; background:none;border:none; margin:0 1.5rem 0 1.3rem;cursor:pointer;}
.more:before{content:'\e67a';font-size:1.3rem;}
.userItem{max-height:2rem;max-width:2rem;min-width:2rem;min-height:2rem;background:#eee;margin-right:0px !important; border-radius:100%}
.userItem img{width:100%; object-fit:cover;border-radius:100%;}
.addButton{background:#01b006;margin-left:18px; font-size:.85rem;font-weight:lighter; border-color:#01b006}
.addButton:hover{background:#01be07}
.addButton:active{background:#00a705}
.addButton:before{content:'\eaa1';font-size:.75rem;font-weight:bold; margin-right:5px;}
.topItem button:focus,.topItem button:hover{color:#01be07}
.itemsBtn{position:relative;top:3px}
</style>
