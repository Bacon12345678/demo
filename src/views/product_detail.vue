<template>
  <div class="product-detail-page">
    <h1>{{ products.name }}</h1>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
  </div>
</template>

<script>
import { products } from '../assets/temp-data';

export default {
    name:"productspage",
    data() {
        return{
            products,
        }
    }

}
</script>
