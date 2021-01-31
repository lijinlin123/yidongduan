<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar :border='false' title="购物车" left-arrow @click-left="$router.back()" />
        <!-- 搜索 -->
        <van-search v-model="value" placeholder="按内容搜索" />

        <van-list v-if='cartList.length>0'>
            <van-swipe-cell v-for="item in cartList" :key="item.id">
                <van-card :num='item.num' :price="item.price.toFixed(2)" desc="描述信息" :title="item.goodsname" :thumb="item.img ? $imgUrl+item.img : 'https://img01.yzcdn.cn/vant/ipad.jpeg'">
                    <template #footer>
                        <van-stepper v-model="item.num" theme="round" button-size="22" disable-input />
                    </template>
                </van-card>
                <template #right>
                    <van-button @click="delCart(item.id)" square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </van-list>
        <van-list v-else>
            <van-empty description="购物车暂无商品，快去买买买" />
        </van-list>

    </div>
</template>

<script>
import "../assets/css/public.css";
// 引入接口列表
import { getCartList, deleteCart } from "../util/axios";
import { Dialog, Toast } from "vant";
export default {
    data() {
        return {
            value: "",
            cartList: [],
        };
    },
    mounted() {
        this.getCart();
    },
    // 进入组件前的导航守卫
    beforeRouteEnter(to, from, next) {
        if (sessionStorage.getItem("userInfo")) {
            next();
        } else {
            Dialog.confirm({
                title: "未登录",
                message: "不能查看购物车，请先登录！",
            })
                .then(() => {
                    console.log();
                    next("/login");
                })
                .catch(() => {
                    // 取消返回上一页
                    next(from.path);
                });
        }
    },
    methods: {
        // 调取购物车列表
        getCart() {
            getCartList({
                uid:
                    this.$route.query.uid ||
                    JSON.parse(sessionStorage.getItem("userInfo")).uid,
            }).then((res) => {
                // console.log(res, "购物车1111");
                if (res.code == 200) {
                    this.cartList = res.list ? res.list : [];
                }
            });
        },
        // 删除购物车
        delCart(id) {
            // console.log(id);
            deleteCart({ id }).then((res) => {
                if (res.code == 200) {
                    Toast.success(res.msg);
                    this.getCart();
                } else {
                    Toast.fail(res.msg);
                }
            });
        },
    },
};
</script>

<style lang="" scoped>
.van-button--normal{
    height: 126px;
}
</style>
