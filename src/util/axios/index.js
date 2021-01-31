import http from './axios'

// ======================移动端前台接口列表=======================

// 获取轮播图的接口
export function getBanner(){
    return http.get('/getbanner')
}
// 获取商品列表的接口
export function getIndexGoodsList(){
    return http.get('/getindexgoods')
}
// 获取分类树结构的接口
export function getCateList(){
    return http.get('/getcatetree')
}
// 获取分类商品列表的接口
export function getGoodsList(params){
    return http.get('/getgoods',{params})
}
// 获取商品详情的接口
export function getGoodsInfo(params){
    return http.get('/getgoodsinfo',{params})
}
// 封装一个注册的接口
export function register(data){
    return http.post('/register',data)
}
// 封装一个登录的接口
export function login(data){
    return http.post('/login',data)
}
// 封装一个添加购物车的接口
export function addCart(data){
    return http.post('/cartadd',data)
}
// 封装一个删除购物车的接口
export function deleteCart(data){
    return http.post('/cartdelete',data)
}
// 获取购物车列表的接口
export function getCartList(params){
    return http.get('/cartlist',{params})
}

