<!--product_detailvue-->

<template>
  <button @click="goback">回上頁</button>
  <div class="product-detail-page">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
  </div>

  <div>
    <button class="add-to-cart">add to cart</button>
      </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null); // 定義 product 變量

    // 在組件掛載後從路由參數中獲取產品數據
    onMounted(() => {
      const productId = route.params.productId;
      const foundProduct = product.value.find(product => product._id === productId);
      if (foundProduct) {
        product.value = foundProduct;
      } else {
        // 如果找不到對應的產品，可以導航到一個錯誤頁面或者返回上一頁
        router.back();
      }
    });

    const goback = () => {
      router.back();
    };

    return { product, goback };
  }
};
</script>
