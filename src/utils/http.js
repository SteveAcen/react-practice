//导入axios：yarn add axios
import axios from 'axios'
import { getToken,removeToken } from './token' //注意这里只能平行引用./token，不能向上引用./index，否则会形成环路引用
import { history } from './history'

//添加http：注意这里可以根据环境设置来决定使用哪个地址
const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

//请求拦截器
http.interceptors.request.use(function (config) {
    //添加token到请求头
    const token = getToken();
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  } , function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//响应拦截器
http.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    if (error.response.status === 401) {
        // 删除token
        removeToken()
        // 跳转到登录页
        history.push('/login')
      }
    return Promise.reject(error);
  });

//导出
export default http 