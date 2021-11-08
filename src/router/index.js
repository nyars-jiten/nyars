import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';

Vue.use(VueRouter);
Vue.use(Meta)

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
    path: '/examples/new',
    name: 'create-example',
    component: () => import('@/components/dictionary/other/ExampleEntry.vue'),
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
    path: '/u/:username',
    name: 'user',
    component: () => import('@/views/UserPage.vue'),
  },
  {
    path: '/r/edit',
    name: 'readme-edit',
    component: () => import('@/views/About/EditsReadme.vue'),
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/Downloads.vue'),
  },
  {
    path: '/ocr/:bookid/page/:pageid',
    name: 'ocr-page',
    component: () => import('@/views/OCR/Page.vue'),
  },
  {
    path: '/ocr/:bookid',
    name: 'ocr-book',
    component: () => import('@/views/OCR/PagesList.vue'),
  },
  {
    path: '/ocr',
    name: 'ocr-main',
    component: () => import('@/views/OCR/BooksList.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    props: (route) => ({ request: route.query.r, selectedPage: route.query.page || 1 })
  },
  { path: '*', }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
