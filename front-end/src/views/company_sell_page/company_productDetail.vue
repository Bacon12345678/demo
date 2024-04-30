<template>
  <button @click="goback">回上頁</button>
  <hr/>
  <div class="container m-5 p-5">
    <div class="row">
      <div class="col">
        <div class="product-detail-page">
          <h1>{{ companyproduct.name }}</h1>
          <img :src="'./src/assets/image/' + companyproduct.imageName" class="h-60">
        </div>
      </div>

      <div class="col m-5">
        <p class="fs-5 ">{{ companyproduct.info }}</p>
        <p class="fs-5">售價： NT $ {{ companyproduct.price }}</p>
        <p class="fs-5 text-info">產品狀況：{{ companyproduct.condition }}</p>
        <p class="fs-5">公司：{{ companyproduct.Company }}</p>
        <p class="fs-5 text-success">可獲得炭積分：{{ companyproduct.carbonPoint }}</p>
        <P class="fs-5 text-primary">#{{ companyproduct.classification }}</P>
      </div>
    </div>
  </div>
    

    <button class="add-to-cart" @click="addToCart">add to cart</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();


const companyproduct = ref([]);

onMounted(async () => {
  const companyproductId = route.params.companyproductId;
  try {
    const response = await axios.get(`http://localhost:3000/api/UniPLO/${companyproductId}`);
    companyproduct.value = response.data;
    console.log(response)
  } catch (error) {
    console.error('Error fetching product:', error);
  }
  return { companyproduct } ;
});

const goback =() =>{
  window.history.back();
}

const addToCart = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/carts/add',
      { productId: companyproduct.value._id },
      { withCredentials: true }
    );
    alert('Product added to cart successfully!');
    console.log(response.data.message);
  } catch (error) {
    console.error(`Error when adding product to cart: `, error);
  }
};


</script>
