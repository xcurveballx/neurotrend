import ApiController from './ApiController.js';
//import EventBus from '@/bus';

export const dogs = {
  namespaced: true,
  state: {
    dogs: null
  },
  getters: {
    dogs: state => state.dogs
  },
  mutations: {
    setDogs(state, dogs) {
      state.dogs = dogs;
    }
  },
  actions: {
    async fetchDogs(context, model) {
      //let {status = '', dogs = [], message = 'Something went wrong :('} =
      let key = context.rootState.apiKey;
      let res = await ApiController.fetchItems(key, model);
      console.log(res);
      // if (status == 'OK' && token) {
      //     context.commit('setUser', user);
      //     context.commit('setApiKey', token);
      //     router.push('home');
      // } else {
      //     EventBus.$emit("SHOW_NOTIFICATION", {message, 'type': 'error'});
      // }

      if (context.getters.isAppBusy) {
          context.commit('setAppBusy', false);
      }

      return Promise.resolve();
    }
  }
};
