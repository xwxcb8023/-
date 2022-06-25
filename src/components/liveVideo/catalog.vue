<template>
    <div class="courseCatalog">
      <el-scrollbar style="height:100%">
         <h2 class="titleLine" title="Spring第三方拓张接口源码解析课拓张接口源码解析课程">《<span>Spring第三方拓张接口源码解析课拓张接口源码解析课程</span>》</h2>
         <div class="courseList">
                  <div class="Catalog">
                    <li class="CatalogTitle">第1章节 Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="CatalogTitle">第2章节 Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont nowplay">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="CatalogTitle">第3章节 Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="CatalogTitle">第4章节 Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                    <li class="iconfont">Spring第三方拓张接口展接口源码解析</li>
                  </div>

             </div>

      </el-scrollbar>
    </div>
</template>

<script>
export default {
    name: "catalog.vue"
}
</script>

<style scoped>
.courseCatalog{width:100%;height:100%; display:flex;padding-bottom:3px; flex-direction:column; position:relative; text-align:left}
.titleLine{width:97%; height:3rem; position:absolute;top:0px;left:0px;z-index:10; text-align:left;padding:10px 20px 10px 10px; box-sizing:border-box;
font-size:.95rem;color:#aaa;font-weight:lighter;background:#1a1a1a; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.titleLine span{width:86%; text-indent:3px;position:relative;top:4px; display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.courseList{flex:1; color:#666666;font-size:.8rem; margin-top:3rem;padding-bottom:3rem; position:relative}
.CatalogBox{width:100%;height:100%;position:absolute;}
.Catalog{width:100%;height:100%;position:relative;padding:10px 20px;box-sizing:border-box;}
.Catalog li{width:100%;padding:8px 0;cursor:pointer; font-size:.9rem;font-weight:lighter; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.Catalog li.iconfont:before{content:'\e62a';margin-right:5px;font-size:17px;position:relative;top:2px;}
.nowplay{color:#00c606;}
.CatalogTitle{font-weight:bolder}
.Catalog li:hover{color:#00c606;}
</style>
