<template>
  <scroll ref="scroll">
    <div>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </div>
  </scroll>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
        scroll, CartListItem
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
      activated() {
		    this.$refs.scroll.refresh();
      }
  }
</script>

<style scoped>

</style>
