import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'
import { SecurityRoutes } from '@/services/security/router'
import NavbarComponent from '../components/NavbarComponent.vue'
import { PatientRoutes } from '@/services/patient/router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    components: { default: HomePage, header: NavbarComponent },
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


export default router
