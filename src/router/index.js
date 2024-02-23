import { createRouter, createWebHistory } from 'vue-router'
import navbar from '../views/navbar.vue'
import sale_section from '../views/sale_section.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'navbar',
      component: navbar,
      children:[
        {
          path: 'sale_section',
          name: 'sale_section',
          component: sale_section
        }
      ]
    }
  ]
})

export default router
