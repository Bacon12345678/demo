<template>
      <div class = "title text-center">
        <h2 class = "position-relative d-inline-block">UniPLo</h2>
      </div>

      <div class = "collection-list mt-4 row gx-0 gy-3 " :key="productsList.value">
            <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best"
                v-for="product in productsList" :key="product._id"
            >
                <button @click="goToProductDetail(product._id)" style="background-color: white; color: black;">
                    <div class = "collection-img position-relative">
                        <p class = "text-capitalize my-1">{{ product.name }}</p>
                            <img :src="'./src/assets/image/' + product.imageName" class = "w-100">
                            <h6 class="text-success mt-3">炭積分：{{product.carbonPoint}}</h6>
                        </div>
                        <div class = "text-center">
                            <p>{{ product.condition }}</p>
                            <p class = "fw-bold">NT$ {{ product.price }}</p>
                            <p class="text-primary">#{{ product.classification }}</p>
                        </div>
                </button>
            </div>
        </div>
</template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import axios from 'axios'; 
  import { ref, onMounted, computed, watch} from 'vue';  
  import { useStore } from 'vuex';

  const store = useStore();

  const searchResults = computed(()=>store.state.searchResults);
  
  const companyproducts = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/UniPLo`);
      companyproducts.value = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  });
  
  const router = useRouter();
  
  const goToProductDetail = (_id) => {
  
    router.push({ name: 'company_product_detail', params: { companyproductId: _id } });
  }

  const productsList = computed(() => {
    return searchResults.value.length === 0 ? companyproducts.value : searchResults.value;
  });

  watch(productsList, (newValue) => {
  console.log('productsList 更新了:', newValue);
});



  </script>