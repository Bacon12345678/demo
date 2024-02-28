<template>
    <div>This is Productspage</div>
    <div class="grid-wrap">
        <div class="product-item"
            v-for="product in products" :key="product.id"
        >
            <img :src="product.imageName" />
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-price">{{ product.price }}</div>
            <button>查看</button>
        </div>

        
    </div>
</template>

<script>
import { products } from '../../assets/temp-data';

export default {
    name:"productspage",
    data() {
        return{
            products,
        }
    }

}

</script>
