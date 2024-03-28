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
            <li><a href="javascript:;" @click="$router.push('/login')">登出</a></li>
          </ul>
          </template>

        </a>          
        </div>
</template>

<script setup>


</script>