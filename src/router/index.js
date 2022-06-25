import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import home from '@/router/education/home/index'
import liveVideo from '@/router/education/liveVideo/liveVideo'
import details from '@/router/education/details/details'
import releaseLive from '@/router/education/releaseLive/ReleaseLiveBroadcast'
export default new Router({
  mode: 'history',
  routes: [
    ...home,
    ...liveVideo,
    ...details,
    ...releaseLive
  ]
})

