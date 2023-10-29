import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'
import { SecurityRoutes } from '@/services/security/router'
import { PatientRoutes } from '@/services/patient/router'

let localUser
const routes = [
  {
    path: '/',
    name: 'HomePage',
    components: { default: HomePage },
    meta: {
      PageTitle: 'Aorta Detection'
    }
  },

  ...SecurityRoutes,

  ...PatientRoutes,

  {
    path: '/404',
    alias: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    components: { default: NotFoundPage },
    meta: {
      PageTitle: 'Страница не найдена'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function getUser(next) {
  localUser = JSON.parse(localStorage.getItem('ad-token'))

  if (localUser === null) {
    next('/login')
  } else {
    next()
  }
}

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.PageTitle}`
  if (to.meta.requiredAuth) {
     getUser(next)
  } else {
    next()
  }
})

export default router
