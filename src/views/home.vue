<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar :border='false' title="小U商城" left-arrow />
        <!-- 导航分类 -->
        <div class="masking">
            <div class="top">
                <img src="../assets/images/index/dingwei.png" alt="" class="left">
                <img src="../assets/images/index/logo.png" alt="" class="logo">
                <input type="text" placeholder="按内容搜索">
                <img src="../assets/images/index/house.png" alt="" class="right">
            </div>
            <div class="buttom">
                <ul>
                    <li @click='sort(idx)' :class="[idx==flag?'active':'']" v-for="(item,idx) in sortList" :key='item.id' :idx='item.id'>{{item.name}}</li>
                </ul>
                <div class="sort">
                    <img src="../assets/images/index/fenlei.png" alt="">
                    分类
                </div>
            </div>
        </div>
        <!-- 轮播图 -->
        <van-swipe :autoplay="2000">
            <van-swipe-item v-for="item in bannerList" :key="item.id">
                <img class="img" :src="$imgUrl+item.img" alt="">
            </van-swipe-item>
        </van-swipe>
        <!-- 活动分类 -->
        <div class="kingkong">
            <div class="box" v-for="item in kingList" :key='item.id'>
                <img :src="item.img" alt="">
                <p>{{item.name}}</p>
            </div>

        </div>
        <!-- 活动区域 -->
        <div class="activity">
            <!-- 活动内容 -->
            <div class="miaosha">
                <!-- 限时秒杀 -->
                <div class="seckill">
                    <div class="top">
                        <h1>限时秒杀</h1>
                        <p>查看更多<img src="../assets/images/index/right.png" alt=""></p>
                    </div>
                    <span>每天0点场，好货秒不停</span>
                    <div class="time">
                        <span>05</span><i>:</i>
                        <span>20</span><i>:</i>
                        <span>48</span>
                    </div>
                </div>
                <div class="right">
                    <!-- 品牌上新 -->
                    <div class="top">
                        <h1>品牌上新</h1>
                        <p>9点整，抢大牌</p>
                        <div class='btn'><span>疯抢红包</span><img src="../assets/images/index/right1.png" alt=""></div>
                    </div>
                    <!-- 日用好物 -->
                    <div class="buttom">
                        <h1>日用好物</h1>
                        <p>愿君多采撷</p>
                        <div class='btn'><span>塞满奖券</span><img src="../assets/images/index/right1.png" alt=""></div>
                    </div>
                </div>
            </div>
            <!-- 商品列表切换 1.所有产品 2.新品 3.热卖-->
            <van-tabs color='#FF6040' type="card">
                <van-tab title="最新商品">
                    <van-card v-for="item in newList" :key="item.id" :price="item.price.toFixed(2)" :title="item.goodsname" :thumb="item.img ? $imgUrl+item.img : 'https://img01.yzcdn.cn/vant/ipad.jpeg'" />
                </van-tab>
                <van-tab title="热门商品">
                    <van-card v-for="item in hotList" :key="item.id" :price="item.price.toFixed(2)" :title="item.goodsname" :thumb="item.img ? $imgUrl+item.img : 'https://img01.yzcdn.cn/vant/ipad.jpeg'" />
                </van-tab>
                <van-tab title="所有商品">
                    <van-card v-for="item in goodsList" :key="item.id" :price="item.price.toFixed(2)" :title="item.goodsname" :thumb="item.img ? $imgUrl+item.img : 'https://img01.yzcdn.cn/vant/ipad.jpeg'" />
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import "../assets/css/home.css";
// 引入接口文档
import { getBanner,getIndexGoodsList } from "../util/axios";
export default {
    data() {
        return {
            bannerList: [],
            hotList:[], //热门商品
            newList:[], //最新商品
            goodsList:[], //所有商品
            flag: 0,
            sortList: [
                {
                    id: 1,
                    name: "推荐",
                },
                {
                    id: 2,
                    name: "女装",
                },
                {
                    id: 3,
                    name: "鞋包",
                },
                {
                    id: 4,
                    name: "居家",
                },
                {
                    id: 5,
                    name: "母婴",
                },
                {
                    id: 6,
                    name: "美妆",
                },
            ],
            kingList: [
                {
                    id: 1,
                    img: require("../assets/images/index/seckill.png"),
                    name: "限时秒杀",
                },
                {
                    id: 2,
                    img: require("../assets/images/index/top.png"),
                    name: "畅销商品",
                },
                {
                    id: 3,
                    img: require("../assets/images/index/brand.png"),
                    name: "品质大牌",
                },
                {
                    id: 4,
                    img: require("../assets/images/index/selfsupport.png"),
                    name: "小U自营",
                },
                {
                    id: 5,
                    img: require("../assets/images/index/integral.png"),
                    name: "积分商城",
                },
            ],
        };
    },
    mounted() {
        this.getBannerList();
        this.getGoodsList();
    },
    methods: {
        // 封装一个获取轮播图的事件
        getBannerList() {
            getBanner().then((res) => {
                // console.log(res);
                if (res.code == 200) {
                    this.bannerList = res.list;
                }
            });
        },
        sort(idx) {
            this.flag = idx;
        },
        // 封装一个获取商品列表的事件
        getGoodsList(){
            getIndexGoodsList()
            .then(res=>{
                console.log(res,'首页的商品列表');
                if(res.code==200){
                    this.hotList = res.list[0].content;
                    this.newList = res.list[1].content;
                    this.goodsList = res.list[2].content;
                }
            })
        }
    },
};
</script>

<style lang="" scoped>
.van-card{
    font-size: 16px;
}
</style>
