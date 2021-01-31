<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar :border='false' title="个人中心" left-arrow @click-left="$router.back()" />
        <div v-if='userInfo' class="user">
            <van-image round width="2rem" height="2rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
            <p>{{userInfo.nickname}}</p>
            <van-button @click="leave" round type="primary">退出登录</van-button>
        </div>
        <div v-else class="user">
            <van-image round width="2rem" height="2rem" src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3730772664,138405132&fm=26&gp=0.jpg" />
            <p>XXXXXX</p>
            <van-button @click="$router.push('/login')" round type="primary">去登录</van-button>
        </div>
        <div>
            <van-cell title="地址管理" is-link icon="location-o" />
            <van-cell title="我的钱包" is-link icon="gold-coin-o" />
            <van-cell title="我的二维码" is-link icon="qr" />
            <van-cell title="我的小伙伴" is-link icon="friends-o" />
            <van-cell title="优惠券" is-link icon="location-o" />
        </div>
    </div>
</template>

<script>
import "../assets/css/public.css";
export default {
    data() {
        return {
            userInfo: {},
        };
    },
    mounted() {
        // 把登录信息从存储中取出来
        this.userInfo = sessionStorage.getItem("userInfo")
            ? JSON.parse(sessionStorage.getItem("userInfo"))
            : false;
    },
    methods: {
        // 封装一个退出登录的事件
        leave() {
            sessionStorage.removeItem("userInfo");
            this.$router.push("/login");
        },
    },
};
</script>

<style lang="" scoped>
.user {
    width: 100%;
    height: 4rem;
    text-align: center;
    padding-top: 10px;
    background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
    box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
}
.user p {
    margin: 10px 0;
    font-size: 18px;
}
.user .van-button--normal {
    padding: 0 20px;
    font-size: 18px;
}
.van-cell {
    font-size: 18px;
    line-height: 30px;
}
.van-cell__left-icon {
    font-size: 20px;
    line-height: 30px;
    color: #ff6040;
}
</style>
