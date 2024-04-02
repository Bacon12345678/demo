<template>
    <div class="dropdown text-end mx-3">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle iconClass" data-bs-toggle="dropdown" aria-expanded="false" 
          style="position: relative;">
            <img src="@/assets/image/bell.svg" alt="mdo" width="22" height="22" class="rounded-circle">
            <i class="fas fa-envelope fa-2x" ></i>
            <span class="badge rounded-pill badge-notification bg-danger"
            style=" position: absolute;top: 0px; right: 10px;display: block; font-size: 10px;">9</span>
          </a> 
          <ul class="dropdown-menu text-small">
            <a href="javascript:;" @click="$router.push('/test')"><li>個人資料</li></a>
            <li><a class="dropdown-item" href="#">我的商城</a></li>
            <li><a class="dropdown-item" href="#">購買紀錄</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">登出</a></li>
          </ul>
        </div>
</template>