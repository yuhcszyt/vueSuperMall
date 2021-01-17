<template>
  <swiper class="detailSwiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" @load="imageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper/index'

    export default {
        name: "DetailSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            topImages: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            imageLoad() {
                this.$emit('detailImageLoad');
            }
        }

    }
</script>

<style scoped>
  .detailSwiper {
    height: 300px;
    overflow: hidden;
  }
</style>
