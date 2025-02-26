import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Import components directly instead of using lazy loading
import ResearchView from '../views/ResearchView.vue'
import PublicationsView from '../views/PublicationsView.vue'
import ContactView from '../views/ContactView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/research',
    name: 'research',
    component: ResearchView
  },
  {
    path: '/publications',
    name: 'publications',
    component: PublicationsView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  // Add a catch-all route to redirect to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/xqian/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router