import axiosInstance  from './request'
export const reqLogin = (username,password)=>{
  return axiosInstance ({
    url:'/login',
    method:'POST',
    data:{
      username,
      password
    }
  })
}
// 获取分类列表
export const getCategoryList =()=>{
  return axiosInstance ({
    url:'/category/get',
    method:'GET'
  })
}