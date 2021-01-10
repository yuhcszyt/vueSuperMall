<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="item" :class="{active:currentIndex==index}"
             @click="titleClick(index)" v-for="(item,index) in titles" >{{item}}
        </div>
      </div>
      <!--<div class="nav-bar-item" slot="center" v-for="(item,index) in titles">{{item}}
      </div>-->
    </nav-bar>
  </div>
</template>

<script>
    import NavBar from "components/common/tabbar/NavBar";

    export default {
        name: "DetailNavBar",
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex:0
            }
        },
        components: {NavBar},
        methods:{
            titleClick(index){
                this.currentIndex=index;
            },
            backClick(){
                this.$router.back();
            }
        }
    }
</script>

<style scoped>
  .item{
    flex: 1;
  }
  .title{
    font-size: 13px;
    display: flex;
  }
  .back img{
    margin-top: 10px;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
