<template>
  <div class="userBox"><i class="triangle"></i>
    <div class="upperLine">你好，{{getUserInfo.username}} <button type="button" class="signOut">退出</button></div>
    <div class="numbox">
      <div class="balanceBox">
        <p>我的账户</p>
        <h2><span>0.00</span>元</h2>
      </div>
      <div class="accountLine">我的收益 <span>1000.00</span> <button type="button">提现</button></div>
      <div class="accountLine">充值余额 <span>1000.00</span> <button type="button">充值</button></div>
    </div>
    <ul class="ulworksNumber">
      <router-link to="" tag="li"><p>作品<br>520</p></router-link>
      <router-link to="" tag="li"><p>作品<br>520</p></router-link>
      <router-link to="" tag="li"><p>作品<br>520</p></router-link>
      <router-link to="" tag="li"><p>作品<br>520</p></router-link>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "userbox.vue",
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  mounted() {

  },
  methods:{

  }
}
</script>
<style scoped>
.userBox{width:19rem;height:auto; display:none; position:absolute;top:3.6rem;right:1.2rem;border-radius:.2rem; transition:all .2s linear 0s}
.itemBox:last-child:hover .userBox{display:block}
.upperLine{width:100%; color:#333; background:#fff; padding:.7rem .6rem; text-align:left;font-size:.9rem;border-top-left-radius:.2rem;border-top-right-radius:.2rem; border-bottom:1px solid #00be06}
.signOut{padding:0 .5rem;background:#00be06; border:none;color:#fff;border-radius:50px;margin-left:.5rem;outline:none; padding:.1rem .7rem .2rem .7rem}
button:active{background:#00af06;}
.triangle{height:0px;width:0px; position:absolute;top:-1.2rem; right:1.8rem; border:.6rem solid;border-color:transparent transparent #fff;}
.balanceBox{width:100%; padding:1rem 0 .3rem 0;font-size:1.5rem;color:#333;text-align:center;}
.balanceBox p{font-size:1rem;color:#777;}
.numbox{background:#fff; padding-bottom:.8rem;}
.balanceBox h2{font-size:1rem;font-weight:normal;padding:.8rem 0;color:#00be06;}.balanceBox h2 span{font-size:2rem;margin-right:.2rem; font-weight:bolder}
.accountLine{width:100%;padding:.6rem .8rem; color:#4f4f4f;text-align:left;font-size:.9rem; position:relative}
.accountLine span{font-size:1.3rem;color:#00af06;margin-left:.4rem;position: relative;top:.15rem}
.accountLine button{position:absolute;right:.8rem;background:#00af06;border-radius:50px;border:none;padding:.23rem .8rem;font-size:.8rem;outline:none;color:#fff;}
.ulworksNumber{width:100%;height:auto; border-bottom-left-radius:.2rem;border-bottom-right-radius:.2rem;overflow:hidden}
.ulworksNumber li{width:25%;background:#fff; padding:.8rem 0 .4rem 0;transition:all .2s linear 0s; float:left;color:#555; cursor:pointer; border-top:1px solid #eee;}
.ulworksNumber li p{width:100%;line-height:1.5rem; font-size:.85rem;}
.ulworksNumber li:hover{background:rgba(255,255,255,.85);font-weight:bold; color:#00be06}
</style>
