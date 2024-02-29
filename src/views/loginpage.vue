<template>
    <div>
        <h1>Rechain</h1>
        <h2>登入</h2>
    </div>


    <form method="post" class="loginForm"  @submit.prevent>
    <!-- Email input -->
    <div class="form-outline mb-4">
        <input type="email" class="form-control" v-model="users.email" />
        <label class="form-label" for="form2Example1">Email</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
        <input type="password" class="form-control" v-model="users.password" />
        <label class="form-label" for="form2Example2">密碼</label>
    </div>

    <!-- 2 column grid layout for inline styling -->
    <div class="row mb-4">
        <div class="col d-flex justify-content-center">
        <!-- Checkbox -->
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
            <label class="form-check-label" for="form2Example31"> 記住我 </label>
        </div>
        </div>

        <div class="col">
        <!-- Simple link -->
        <a href="#!">忘記密碼?</a>
        </div>
    </div>

    <!-- Submit button -->
    <button type="button" class="btn btn-primary btn-block mb-4">登入</button>

    <!-- Register buttons -->
    <div class="text-center">
    <a href="#!">註冊</a>
    </div>    
    </form>
  </template>
  


  <script>
    import { users } from '@/assets/temp-data.js'
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    export default {
  setup() {
    const user = ref({
      email: "",
      password: ""
    });
    const router = useRouter();

    const userLogin = async () => {
      try {
        await users.signInWithEmailAndPassword(users.value.email, users.value.password);
        router.push("/admin");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      user,
      userLogin
    };
  }
};
  </script>