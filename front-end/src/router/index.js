import { createRouter, createWebHistory } from 'vue-router'
import SaleSection from '../views/sale_section_component/sale_section.vue'
import LoginPageVue from '../views/loginpage.vue'
import ProductDetailVue from '../views/product_detail.vue'
import ShoppingCartPage from '../views/ShoppingCartPage.vue'
import TestPage from '../views/TestPage.vue'
import sale_item_test from '../views/sale_section_component/sale_item_test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sale_section',
      component: SaleSection
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPageVue
    },
    {
      path: '/:_id',
      name: 'product_detail',
      component: ProductDetailVue
    },{
      path:'/shoppingcart',
      name:'shoppingcart',
      component:ShoppingCartPage
    },{
      path:'/test',
      name:'testpage',
      component:TestPage
    },
    {
      path:'/ProductPageTest',
      name:'ProductPageTest',
      component:sale_item_test
    }
  ]
})

export default router