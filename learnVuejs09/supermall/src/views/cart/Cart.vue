<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{cartCount}}）</div>
    </nav-bar>
      <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
    import CartList from "./childComps/CartList";
    import NavBar from "../../components/common/tabbar/NavBar";
    import Scroll from "../../components/common/scroll/scroll";
    import BottomBar from './childComps/BottomBar'

    import {mapGetters} from 'vuex'

    export default {
        name: "Cart",
        components: {Scroll, NavBar,
            CartList,
            BottomBar},
        computed:{
            ...mapGetters(['cartList','cartCount'])
        }

    }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    z-index: 9;
    position: relative;
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
  .cart{
    position: relative;
    height:100vh;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
