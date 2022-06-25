<template>
  <div class="bannerBoxSize">
      <!-- Swiper -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in banner">
            <router-link to="" :style="item"></router-link>
          </div>
        </div>
      </div>
      <div class="swiper-pagination pageNumber"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "indexBanner.vue",
  data(){
    return {
      // banner图
      banner: [
        {
          backgroundImage:"url("+require('@/assets/images/banner.jpg')+")",
        },
        {
          backgroundImage:"url("+require('@/assets/images/banner1.jpg')+")",
        },
        {
          backgroundImage:"url("+require('@/assets/images/banner3.jpg')+")",
        }
      ]
    }
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    /**
     * 初始化swiper
    * */
    initSwiper(){
      let mySwiper = new Swiper ('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
        spaceBetween:0,
        centeredSlides: true,
        speed:1500,
        autoplay:true,
        autoplayDisableOnInteraction: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            index=index+1;
            if(index<10){
              index = '0'+index;
            }else{
              index = index;
            }
            return '<span class="' + className + '">'+index+'</span>';
          },
        },
        observer:true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
      })
    }
  }
}
</script>

<style scoped>
@import "../../../node_modules/swiper/css/swiper.css";
.bannerBoxSize{width:100%;position:relative;z-index:0}
.swiper-container{width:100%;height:100%;}
.swiper-slide{ text-align:center;font-size:18px;position:relative; background:#fff; display:-webkit-box;display:-ms-flexbox;display:flex;box-pack:center;ustify-content:center;flex-align:center;align-items:center;}
.swiper-slide a{width:100%;height:100%; display:block;background-position:center;background-size:cover;background-repeat:no-repeat}
.pageNumber{position: relative;float: left;margin-top: 5px;height: 32px;width: 100%;}
</style>
