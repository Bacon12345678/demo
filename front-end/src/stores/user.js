//管理用戶數具相關

import { defineStore } from "pinia";
import { loginAPI } from "../api/users";
import { ref } from "vue";

export const useUserStore = defineStore('user',()=>{
    const UserInfo = ref({}) 
    const getUserInfo = async({email,password}) =>{
        const res =await loginAPI({email,password})
        UserInfo.value = res.result
    }

    return{
        UserInfo,
        getUserInfo
    }
})