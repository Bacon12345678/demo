<template>
    <Suspense>
      <template #default>
        <div>
          <h3 class="text-center m-3">個人資料</h3>
          <hr />
  
          <div class="container">
            <div class="row">
              <div class="col">用戶名稱：
                {{ Userinfo.username }}
              </div>
              <div class="col">
                <img />
              </div>
              <div class="col">手機：
                {{ Userinfo.phone }}
              </div>
              <div class="col">email：
                {{ Userinfo.email }}
              </div>
            </div>
            <hr />
          </div>
        </div>
      </template>
  
      <template #fallback>
        <div>正在加载数据...</div>
      </template>
    </Suspense>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const Userinfo = ref([]);
  
  // vueSuspense需要返回promise，将数据获取放在一个async函数中，并在mounted后进行调用
  
  const fetchUserinfo = async () => {
      const response = await axios.get('http://localhost:3000/api/user-info', { withCredentials: true });
      Userinfo.value = response.data;
      console.log(response.data);
  }
  
  onMounted(() => fetchUserinfo());
  
  </script>