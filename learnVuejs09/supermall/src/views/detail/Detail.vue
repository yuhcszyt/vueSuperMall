<template>
  <div class="detail">
    <detail-nav-bar ref="navBar" class="detail-nav" @DetailNavBarIndex="getNavBarIndex"></detail-nav-bar>
    <scroll :probe-type="3" class="detailScroll" ref="scroll" @scroll="getScrollPosition">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info ref="goodsInfo" :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info ref="paramInfo" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommendInfo" class="recommendInfo" :recommendList="recommends"></detail-recommend-info>
    </scroll>
    <back-top @click.native="backTop" v-show="isBackTopShow"></back-top>
    <detail-bottom-bar class="bottomBar" @addToCart="addToCart"></detail-bottom-bar>
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
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import {debounce} from 'common/utils.js';
    import {backTopMixin} from 'common/mixin.js'

    import {
        getDetail, getRecommend,
        Goods, Shop,GoodsParam,
    } from "network/detail";

    export default {
        name: "detail",
        components: {
            DetailBottomBar,
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
        mixins:[backTopMixin],
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
                recommends:[],
                navBarIndex:0,
                navBarHeight:[]
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
             this.debounceSetNavBarHeight = debounce(this.setNavBarHeight, 200);
        },
        methods: {
            addToCart(){
                const product={}
                product.image=this.topImages[0];
                product.title=this.goods.title;
                product.desc=this.goods.desc;
                product.price=this.goods.nowPrice;
                product.iid=this.iid;
                this.$store.commit({
                    type:'addToCart',
                    product
                });
            },
            getNavBarIndex(index){
                this.navBarIndex=index;
                this.$refs.scroll.scrollTo(0,-this.navBarHeight[this.navBarIndex]);
            },
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
                this.debounceSetNavBarHeight();
            },
            getRecommend(){
                getRecommend().then((res)=>{
                    this.recommends=res.data.list;
                })
            },
            setNavBarHeight(){
                this.navBarHeight=[];
                this.navBarHeight.push(0);
                this.navBarHeight.push(this.$refs.paramInfo.$el.offsetTop);
                this.navBarHeight.push(this.$refs.comment.$el.offsetTop);
                this.navBarHeight.push(this.$refs.recommendInfo.$el.offsetTop);
            },
            getScrollPosition(position){
                this.isBackTopShow = (-position.y) > 1000;

                const y=-position.y;
                if(y>=this.navBarHeight[0]&&y<this.navBarHeight[1]) this.currentIndex=0;
                if(y>=this.navBarHeight[1]&&y<this.navBarHeight[2]) this.currentIndex=1;
                if(y>=this.navBarHeight[2]&&y<this.navBarHeight[3]) this.currentIndex=2;
                if(y>=this.navBarHeight[3]) this.currentIndex=3;
                this.$refs.navBar.currentIndex=this.currentIndex;
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
    height: calc(100% - 102px);
  }
  .bottomBar{
  }
  .recommendInfo{
    margin-bottom: 43px;
  }
</style>
