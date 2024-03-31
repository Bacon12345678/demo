import { createRouter, createWebHistory } from 'vue-router'
import SaleSection from '../views/sale_section_component/sale_section.vue'
import LoginPageVue from '../views/loginpage.vue'
import ProductDetailVue from '../views/product_detail.vue'
import ShoppingCartPage from '../views/ShoppingCartPage.vue'
import TestPage from '../views/TestPage.vue'
import sale_item_test from '../views/sale_section_component/sale_item.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sale_section',
      component: SaleSection,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPageVue,
      props: true
    },
    {
      path:'/ProductPageTest',
      name:'ProductPageTest',
      component:sale_item_test,
      props: true
    },
    {
      path: '/:productId',
      name: 'product_detail',
      component: ProductDetailVue,
      props: true
    },{
      path:'/shoppingcart',
      name:'shoppingcart',
      component:ShoppingCartPage,
      props: true
    },{
      path:'/test',
      name:'testpage',
      component:TestPage,
      props: true
    }
  ]
})

export default router