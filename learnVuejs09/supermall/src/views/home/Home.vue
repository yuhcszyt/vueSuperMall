<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class='tab-control' :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1" v-show="this.isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll" :probe-type="3"
            @scroll="contentScroll" @pullingUp="pullingUp" :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature></feature>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list class="goods" :goodsList="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
    import HomeSwiper from "views/home/childComps/HomeSwiper";
    import HomeRecommendView from "views/home/childComps/HomeRecommendView"
    import Feature from "views/home/childComps/Feature";

    import NavBar from 'components/common/tabbar/NavBar'
    import TabControl from "components/content/tabControl/TabControl.vue";
    import GoodsList from "components/content/goods/GoodsList";
    import scroll from 'components/common/scroll/scroll';
    import backTop from 'components/content/backTop/BackTop.vue';

    import {getHomeMultidata, getHomeGoods} from 'network/home'
    import {debounce} from 'common/utils.js'
    import {backTopMixin} from 'common/mixin.js'

    export default {
        name: "Home",
        components: {
            HomeSwiper,
            HomeRecommendView,
            Feature,

            NavBar,
            TabControl,
            GoodsList,
            scroll

        },
        mixins:[backTopMixin],
        data() {
            return {
                type: 'pop',
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                isBackTopShow: false,
                tabOffsetTop: 0,
                isTabFixed: false,

                scrollY: 0
            };
        },
        activated() {
            this.$refs.scroll.scrollTo(0, this.scrollY,0);
            this.$refs.scroll.refresh();
        },
        deactivated() {
            this.scrollY = this.$refs.scroll.getScrollY();
        },
        created() {
            this.getHomeMultidata();
            this.getHomeGoods('sell');
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
        },
        mounted() {
            this.$bus.$on('itemImageLoad', () => {
                debounceRefresh();
            });
            const debounceRefresh = debounce(this.$refs.scroll.refresh, 200);
            /*
                        this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop;
            */
        },

        computed: {
            showGoods() {
                return this.goods[this.type].list;
            }
        },

        methods: {
            swiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            },

            /**
             * 事件监听
             */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.type = 'pop';
                        break;
                    case 1:
                        this.type = 'new';
                        break;
                    case 2:
                        this.type = 'sell'
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            pullingUp() {
                this.getHomeGoods(this.type);
            },
            contentScroll(position) {
                this.isBackTopShow = (-position.y) > 1000;
                //tabcontrol判断是否吸顶
                this.isTabFixed = (-position.y) > this.tabOffsetTop;
            },
            /**
             * 数据调用
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
                    this.$refs.scroll.finishPullUp();
                })
            }
        }
    }
</script>

<style scoped>
  #home {
    /*
        padding-top: 44px;
    */
    position: relative;

    height: 100vh;

  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*    position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
</style>
