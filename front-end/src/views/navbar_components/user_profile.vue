<template>
        <div class="dropdown text-end px-5">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

          <template v-if="false">
            <li><a href="javascript:;" @click="$router.push('/login')"></a></li>>
          </template>
          
          <template v-else>
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">個人資料</a></li>
            <li><a class="dropdown-item" href="#">我的商城</a></li>
            <li><a class="dropdown-item" href="#">購買紀錄</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a href="javascript:;" @click="logout">登出</a></li>
          </ul>
          </template>

        </a>          
        </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';  // 假设你使用的是axios库进行http请求

const router = useRouter();

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