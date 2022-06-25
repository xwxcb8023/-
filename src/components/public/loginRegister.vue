<template>
  <div class="loginCover">
    <div class="registerOrLoginBox">
      <div class="deuceCourt leftRadius">
        <div class="myswiperbox">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in banner"><img class="bgimg" :src="item.src"></div>
            </div>
          </div>
          <div class="swiperbottombg">
            <div class="Divline">
              <div class="linebox"><p></p></div>
              <div class="linebox widths">注册即享多重福利</div>
              <div class="linebox"><p></p></div>
            </div>
            <ul class="LoginLeftBox">
              <li v-for="item in step"><div class="iconBox"><img :src="item.url"/></div>
                <p>{{item.text}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--密码登录-->
      <div class="deuceCourt rightRadius" :class="[login,logi]">
        <div class="out-drawer animate__animated" :class="passLogin">
          <h2 class="titleLogin" >密码登录</h2>
          <ul class="LoginInputLine">
            <li><input type="text" v-model="form.phone" class="inputs" placeholder="请输入手机号"/></li>
            <li class="last"><input type="password" v-model="form.password" class="inputs" placeholder="请输入密码"/></li>
          </ul>
          <div class="checkLines"><label class="codeLoginbtn codeLogin" @click="codeLogin">验证码登录</label></div>
          <div class="btnLines">
            <button type="button" @click="loginFunction" class="LoginBgColor">立即登录</button>
          </div>
          <div class="checkLoginLine">
            <a class="sina"></a><a class="wechat"></a><a class="qq"></a>
          </div>
          <div class="loginBoxBottomCheck">
            <a><label><input type="checkbox"/>记住密码</label></a>
            <a>忘记密码</a>
            <a class="registerIng" @click="loginOrRegister()">注册</a>
          </div>
        </div>

        <!--验证码登录-->
        <div class="LoginContent animate__animated" :class="codeLoginClass">
          <h2 class="titleLogin">验证码登录</h2>
          <ul class="LoginInputLine">
            <li><input type="text" class="inputs" placeholder="请输入手机"/></li>
            <li class="last LoginflexLine borderLine">
              <label class="telIndex">+86</label>
              <input type="password" class="inputs inputFlex" placeholder="请输入密码" style="border:none"/>
              <a class="getCode">获取验证码</a>
            </li>
          </ul>
          <div class="checkLines"><label class="codeLoginbtn passwordLoginBtn" @click="codeLogin">密码登录</label></div>
          <div class="btnLines">
            <button type="button" class="LoginBgColor">立即登录</button>
          </div>
          <div class="checkLoginLine">
            <a class="sina"></a><a class="wechat"></a><a class="qq"></a>
          </div>
          <div class="loginBoxBottomCheck">
            <a><label><input type="checkbox"/>记住密码</label></a>
            <a>忘记密码</a>
            <a class="registerIng" @click="loginOrRegister()">注册</a>
          </div>
        </div>
      </div>
      <div class="deuceCourt" :class="[Register,regis]">
        <!--注册(选择身份)-->
        <div class="RegisterContent checkIdPage animate__animated" :class="registerOne">
          <h2 class="titleLogin">用户注册</h2>
          <p class="MyIs">我是：</p>
          <ul class="checkMyId">
            <li
              v-for="item in userType"
              @click="getUserType(item.id)"
              :class="params.usertype === item.id ? 'actives':''"
            >
              {{item.name}}
            </li>
          </ul>
          <div class="btnDiv">
            <button type="button" class="nextPage LoginBgColor" @click="saveRegister">下一步</button>
          </div>
          <div class="loginBoxBottomCheck">
            <p>亦可第三方登录:
              <span v-for="item in loginType"><img :src="item"/></span>
            </p>
            <a class="goLogin" @click="loginOrRegister()">，我已有账号</a>
          </div>
        </div>
        <!--注册（填写信息）-->
        <div class="RegisterContent setDataPage animate__animated" :class="registerTwo">
          <h2 class="titleLogin">用户注册</h2>
          <el-form :model="params" ref="params" :rules="rules">
              <ul class="RegisterInputLine">
                <li>
                  <el-form-item label="" class="inputLine" prop="phone">
                     <el-input type="text" v-model="params.phone" class="inputs" placeholder="请输入手机号"/>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="" class="inputLine" prop="password">
                     <el-input type="password" v-model="params.password" class="inputs" placeholder="请输入密码"/>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="" class="inputLine" prop="confirmpwd">
                     <el-input type="password" class="inputs" v-model="params.confirmpwd" placeholder="请输入确认密码"/>
                  </el-form-item>
                </li>
                <li class="LoginflexLine borderLine">
                  <el-form-item label="" class="inputLine" prop="imageCode">
                     <el-input type="text" class="inputs inputFlex" v-model="params.imageCode" placeholder="图片验证码" style="border:none"/>
                  </el-form-item>
                  <Verification ref="verifi" @click.native="updateVerifi" :identifyCode="verifiCode"/>
                </li>
                <li class="LoginflexLine borderLine">
                  <el-form-item label="" class="inputLine" prop="shortMessageCode">
                     <el-input type="text" class="inputs inputFlex" v-model="params.shortMessageCode" placeholder="短信验证码" style="border:none"/>
                  </el-form-item>
                  <a class="getCode" id="a-code">获取验证码</a>
                </li>
                <li class="last"></li>
              </ul>
              <div class="btnDiv" style="margin-top:56px;">
                <el-form-item label="" class="inputLine">
                    <el-button type="button" @click="submitregister('params')" class="LoginBgColor">确定注册</el-button>
                </el-form-item>
              </div>
          </el-form>
          <div class="loginBoxBottomCheck"><a class="blankPage" @click="saveRegister">上一步</a></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import {mapState,mapActions} from "vuex"
import {LOGIN} from '@/router/urlPath'
import Cookie from 'js-cookie'
import {randomNumber} from '@/util/public'
import Verification from '@/components/public/verification'
export default {
  components:{
    Verification
  },
  name: "loginRegister.vue",
  data (){
    return {
      passLogin:'animate__slideInLeft',
      codeLoginClass:'animate__slideOutRight',
      loginStatus:true,
      defaultShow:true,
      login:'',
      Register:'',
      logi:'show',
      regis:'hide',
      registerOne:"",
      registerTwo:"hide",
      registerStatus:true,
      banner:[
        {src:require('@/assets/images/1.png')},
        {src:require('@/assets/images/2.png')},
        {src:require('@/assets/images/9.jpg')}
      ],
      step:[
        {url:require('@/assets/images/icon1.png'),text:'海量原创正版作品'},
        {url:require('@/assets/images/icon2.png'),text:'供稿可赚高额收益'},
        {url:require('@/assets/images/hezuo.png'),text:'高曝光度赢取合作'},
        {url:require('@/assets/images/icon3.png'),text:'定期开办技能直播'}
      ],
      loginType:[
        require('@/assets/images/wechat.png'),
        require('@/assets/images/qq.png'),
        require('@/assets/images/sina.png')
      ],
      form:{phone:undefined,password:undefined},
      userType:[],
      verifiCode:'',
      config:false,
      params:{
         usertype:undefined,
         user:undefined,
         phone:undefined,
         email:undefined,
         password:undefined,
         confirmpwd:undefined,
         imageCode:undefined,
         shortMessageCode:undefined
      },
      rules: {
        phone:[{ required: true, message: '手机号不能为空', trigger: 'blur'}],
        password:[{ required: true, message: '密码不能为空', trigger: 'blur' }],
        confirmpwd:[{ required: true, message: '请确认密码', trigger: 'blur' }],
        imageCode:[{ required: true, message: '图片验证码不能为空', trigger: 'blur' }],
        shortMessageCode:[{ required: true, message: '短信验证码不能为空', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.verifiCode = randomNumber();
  },
  mounted() {
    this.initSwiper();
  },
  computed:{
    ...mapState(['usertype'])
  },
  methods:{
    ...mapActions(['userlogin']),
    /**登录**/
    loginFunction(){
      let promise = this.axios.post(LOGIN,this.form);
      promise.then(result => {
        console.log(result.code);
        if(result.code === 0){
           Cookie.set('userId',result.data.userId);
           // 写入store
           this.userlogin(result.data);
           this.closeDialog();
        };
      })
    },
    /** Swiper **/
    initSwiper(){
      let mySwiper = new Swiper ('.swiper-container',{
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween:0,
        centeredSlides: true,
        speed:1500,
        autoplay:true,
        autoplayDisableOnInteraction: false,
        observer:true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
      })
    },
    /** 触发密码登录和验证码登录切换 **/
    codeLogin(){
      this.loginStatus = !this.loginStatus
      this.passLogin = this.loginStatus ? "animate__slideInLeft":"animate__slideOutLeft"
      this.codeLoginClass = this.loginStatus ? "animate__slideOutRight":"animate__slideInRight"
    },
    /** 注册 and 登录**/
    registerFunc(status){
       this.defaultShow = status;
       this.loginOrRegister();
    },
    /** 触发登录和注册弹窗切换 **/
    loginOrRegister(){
       this.defaultShow = !this.defaultShow;
       this.login = this.defaultShow ? "showFlip":"hideFlip"
       this.Register = this.defaultShow ? "hideFlip":"showFlip"
       setTimeout(()=>{
         this.logi = this.defaultShow ? "show":"hide"
         this.regis = this.defaultShow ? "hide":"show"
       },500)
       if(this.defaultShow) return;
       this.userType = this.usertype
    },
    /**获取用户类型ID**/
    getUserType(userTypeId){
      this.params.usertype = userTypeId
    },
    /**触发注册弹窗切换**/
    saveRegister(){
      // 判断用户是否选了用户类型标签
      if(this.params.usertype === undefined){
        this.$alert('请选择一个标签', '', {
          confirmButtonText: '确定'
        })
         return;
      }
      this.registerStatus = !this.registerStatus
      this.registerOne = this.registerStatus ? "animate__slideInLeft":"animate__slideOutLeft"
      this.registerTwo = this.registerStatus ? "animate__slideOutRight":"animate__slideInRight"
    },
    /**关闭登录弹窗**/
    closeDialog(){
      this.$emit("closeFunc")
    },
    /**刷新图片验证码**/
    updateVerifi(){
       this.verifiCode = randomNumber();
    },
    submitregister(params){
      this.$refs[params].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style>
.el-dialog__body{padding:0px !important;}
.el-dialog__headerbtn{top:13px}
.el-form-item{margin-bottom:0px;width:100%}
.el-input__inner:focus,.LoginflexLine .el-input__inner:focus{border-color:#00be06}
.el-input__inner{border:none;border-bottom:1px solid #eee;padding:0px;border-radius:0px}
.LoginflexLine .el-input__inner{border-bottom:1px solid #eee;position:relative;top:2px;
padding:0px;border-radius:0px}
.el-form-item__error{z-index:1}
</style>
<style scoped>
.loginCover .swiper-container{width:100%;height:100%;white-space:nowrap;}
.loginCover .swiper-slide{ text-align:center;font-size:18px;position:relative;display:inline-block;box-pack:center;ustify-content:center;flex-align:center;align-items:center;}
.loginCover .swiper-slide .bgimg{width:100%;height:100%; display:block;background-position:center;background-size:cover;background-repeat:no-repeat}
/******注册/登录框******/
.loginCover{/*position:fixed;left:0px;bottom:0px;right:0px;top:0px;z-index:1000;background:rgba(0,0,0,.3);*/}
.registerOrLoginBox{width:728px;height:518px;border-radius:4px; /*position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);*/}
.deuceCourt{width:50%;height:100%;float:left; position:relative;overflow:hidden;
  transition: all .4s ease-in-out 0s;-webkit-transition: all .4s ease-in-out 0s;-moz-transition: all .4s ease-in-out 0s;
  -ms-transition: all .4s ease-in-out 0s;-o-transition: all .4s ease-in-out 0s;background:#fff;}
.swiper-slide .bgimg{width:100%;height:100%; display:block;margin:auto;position:relative;left:0px}
.titleLogin{width:100%;font-size:20px;margin:25px auto 0 auto;color:#333;text-align:center;}
.LoginInputLine{width:100%;margin:40px auto 0 auto;position:relative;padding:0 38px;box-sizing:border-box;}
.LoginInputLine li{width:100%;position:relative;margin-bottom:28px;display:flex}
.LoginInputLine li input{font-size:13px;color:#333;padding:12px 0;border:none;border-bottom:1px solid #eee;}
.LoginInputLine li input.inputs{width:100%;}
.LoginInputLine li.last{margin-bottom:15px;}
input::-webkit-input-placeholder{color:#b6b6b6;}
input:-moz-placeholder{color:#b6b6b6;}
input::-moz-placeholder{color:#b6b6b6;}
input:-ms-input-placeholder{color:#b6b6b6;}
.checkLines{margin:auto;height:21px;}
.codeLoginbtn{float:right;margin-right:38px;font-size:14px;color:#6c6c6c;}
.btnLines{width:100%;margin:62px auto 0 auto; padding:0 38px;box-sizing:border-box;}
.btnLines button{width:100%;height:45px;line-height:45px;border-radius:6px;outline:none; margin:auto;display:block;text-align:center;font-size:16px;border:none;}
.LoginBgColor{background:#00be06; color:#fff;}
.LoginBgColor:hover{background:#05cc0b;}
.checkLoginLine{width:100%;margin:25px auto 0 auto;text-align:center;}
.checkLoginLine a{width:30px;height:30px;margin:0 2px;border-radius:100%;overflow:hidden;text-align:center;display:inline-block;}
.sina{background-size:cover;}
.wechat{background-size:cover;}
.qq{background-size:cover;}
.loginBoxBottomCheck{width:100%; position:absolute;bottom:16px;left:0px;text-align:center;}
.loginBoxBottomCheck a{font-size:14px;color:#6c6c6c;margin:0 15px; display:inline-block;text-align:center;}
.loginBoxBottomCheck a.goLogin{font-size:14px;color:#00be06;text-decoration:underline;margin:0px; display:inline-block;text-align:center;}
.loginBoxBottomCheck a label{cursor:pointer;}
.loginBoxBottomCheck p{font-size:14px;color:#6c6c6c;display:inline-block;}
.loginBoxBottomCheck p span{width:22px;height:22px;float:right; margin:0 3px;cursor:pointer;
  position:relative;top:-2px;border-radius:100%;overflow:hidden;}
.loginBoxBottomCheck p span img{width:100%;height:auto;margin:auto;display:block;border-radius:100%;}
.flexLine{display:flex;}
.inputFlex{flex:auto;}
.telIndex{min-width:40px;padding:12px 10px 12px 0;font-size:14px;color:#6c6c6c;}
.getCode{min-width:85px;padding:12px 0 12px 5px;text-align:right; font-size:14px;color:#6c6c6c}
.borderLine{border-bottom:1px solid #eee;}
.blankPage{font-size:14px;color:#6c6c6c;margin:0 0 0 38px !important; float:left;}

input[type=checkbox]{-webkit-appearance:none;vertical-align:middle; margin-right:3px;border:#acacac solid 1px;
  border-radius:3px;min-height:14px;min-width:14px;outline:none;position:relative;top:-1px;}
input[type=checkbox]:checked::after{content:'';top:2px;left:1.3px;color:#333;position:absolute;background: transparent;
  border:#00be06 solid 2px;border-top:none;border-right:none;height:4px;width:8px;
  -moz-transform:rotate(-45deg); -ms-transform:rotate(-45deg);-webkit-transform:rotate(-45deg);transform:rotate(-45deg); }
.MyIs{width:100%;margin:63px auto 0 auto;font-size:16px;color:#6c6c6c;text-align:left;padding:0 38px;box-sizing:border-box;}
.checkMyId{width:100%;float:left; margin-top:20px;padding:0 0 0 30.5px;box-sizing:border-box;text-align:center;}
.checkMyId li{width:62px;height:28px; line-height:28px;border-radius:3px; font-size:12px;color:#878787;float:left;margin:10px 7.5px 10px 7.5px;
  text-align:center;border:1px solid #dbdbdb;cursor:pointer;}
.checkMyId li.active{background:#00be06;color:#fff;border:1px solid #00be06;}
.btnDiv{width:100%;float:left;margin-top:56px; padding:0 38px;box-sizing:border-box;}
.btnDiv button{width:100%;height:45px;border-radius:6px;outline:none; margin:auto;display:block;text-align:center;font-size:16px;border:none;}

.RegisterInputLine{width:100%;margin:20px auto 0 auto;position:relative;padding:0 38px;box-sizing:border-box;}
.RegisterInputLine li{width:100%;position:relative;margin-bottom:13px;display:flex}
.RegisterInputLine li input{font-size:13px;color:#333;padding:12px 0;border:none;border-bottom:1px solid #eee;}
.RegisterInputLine li input.inputs{width:100%;}
.RegisterInputLine li.last{margin-bottom:0px;}
.ImgtCode{min-width:100px;height:35px; display:block;float:right;position:relative;top:2px;}
.RegisterInputLine li input:focus{border-bottom:1px solid #ccc;}
.popupClose{width:20px;height:20px;position:absolute;top:-11px;right:-32px; display:block;text-indent:1000px;overflow:hidden;
  background-size:100% auto;border:none;outline:none;}
.LoginContent,.RegisterContent{width:100%;height:100%;position:absolute;top:0px;bottom:0px;overflow:hidden;}
.actives{background:#00be06 !important;color:#fff !important;border-color:#00be06 !important;}
.checkIdPage{left:0%;}.VcodeLogin,.setDataPage{left:0%;}
.codeLogin,.passwordLoginBtn{cursor:pointer;}
.hideFlip{transform:rotateY(90deg);-webkit-transform:rotateY(90deg);-moz-transform:rotateY(90deg);-ms-transform:rotateY(90deg);-o-transform:rotateY(90deg);}
.showFlip{transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-ms-transform:rotateY(0deg);-o-transform:rotateY(0deg);}
.show{display:block;}
.hide{display:none;}
.myswiperbox{width:100%;height:100%;position:absolute;left:0px;top:0px;bottom:0px;right:0px;}
.myswiperbox .swiper-container{height:100%;position:relative}
.myswiperbox .swiper-wrapper,.swiper-slide{height:100%}
.leftRadius{overflow:hidden;border-top-left-radius:5px;border-bottom-left-radius:5px;}
.rightRadius{overflow:hidden;border-top-right-radius:5px;border-bottom-right-radius:5px;}
.swiperbottombg{width:100%; height:10rem;position:absolute;bottom:0px;left:0px;z-index:1;
  background:-webkit-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.6));
  background:-o-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.6));background:-ms-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.6));
  background:-moz-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.6));background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.6));}
.Divline{width:100%;height:30px;position:absolute;bottom:8rem;left:0px; text-align:center;display:flex;
  padding:0 25px;box-sizing:border-box;}
.Divline .linebox p{width:100%;border-bottom:1px solid #eee;position:absolute;left:0px;top:50%;bottom:50%;margin:auto;}
.Divline .linebox{flex:auto; margin:auto; font-size:18px;color:#fff;position:relative;}
.widths{width:5rem !important;margin-right:8px !important;margin-left:8px !important;}
.LoginLeftBox{width:100%;position:absolute;bottom:15px;left:0px;padding:0 20px;box-sizing:border-box;}
.LoginLeftBox li{width:25%;height:auto;float:left;}
.LoginLeftBox li .iconBox{width:43px;height:43px;margin:auto;position:relative;}
.iconBox img{width:100%;height:auto;display:block;margin:auto;}
.LoginLeftBox li p{width:100%;margin-top:8px;font-size:14px;padding:0 10px;line-height:20px;color:rgba(255,255,255,.8);text-align:center;}
</style>
