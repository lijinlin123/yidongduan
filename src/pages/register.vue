<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar :border='false' title="注册" left-arrow @click-left="$router.back()" />
        <div class="img">
            <img src="../assets/images/logo/orange.png" alt="">
        </div>
        <!-- 注册 -->
        <van-form @submit="register">
            <van-field v-model="regList.phone" name="手机号" label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写手机号' }]" />
            <van-field v-model="regList.nickname" name="昵称" label="昵称" placeholder="昵称" :rules="[{ required: true, message: '请填写昵称' }]" />
            <van-field v-model="regList.password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">注册</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import '../assets/css/public.css'
// 引入接口列表
import { register } from "../util/axios";
import { Toast } from 'vant';
export default {
    data() {
        return {
            regList: {
                phone: "",
                nickname: "",
                password: "",
            },
        };
    },
    methods: {
        // 封装一个注册事件
        register(){
            register(this.regList)
            .then(res=>{
                // console.log(res,'响应');
                if(res.code==200){
                    Toast.success(res.msg);
                    // 跳转到登录页面
                    this.$router.push('/login')
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
    margin-top: 2.8rem;
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
