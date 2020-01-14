import React from 'react';
import axios from 'axios';
import {message} from 'antd';

export default function Test() {
  // 先创建自定义axios实例
  const axiosInstance= axios.create({
    baseURL:'/api' ,//基础路径
    timeout:20000,
    headers:{

    }

  })
  // 请求拦截器(
  axiosInstance.interceptors.request.use(
    config =>{
      if(token){
        config.headers.authorization =`Bearer ${token}`
      }
      return config
    }
    
  );
  let token = ''
  // let id= ''
 const handleClick1=()=>{
    axiosInstance({
      method:'POST',
      url:'/login',
      data:{
        username:'admin',
        password:'admin'
      }
    })
    .then((res)=>{
      console.log(res);
      if(res.data.status ===0){
        token = res.data.data.token;
        message.success('登录成功')
      }else{
        message.error(res.data.msg)
      }
    })
    .catch(err => {
      console.log(err);
      message.error('网络错误');
    });
  }
  const handleClick2=()=>{

  }
  const handleClick3=()=>{

  }
  
    return (
      <div>
        <button onClick = {handleClick1}>请求1</button>
        <button onClick = {handleClick2}>请求2</button>
        <button onClick = {handleClick3}>请求3</button>
      </div>
    )
  
}
