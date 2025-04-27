import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const title = 'FilmesMax'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Lista de Filmes' },
      component: HomeView
    },
    {
      path: '/details/:id',
      name: 'details',
      meta: { title: 'Detalhes do Filme' },
      component: () => import('../views/DetailsView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = (to.meta.title as string) + ' - ' + title
  }
  next()
  return
})

export default router
