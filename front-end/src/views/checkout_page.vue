<template>
    <h1 class="text-center p-5 mb-5">訂單商品</h1>
    <div class="container mb-5">
      <div class="row">
        <div class="col display-6">商品名稱</div>
        <div class="col"></div>
        <div class="col display-6">價格</div>
        <div class="col"></div>
        <hr/>
      </div>
    </div>
    <div class="container mb-5" v-for="product in cartItems" :key="product.id">
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
      </div>
      <hr />
    </div>

<div class="container">
    <div class="row">
        <el-form :model="form" :rules="rules"  class="col m-5">
            <h3>選擇付款方式</h3>
            <el-radio-group v-model="form.payment">
                <el-radio>
                    面交
                </el-radio>
            </el-radio-group>
        </el-form>
        <div class="col m-5 text-center">
            <div>
                <h3>訂單金額</h3>
                <h4 class="text-danger">NT$ {{ TotalPrice }}</h4>
            </div>
        </div>
    </div>

    <div class="row justify-content-center">
        <button type="primary" @click="handleSubmit">確認下訂</button>
    </div>
</div>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const cartItems = ref([]);

const form = ref({
    payment:''
    })

const rules = {
    payment: [
        { required: true, message: '請選擇付款方式', trigger: 'blur' }
    ]
};


const fetchCartItems = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/user-cart', { withCredentials: true });
        cartItems.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

const TotalPrice = computed(() => {
    return cartItems.value.reduce((total,product) =>{
        return total + product.price;
    }, 0);
});

onMounted(fetchCartItems);  

const handleSubmit = async () => {
  await Order();
};

const Order = async () => {
    for (const product of cartItems.value) {
        try {
            await axios.post('http://localhost:3000/api/orders/add',
                { productId: product._id }, 
                { withCredentials: true }
            );
            await axios.put(`http://localhost:3000/api/unavailable/${product._id}`, { available: false }, { withCredentials: true });
            await axios.post('http://localhost:3000/api/carts/remove',
            { productId: product._id },
            { withCredentials: true }
    );
        } catch (error) {
            console.error(`Error when adding product to cart: `, error);
        }
    }

    router.push({ name: 'orderpage' });
};

</script>