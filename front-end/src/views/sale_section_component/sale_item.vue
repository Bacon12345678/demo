<!--sale_itemvue-->

<template>
    <div class = "collection-list mt-4 row gx-0 gy-3 ">
              <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best"
                v-for="product in products" :key="product.id"
              >
                <button @click="goToProductDetail(product._id)" style="background-color: white; color: black;">
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
import axios from 'axios'; 
import { ref, onMounted } from 'vue';

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/ProductPageTest`);
   products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

const router = useRouter();

const goToProductDetail = (_id) => {

  router.push({ name: 'product_detail', params: { productId: _id } });
}

</script>