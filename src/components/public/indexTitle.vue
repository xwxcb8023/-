<template>
  <div>
      <!--中国领先网络教育内容提供商-->
      <div class="IndexTipsBox">
        <h2 class="title">中国领先网络课程内容提供平台</h2>
        <p class="detailText">海量优质正版视觉内容，全媒体视觉解决方案，无限灵感创意，全网络直播教育从这里开始</p>
      </div>
      <div class="ModularBox">
        <div class="item i1">
          <img src="@/assets/images/icon-1.png" class="titleicons"/>
          <p class="pt1">视觉服务</p>
          <p class="pt2">Visual service provider</p>
          <div class="activeItem opacity0">
            <h3>视觉服务</h3>
            <p>2017年4月1日 - 2017年04月01日 11:12:41 执笔’写青春 阅读数:77018 个人
              分类: JS 该事件的效果就像百度首页的设置选项,当鼠标移入,移出时的效果</p>
            <a class="more">更多</a>
          </div>
        </div>
        <div class="item i1">
          <img src="@/assets/images/icon-2.png" class="titleicons"/>
          <p class="pt1">数字版权保护</p>
          <p class="pt2">Digital copyright protection</p>
          <div class="activeItem opacity0">
            <h3>数字版权保护</h3>
            <p>2017年4月1日 - 2017年04月01日 11:12:41 执笔’写青春 阅读数:77018 个人
              分类: JS 该事件的效果就像百度首页的设置选项,当鼠标移入,移出时的效果</p>
            <a class="more">更多</a>
          </div>
        </div>
        <div class="item i1">
          <img src="@/assets/images/icon-3.png" class="titleicons"/>
          <p class="pt1">网络教育直播</p>
          <p class="pt2">Network education live</p>
          <div class="activeItem opacity0">
            <h3>网络教育直播</h3>
            <p>2017年4月1日 - 2017年04月01日 11:12:41 执笔’写青春 阅读数:77018 个人
              分类: JS 该事件的效果就像百度首页的设置选项,当鼠标移入,移出时的效果</p>
            <a class="more">更多</a>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/images/icon-4.png" class="titleicons"/>
          <p class="pt1">市场合作服务</p>
          <p class="pt2">Market cooperation service</p>
          <div class="activeItem opacity0">
            <h3>市场合作服务</h3>
            <p>2017年4月1日 - 2017年04月01日 11:12:41 执笔’写青春 阅读数:77018 个人
              分类: JS 该事件的效果就像百度首页的设置选项,当鼠标移入,移出时的效果</p>
            <a class="more">更多</a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
   name: "indexTitle.vue",
}
</script>

<style scoped>
/****中国教育内容提供商****/
.IndexTipsBox{width:100%;height:auto; float:left;margin-top:5px;}
.IndexTipsBox .title{width:100%;font-size:1.5rem; text-align:center;color:#333;}
.IndexTipsBox .detailText{width:100%;margin-top:.3rem; font-size:.7rem;text-align:center;color:#666;}
/***模块***/
.ModularBox{width:100%;height:auto;float:left;margin-top:1.6rem;background:#f6f5f3;padding:0 2rem;box-sizing:border-box;}
.ModularBox .item{width:25%;height:auto;float:left;padding:2.5rem 0;position:relative;}
.ModularBox .item:hover .activeItem{opacity:1}
.ModularBox .i1{border-right:1px solid #eee;}
.ModularBox .item .titleicons{width:auto; height:2.5rem; margin:auto;display:block;}
.ModularBox .item .pt1{width:100%;height:auto;margin:.7rem auto 0 auto;font-size:.85rem;text-align:center;color:#2f2c3f;}
.ModularBox .item .pt2{width:100%;height:auto;margin:auto;font-size:.83rem;text-align:center;color:#656871;}
.activeItem{position:absolute;left:0px;top:0px;right:0px;bottom:0px; background:#f6f5f3;text-align:center;padding:0 1rem;opacity:0;
  box-sizing:border-box;transition:0.2s;-webkit-transition:0.2s;-moz-transition:0.2s;-ms-transition:0.2s;-o-transition:0.2s;}
.activeItem h3{padding:5px 0;margin:2.2rem auto 0 auto;font-size:.85rem;text-align:center;color:#2f2c3f;}
.activeItem p{margin:.3rem auto 0 auto;color:#666;font-size:12px;line-height:18px; text-align:center}
.activeItem .more{margin:.8rem auto 0 auto;padding-top:.5rem;border-top:1px solid #ccc;color:#666;font-size:.68rem;text-align:center; display:inline-block;}
</style>
