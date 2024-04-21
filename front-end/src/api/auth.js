import axios from "axios";


export const isLoggedIn = async () => {
    // 从 cookie 中提取 token
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwtToken'))
      const token = cookie ? cookie.split('=')[1] : null;
    
    try {
      // 发起请求到你的服务器端验证端点
      const response = await axios.get('http://localhost:3000/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    
      // 如果服务器返回了成功的响应，那么用户已登录
      return response.status === 200;
      
    } catch (error) {
      console.error(`Error verifying token: `, error); 
      return false;
    }
  };
  