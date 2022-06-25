import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)
export default new vuex.Store({
  state:{
    count : 0
  },
  mutations:{
    INCREMENT(state){
      state.count ++;
    },
    DECREMENT(state){
      state.count --;
    }
  },
  actions:{
    increment(context){

      context.commit('INCREMENT')
    },
    decrement({commit}){
      commit('DECREMENT')
    }
  },
  getters:{

  }
})
