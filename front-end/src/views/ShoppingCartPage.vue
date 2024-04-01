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
          <button @click="removeItem(product._id)">移除</button>
        </div>
      </div>
      <hr />
    </div>

    <button class="float-end m-5" @click="checkout">結帳</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { users } from '../assets/temp-data';

const cartItems = ref([]);


const fetchCartItems = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/session-data', { withCredentials: true });
        cartItems.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

onMounted(fetchCartItems);

  const removeItem = async (productId ) => {
    console.log('Product ID:',productId);
  try {
    const response = await axios.post('http://localhost:3000/api/carts/remove',
      { productId },
      { withCredentials: true }
    );
    // 处理响应，例如打印消息、显示通知、刷新购物车等。
    console.log(response.data.message);

    await fetchCartItems();
    console.log(users.cart)
  } catch (error) {
    console.error(`Error when removing product from cart: `, error);
  }
};

</script>
