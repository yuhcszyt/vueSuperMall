<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="detailScroll" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info :recommendList="recommends"></detail-recommend-info>
    </scroll>
  </div>
</template>

<script>

    import scroll from "../../components/common/scroll/scroll";

    import DetailNavBar from "views/detail/childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

    import {debounce} from 'common/utils.js';
    import {
        getDetail, getRecommend,
        Goods, Shop,GoodsParam,
    } from "network/detail";

    export default {
        name: "detail",
        components: {
            scroll,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailRecommendInfo
        },
        data() {
            return {
                iid: 0,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                imageLoadCount :0,
                paramInfo: {},
                commentInfo:{},
                debounceRefresh:{},
                recommends:[]
            }
        },
        created() {
            this.iid = this.$route.params.iid;
            this.getDetail();
            this.getRecommend();
        },
        computed:{
            dataImgageCount(){
               return  this.detailInfo.detailImage.length;
            }
        },
        mounted() {
             this.debounceRefresh = debounce(this.$refs.scroll.refresh, 200);
        },
        methods: {
            getDetail() {
                getDetail(this.iid).then(
                    (res) => {
                        this.topImages = res.result.itemInfo.topImages;
                        const data = res.result;
                        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                        // 2.4.获取店铺信息
                        this.shop = new Shop(data.shopInfo);
                        this.detailInfo = data.detailInfo;

                        // 2.6.保存参数信息
                        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

                        // 2.7.保存评论信息
                        if (data.rate.list) {
                            this.commentInfo = data.rate.list[0];
                        }
                        console.log(res);
                    })
            },
            detailImageLoad(){
                this.debounceRefresh();
            },
            getRecommend(){
                getRecommend().then((res)=>{
                    this.recommends=res.data.list;
                })
            },
        }
    }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background: #fff;
  }

  .detailScroll {
    height: calc(100% - 44px);
  }
</style>
