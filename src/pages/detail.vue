<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar :border='false' title="商品详情" left-arrow @click-left="$router.back()" />
        <!-- 详情内容 -->
        <img class="img" :src="$imgUrl+detailList.img" alt="">
        <div class="detail">
            <p class="price">￥{{detailList.price}}</p>
            <p>商品名称：{{detailList.goodsname}}</p>
            <div class='num'>
                <span>购买数量</span>
                <van-stepper v-model="num" />
            </div>
            <p>商品属性</p>
            <div class='guige'>
                {{detailList.specsname}}
                <van-tag v-for="attr in attrList" :key="attr" type="success">{{attr}}</van-tag>
            </div>
            <p class="gdetail">商品详情</p>
            <div v-html="detailList.description">
            </div>
        </div>
        <!-- 底部导航 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <van-goods-action-button type="warning" @click="toCart" text="加入购物车" />
            <van-goods-action-button type="danger" @click="toBuy" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import "../assets/css/detail.css";
// 引入接口列表
import { getGoodsInfo,addCart } from "../util/axios";
import { Dialog,Toast } from "vant";
export default {
    data() {
        return {
            detailList: [],
            num: 0,
            attrList: [],
        };
    },
    mounted() {
        // 获取商品详情
        getGoodsInfo({
            id: this.$route.query.id,
        }).then((res) => {
            // console.log(res, "商品详情");
            if (res.code == 200) {
                this.detailList = res.list[0];
                this.attrList = res.list[0].specsattr
                    ? res.list[0].specsattr.split(",")
                    : [];
            }
        });
    },
    methods: {
        // 跳转到购物车
        toCart() {
            // 已登录跳转到购物车页面并调取接口
            if(sessionStorage.getItem('userInfo')){
                // 调取添加接口
                addCart({
                    uid:JSON.parse(sessionStorage.getItem('userInfo')).uid,
                    num:this.num,
                    goodsid:this.detailList.id
                })
                .then(res=>{
                    // console.log(res,'添加购物车的结果');
                    Toast.success(res.msg);
                    // 跳转到购物车
                    this.$router.push({
                        path:'/cart',
                        query:{
                            uid:JSON.parse(sessionStorage.getItem('userInfo')).uid
                        }
                    })
                })
            }else{
                this.$router.push('/login')
            }
            // 未登录就去登录

        },
        // 跳转到订单页
        toBuy() {
            Dialog.alert({
                message: "暂无订单页，再见！！！",
            }).then(() => {
                // on close
            });
        },
    },
};
</script>

<style lang="" scoped>
</style>
