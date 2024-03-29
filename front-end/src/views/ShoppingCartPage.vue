<template>
  <div>
    <h3 class="text-center m-3">購物車</h3>
    <hr />

    <div class="container" v-for="product in cartItems" :key="product.id">
      <div class="row">
        <div class="col">
          {{ product.name }}
        </div>
        <div class="col">
          <img :src="product.imageName" class="img-fluid mb-3" style="max-width: 50%; height: auto;" />
        </div>
        <div class="col">
          {{ product.price }}
        </div>
        <div class="col">
          {{ product.amount }}
        </div>
        <div class="col">
          <button @click="removeItem(product.id)">移除</button>
        </div>
      </div>
      <hr />
    </div>

    <button class="float-end m-5" @click="checkout">結帳</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getuserId } from '@/api/users.js';

const jwtToken = document.cookie

const cartItems = ref([]);
let userId;


const config = {
  headers: {
    Authorization: `Bearer ${jwtToken}` // 在標頭中添加 JWT 令牌
  }
};

// 使用 Axios 發送 GET 請求並傳遞 JWT 令牌
axios.get('http://localhost:3000/api/cart', config)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error fetching cart items:', error);
  });

// 非同步取得 userId
(async () => {
  userId = await getuserId();
  console.log('User ID:', userId);
  fetchCartItems();
})();

// 取得購物車中的產品
const fetchCartItems = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/cart/${userId}`);
    cartItems.value = response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

</script>