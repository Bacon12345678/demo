<template>
    <div class="text-end mx-5">
          <a href="#" class="d-block link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false" 
          style="position: relative;">
          <button class="btn btn-primary profile-button mr-3" type="button" @click="checkLoginStatus">拍賣</button>
            <i class="fas fa-envelope fa-2x" ></i>
          </a> 
        </div>
</template>

<script setup>
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