import axios from 'axios';
import Cookie from 'js-cookie'
import {Notification,MessageBox,Message} from 'element-ui';
const http = axios.create({
  //baseURL: 'http://localhost:8081/',
  //配置了跨域，不需要的话将withCredentials设置为false即可
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
});
// 请求拦截器
http.interceptors.request.use(send => {
  if(Cookie.get('userId') !== undefined){
    send.headers['Authorization'] = Cookie.get('userId');
  }
  return send;
},error=>{
  Promise.reject(error);
})

// 响应拦截器
http.interceptors.response.use(result => {
  const code = result.data.code || 200;
  if(code === 200){
    return Promise.resolve(result.data);
  }else{
    Message({
      message:result.data.massage,
      type:'error'
    })
  }
},error => {
  let { message } = error;
  if(message === "Network Error"){
    message = "后端接口连接异常"
  }else if(message.includes("timeout")){
    message = "系统接口请求超时"
  }else if(message.includes("Request failed with status code")){
    message = "系统接口"+message.substr(message.length - 3)+"异常";
  }
  Message({
    message:message,
    type:"error",
    duration:5 * 1000
  })
  return Promise.reject(error);
})
export default http;
/*

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
*/
