<template>
    <el-form class="inputcontBox" :model="params" ref="params" :rules="rules">
        <el-form-item label="课程标题" class="inputLine" label-width="108px" prop="courseTitle">
          <el-input v-model="params.courseTitle" class="input" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="课程介绍" class="inputLine" label-width="108px" prop="introduce">
          <el-input v-model="params.introduce" class="input" placeholder="请简要描述一下课程内容"/>
        </el-form-item>
        <div class="inputLine">
           <div style="width:33.33%; margin-left:30px" class="width33 first">
             <el-form-item label="课程讲师" prop="lecturer">
               <el-select v-model="params.lecturer" placeholder="请选择讲师" ref="selectCh">
                 <el-option
                   v-for="item in cities"
                   :key="item.userId"
                   :label="item.name"
                   :value="item.userId">
                   <span style="float: left">{{ item.name }}</span>
                   <span style="float: right; color: #8492a6; font-size: 13px">{{ item.labelType }}</span>
                 </el-option>
               </el-select>
             </el-form-item>
           </div>
           <div style="width:33.33%" class="width33 middle">
             <el-form-item label="开课时间" prop="startTime">
                 <el-date-picker v-model="params.startTime" type="datetime" :picker-options="expireTimeOption" placeholder="请选择开课时间"></el-date-picker>
             </el-form-item>
           </div>
           <div style="width:33.33%" class="width33 threeDom">
             <el-form-item label="课程学费">
                <el-input-number :controls="false" @change="setPrice" :precision="2" :max="100000000" v-model="params.price" placeholder="请输入金额"></el-input-number>
             </el-form-item>
           </div>
        </div>
        <el-form-item label="课程标签" label-width="108px" class="inputLine">
           <el-input @keydown.native="saveLabels" v-model="params.label" class="input" placeholder="请输入课程标签后按回车键确定，如：Javascript"/>
        </el-form-item>
        <div id="labelsBox" v-if="params.courseLabel.length=== 0 ? false : true">
          <label class="iconfont items" v-for="(item,index) of params.courseLabel"><i @click="deleteItem(index)" class="iconfont">&#xe635;</i>{{item}}</label>
        </div>
        <div class="inputLine" style="margin-top:15px;">
          <label class="titleName"><i>*</i><span>课程封面</span></label>
          <div class="inputbox">
            <div class="uploadContent">
              <i class="is topLeft"></i><i class="is bottomLeft"></i>
              <i class="is topRight"></i><i class="is bottomRight"></i>
              <input type="file" class="inputUpload" id="getPhoto" @change="uploadFile"/>
              <div class="uploadImgBox" :style="uploadImg"><img :src="params.base64"/></div>
            </div>
          </div>
        </div>
        <el-form-item class="wcschool-btn">
           <el-button type="primary" class="buttonBtn" @click="nextEvent('params')">下一步</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import {compressPicture,compress} from "@/util/public"
import {GET_TEACHERS} from "@/router/urlPath"

