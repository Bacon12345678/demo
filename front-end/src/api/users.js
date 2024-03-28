import request from '@/utils/http'

export const loginAPI = ({email,password}) =>{
    return request({
      url:'/login',
      method:'POST',
      data:{
        email,
        password
      }  
    })
}

export const getuserId = () => {
  const cookies = document.cookie;
  const [jwtToken, additionalData] = cookies.split('|');
  const [pretext, userId] = additionalData.split('=');
  return userId;
}