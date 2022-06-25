<template>
   <div class="inputcontBox">
       <!--输入设置章节-->
       <div class="inputLine">
          <label class="titleName"><span>第{{chapters.length + 1}}章节</span></label>
          <div class="inputbox">
            <input type="text" class="input"
                   v-model="saveChapter"
                   @keyup="eventChapter"
                   @keydown="saveChapterFunc"
                   placeholder="设置章节：请输入30字符以内的章节简要，并按Enter回车键"/>
            <p v-if="chapterStatus">{{chapterText}}</p>
          </div>
       </div>
       <!--每一章节-->
       <div v-show="chapters.length === 0 ? false : true">
           <div class="chapters" v-for="(item,index) in chapters">
              <div class="chapter">
                  <h1 class="chapterTitle"><label>第{{index + 1}}章节</label></h1>
                  <div class="chapterText">{{item.name}}</div>
                  <div class="deleteIcon"><i class="iconfont del" @click="deleteChapter(index)"></i></div>
              </div>
              <ul class="classHours">
                 <li v-for="(child,ind) of item.classHourArr">
                     <p class="titleLine"><label>课时{{child.id}}</label></p>
                     <div class="contents"><p>{{child.classHour}}</p></div>
                     <div class="subtract"><i class="iconfont" @click="deleteClassHour(index,ind)"></i></div>
                 </li>
                 <li v-if="(index + 1) === chapters.length && config ? true : false">
                     <p class="titleLine"><label>课时{{saveIndex}}</label></p>
                     <div class="contents">
                       <input type="text"
                          v-model="classHour"
                          @keyup="eventClassHour"
                          @keydown="saveClassHour(this,index)"
                          placeholder="设置课时：请输入30字以内课时简要内容，并按Enter回车键"/>
                       <dt v-if="classHourStatus">{{classHourText}}</dt>
                     </div>
                     <div class="subtract"></div>
                 </li>
              </ul>
           </div>
       </div>
       <!--按钮-->
       <div class="wcschool-btn">
         <button type="button" class="prevBtn" @click="prevEvent">上一步</button>
         <button type="button" class="buttonBtn" @click="nextPageThree">下一步</button>
       </div>
   </div>
