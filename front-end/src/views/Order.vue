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

    <button @click="FinishOrder">完成交易</button>
    <button class="bg-danger" @click="cancelOrder">取消交易</button>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';


const router = useRouter();
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

const cancelOrder = async() =>{
  try {
    for (const product of OrderItems.value){
    await axios.put(`http://localhost:3000/api/available/${product._id}`, { available: true }, { withCredentials: true });
    await axios.post('http://localhost:3000/api/orders/remove',
    { productId: product._id },
    { withCredentials: true });
    }
    ElMessageBox.alert('取消成功！', 'Rechain', {
          confirmButtonText: '確定',
          callback: action => {
            router.replace('/');
          }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    await axios.put('http://localhost:3000/api/uploadPayment', {  Payment: 0 , 
      tempCarbonPoint : 0 }, { withCredentials: true })
  } catch (error) {
   console.log(error) 
  }
}

const FinishOrder = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/user-info', { withCredentials: true });
          let newPoint = response.data.CarbonPoint;
          await axios.put('http://localhost:3000/api/FinishOrder', {  Payment: 0 , 
            tempCarbonPoint : 0, CarbonPoint : newPoint}, { withCredentials: true })
            ElMessageBox.alert('交易成功！', 'Rechain', {
              confirmButtonText: '確定',
              callback: action => {
              router.replace('/');
            }
        });
        } catch (error) {
            console.error(`Error when adding product to cart: `, error);
    }
};

</script>