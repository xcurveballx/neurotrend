import Vue from "vue";
import Vuex from "vuex";
import ApiController from './ApiController.js';
import EventBus from '@/bus';
import router from "@/router";
import { dogs } from './dogs.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: '',
    isAppBusy: false,
    user: ''
  },
  getters: {
    apiKey: state => state.apiKey,
    isAppBusy: state => state.isAppBusy,
    user: state => state.user
  },
  mutations: {
    setApiKey(state, key) {
      state.apiKey = key;
    },
    setAppBusy(state, isAppBusy) {
      state.isAppBusy = isAppBusy;
    },
    setUser(state, name) {
      state.user = name;
    }
  },
  actions: {
    async login(context, {user, pass}) {
      if (context.getters.isAppBusy) return;
      context.commit('setAppBusy', true);

      let {status = '', token = false, message = 'Something went wrong :('} = await ApiController.login(user, pass);

      if (status == 'OK' && token) {
          context.commit('setUser', user);
          context.commit('setApiKey', token);
          router.push('home');
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
            router.push('/');
            context.commit('setUser', '');
            EventBus.$emit("SHOW_NOTIFICATION", {message, 'type': 'success'});
        } else {
            EventBus.$emit("SHOW_NOTIFICATION", {message, 'type': 'error'});
        }
        return Promise.resolve();
    }
  },
  modules: {dogs}
});