</template>
<script>
export default {
   name: "stepTwo.vue",
   data (){
      return {
         saveChapter:'',
         chapters:[],
         classHour:'',
         indexes:0,
         saveIndex:1,
         config:true,
         chapterStatus:false,
         chapterText:undefined,
         classHourStatus:false,
         classHourText:undefined
      }
   },
   methods:{
      /**
      *  设置章节
      * */
      saveChapterFunc (e){
         let event = window.event || e;
         let code = event.keyCode || event.which || event.charCode;
         //if(this.chapters.length === 10) return
         if(code === 13 && this.saveChapter === ''){
           this.chapterStatus = true
           this.chapterText = '章节不能为空'
           return;
         }
         if (code === 13 && this.saveChapter !== '') {
            this.config = true
            this.chapterStatus = false
            this.classHourStatus = false
            /** 判断每个章节下必须有一个课时**/
            if(this.chapters.length > 0 && this.chapters[this.chapters.length - 1].classHourArr.length === 0 && this.classHour === ''){
              this.classHourStatus = true
              this.classHourText = "第"+(this.chapters.length)+"章节至少需有一个课时"
              return;
            }
            this.chapters.push({name:this.saveChapter,classHourArr:[]});
            this.saveChapter = '';
            if(this.classHour === '' || this.classHour === undefined) return;
            this.saveLastClassHour(this.chapters.length - 1)
         }
      },
      /** 章节输入框键盘抬起检测入口框是否有值**/
      eventChapter(){
        if(this.saveChapter !== ''){
          this.chapterStatus = false
        }
      },
      /** 课时输入框键盘抬起检测入口框是否有值**/
      eventClassHour(){
        if(this.classHour !== ""){
          this.classHourStatus = false
        }
      },
      /**
       *  设置课时
      * */
      saveClassHour (e,index){
         let event = window.event || e;
         let code = event.keyCode || event.which || event.charCode;
         //if(this.chapters[index].classHourArr.length === 10) return
         if (code === 13) {
            if(this.classHour !== ""){
              this.indexes = this.chapters.length > 1 ? this.indexes = this.indexes + 1 : this.chapters[index].classHourArr.length + 1
              this.saveIndex = this.saveIndex + 1
              this.chapters[index].classHourArr.push({id:this.indexes,classHour:this.classHour});
              this.classHour = ''
              this.classHourStatus = false
            }else{
              this.classHourStatus = true
              this.classHourText = "课时不能为空"
              return
            }
         }
      },
      /** 设置章节时判断课时输入框是否有值，有值则写入课时列表**/
      saveLastClassHour(index){
         this.indexes = this.chapters.length > 1 ? this.indexes = this.indexes + 1 : this.chapters[index].classHourArr.length + 1
         this.saveIndex = this.saveIndex + 1
         this.chapters[index - 1].classHourArr.push({id:this.indexes,classHour:this.classHour});
         this.classHour = ''
      },
      /**
      *  删除章节
      * */
      deleteChapter (index){
         let n = this.chapters[index].classHourArr.length
         this.chapters.splice(index,1)
         if(this.chapters.length === 0){
            this.saveIndex  = 1
            return false
         }else{
           this.chapters.slice(index).forEach(item => item.classHourArr.forEach(ite => ite.id = ite.id - n))
           this.saveIndex = this.chapters[this.chapters.length - 1].classHourArr[this.chapters[this.chapters.length - 1].classHourArr.length - 1].id + 1
           this.indexes = this.chapters[this.chapters.length - 1].classHourArr[this.chapters[this.chapters.length - 1].classHourArr.length -1].id;
         }
      },
      /**
      *  删除课时
      * */
      deleteClassHour (index,ind){
         this.chapters[index].classHourArr.splice(ind,1)
         if(this.chapters[index].classHourArr.length === 0) {
            this.saveIndex  = 1
            return false
         }
         this.chapters[index].classHourArr.slice(ind).forEach(item=>{
            item.id = item.id - 1;
         });
         this.indexes = this.chapters[this.chapters.length - 1].classHourArr[this.chapters[this.chapters.length - 1].classHourArr.length -1].id;
         for(let i = 0; i < this.chapters.slice(index + 1).length; i++){
             this.chapters.slice(index + 1)[i].classHourArr.forEach(ite => ite.id = ite.id - 1)
         }
         this.saveIndex = this.chapters[this.chapters.length - 1].classHourArr[this.chapters[this.chapters.length - 1].classHourArr.length - 1].id + 1
      },
      /** 下一步 **/
      nextPageThree (){
         /** 如果点下一步则判断课时输入框是否有值，
          *  如果有值则写入课时列表中，如果没有值
          *  则不作写入操作
          * **/
         if(this.classHour !== "" && this.classHour !== undefined){
           this.chapters[this.chapters.length - 1].classHourArr.push({id:this.indexes + 1,classHour:this.classHour});
           this.classHour = ""
           this.saveIndex = this.saveIndex + 1
           this.indexes = this.indexes + 1
         }
         if(this.chapters.length === 0){
           this.chapterStatus = true
           this.chapterText = '至少需添加一个章节'
           return
         }else if(this.chapters[this.chapters.length - 1].classHourArr.length === 0){
           this.classHourStatus = true
           this.classHourText = "每章节至少需有一个课时"
           return
         }
         this.$emit('callback2',{data:this.chapters,page:3})
      },
     /**
      *  返回上一页
      * */
      prevEvent (){
         this.$emit('backPage',1)
      }
   }
}
</script>
<style>body{background:#f2f2f2}</style>
<style scoped>
.inputcontBox{width:100%;}
.inputLine{width:100%;height:auto;margin:0 auto 15px auto;padding:18px 35px; box-sizing:border-box; display:flex;
  background:#fff;box-shadow:0px 9px 10px 5px rgba(0,0,0,.03);border-radius:3px;position:relative}
.inputLine:hover{box-shadow:0px 9px 10px 5px rgba(0,0,0,.05);}
.titleName{min-width:80px;max-width:80px; font-size:16px;font-weight:bolder; color:#333;text-align:left; position:relative}
.titleName span{width:100%;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.inputbox{flex:1;display:flex;height:auto; margin-left:10px;position:relative}
.inputbox p{display:inline-block;position:absolute;left:34px;bottom:-17px;color:#ff0000;font-size:13px;}
.inputbox .input{width:100%;flex:1;font-size:15px; position:relative;top:2px; margin-left:50px;border:none}
.input::-webkit-input-placeholder{color:#ccc;}
.input::-ms-input-placeholder{color:#ccc;}
.chapters{width:100%;float:left; margin:8px 0;background:#fff;}
.chapters .chapter{width:100%;display:flex;align-content:center; font-size:.8rem;padding:8px 36px;box-sizing:border-box;position:relative;}
.chapter:after{width:200%;height:200%;content:'';transform:scale(0.5);position:absolute;left:-50%; right:-50%;top:-50%;bottom:-50%;
border-bottom:1px solid #e5e5e5;}
.chapterTitle{min-width:80px;max-width:80px;text-align:left;color:#777;font-size:16px;position:relative}
.chapterTitle label{width:100%;display:inline-block;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.chapterText{flex:1;padding:10px;margin-left:50px;box-sizing:border-box;font-size:15px;font-weight:bolder;position:relative;top:2px; z-index:1; color:#777;text-align:left;}
.deleteIcon{width:30px; position:relative;z-index:1}
.deleteIcon .del{width:23px;height:23px;line-height:23px;font-size:24px;color:#ff0000;
position:absolute;top:50%;right:0%;transform:translate(0%,-50%);}
.del:before{content:'\e64d';}
.classHours{width:100%;padding:0 15px 0 45px;box-sizing:border-box}
.classHours li{width:100%;font-size:14px;display:flex;position:relative;top:-1px}
.classHours li:after{width:200%;height:200%;content:'';transform:scale(0.5);position:absolute;left:-50%; right:-50%;top:-50%;bottom:-50%;
  border-bottom:1px solid #e5e5e5;}
.titleLine{min-width:70px;max-width:70px;text-align:left;text-indent:20px; position:relative;}
.titleLine label{width:100%;display:inline-block;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.contents{flex:1;margin-left:63px;color:#333; position:relative;z-index:1}
.contents input{width:100%;border:none;z-index:1; font-size:14px; position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
input::-webkit-input-placeholder{color:#ccc;}
.contents p{width:100%;text-align:left; position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.contents dt{position:absolute;bottom:1px;left:0px;color:#ff0000;font-size:13px;}
.subtract{min-width:63px;max-width:63px;height:51px; position:relative;z-index:1}
.subtract i{width:23px;height:23px;color:#ff0000; font-size:24px; display:inline-block;margin:14px auto;}
.subtract i:before{content:'\e64c';}
.wcschool-btn{width:100%;float:left;margin-top:60px;margin-bottom:30px;position:relative}
.buttonBtn{width:165px; margin-left:20px;padding:15px 20px;color:#fff;font-size:15px;background:#049f01;border:none;
  outline:none;border-radius:3px;cursor:pointer}
.prevBtn{width:165px;margin-right:20px;font-size:15px;background:#b3b3b3;cursor:pointer;box-sizing:border-box;padding:15px 20px;border-radius:3px; color:#fff;border:none;}
.buttonBtn:active{background:#039000;}
.prevBtn:active{background:#a1a0a0;}
</style>
