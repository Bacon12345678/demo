<template>

    <router-link to="/shoppingcart">
      <div>
      <img src="@/assets/image/cart.svg" alt="cart" width="22" height="22" class="rounded-circle">
      <span class="badge m-2 rounded-pill badge-notification bg-danger"
            style=" position: absolute;top: 7px;display: block; font-size: 10px;">{{cartItems.length}}</span>
      </div>
    </router-link>

</template>


<script setup>
import { cartItems } from '@/assets/temp-data.js';




</script>