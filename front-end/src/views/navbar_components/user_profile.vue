<template>
    <template v-if="loggedIn">
        <div class="dropdown text-end px-5">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

          <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">個人資料</a></li>
            <li><a class="dropdown-item" href="#">我的商城</a></li>
            <li><a class="dropdown-item" href="#">購買紀錄</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a href="javascript:;" @click="logout">登出</a></li>
          </ul>

          </a>          
        </div>
    </template>
          
          
    <template v-else>
      <a href="javascript:;" @click="$router.push('/login')">登入</a>
    </template>

        
</template>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';  // 假设你使用的是axios库进行http请求
import {isLoggedIn} from '@/api/auth.js'

const router = useRouter();

const loggedIn = ref(); // 创建一个响应式引用来存储登录状态

onMounted(async () => {
  loggedIn.value = await isLoggedIn(); // 在组件挂载时检查登录状态
});


const logout = async () => {
  try {
    // 向服务器发送一个注销请求
    const response = await axios.post('http://localhost:3000/logout',{}, { withCredentials: true });
    // 确保注销请求成功
    if(response.status === 200) {
      // 清除localStorage中储存的用户信息
      localStorage.removeItem('logged_in');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      // 重定向到登录页
      router.push('/');
    } else {
      console.error(`Logout failed with status code: ${response.status}`);
    }
  } catch (err) {
    // 处理错误，例如展示一个错误消息，或者只是简单地在控制台中打印错误
    console.error(err);
  }
};
</script>