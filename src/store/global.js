import ApiController from './ApiController.js';
import EventBus from '@/bus';

export const global = {
  namespaced: true,
  state: {
    apiKey: '',
    isAppBusy: false
  },
  getters: {
    apiKey: state => state.apiKey,
    isAppBusy: state => state.isAppBusy
  },
  mutations: {
    setApiKey(state, key) {
      state.apiKey = key;
    },
    setAppBusy(state, isAppBusy) {
      state.isAppBusy = isAppBusy;
    }
  },
  actions: {
    async login(context, {user, pass}) {
      let {status = '', token = false, message = 'Something went wrong :('} = await ApiController.login(user, pass);

      if (status == 'OK' && token) {
          context.commit('setApiKey', token);
      } else {
          EventBus.$emit("SHOW_NOTIFICATION", {message, 'type': 'error'});
      }

      if (context.getters.isAppBusy) {
          context.commit('setAppBusy', false);
      }

      return Promise.resolve();
    },
    async logout(context) {
        let {status = '', message = 'Something went wrong :('} = await ApiController.logout(context.getters.apiKey);

        if (status == 'OK') {
            context.commit('setApiKey', '');
            EventBus.$emit("SHOW_NOTIFICATION", {message, 'type': 'success'});
        } else {
            EventBus.$emit("SHOW_NOTIFICATION", {message, 'type': 'error'});
        }
        return Promise.resolve();
    }
  }
};
