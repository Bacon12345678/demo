<template>
    <div class = "collection-list mt-4 row gx-0 gy-3 ">
              <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best"
                v-for="product in products" :key="product.id"
              >
                <button @click="goToProductDetail(product.id)" style="background-color: white; color: black;">
                  <div class = "collection-img position-relative">
                    <p class = "text-capitalize my-1">{{ product.name }}</p>
                    <small>{{product.date}}</small>
                      <img :src="product.imageName" class = "w-100">
                  </div>
                    <div class = "text-center">
                      <div class = "rating mt-3">
                          <span class = "text-primary"><i class = "fas fa-star"></i></span>
                          <span class = "text-primary"><i class = "fas fa-star"></i></span>
                          <span class = "text-primary"><i class = "fas fa-star"></i></span>
                          <span class = "text-primary"><i class = "fas fa-star"></i></span>
                          <span class = "text-primary"><i class = "fas fa-star"></i></span>
                      </div>
                      <p class = "text-capitalize my-1">{{ product.info }}</p>
                      <span class = "fw-bold">{{ product.price }}</span>
                    </div>
                </button>
                  </div>
              </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToProductDetail = (productId) => {
  router.push(productId);
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
