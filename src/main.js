// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 全局引入rem.js
import './assets/js/remScale.js'
// 全局引入重置样式表
import './assets/css/reset.css'

// 设置图片服务器
Vue.prototype.$imgUrl = 'http://localhost:3000'

// 引入vant UI框架
import vantUI from 'vant';
import 'vant/lib/index.css'
Vue.use(vantUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
