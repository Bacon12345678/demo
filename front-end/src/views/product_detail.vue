<template>
  <button @click="goback">回上頁</button>
  <div class="product-detail-page">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <img :src="product.imageName" class="w-25">
  </div>

  <div>
    <button class="add-to-cart">add to cart</button>
      </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const product = computed(() => products.find(product => product.id === route.params.productId));

const goback = () => {
    router.back();
};

</script>

<script>
import axios from 'axios'; 

export default {
  data() {
    return {
      products: [], // 存储产品数据的数组
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/test"); // 添加斜杠表示根路径
      this.products = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
};
</script>
