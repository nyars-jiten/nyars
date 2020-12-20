import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@/views/About.vue')
  // },
  {
    path: '/jp/new',
    name: 'create-jp',
    component: () => import('@/views/JapEntry.vue'),
  },
  {
    path: '/jp/rnd',
    name: 'random-jp',
    component: () => import('@/views/JapRandomEntry.vue'),
  },
  {
    path: '/jp/edt/:id',
    name: 'edit-jp',
    component: () => import('@/views/JapEditPage.vue'),
  },
  {
    path: '/jp/:wid',
    name: 'view-jp',
    component: () => import('@/views/JapEntry.vue'),
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('@/views/Tags.vue'),
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: () => import('@/views/Subjects.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/UserPage.vue'),
  },
  {
    path: '/r/edit',
    name: 'readme-edit',
    component: () => import('@/views/About/EditsReadme.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    props: (route) => ({ request: route.query.r, page: route.query.page || 1 })
  },
  { path: '*', }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
