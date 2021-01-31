<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar :border='false' title="商品列表" left-arrow @click-left="$router.back()" />
        <!-- 搜索 -->
        <van-search v-model="value" placeholder="按内容搜索" />
        <van-list v-if='goodsList'>
            <van-card v-for="item in goodsList" :key="item.id" :price="item.price.toFixed(2)" :title="item.goodsname" :thumb="item.img ? $imgUrl+item.img : 'https://img01.yzcdn.cn/vant/ipad.jpeg'" @click="goDetail(item.id)" />     
        </van-list>
        <van-list v-else>
            <van-empty description="暂无商品" />
        </van-list>
        
    </div>
</template>

<script>
import "../assets/css/list.css";
// 引入接口列表
import { getGoodsList } from "../util/axios";
export default {
    data() {
        return {
            value: "",
            goodsList: [],
        };
    },
    mounted() {
        getGoodsList({
            fid: this.$route.query.id,
        }).then((res) => {
            console.log(res, "响应");
            if (res.code == 200) {
                this.goodsList = res.list;
            }
        });
    },
    methods: {
        // 跳转商品详情
        goDetail(id){
            this.$router.push({
                path: "/detail",
                query:{
                    id
                }
            })
        }
    },
};
</script>

<style lang="" scoped>
.van-card__title{
    font-size: .4rem;
    line-height: .6rem;
}
</style>
