<template>
   <div class="richTextContent">
      <div class="richTextbox">
         <div id="editor" ref="editor"></div>
      </div>
      <!--按钮-->
      <div class="wcschool-btn">
         <button type="button" class="prevBtn" @click="prevEvent">上一步</button>
         <button type="button" class="buttonBtn" @click="submitEvent">提交</button>
      </div>
   </div>
</template>
<script>
import {GET_TOKEM} from "@/router/urlPath"
export default {
  name: "stepThree.vue",
  data (){
    return {
      token:'',
      wangEditor:'',
      summary:''
    }
  },
  created() {
     this.axios.get(GET_TOKEM).then(res=>{
        if(res.data.code === 0){
          this.token = res.data.data
        }
     })
  },
  mounted() {
      this.createRichText ()
  },
  methods:{
     /**
      * 创建富文本编辑器
      * */
     createRichText (){
       let Editor = require('wangeditor')
       this.wangEditor = new Editor ('#editor')
       // 使用 base64 保存图片
       this.wangEditor.customConfig.uploadImgShowBase64 = true
       this.wangEditor.customConfig.uploadImgMaxSize = 20 * 1024 * 1024
       // 隐藏“网络图片”tab
       this.wangEditor.customConfig.showLinkImg = false
       this.wangEditor.create()
     },
     /**
      * 第三部提交
     * */
     submitEvent (){
        this.$emit('callback3',{data:{summary:this.wangEditor.txt.html()},page:4})
     },
     /**
      * 返回上一页
     * */
     prevEvent (){
       this.$emit('backPage',2)
     }
  }
}
</script>
<style>
.w-e-toolbar{position:relative;top:-30.67px;}
.w-e-text-container{width:100%;max-height:100%;overflow:auto; position:absolute;top:-30.67px;border:1px solid #eee !important; height:100% !important;}
.w-e-text{margin-top:-10px !important; overflow-y:initial !important;}
/*滚动条整体样式*/
.w-e-text-container::-webkit-scrollbar {
  width:10px;
  height:1px;
}
/*滚动条滑块*/
.w-e-text-container::-webkit-scrollbar-thumb{
  border-radius:10px;
  -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
  background:#eee;
}
#editor:hover .w-e-text-container::-webkit-scrollbar-thumb{
  border-radius:10px;
  -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
  background:#d3d3d3;
}
  /*滚动条轨道*/
.w-e-text-container::-webkit-scrollbar-track {
  -webkit-box-shadow:inset 0 0 1px rgba(0,0,0,0);
  border-radius:10px;
  background:none;
}
</style>
<style scoped>
.richTextContent{width:100%;background:#fff;flex:1;position:relative;display:flex;flex-direction:column}
.richTextbox{width:100%;flex:1;text-align:left;position:relative;}
#editor{width:100%;height:100%; position:absolute;top:0px;bottom:0px;transition:all 2s linear 0s;}
.wcschool-btn{width:100%;float:left;margin-top:10px;margin-bottom:10px;position:relative}
.buttonBtn{width:165px; margin-left:20px;padding:15px 20px;color:#fff;font-size:15px;background:#049f01;border:none;
  outline:none;border-radius:3px;cursor:pointer}
.prevBtn{width:165px;margin-right:20px;outline:none; background:#b3b3b3;cursor:pointer;box-sizing:border-box;font-size:15px; padding:15px 20px;border-radius:3px; color:#fff;border:none;}
.buttonBtn:active{background:#039000;}
.prevBtn:active{background:#a1a0a0;}
</style>
