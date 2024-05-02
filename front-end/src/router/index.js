import { createRouter, createWebHistory } from 'vue-router'
import SaleSection from '../views/sale_section_component/sale_section.vue'
import LoginPageVue from '../views/loginpage.vue'
import ProductDetailVue from '../views/product_detail.vue'
import ShoppingCartPage from '../views/ShoppingCartPage.vue'
import sale_item_test from '../views/sale_section_component/sale_item.vue'
import Userinfopage from '../views/UserInfoPage.vue'
import Checkout_page from '../views/checkout_page.vue'
import Order_page from '../views/Order.vue'
import Uniplo from '../views/company_sell_page/uniplo.vue'
import CompanyProductDetailVue from '../views/company_sell_page/company_productDetail.vue'
import TransRec from '../views/company_sell_page/trans_record.vue'
import Myauction from '../views/Nft_marketplace.vue'
import Nft_marketplace from '../../NFT/components/Marketplace.vue'
import NFTpage from '../../NFT/components/NFTpage.vue'
import MyNFT from '../../NFT/components/Profile.vue'
import SellNFT from '../../NFT/components/SellNFT.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Nft_marketplace',
      component: Nft_marketplace,
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
    },{
      path:'/shoppingcart',
      name:'shoppingcart',
      component:ShoppingCartPage,
      props: true
    },{
      path:'/userinfo',
      name:'userinfopage',
      component:Userinfopage,
    },{
      path: '/:productId',
      name: 'product_detail',
      component: ProductDetailVue,
      props: true
    },{
      path:'/sell',
      name: 'sellpage',
      component: SellNFT,
      props: true
    },{
      path:'/checkoutbill',
      name: 'checkoutpage',
      component: Checkout_page,
      props: true
    },{
      path:'/orders',
      name:'orderpage',
      component: Order_page,
      props: true
    },
    {
      path: '/uniplo',
      name : 'uniplo',
      component: Uniplo,
      props: true
    },{
      path: '/:companyproductId',
      name: 'company_product_detail',
      component: CompanyProductDetailVue,
      props: true
    },{
      path:'/transactionRecord',
      name: 'transRec',
      component : TransRec,
      props:true
    },
    {
      path: '/myauction',
      name:'myauction',
      component : Myauction,
      props:true
    },
    {
      path:'/nftPage/:tokenId',
      name:'nftpage',
      component:NFTpage,
      props:true
    },{
    path:'/myNFTs',
    name:'myNFTs',
    component : MyNFT,
    props:true
  }

  ]
})

export default router