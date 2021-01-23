 import vue from 'vue';
 import Vuex from 'vuex'

 import mutations from './mutations'
 import actions from './actions'
 import getters from './getters'

 vue.use(Vuex);
 const state = {
   cartList: []
 }

 const store = new Vuex.Store({
   state,
   mutations,
   actions,
   getters
 })

 export default store
