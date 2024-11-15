import { createRouter, createWebHashHistory } from 'vue-router'
import tp_play from '@/views/Typing_Practice/play.vue';
import Typing_Practice from '@/views/Typing_Practice/Typing_Practice.vue';
import Typing_Practice_about from '@/views/Typing_Practice/about.vue';
import nav_home from '@/views/home/home.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: nav_home,
    },
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/Typing_Practice',
      name: 'Typing_Practice',
      component: Typing_Practice,
      redirect: { name: 'play' }, // 添加重定向
      children: [
        {
          path: 'about',
          name: 'about',
          component: Typing_Practice_about,
        },
        {
          path: 'play',
          name: 'play',
          component: tp_play,
        },
      ],
    },
  ],
})

export default router
