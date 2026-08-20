import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '乐脉工坊 - 开启您的音乐之旅' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '乐脉工坊 - 关于我们' }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/CategoriesView.vue'),
    meta: { title: '乐脉工坊 - 课程介绍' }
  },
  {
    path: '/techniques',
    name: 'techniques',
    component: () => import('@/views/TechniquesView.vue'),
    meta: { title: '乐脉工坊 - 教学方法' }
  },
  {
    path: '/resources',
    name: 'resources',
    component: () => import('@/views/ResourcesView.vue'),
    meta: { title: '乐脉工坊 - 教学保障' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: '乐脉工坊 - 联系我们' }
  },
  {
    path: '/achievement',
    name: 'achievement',
    component: () => import('@/views/AchievementView.vue'),
    meta: { title: '乐脉工坊 - 成果交流' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '乐脉工坊 - 用户登录' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { title: '乐脉工坊 - 学员注册' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// 全局前置守卫:更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '乐脉工坊'
  next()
})

export default router
