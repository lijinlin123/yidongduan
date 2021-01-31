<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar :border='false' title="分类" left-arrow />
        <!-- 搜索 -->
        <van-search v-model="value" placeholder="按内容搜索" />
        <div class="cate">
            <!-- 侧边栏 -->
            <van-sidebar v-model="activeKey" @change="onChange">
                <van-sidebar-item v-for='item in cateList' :key='item.id' :title="item.catename" />
            </van-sidebar>
            <!-- 分类 -->
            <van-grid :border="false" :gutter='10' :column-num="3">
                <van-grid-item :to="'/list?id='+item.id" v-for="item in secondList" :key="item.id">
                    <van-image :src="item.img ? $imgUrl+item.img : 'https://img01.yzcdn.cn/vant/apple-1.jpg'" />
                    <p>{{item.catename}}</p>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
import "../assets/css/cate.css";
// 引入接口列表
import { getCateList } from "../util/axios";
export default {
    data() {
        return {
            value: "",
            activeKey: 0,
            cateList: [],
            secondList: [], //二级分类数组
        };
    },
    mounted() {
        this.getCateInfo();
    },
    methods: {
        // 获取分类列表
        getCateInfo() {
            getCateList().then((res) => {
                console.log(res, "分类列表");
                if (res.code == 200) {
                    // 一级分类
                    this.cateList = res.list;
                    // 二级分类
                    this.secondList = res.list[0].children;
                }
            });
        },
        // 左侧侧边栏切换
        onChange() {
            // 动态获取二级分类
            this.secondList = this.cateList[this.activeKey].children;
        },
    },
};
</script>

<style lang="" scoped>
</style>
