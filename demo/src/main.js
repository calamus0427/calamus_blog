// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from "vue-router"
import router from './router'

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

// import Vuex from "vuex"
// import store from "./store"

//canvas组件
import './components/canvas/canvas.js'

Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.use(Vuex);
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
    router,
  template: '<App/>',
  components: { App }
})
