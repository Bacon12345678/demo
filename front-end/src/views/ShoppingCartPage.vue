<template>
    <h3 class="text-center m-3">購物車</h3>
    <hr />

<div class="container " v-for="product in cartItems" :key = "product.id">
  <div class="row">
    <div class="col">
        {{ product.name }}
    </div>
    <div class="col">
        <img :src="product.imageName" class = ".img-fluid mb-3" style="max-width: 50%; height: auto; ">
    </div>
    <div class="col">
        {{ product.price }}
    </div>
    <div class="col">
        {{ product.amount }}
    </div>
    <div class="col">
        <button>移除</button>
    </div> 
    <hr />
  </div>
</div>

<button class="float-end m-5">結帳</button>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getuserId } from '@/api/users.js';

const cartItems = ref([]);
const userId = getuserId();

console.log('User ID:', userId);

// 获取购物车中的产品
const fetchCartItems = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/cart/${userId}`);
    cartItems.value = response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

onMounted(fetchCartItems);
</script>