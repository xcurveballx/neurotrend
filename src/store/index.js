import Vue from 'vue';
import Vuex from 'vuex';
import { state } from './global/state.js';
import { getters } from './global/getters.js';
import { mutations } from './global/mutations.js';
import { actions } from './global/actions.js';
import { dog } from './dog.js';
import { payment } from './payment.js';
import { trustee } from './trustee.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {dog, payment, trustee}
});
