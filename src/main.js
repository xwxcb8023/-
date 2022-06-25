import Vue from 'vue'
import App from './App'
import router from '@/router/index'
// 引用axios
//import axios from 'axios'
import axios from '@/api/http'
Vue.config.productionTip = false
Vue.prototype.axios = axios
//axios.defaults.baseURL = '/api'

// 引用Element UI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引用全局样式
import '@/assets/css/public/base.css';
// 引用iconfont图标
import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont.js';
// 动画样式
import animated from 'animate.css'
Vue.use(animated)
// 引入store
import store from "@/store/index"

import less from "less"
Vue.use(less)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
