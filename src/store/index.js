import Vue from 'vue';
import Vuex from 'vuex';
import ApiController from './ApiController.js';
import EventBus from '@/bus';
import router from '@/router';
import { dog } from './dog.js';
import { payment } from './payment.js';
import { trustee } from './trustee.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: '',
    isAppBusy: false,
    user: '',
    loadingMsg: 'Loading...',
    errorMsg: 'Something went wrong :( Try to visit this page later.',
    isLoading: true,
    isError: false,
    currentItem: null,
    isItemLoading: true,
    isItemError: false,
    selectedItemIndex: 0,
    isInEditMode: false,
    isMenuShownOnMob: false
  },
  getters: {
    apiKey: state => state.apiKey,
    isAppBusy: state => state.isAppBusy,
    user: state => state.user,
    loadingMsg: state => state.loadingMsg,
    errorMsg: state => state.errorMsg,
    isLoading: state => state.isLoading,
    isError: state => state.isError,
    currentItem: state => state.currentItem,
    isItemLoading: state => state.isItemLoading,
    isItemError: state => state.isItemError,
    selectedItemIndex: state => state.selectedItemIndex,
    isInEditMode: state => state.isInEditMode,
    isMenuShownOnMob: state => state.isMenuShownOnMob
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
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setIsError(state, isError) {
      state.isError = isError;
    },
    setCurrentItem(state, currentItem) {
      state.currentItem = currentItem;
    },
    setIsItemLoading(state, isItemLoading) {
      state.isItemLoading = isItemLoading;
    },
    setIsItemError(state, isItemError) {
      state.isItemError = isItemError;
    },
    setSelectedItemIndex(state, selectedItemIndex) {
      state.selectedItemIndex = selectedItemIndex;
    },
    toggleEditMode(state) {
      state.isInEditMode = !state.isInEditMode;
    },
    toggleIsMenuShownOnMob(state) {
      state.isMenuShownOnMob = !state.isMenuShownOnMob;
    },
    clearIsMenuShownOnMob(state) {
      if (state.isMenuShownOnMob) state.isMenuShownOnMob = false;
    },
  },
  actions: {
    async login(context, {user, pass}) {
      if (context.getters.isAppBusy || !user || !pass) return;
      context.commit('setAppBusy', true);

      let {status = '', token = false, message = 'Something went wrong :('} = await ApiController.login(user, pass);

      if (status == 'OK' && token) {
          context.commit('setUser', user);
          context.commit('setApiKey', token);
          router.push('/home/');
      } else {
          EventBus.$emit('SHOW_NOTIFICATION', {message, 'type': 'error'});
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
            EventBus.$emit('SHOW_NOTIFICATION', {message, 'type': 'success'});
        } else {
            EventBus.$emit('SHOW_NOTIFICATION', {message, 'type': 'error'});
        }
        return Promise.resolve();
    },

    async getModel(context, model) {
        if (context.getters.isAppBusy || !model) return;
        if (context.getters[`${model}/${model}`]) return;
        context.commit('setAppBusy', true);

        let key = context.getters.apiKey,
            resp = await ApiController.fetchModel(key, model);

        // because it is 'dog' in urls and 'Dog' in actions' names
        let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;

        context.commit('setIsLoading', false);

        if (resp && resp.results) {
            context.commit(`${model}/set${modelUF}`, resp.results);
        } else {
            context.commit('setIsError', true);
        }

        if (context.getters.isAppBusy) {
            context.commit('setAppBusy', false);
        }

        return Promise.resolve();
    },

    async getModelById(context, {model, id}) {
        if (context.getters.isAppBusy || !model || !id) return;
        context.commit('setAppBusy', true);
try {
        var key = context.getters.apiKey,
            resp = await ApiController.fetchModelById(key, model, id);

        // logout & redirect to main page if session was destroyed
        if (!resp.ok && [401, 403].includes(resp.status)) {
            context.commit('setApiKey', '');
            router.push('/');
            context.commit('setUser', '');
            EventBus.$emit('SHOW_NOTIFICATION', {message: resp.statusText, 'type': 'error'});
        }

        // if the model has dependencies, go get them!
        if (resp && resp.dog) {
            resp.dog = await ApiController.fetchModelById(key, 'dog', resp.dog);
        }

        if (resp && resp.trustee) {
            resp.trustee = await ApiController.fetchModelById(key, 'trustee', resp.trustee);
        }
} catch(e) {
    console.log(e); // works only the request had physical troubles
}
        context.commit('setIsItemLoading', false);

        if (resp && resp.id) {
            context.commit('setCurrentItem', resp);
        } else {
            context.commit('setIsItemError', true);
            context.commit('setCurrentItem', null);
        }

        if (context.getters.isAppBusy) {
            context.commit('setAppBusy', false);
        }

        return Promise.resolve();
    }
  },

  modules: {dog, payment, trustee}
});
