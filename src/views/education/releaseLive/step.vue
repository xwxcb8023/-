<template>
    <div class="stepNumber">
       <ul class="stepUl">
          <li :class="step1.statusStyle1">
              <div class="leftbox">
                <p :class="step1.statusStyle2"
                   :style="Number.isFinite(step1.num)?'font-size:1.1rem':'font-size:1.5rem;line-height:28px'"
                   class="icon iconfont">{{step1.num}}</p>
              </div>
              <div class="rightbox">
                  <div class="textCont"><h3 class="title"><span>{{step1.title}}</span></h3><div class="cont"><p></p></div></div>
                  <p class="textP">{{step1.text}}</p>
              </div>
          </li>
          <li :class="step2.statusStyle1">
              <div class="leftbox">
                 <p :class="step2.statusStyle2"
                    :style="Number.isFinite(step2.num)?'font-size:1.1rem':'font-size:1.5rem;line-height:28px'"
                    class="icon iconfont">{{step2.num}}</p>
              </div>
              <div class="rightbox"><div class="textCont"><h3 class="title"><span>{{step2.title}}</span></h3><div class="cont"><p></p></div></div>
                 <p class="textP">{{step2.text}}</p>
              </div>
          </li>
          <li :class="step3.statusStyle1">
                <div class="leftbox">
                  <p :class="step3.statusStyle2"
                     :style="Number.isFinite(step3.num)?'font-size:1.1rem':'font-size:1.5rem;line-height:28px'"
                     class="icon iconfont">{{step3.num}}</p>
                </div>
                <div class="rightbox"><div class="textCont"><h3 class="title"><span>{{step3.title}}</span></h3><div class="cont"><p></p></div></div>
                <p class="textP">{{step3.text}}</p>
              </div>
          </li>
          <li :class="step4.statusStyle1">
                <div class="leftbox">
                  <p :class="step4.statusStyle2"
                     :style="Number.isFinite(step4.num)?'font-size:1.1rem':'font-size:1.5rem;line-height:28px'"
                     class="icon iconfont">{{step4.num}}</p>
                </div>
                <div class="rightbox"><div class="textCont"><h3 class="title"><span>{{step4.title}}</span></h3><div class="cont"><p></p></div></div>
                <p class="textP">{{step4.text}}</p>
              </div>
          </li>
       </ul>
    </div>
</template>
<script>
//正在进行的In Progress
export default {
  name: "step.vue",
  data (){
     return {
        step1:{
          title:'正在进行的In Progress',
          text:'填写课程信息',
          num:1,
          statusStyle1:'statusB',
          statusStyle2:'status2'
        },
        step2:{
          title:'创建课时 Create Class',
          text:'创建课件章节、课时内容',
          num:2,
          statusStyle1:'statusA',
          statusStyle2:'status1'
        },
        step3:{
          title:'填写概要 Summary',
          text:'填写课程概要',
          num:3,
          statusStyle1:'statusA',
          statusStyle2:'status1'
        },
        step4:{
          title:'完成 Waiting',
          text:'课件发布成功',
          num:4,
          statusStyle1:'statusA',
          statusStyle2:'status1'
        }
     }
  },
  mounted() {

  },
  methods: {
     stepFunction (num){
        if (num === 1) {
           this.step1.num = 1
           this.step1.title = '正在进行的 In Progress'
           this.step1.statusStyle1 = 'statusB'
           this.step1.statusStyle2 = 'status2'

           this.step2.num = 2
           this.step2.title = '创建课时 Create Class'
           this.step2.statusStyle1 = 'statusA'
           this.step2.statusStyle2 = 'status1'

           this.step3.num = 3
           this.step3.title = '填写概要 Summary'
           this.step3.statusStyle1 = 'statusA'
           this.step3.statusStyle2 = 'status1'

           this.step4.num = 4
           this.step4.title = '完成 Waiting'
           this.step4.statusStyle1 = 'statusA'
           this.step4.statusStyle2 = 'status1'
        }else if(num === 2){
           this.step1.num = '\ue63a'
           this.step1.title = '完成的 Finished'
           this.step1.statusStyle1 = 'statusA'
           this.step1.statusStyle2 = 'status1'

           this.step2.num = 2
           this.step2.title = '正在进行的 In Progress'
           this.step2.statusStyle1 = 'statusB'
           this.step2.statusStyle2 = 'status2'

           this.step3.num = 3
           this.step3.title = '填写概要 Summary'
           this.step3.statusStyle1 = 'statusA'
           this.step3.statusStyle2 = 'status1'

           this.step4.num = 4
           this.step4.title = '完成 Waiting'
           this.step4.statusStyle1 = 'statusA'
           this.step4.statusStyle2 = 'status1'
        }else if(num === 3){
          this.step1.num = '\ue63a'
          this.step1.title = '完成的 Finished'
          this.step1.statusStyle1 = 'statusA'
          this.step1.statusStyle2 = 'status1'

          this.step2.num = '\ue63a'
          this.step2.title = '完成的 Finished'
          this.step2.statusStyle1 = 'statusA'
          this.step2.statusStyle2 = 'status1'

          this.step3.num = 3
          this.step3.title = '正在进行的 In Progress'
          this.step3.statusStyle1 = 'statusB'
          this.step3.statusStyle2 = 'status2'

          this.step4.num = 4
          this.step4.title = '完成 Waiting'
          this.step4.statusStyle1 = 'statusA'
          this.step4.statusStyle2 = 'status1'
        }else if (num === 4){
          this.step1.num = '\ue63a'
          this.step1.title = '完成的 Finished'
          this.step1.statusStyle1 = 'statusA'
          this.step1.statusStyle2 = 'status1'

          this.step2.num = '\ue63a'
          this.step2.title = '完成的 Finished'
          this.step2.statusStyle1 = 'statusA'
          this.step2.statusStyle2 = 'status1'

          this.step3.num = '\ue63a'
          this.step3.title = '完成的 Finished'
          this.step3.statusStyle1 = 'statusA'
          this.step3.statusStyle2 = 'status1'

          this.step4.num = '\ue63a'
          this.step4.title = '已完成 Waiting'
          this.step4.statusStyle1 = 'statusB'
          this.step4.statusStyle2 = 'status2'
        }
     }
  }
}
</script>
<style scoped>
.stepNumber{width:100%;min-height:8rem;position:relative;}
.stepUl{width:100%;height:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.stepUl li{width:25%;height:50px;float:left;display:flex;}
.stepUl li .leftbox{min-width:32px;position:relative}
.icon{width:32px;height:32px;border-radius:100%;font-size:1.1rem;position:absolute;margin:auto;top:55%;bottom:45%;}
.status1{border:1px solid #a1a0a0;line-height:30px;box-sizing:content-box; box-sizing:border-box}
.status2{color:#fff;line-height:32px; background:#3d3d3d}
.statusA{color:#a1a0a0;}
.statusB{color:#3d3d3d;}
.rightbox{flex:auto;margin-left:8px; position:relative;display:flex;flex-direction:column;}
.textCont{flex:1;display:flex;position: relative;top:2px}
.textP{width:100%;height:20px;font-size:13px;color:#aeaeae;text-align:left;position: relative;top:-2px}
.title{min-width:30px;height:28px;font-size:14px;display:table;}
.title span{width:100%;display:table-cell;vertical-align:middle;}
.cont{flex:1;display:flex;margin-left:5px; margin-right:5px; position:relative}
.cont p{width:100%;height:1px;position:absolute;margin:auto;top:50%;bottom:50%;background:#999 }
</style>
