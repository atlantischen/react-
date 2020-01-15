import axios from 'axios'
import errCode from '../config/error-code'
import store from '$redux/store';

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {

  }
});
// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 处理token
    const token = store.getState().user.token;

    if (token) {
      config.headers.authorization = `Bearer ${token}`
    };
    /**
     *  如果是 application/json ， 就不用处理（因为axios默认值就是这个）
        如果是 application/x-www-form-urlencoded，就需要对请求参数进行urlencoded转换
     */
    if (config.method === 'post') {
      config.data = Object.keys(config.data)
        .reduce((p, c) => {
          p += `&${c}=${config.data[c]}`;
          return p;
        }, '')
        .slice(1);
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  });
// 响应拦截器
axiosInstance.interceptors.response.use( 
  response => {
    if (response.data.status === 0) {
      return response.data.data
    } else {
      return Promise.reject(response.data.msg)
    }
  },
  err => {
    let errMsg = ''
    // 接受到响应，但响应失败
    if (err.response) {
      errMsg = errCode[err.response.status]
    } else {
      // 没有接受到响应
      if (err.message.indexOf('Network Error') !== -1) {
        errMsg = '网络连接失败，请重新连接网络试试'
      } else if (err.message.indexOf('timeout') !== -1) {
        errMsg = '网络连接超时，请连上wifi试试';
      }
    }
    return Promise.reject(errMsg || '发生未知错误，请联系管理员')

  }
)
export default axiosInstance