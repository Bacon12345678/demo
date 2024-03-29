<template>
  <div style="margin-right: 25rem;margin-left: 25rem;">
    <el-form :model="form" :rules="rules" label-width="60px" status-icon ref="formRef">
      <h2 style="margin-left: 25rem;margin-top: 5rem;">登入</h2>

      <!-- Email input -->
      <el-form-item prop="email" label="email">
        <el-input v-model="form.email" />
      </el-form-item>

      <!-- Password input -->
      <el-form-item prop="password" label="密碼">
        <el-input v-model="form.password" />
      </el-form-item>

      <el-button @click="doLogin" size="large">登入</el-button>
    </el-form>
  </div>
</template>

  


  <script setup>
  //黑馬小兔鮮 day5-03、04優化未設置

    import {ref} from 'vue'
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    

    const form = ref({
    email: '',
    password: '',
    agree: true
    })

    //2.規則對象
    const rules = {
      email:[
        { required:true, message:'email不能為空', trigger:'blur'}
      ],
      password:[
        {required:true, message:'密碼不能為空', trigger: 'blur'},
        { min:5, max:14, message:'密碼格式錯誤', trigger: 'blur'}
      ],
      agree: [
        {
        validator: (rule, value, callback) => {
          console.log(value)
          // 自定义校验逻辑
          // 勾选就通过 不勾选就不通过
          if (value) {
            callback()
          } else {
            callback(new Error('請勾選協議'))
          }
        }
        }
      ]
    }

    const formRef= ref(null)
    const router = useRouter()
    const doLogin = () =>{
      formRef.value.validate(async (valid)=>{
      console.log(valid)

        if (valid) {
          try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
              email: form.value.email,
              password: form.value.password
            });
            
              //console.log('收到的数据:', response.data);
                // 将JWT令牌存储在cookie中，设置过期时间为1小时
              
              const responseData = response.data;
              console.log(responseData.user._id);

              document.cookie = `jwtToken=${responseData.token}; expires=${new Date(Date.now() + 3600 * 1500).toUTCString()}; path=/`;
              console.log(responseData);

              //message可改成_id之類的(?
              //console.log(responseData.message);
              router.replace({ path: '/' });
          } catch (error) {
            // 处理请求失败的情况
            console.error('登录失败：', error);
            // 在界面上显示错误信息等
          }

        }
       })
      }

  </script>