export default {
  name: "stepOne.vue",
  data() {
    return {
      expireTimeOption: {
        // 当前日期之后不可选
        /*disabledDate(date) {
          return date.getTime() > Date.now();
        },*/
        // 当前日期之前不可选
        disabledDate(date) {
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      params:{
        courseTitle:'',
        introduce:'',
        lecturer:'',
        startTime:'',
        courseLabel:[],
        coverImg:'',
        label:'',
        price:undefined,
        base64:''
      },
      rules: {
        courseTitle:[{ required: true, message: '课程标题不能为空', trigger: 'blur' }],
        introduce:[{ required: true, message: '课程描述不能为空', trigger: 'blur' }],
        lecturer:[{ required: true, message: '任课老师不能为空', trigger: 'blur' }],
        startTime:[{ required: true, message: '开播时间不能为空', trigger: 'blur' }],
        //label:[{ required: true, message: '课程标签不能为空', trigger: 'blur' }],
      },
      uploadImg:{
        backgroundImage:'url('+require('@/assets/images/upload.png')+')',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% auto',
      },
      cities: [],
    }
  },
  watch:{
    base64:function (val) {
       return this.base64 = val;
    },
    lecturer:function (val) {
       console.log(val);
    }
  },
  created() {
    this.initGetTeacher();
  },
  methods:{
    /** 输入课程标签 **/
    saveLabels (e){
       let event = window.event || e;
       let code = event.keyCode || event.which || event.charCode;
       if(this.params.courseLabel.length === 10) return
       if (code === 13) {
          this.params.courseLabel.push(this.params.label);
          this.params.label = '';
       }
    },
    /** 获取讲师列表 **/
    initGetTeacher(){
       this.axios.get(GET_TEACHERS,{params:{'parentId':'123456789'}}).then(res => {
         this.cities = res.data.data
       })
    },
    /** 输入进入获取金额 **/
    setPrice(){
      this.params.price = this.params.price + '';
      if(this.params.price.indexOf(".") === -1){
        this.params.price = this.params.price + '.00'
      }else if(this.params.price.indexOf(".") !== -1 && this.params.price.substring(this.params.price.indexOf(".") + 1).length < 2){
        this.params.price = this.params.price + '0'
      }
    },
    /** 删除课程标签 **/
    deleteItem (index){
       this.params.courseLabel.splice(index,1)
    },
    /** 读取封面文件 **/
    uploadFile (file){
      let that = this;
      //this.coverImg = file.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = ()=>{
         // base64压缩
         /*compressPicture(reader.result,500,resultBase64);
         function resultBase64(base64){
            that.base64 = base64
         }*/
         compress(reader.result,800,0.6).then(res => {
            that.params.base64 = res
         })
      }
    },
    /** 回调(将数据返回给父组件) **/
    nextEvent(params){
      this.$refs[params].validate((valid) => {
        if (valid) {
            let obj = {
              courseTitle:this.params.courseTitle,
              introduce:this.params.introduce,
              lecturer:this.$refs.selectCh.selected.label,
              startTime:this.params.startTime,
              courseLabel:this.params.courseLabel,
              price:this.params.price,
              coverImg:this.params.base64
            }
            let result = {data:obj,page:2}
            this.$emit("callback1",result)
        }
      })
    }
  }
}
</script>
<style>
body{background:#f2f2f2}
.el-input__inner{border:none;position:relative;height:18px;line-height:18px;font-size:14px;}
.el-scrollbar__wrap{overflow-x:scroll}
.el-input__prefix{position:absolute;left:90%;}
.el-icon-date:before{position:relative;}
.el-input__icon{line-height:18px}
.el-input__suffix{left:90%}
.el-form-item{margin-bottom:0px;position:relative;}
.el-input-number{line-height:1px}
.el-input-number.is-without-controls .el-input__inner{text-align:left}
.curriculum .el-input__inner{padding-right:0px !important; padding-left:0px !important;}
.el-form-item__content{flex:auto; display:flex; margin-left:20px !important;}
.el-form-item__error{left:15px;top:70% !important;}
.first .el-form-item__error{left:35px;}
.middle .el-form-item__error{left:20px;}
.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{position:relative;top:3px}
.width33 .el-form-item__content{padding-left:20px !important;}
.threeDom .el-form-item__content{position:relative; top:11px}
.middle{padding:0 15px;}
.middle .el-input--prefix .el-input__inner{padding-left:0px;}
</style>
<style lang="less" scoped>
@textColor:red;
.test{color:@textColor}
.inputcontBox{width:100%;}
.inputLine{width:100%;height:auto;margin:0 auto 15px auto;padding:6px 20px; box-sizing:border-box; display:flex;
  background:#fff;box-shadow:0px 9px 10px 5px rgba(0,0,0,.03);border-radius:3px;position:relative}
.inputLine:hover{box-shadow:0px 9px 10px 5px rgba(0,0,0,.05);}
.titleName{min-width:100px;max-width:100px; font-size:15px; color:#333;text-align:right; position:relative}
.titleName span{width:100%;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.inputbox{flex:1;display:flex;height:auto; margin-left:10px;position:relative}
input{font-size:15px;}
.inputbox .input{width:100%;flex:1; position:relative;top:2px; margin-left:30px;border:none}
.input::-webkit-input-placeholder{color:#ccc;}
.input::-ms-input-placeholder{color:#ccc;}
.uploadContent{width:378px;height:243px; margin:30px auto;position:relative}
.is{width:35px;height:35px;display:block;position:absolute}
.topLeft{top:0px;left:0px;border-top:1px solid #ccc;border-left:2px solid #ccc;}
.bottomLeft{bottom:0px;left:0px;border-bottom:1px solid #ccc;border-left:2px solid #ccc;}
.topRight{top:0px;right:0px;border-top:1px solid #ccc;border-right:2px solid #ccc;}
.bottomRight{bottom:0px;right:0px;border-bottom:1px solid #ccc;border-right:2px solid #ccc;}
.uploadContent .inputUpload{width:353px;height:219px;position:absolute;left:50%;top:50%;
  transform:translate(-50%,-50%);z-index:1;opacity:0;cursor:pointer}
.uploadImgBox{width:353px;height:219px;background:#eee;position:absolute;left:50%;top:50%;
  transform:translate(-50%,-50%); overflow:hidden}
.uploadImgBox img{width:100%;height:auto;display:block; position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
#labelsBox{width:100%; background:#fff;position:relative;z-index:1; padding:0 58px;box-sizing:border-box;overflow:hidden}
#labelsBox .items{padding:2px 8px 2px 5px;float:left;line-height:23px; background:#eee;display:inline-block; font-size:14px;color:#333;border-radius:3px;margin:10px 5px 10px 5px;}
#labelsBox .items i{width:16px;height:16px;font-size:13px;position:relative;top:1px; display:inline-block;overflow:hidden}
.wcschool-btn{width:100%;margin:30px auto;}
.wcschool-btn .el-form-item__content{display:flex;justify-content:center;align-content:center}
.buttonBtn{width:260px;padding:15px 20px;color:#fff;font-size:1rem;background:#049f01;border:none;margin:auto;
outline:none;border-radius:3px}
.buttonBtn:active{background:#039000;}
.titleName i{position:absolute;top:49%;bottom:50%;margin:auto; left:30%;color:#ff0000}

</style>

