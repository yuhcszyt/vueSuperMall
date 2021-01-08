<template>
    <div class="tab-control">
      <div v-for="(title,index) in titles" class="tab-control-item"
           :class="{active:index==currentIndex}" @click="updateActive(index)">
        <span>{{title}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                currentIndex:0
            }
        },
        methods:{
            updateActive(index){
                this.currentIndex=index
                this.$emit('tabClick',index);
            }
          }
        }

</script>

<style scoped>
  .tab-control{
    background-color: var(--color-background);
    display: flex;
    text-align: center;
    font-size: 14px;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }

</style>
