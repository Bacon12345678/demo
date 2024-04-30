<template>
  <div @click="checkLoginStatus" class="hover-effect">
      <div>
      <img src="@/assets/image/cart.svg" alt="cart" width="22" height="22" class="rounded-circle">
      </div>
  </div>
</template>


<script setup>
import { cartItems } from '@/assets/temp-data.js';
import { useRouter } from 'vue-router';  // 假设你使用的是axios库进行http请求
import {isLoggedIn} from '@/api/auth.js'
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';


const router = useRouter();

const loggedIn = ref();


const checkLoginStatus = async () =>{
  loggedIn.value = await isLoggedIn(); 
  if (!loggedIn.value) {
        ElMessageBox.alert('請先登入！', '提示', {
          confirmButtonText: '確定',
          callback: action => {
            router.replace('/login');
          }
    });
  }else {
    router.push({ name: 'shoppingcart' }); // 已登入，導航到購物車頁面
  }
}


</script>