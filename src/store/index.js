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
        isMenuShownOnMob: false,
        validationErrors: {},
        notifications: []
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
        isMenuShownOnMob: state => state.isMenuShownOnMob,
        validationErrors: state => state.validationErrors,
        notifications: state => state.notifications
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
        setValidationErrors(state, validationErrors) {
            if (validationErrors)
                state.validationErrors = validationErrors;
            else
                state.validationErrors = {};
        },
        setNotification(state, notification) {
            state.notifications.push(notification);
        },
        clearNotification(state, key) {
            state.notifications = state.notifications.filter(el => el.id != key);
        },
  },
    actions: {
        async createNotification(context, {message, type}) {
            let notification = {};
            notification.message = message;
            notification.type = type;
            notification.id = + new Date();

            context.commit("setNotification", notification);
            setTimeout(() => {
                context.commit("clearNotification", notification.id)
            }, 5000);
            return Promise.resolve();
        },
    async login(context, {user, pass}) {
        if (context.getters.isAppBusy || !user || !pass) return;
        context.commit('setAppBusy', true);

        try {
            let resp = await ApiController.login(user, pass);

            if (!resp.ok && [401].includes(resp.status)) {
                EventBus.$emit('SHOW_NOTIFICATION', {message: resp.statusText + ': invalid login/password', 'type': 'error'});
            } else {
                let {status = '', token = false, message = 'Something went wrong :('} = resp;

                if (status == 'OK' && token) {
                    context.commit('setUser', user);
                    context.commit('setApiKey', token);
                    router.push('/home/');
                } else {
                    EventBus.$emit('SHOW_NOTIFICATION', {message, 'type': 'error'});
                }
            }
        } catch(e) {
            EventBus.$emit('SHOW_NOTIFICATION', {message: e.message, 'type': 'error'});
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

        try {
            let key = context.getters.apiKey,
                resp = await ApiController.fetchModel(key, model);

            // logout & redirect to main page if session was destroyed
            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.commit('setApiKey', '');
                router.push('/');
                context.commit('setUser', '');
                EventBus.$emit('SHOW_NOTIFICATION', {message: resp.statusText, 'type': 'error'});
            } else {
                // because it is 'dog' in urls and 'Dog' in actions' names
                let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;

                context.commit('setIsLoading', false);

                if (resp && resp.results) {
                    context.commit(`${model}/set${modelUF}`, resp.results);
                } else {
                    context.commit('setIsError', true);
                }
            }
        } catch(e) {
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
            } else {
                // if the model has dependencies, go get them!
                if (resp && resp.dog) {
                    resp.dog = await ApiController.fetchModelById(key, 'dog', resp.dog);

                    if (!context.getters['dog/dog']) {
                        let res = await ApiController.fetchModel(key, 'dog');
                        if (res && res.results) {
                            context.commit(`dog/setDog`, res.results);
                        } else {
                            context.commit('setIsItemError', true);
                        }
                    }
                }

                if (resp && resp.trustee) {
                    resp.trustee = await ApiController.fetchModelById(key, 'trustee', resp.trustee);
                    if (!context.getters['trustee/trustee']) {
                        let res = await ApiController.fetchModel(key, 'trustee');
                        if (res && res.results) {
                            context.commit(`trustee/setTrustee`, res.results);
                        } else {
                            context.commit('setIsItemError', true);
                        }
                    }
                }

                context.commit('setIsItemLoading', false);

                if (resp && resp.id) {
                    context.commit('setCurrentItem', resp);
                } else {
                    context.commit('setIsItemError', true);
                    context.commit('setCurrentItem', null);
                }
            }
        } catch(e) {
            context.commit('setIsItemError', true);
            context.commit('setCurrentItem', null);
        }

        if (context.getters.isAppBusy) {
            context.commit('setAppBusy', false);
        }

        return Promise.resolve();
    },

    async updateModel(context, {model, id, data}) {
        if (context.getters.isAppBusy || !model || !id || !data) return;
        context.commit('setAppBusy', true);

        try {
            var key = context.getters.apiKey,
                resp = await ApiController.updateModel(key, model, id, data);

            if (!resp.ok && [401, 403].includes(resp.status)) {
                // logout & redirect to main page if session was destroyed
                context.commit('setApiKey', '');
                router.push('/');
                context.commit('setUser', '');
                EventBus.$emit('SHOW_NOTIFICATION', {message: resp.statusText, 'type': 'error'});
            } else if (!resp.ok && [400].includes(resp.status)) {
                // wrong data format
                EventBus.$emit('SHOW_NOTIFICATION', {message: resp.statusText, 'type': 'error'});
                context.commit('setValidationErrors', await resp.json());
            } else {
                // if the model has dependencies, go get them!
                if (resp && resp.dog) {
                    resp.dog = await ApiController.fetchModelById(key, 'dog', resp.dog);

                    if (!context.getters['dog/dog']) {
                        let res = await ApiController.fetchModel(key, 'dog');
                        if (res && res.results) {
                            context.commit(`dog/setDog`, res.results);
                        } else {
                            context.commit('setIsItemError', true);
                        }
                    }
                }

                if (resp && resp.trustee) {
                    resp.trustee = await ApiController.fetchModelById(key, 'trustee', resp.trustee);
                    if (!context.getters['trustee/trustee']) {
                        let res = await ApiController.fetchModel(key, 'trustee');
                        if (res && res.results) {
                            context.commit(`trustee/setTrustee`, res.results);
                        } else {
                            context.commit('setIsItemError', true);
                        }
                    }
                }

                if (resp && resp.id) {
                    let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                    context.commit('setCurrentItem', resp);
                    context.commit('setValidationErrors'); // clears val. errors
                    context.commit('toggleEditMode');
                    context.commit(`${model}/update${modelUF}`, resp);
                    EventBus.$emit('SHOW_NOTIFICATION', {message: 'Item has been successfully updated!', 'type': 'success'});
                } else {
                    context.commit('setIsItemError', true);
                    context.commit('setCurrentItem', null);
                }
            }
        } catch(e) {
            context.commit('setIsItemError', true);
            context.commit('setCurrentItem', null);
        }

        if (context.getters.isAppBusy) {
            context.commit('setAppBusy', false);
        }

        return Promise.resolve();
    },

    async createModel(context, {model, data}) {
        if (context.getters.isAppBusy || !model) return;
        context.commit('setAppBusy', true);

        try {
            var key = context.getters.apiKey,
                resp = await ApiController.createModel(key, model, data);

            if (!resp.ok && [401, 403].includes(resp.status)) {
                // logout & redirect to main page if session was destroyed
                context.commit('setApiKey', '');
                router.push('/');
                context.commit('setUser', '');
                EventBus.$emit('SHOW_NOTIFICATION', {message: resp.statusText, 'type': 'error'});
            } else if (!resp.ok && [400].includes(resp.status)) {
                // wrong data format
                EventBus.$emit('SHOW_NOTIFICATION', {message: resp.statusText, 'type': 'error'});
                context.commit('setValidationErrors', await resp.json());
            } else {
                if (resp && resp.id) {
                    let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                    context.commit('setValidationErrors');
                    context.commit(`${model}/add${modelUF}`, resp);
                    EventBus.$emit('SHOW_NOTIFICATION', {message: 'Item has been successfully added!', 'type': 'success'});
                    router.push(`/${model}/`);
                } else {
                    context.commit('setIsItemError', true);
                    context.commit('setCurrentItem', null);
                }
            }
        } catch(e) {
            context.commit('setIsItemError', true);
            context.commit('setCurrentItem', null);
        }

        if (context.getters.isAppBusy) {
            context.commit('setAppBusy', false);
        }

        return Promise.resolve();
    },

    async removeModelById(context, {model, id}) {
        if (context.getters.isAppBusy || !model || !id) return;
        context.commit('setAppBusy', true);

        try {
            var key = context.getters.apiKey,
                resp = await ApiController.deleteModel(key, model, id);

            if (!resp.ok && [401, 403].includes(resp.status)) {
                // logout & redirect to main page if session was destroyed
                context.commit('setApiKey', '');
                router.push('/');
                context.commit('setUser', '');
                EventBus.$emit('SHOW_NOTIFICATION', {message: resp.statusText, 'type': 'error'});
            } else if (resp && resp.status == 204) {
                    let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                    context.commit(`${model}/remove${modelUF}`, id);
                    EventBus.$emit('SHOW_NOTIFICATION', {message: 'Item has been successfully removed!', 'type': 'success'});
                    router.push(`/${model}/`);
            } else {
                    context.commit('setIsItemError', true);
                    context.commit('setCurrentItem', null);
            }
        } catch(e) {
            console.log(e);
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
