<template>
    <h1 class="text-center p-5 mb-5">購買紀錄</h1>
    <div class="container mb-5">
      <div class="row">
        <div class="col display-6">商品名稱</div>
        <div class="col"></div>
        <div class="col display-6">價格</div>
        <div class="col"></div>
        <div class="col display-6">碳積分</div>
        <hr/>
      </div>
    </div>
    <div class="container mb-5" v-for="product in PurchaseItems" :key="product.id">
        <div class="row">
        <div class="col">
          {{ product.name }}
        </div>
        <div class="col thumbnail">
            <img :src="'./src/assets/image/' + product.imageName" style = "width: 30%;">
        </div>
        <div class="col">
          {{ product.price }}
        </div>
        <div class="col">
          {{ product.amount }}
        </div>
        <div class="col">
          {{ product.carbonPoint }}
        </div>
      </div>
      <hr />
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted, computed } from 'vue';


const PurchaseItems = ref([]);

const fetchCartItems = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/orders', { withCredentials: true });
        PurchaseItems.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchCartItems);  

</script>