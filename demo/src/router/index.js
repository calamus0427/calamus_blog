import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import admin from "@/view/admin/index.vue"
import blog from "@/view/blog/index.vue"
import article from "@/view/admin/article/index.vue"
import mark from "@/view/admin/mark/index.vue"
import setting from "@/view/admin/setting/index.vue"
import statistic from "@/view/admin/statistic/index.vue"
import tag from "@/view/admin/tag/index.vue";;






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
      component: admin,
      children:[{
        path: "/article",
        name: "article",
        component: article,
      },{
        path: "/mark",
        name: "mark",
        component: mark,
      },{
        path: "/setting",
        name: "setting",
        component: setting,
      },{
        path: "/tag",
        name: "tag",
        component: tag,
      },{
        path: "/statistic",
        name: "statistic",
        component: statistic,
      }],
    },
    {
      path: "/blog",
      name: "blog",
      component: blog
    }
  ]
})
