<!--sale_itemvue-->
<template>
  <template v-if="isNotFound">
    <h3  class="mt-5 text-center">查無資料</h3>
  </template>


  <template v-else>
    <div class = "title text-center">
                <h2 class = "position-relative d-inline-block">所有書籍</h2>
    </div>
      <div class = "collection-list mt-4 row gx-0 gy-3 ">
                <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best"
                  v-for="product in productList" :key="product.id"
                >
                  <button @click="goToProductDetail(product._id)" style="background-color: white; color: black;">
                    <div class = "collection-img position-relative">
                      <p class = "text-capitalize my-1">{{ product.name }}</p>
                      <small>{{product.date}}</small>
                        <img :src="'./src/assets/image/' + product.imageName" class = "w-100">
                    </div>
                      <div clss = "text-center">
                        
                        <p class = "text-capitalize my-1">{{ product.info }}</p>
                        <span class = "fw-bold">{{ product.price }}</span>
                      </div>
                  </button>
                    </div>
                </div>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios'; 
import { ref, onMounted,computed } from 'vue';
import { useStore } from 'vuex';


const store = useStore();
const searchResults = computed(() => store.state.searchResults);


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

const productList = computed(() => {
  return searchResults.value.length > 0 ? searchResults.value : products.value;
});


</script>