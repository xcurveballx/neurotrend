import Vue from "vue";
import Vuex from "vuex";
import { global } from './global.js';
import { dogs } from './dogs.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {example: 500},
  mutations: {},
  actions: {},
  modules: {global, dogs}
});
