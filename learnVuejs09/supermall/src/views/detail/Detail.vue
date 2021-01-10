<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>

  import DetailNavBar from "views/detail/childComps/DetailNavBar";

  import {getDetail} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";

  export default {
        name: "detail",
        components: {DetailSwiper, DetailNavBar},
        data(){
            return {
                iid:0,
                topImages: []
            }
        },
        created(){
            this.iid=this.$route.params.iid;
            this.getDetail();
        },
        mounted() {
        },
      methods:{
          getDetail(){
              getDetail(this.iid).then(
                  (res)=>{
                      this.topImages=res.result.itemInfo.topImages
                  })
          }
      }
    }
</script>

<style scoped>

</style>
