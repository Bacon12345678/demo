import { createRouter, createWebHistory } from 'vue-router'
import navbar from '../views/navbar.vue'
import sale_section from '../views/sale_section.vue'
import loginpageVue from '../views/loginpage.vue'
import productspageVue from '../views/sale_section_component/productspage.vue'
import product_detailVue from '../views/product_detail.vue'


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
    },
    {
      path: '/login',
      component: loginpageVue
    },
    {
      path: '/product',
      component:productspageVue
    },
    {
      path:'/detail',
      component:product_detailVue
    }
  ]
})

export default router

