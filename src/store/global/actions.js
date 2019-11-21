import ApiController from './ApiController.js';
import router from '@/router';

export const actions = {
    async createNotification(context, {message, type}) {
        let notification = {message, type};
        notification.id = + new Date();

        context.commit("setNotification", notification);
        setTimeout(() => {
            context.commit("clearNotification", notification.id)
        }, 5000);
    },

    async clearCurrentData(context) {
        context.commit("clearCurrentCount");
        context.commit("dog/clearDog");
        context.commit("payment/clearPayment");
        context.commit("trustee/clearTrustee");
        context.commit("setPrevPage", null);
        context.commit("setNextPage", null);
        context.commit("setCount", 0);
    },

    async clearCurrentFlags(context) {
        context.commit('setApiKey', '');
        context.commit('setUser', '');
        context.commit('setAppBusy', false);
        context.commit('setIsLoading', true);
        context.commit('setIsItemLoading', true);
        context.commit('setIsError', false);
        context.commit('setIsItemError', false);
        context.commit('clearIsMenuShownOnMob');
        context.commit('setValidationErrors');
    },

    async login(context, {user, pass}) {
        if (context.getters.isAppBusy || !user || !pass) return;
        context.commit('setAppBusy', true);

        try {
            let resp = await ApiController.login(user, pass);
            if (!resp.ok && [401].includes(resp.status)) {
                context.dispatch('createNotification', {message: resp.statusText + ': invalid login/password', 'type': 'error'});
            } else {
                let {status = '', token = false, message = 'Something went wrong :('} = resp;
                if (status == 'OK' && token) {
                    context.commit('setUser', user);
                    context.commit('setApiKey', token);
                    router.push('/home/');
                } else {
                    context.dispatch('createNotification', {message, 'type': 'error'});
                }
            }
        } catch(e) {
            context.dispatch('createNotification', {message: e.message, 'type': 'error'});
        }
        context.dispatch('clearBusyFlag');
    },

    async logout(context) {
        if (context.getters.isAppBusy) return;
        context.commit('setAppBusy', true);

        try {
            let resp = await ApiController.logout(context.getters.apiKey);
            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.dispatch('accessDenied', resp.statusText);
            } else {
                context.dispatch('clearCurrentFlags');
                router.push('/');
                context.dispatch('createNotification', {message: resp.message, 'type': 'success'});
            }
        } catch(e) {
            context.dispatch('createNotification', {message: e.message, 'type': 'error'});
        }
        context.dispatch('clearBusyFlag');
    },

    async getModel(context, {model, pageURL = null, count = 0}) {
        if (context.getters.isAppBusy || !model) return;
        if (!pageURL && context.getters[`${model}/${model}`]) return;
        context.commit('setAppBusy', true);

        try {
            let key = context.getters.apiKey,
                resp = await ApiController.fetchModel(key, model, pageURL);
            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.dispatch('accessDenied', resp.statusText);
            } else {
                context.commit('setIsLoading', false);
                if (resp && resp.results) {
                    // because it is 'dog' in urls and 'Dog' in actions' names
                    let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                    context.commit(`${model}/clear${modelUF}`);
                    context.commit(`${model}/set${modelUF}`, resp.results);
                    context.commit(`setPrevPage`, resp.previous);
                    context.commit(`setCount`, resp.count);
                    context.commit(`setCurrentCount`, count);
                    context.commit(`setNextPage`, resp.next);
                } else {
                    context.commit('setIsError', true);
                }
            }
        } catch(e) {
            context.commit('setIsError', true);
        }
        context.dispatch('clearBusyFlag');
    },

    async getModelById(context, {model, id}) {
        if (context.getters.isAppBusy || !model || !id) return;
        context.commit('setAppBusy', true);

        try {
            let key = context.getters.apiKey,
                resp = await ApiController.fetchModelById(key, model, id);
            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.dispatch('accessDenied', resp.statusText);
            } else {
                // if the model has dependencies, go get them!
                let dogs = [], trustees = [];
                if (resp && resp.dog) {
                    resp.dog = await ApiController.fetchModelById(key, 'dog', resp.dog);
                    // now we need the full fist of model items
                    for await (let results of ApiController.fetchModelCompletely(key, 'dog')) {
                        dogs.push(...results);
                    }
                    context.commit('dog/setDog', dogs);
                }
                if (resp && resp.trustee) {
                    resp.trustee = await ApiController.fetchModelById(key, 'trustee', resp.trustee);

                    for await (let results of ApiController.fetchModelCompletely(key, 'trustee')) {
                        trustees.push(...results);
                    }
                    context.commit('trustee/setTrustee', trustees);
                }

                context.commit('setIsItemLoading', false);

                if (resp && resp.id) {
                    context.commit('setCurrentItem', resp);
                } else {
                    context.dispatch('setErrorFlag');
                }
            }
        } catch(e) {
            context.dispatch('setErrorFlag');
        }
        context.dispatch('clearBusyFlag');
    },

    async updateModel(context, {model, id, data}) {
        if (context.getters.isAppBusy || !model || !id || !data) return;
        context.commit('setAppBusy', true);

        try {
            let key = context.getters.apiKey,
                resp = await ApiController.updateModel(key, model, id, data);

            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.dispatch('accessDenied', resp.statusText);
            } else if (!resp.ok && [400].includes(resp.status)) {
                context.dispatch('wrongDataFormat', resp);
            } else {
                // if the model has dependencies, go get them!
                if (resp && resp.dog) {
                    resp.dog = await ApiController.fetchModelById(key, 'dog', resp.dog);
                }
                if (resp && resp.trustee) {
                    resp.trustee = await ApiController.fetchModelById(key, 'trustee', resp.trustee);
                }

                if (resp && resp.id) {
                    let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                    context.commit('setCurrentItem', resp);
                    context.commit('setValidationErrors'); // clears val. errors
                    context.commit('toggleEditMode');
                    context.commit(`${model}/update${modelUF}`, resp);
                    context.dispatch('createNotification', {message: 'Item has been successfully updated!', 'type': 'success'});
                } else {
                    context.dispatch('setErrorFlag');
                }
            }
        } catch(e) {
            context.dispatch('setErrorFlag');
        }
        context.dispatch('clearBusyFlag');
    },

    async createModel(context, {model, data}) {
        if (context.getters.isAppBusy || !model) return;
        context.commit('setAppBusy', true);

        try {
            let key = context.getters.apiKey,
                resp = await ApiController.createModel(key, model, data);
            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.dispatch('accessDenied', resp.statusText);
            } else if (!resp.ok && [400].includes(resp.status)) {
                context.dispatch('wrongDataFormat', resp);
            } else {
                if (resp && resp.id) {
                    let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                    context.commit('setValidationErrors');
                    context.commit(`${model}/add${modelUF}`, resp);
                    context.dispatch('createNotification', {message: 'Item has been successfully added!', 'type': 'success'});
                    router.push(`/${model}/`);
                } else {
                    context.dispatch('setErrorFlag');
                }
            }
        } catch(e) {
            context.dispatch('setErrorFlag');
        }
        context.dispatch('clearBusyFlag');
    },

    async removeModelById(context, {model, id}) {
        if (context.getters.isAppBusy || !model || !id) return;
        context.commit('setAppBusy', true);

        try {
            let key = context.getters.apiKey,
                resp = await ApiController.deleteModel(key, model, id);
            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.dispatch('accessDenied', resp.statusText);
            } else if (resp && resp.status == 204) {
                let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                context.commit(`${model}/remove${modelUF}`, id);
                context.dispatch('createNotification', {message: 'Item has been successfully removed!', 'type': 'success'});
                router.push(`/${model}/`);
            } else {
                context.dispatch('setErrorFlag');
            }
        } catch(e) {
            context.dispatch('setErrorFlag');
        }
        context.dispatch('clearBusyFlag');
    },

    async accessDenied(context, msg) {
        context.dispatch('clearCurrentFlags');
        router.push('/');
        context.dispatch('createNotification', {message: msg, 'type': 'error'});
    },

    async wrongDataFormat(context, resp) {
        context.dispatch('createNotification', {message: resp.statusText, 'type': 'error'});
        context.commit('setValidationErrors', await resp.json());
    },

    async setErrorFlag(context) {
        context.commit('setIsItemError', true);
        context.commit('setCurrentItem', null);
    },

    async clearBusyFlag(context) {
        if (context.getters.isAppBusy) context.commit('setAppBusy', false);
    }
};
