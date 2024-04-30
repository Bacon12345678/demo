<template>
    <h1 class="text-center p-5 mb-5">訂單商品</h1>
    <div class="container mb-5">
      <div class="row">
        <div class="col display-6">商品名稱</div>
        <div class="col"></div>
        <div class="col display-6">價格</div>
        <div class="col"></div>
        <div class="col display-6">碳積分</div>
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
        <div class="col">
          {{ product.carbonPoint }}
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
                <p>可獲得碳積分：</p>
                <p class="text-success"> {{ TotalCarbonPoint }}</p>
            </div>
        </div>
        <div class="col m-5 text-center">
            碳積分折抵
            <input type="number" id="pointsInput" min="0" max=MaxPoint v-model="points">
        </div>
        <div class="col m-5 text-center">
            <p>擁有碳積分：</p>
            <p class="text-success">{{ MaxPoint }}</p>
        </div>
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

var points = ref(0);
var MaxPoint;


const TotalPrice = computed(() => {
    return cartItems.value.reduce((total, product) => {
        return total + product.price;
    }, 0) - points.value;
    
});

const maxPoint = async () => {
    const userdata = await axios.get('http://localhost:3000/api/user-info', { withCredentials: true });
    MaxPoint = userdata.data.CarbonPoint;

    // 獲取輸入框並設定它的max屬性
    const input = document.getElementById('pointsInput');
    input.max = MaxPoint;

    // 添加一個事件監聽器來在用戶輸入時檢查輸入的值
    input.onchange = function() {
        if (this.value > MaxPoint) {
            this.value = MaxPoint;
        }
        points.value = this.value;
    }

    return MaxPoint;
}

const fetchCartItems = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/user-cart', { withCredentials: true });
        cartItems.value = response.data;
        console.log(response.data);
        maxPoint();
    } catch (error) {
        console.error(error);
    }
};


const TotalCarbonPoint = computed(()=>{
    return cartItems.value.reduce((total,product)=>{
        return total + product.carbonPoint;
    }, 0);
})


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
            await axios.put(`http://localhost:3000/api/available/${product._id}`, { available: false }, { withCredentials: true });
            await axios.post('http://localhost:3000/api/carts/remove',
            { productId: product._id },
            { withCredentials: true }
    );
} catch (error) {
            console.error(`Error when adding product to cart: `, error);
        }
    }

    try {
        await axios.put('http://localhost:3000/api/uploadPayment', {  Payment: TotalPrice.value, 
        tempCarbonPoint : TotalCarbonPoint.value  + MaxPoint - points.value}, { withCredentials: true })
    } catch (error) {
        console.log(error);
    }

    router.push({ name: 'orderpage' });
};

</script>