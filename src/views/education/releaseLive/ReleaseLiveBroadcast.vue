<template>
  <div>
     <Top/>
     <div class="inputContent">
       <div class="middleBox">
         <step ref="step"/>
         <transition name="myfade" mode="out-in">
          <keep-alive>
             <stepOne v-if="showPage === 1" @callback1="pageDataResult"/>
             <stepTwo v-else-if="showPage === 2" @backPage="backPrev" @callback2="pageDataResult"/>
             <stepThree v-else-if="showPage === 3" @backPage="backPrev" @callback3="pageDataResult"/>
          </keep-alive>
         </transition>
       </div>
     </div>
  </div>
</template>

<script>
import Top from "@/components/public/topComponent"
import stepOne from "@/views/education/releaseLive/stepOne"
import stepTwo from "@/views/education/releaseLive/stepTwo"
import stepThree from "@/views/education/releaseLive/stepThree"
import step from "@/views/education/releaseLive/step"

import {RELEASE_LIVE} from "@/router/urlPath"
import {replaceImgSrc} from "@/util/public"
export default {
  components:{
    Top,
    step,
    stepOne,
    stepTwo,
    stepThree
  },
  name: "ReleaseLiveBroadcast.vue",
  data() {
    return {
      showPage:1,   // 显示哪一页
      saveData:{
        courseTitle:'',   // 课程标题
        coverImg:'',      // 课程封面
        courseLabel:[],   // 课程标签
        introduce:'',     // 课程简介
        lecturer:'',      // 讲师
        startTime:'',     // 开始时间
        chapters:[],      // 课程章节
        summary:''        // 课程概要
      }
    }
  },
  methods:{
    // 提交发布直播信息
    uploadReleaseLive (){
      //let formData = new FormData();
      let Data={
        "courseTitle":this.saveData.courseTitle,
        "courseLabel":this.saveData.courseLabel,
        //"userId":this.$store.state.RoomToken,
        "userId":123456789,
        "coverImg":this.saveData.coverImg,
        "introduce":this.saveData.introduce,
        "lecturer":this.saveData.lecturer,
        "startTime":this.saveData.startTime,
        "chapters":this.saveData.chapters,
        "summary":this.saveData.summary
      };
      console.log(Data)
      let promise = this.axios.post(RELEASE_LIVE,Data);
      promise.then(res => {
         console.log(res);
      }).catch(err => {
         console.log(err);
      })
    },
    pageDataResult (params){
        this.showPage = params.page
        this.$refs.step.stepFunction(this.showPage)
        if(params.page === 2) {
          console.log(params)
          this.saveData.courseTitle = params.data.courseTitle
          this.saveData.coverImg = params.data.coverImg
          this.saveData.courseLabel = params.data.courseLabel
          this.saveData.introduce = params.data.introduce
          this.saveData.lecturer = params.data.lecturer
          this.saveData.startTime = params.data.startTime
        }else if(params.page === 3){
          this.saveData.chapters = params.data
        }else if(params.page === 4){
          this.saveData.summary = params.data.summary
          this.uploadReleaseLive ()

        }
    },
    backPrev (params){
       this.showPage = params
    }
  }
}
</script>
<style scoped>
.inputContent{width:100%;height:100vh;position:absolute; background:#f2f2f2}
.middleBox{width:900px;height:100vh;margin:auto; padding-top:3.3rem;box-sizing:border-box;display:flex;flex-direction:column}
.myfade-enter{opacity: 0;}
.myfade-enter-active{transition: opacity 1s;}
</style>
