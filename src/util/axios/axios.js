import axios from 'axios'

let http = axios.create({
    baseURL: '/api'
})

// axios拦截器
// 请求拦截
http.interceptors.request.use(req=>{
    // 从存储中取出token
    let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : ''
    // 在请求头中添加token令牌
    req.headers.authorization = token
    return req
})

// 响应拦截
http.interceptors.response.use(res=>{
    return res.data
})


export default http