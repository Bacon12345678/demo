<!--product_detailvue-->

<template>
  <button @click="goback">回上頁</button>
  <div class="product-detail-page">
    <h1>{{ product.name }}</h1>
    <p>{{ product.info }}</p>
    <p>Price: {{ product.price }}</p>
  </div>
  <div>
    <button class="add-to-cart">add to cart</button>
      </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();


const product = ref([]);

onMounted(async () => {
  const productId = route.params.productId;
  try {
    const response = await axios.get(`http://localhost:3000/api/ProductPageTest/${productId}`);
    product.value = response.data;
    console.log(response)
  } catch (error) {
    console.error('Error fetching product:', error);
  }
  return { product } ;
});
</script>
