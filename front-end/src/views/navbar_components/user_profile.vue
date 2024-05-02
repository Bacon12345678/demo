<template>
    <template v-if="loggedIn">
        <div class="dropdown text-end px-5">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

          <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          <ul class="dropdown-menu text-small">
            <div href="javascript:;" class="profilebutton m-1" @click="$router.push('/userinfo')"><li>個人資料</li></div>
            <div href="javascript:;" class="profilebutton m-1" @click="$router.push('/myauction')"><li>我的商品</li></div>
            <div href="javascript:;" class="profilebutton m-1" @click="$router.push('/transactionRecord')"><li>商家購買紀錄</li></div>
            <div href="javascript:;" class="profilebutton m-1" @click="$router.push('/myNFTs')"><li>我的NFT</li></div> 
            <li><hr class="dropdown-divider"></li>
            <li><span href="javascript:;" class="profilebutton" @click="logout">登出</span></li>
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
  router.replace('/');
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
      window.location.reload();
    } else {
      console.error(`Logout failed with status code: ${response.status}`);
    }
  } catch (err) {
    // 处理错误，例如展示一个错误消息，或者只是简单地在控制台中打印错误
    console.error(err);
  }
};
</script>

<style>

.profilebutton:hover{
  cursor: pointer;
  box-shadow: 0 0 5px rgba(143, 142, 142, 0.5); 
}

</style>