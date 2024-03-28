import axios from 'axios'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

const httpInstance = axios.create({
    baseURL:'http://localhost:5173/',
    timeout: 10000
})

// Add a request interceptor
httpInstance.interceptors.request.use(function (config) {
    
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });


// Add a response interceptor
httpInstance.interceptors.response.use(res => res.data, e => {
    //統一錯誤提示
    ElMessage({
        type:'warning',
        message: e.response.data.msg
    })
    return Promise.reject(e);
  });

export default httpInstance