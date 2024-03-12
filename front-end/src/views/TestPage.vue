<!--test.vue-->

<template>
<div class="container " v-for="product in products" :key = "product.id">
  <div class="row">
    <div class="col">
        {{ product.name }}
    </div>
    <hr />
  </div>
</div>
</template>

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
      const response = await axios.get("/api/test"); // 添加斜杠表示根路径
      this.products = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
};
</script>