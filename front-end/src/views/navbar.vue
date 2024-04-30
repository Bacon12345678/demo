<script setup>
import Personal_sale from './navbar_components/personal_sale.vue';
import Shop_sale from './navbar_components/shop_sale.vue';
import search_bar from './navbar_components/search_bar.vue';
import carbon_point from './navbar_components/carbon_point.vue';
import cart from './navbar_components/cart.vue';
import auction from './navbar_components/auction.vue';
import user_profile from './navbar_components/user_profile.vue';
import connect_wallet from './navbar_components/connect_wallet.vue';


</script>

<template>
  <div class="container-fluid">
      <!--頁面縮放調整-->
    <nav class="navbar navbar-expand-lg bg-body-tertiary px-1">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">ReChain</a>
        <!--漢堡標籤-->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!--大分類標籤區域-->
        <div class="collapse navbar-collapse px-5" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <Personal_sale />
            <Shop_sale />
          </ul>
            <search_bar />
            <connect_wallet/>
            <carbon_point />
            <cart />
            <auction />
            <user_profile />
           
        </div>
      </div>
    </nav>
  </div>
</template>