<template>
    <div class="container mb-5" v-for="product in OrderItems" :key="product.id">
        <div class="row">
        <div class="col">
          {{ product.name }}
        </div>
        <div class="col thumbnail">
            <img :src="'./src/assets/image/' + product.imageName" style = "width: 20%;">
        </div>
        <div class="col">
          {{ product.price }}
        </div>
        <div class="col">
          {{ product.amount }}
        </div>
      </div>
      <hr />
    </div>

    <button>完成交易</button>
    <button class="bg-danger">取消交易</button>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue';


const OrderItems = ref([]);

const fetchOrderItems = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/orders', { withCredentials: true });
        OrderItems.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

onMounted(fetchOrderItems);
</script>