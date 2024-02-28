<template>
    <div class = "collection-list mt-4 row gx-0 gy-3 ">
              <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best"
                v-for="product in products" :key="product.id"
              >
                <a href="#" class="hover text-decoration-none text-reset">
                  <div class = "collection-img position-relative">
                    <p class = "text-capitalize my-1">{{ product.name }}</p>
                    <small>6 hours ago</small>
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
                      <p class = "text-capitalize my-1">{{ product.name }}</p>
                      <span class = "fw-bold">{{ product.price }}</span>
                    </div>
                    </a>
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