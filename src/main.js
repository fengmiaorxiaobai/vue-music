import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
fastclick.attach(document.body) // 处理移动端点击事件延迟300毫秒
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png') // 图片懒加载
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
