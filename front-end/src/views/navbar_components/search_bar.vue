<template>
    <form class="d-flex px-5 w-50" role="search" @submit="submitForm">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="keyword">
        <button class="btn btn-outline-success" type="submit" >Search</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const keyword = ref('');  // 用户输入的关键词
const store = useStore();

const submitForm = async (event) => {
  event.preventDefault();  // 阻止表单的默认提交行为
  await store.dispatch('searchProduct', keyword.value);  // 调用 Vuex action 执行搜索
};

</script>