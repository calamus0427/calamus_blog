import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import admin from "@/view/admin/index.vue"
import blog from "@/view/blog/index.vue";



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "login",
      component: login
    },
    {
      path: '/admin',
      name: "admin",
      component: admin
    },
    {
      path: "/blog",
      name: "blog",
      component: blog
    }
  ]
})
