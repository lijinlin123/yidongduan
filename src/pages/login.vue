<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar :border='false' title="登录" left-arrow @click-left="$router.back()" />
        <div class="img">
            <img src="../assets/images/logo/orange.png" alt="">
        </div>
        <!-- 登录 -->
        <van-form @submit="login">
            <van-field v-model="loginList.phone" name="手机号" label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写手机号' }]" />
            <van-field v-model="loginList.password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import '../assets/css/public.css'
// 引入接口列表
import { login } from "../util/axios";
import { Toast } from 'vant';
export default {
    data() {
        return {
            loginList: {
                phone: "",
                password: "",
            },
        };
    },
    methods: {
        // 封装一个注册事件
        login(){
            login(this.loginList)
            .then(res=>{
                if(res.code==200){
                    // 把信息存储到本地存储
                    sessionStorage.setItem('userInfo',JSON.stringify(res.list))
                    Toast.success(res.msg);
                    // 跳转到个人中心页面
                    this.$router.push('/mine')
                }else{
                    Toast.fail(res.msg);
                }
            })
        }
    },
};
</script>

<style lang="" scoped>
form{
    width: 90%;
    margin: 30px auto;
}
.img{
    width: 100%;
    text-align: center;
    margin-top: 3.2rem;
}
.van-cell{
    font-size: .36rem;
    line-height: .6rem;
}
.van-button__content{
    font-size: .4rem;
    line-height: .6rem;
}
</style>
