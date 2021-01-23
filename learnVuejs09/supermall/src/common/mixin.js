import backTop from 'components/content/backTop/BackTop.vue';

export const backTopMixin={
  data: function () {
    return {
      showBackTop: false,
      isBackTopShow: false,
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  },
  components:{
    backTop
  }
}
