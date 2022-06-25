<template>
  <div>
     <label class="listtitles">即将开播</label>
     <el-row class="wcschool-row">
        <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="专辑" name="first">
                 <videolist/>
              </el-tab-pane>
              <el-tab-pane label="热门" name="second">热门</el-tab-pane>
              <el-tab-pane label="视频" name="third">视频</el-tab-pane>
              <el-tab-pane label="教堂" name="fourth">讲堂</el-tab-pane>
            </el-tabs>
        </el-col>
     </el-row>
  </div>
</template>

<script>
import videolist from "@/views/education/list/indexVideoList"
export default {
  name: "tablePage.vue",
  components: {
    videolist
  },
  data(){
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style>
.wcschool-row{width:100%;float:left;}
.listtitles {width: 100%;display: block; float: left;margin: 1.2rem 0 5px 0;font-size: 1.4rem;color:#333;}
.el-tabs__nav-wrap{display:inline-block}
.el-tabs__nav-wrap::after{height:0px;}
.el-tabs__item{font-size:.98rem;color:#333;padding: 0 1.5rem}
.el-tabs__item.is-active{color:#00be06}
.el-tabs__item:hover{color:#00be06}
.el-tabs__active-bar{height:1px;background:#00be06}
</style>
