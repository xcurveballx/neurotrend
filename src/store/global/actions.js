import ApiController from './ApiController.js';
import router from '@/router';

export const actions = {
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

    async clearCurrentData(context) {
        context.commit("clearCurrentCount");
        context.commit("dog/clearDog");
        context.commit("payment/clearPayment");
        context.commit("trustee/clearTrustee");
        context.commit("setPrevPage", null);
        context.commit("setNextPage", null);
        context.commit("setCount", 0);
        return Promise.resolve();
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
        return Promise.resolve();
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

        if (context.getters.isAppBusy) {
            context.commit('setAppBusy', false);
        }

        return Promise.resolve();
    },

    async logout(context) {
        let {status = '', message = 'Something went wrong :('} = await ApiController.logout(context.getters.apiKey);

        if (status == 'OK') {
            context.dispatch('clearCurrentFlags');
            router.push('/');
            context.dispatch('createNotification', {message, 'type': 'success'});
        } else {
            context.dispatch('createNotification', {message, 'type': 'error'});
        }
        return Promise.resolve();
    },

    async getModel(context, {model, pageURL = null, count = 0}) {
        if (context.getters.isAppBusy || !model) return;
        if (!pageURL && context.getters[`${model}/${model}`]) return;
        context.commit('setAppBusy', true);

        try {
            let key = context.getters.apiKey,
                resp = await ApiController.fetchModel(key, model, pageURL);

            // logout & redirect to main page if session was destroyed
            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.dispatch('clearCurrentFlags');
                router.push('/');
                context.dispatch('createNotification', {message: resp.statusText, 'type': 'error'});
            } else {
                // because it is 'dog' in urls and 'Dog' in actions' names
                let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;

                context.commit('setIsLoading', false);

                if (resp && resp.results) {
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

        if (context.getters.isAppBusy) {
            context.commit('setAppBusy', false);
        }

        return Promise.resolve();
    },

    async getModelById(context, {model, id}) {
        if (context.getters.isAppBusy || !model || !id) return;
        context.commit('setAppBusy', true);

        try {
            let key = context.getters.apiKey,
                resp = await ApiController.fetchModelById(key, model, id);

            // logout & redirect to main page if session was destroyed
            if (!resp.ok && [401, 403].includes(resp.status)) {
                context.dispatch('clearCurrentFlags');
                router.push('/');
                context.dispatch('createNotification', {message: resp.statusText, 'type': 'error'});
            } else {
                // if the model has dependencies, go get them!
                if (resp && resp.dog) {
                    resp.dog = await ApiController.fetchModelById(key, 'dog', resp.dog);

                    // now we need the full fist of model items
                    let dogs = [];
                    for await (let results of ApiController.fetchModelCompletely(key, 'dog')) {
                        dogs.push(...results);
                    }
                    context.commit('dog/setDog', dogs);
                }

                if (resp && resp.trustee) {
                    resp.trustee = await ApiController.fetchModelById(key, 'trustee', resp.trustee);

                    // now we need the full fist of model items
                    let trustees = [];
                    for await (let results of ApiController.fetchModelCompletely(key, 'trustee')) {
                        trustees.push(...results);
                    }
                    context.commit('trustee/setTrustee', trustees);
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
            let key = context.getters.apiKey,
                resp = await ApiController.updateModel(key, model, id, data);

            if (!resp.ok && [401, 403].includes(resp.status)) {
                // logout & redirect to main page if session was destroyed
                context.dispatch('clearCurrentFlags');
                router.push('/');
                context.dispatch('createNotification', {message: resp.statusText, 'type': 'error'});
            } else if (!resp.ok && [400].includes(resp.status)) {
                // wrong data format
                context.dispatch('createNotification', {message: resp.statusText, 'type': 'error'});
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
                    context.dispatch('createNotification', {message: 'Item has been successfully updated!', 'type': 'success'});
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
            let key = context.getters.apiKey,
                resp = await ApiController.createModel(key, model, data);

            if (!resp.ok && [401, 403].includes(resp.status)) {
                // logout & redirect to main page if session was destroyed
                context.dispatch('clearCurrentFlags');
                router.push('/');
                context.dispatch('createNotification', {message: resp.statusText, 'type': 'error'});
            } else if (!resp.ok && [400].includes(resp.status)) {
                // wrong data format
                context.dispatch('createNotification', {message: resp.statusText, 'type': 'error'});
                context.commit('setValidationErrors', await resp.json());
            } else {
                if (resp && resp.id) {
                    let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                    context.commit('setValidationErrors');
                    context.commit(`${model}/add${modelUF}`, resp);
                    context.dispatch('createNotification', {message: 'Item has been successfully added!', 'type': 'success'});
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
            let key = context.getters.apiKey,
                resp = await ApiController.deleteModel(key, model, id);

            if (!resp.ok && [401, 403].includes(resp.status)) {
                // logout & redirect to main page if session was destroyed
                context.dispatch('clearCurrentFlags');
                router.push('/');
                context.dispatch('createNotification', {message: resp.statusText, 'type': 'error'});
            } else if (resp && resp.status == 204) {
                    let modelUF = `${model[0].toUpperCase()}${model.slice(1)}`;
                    context.commit(`${model}/remove${modelUF}`, id);
                    context.dispatch('createNotification', {message: 'Item has been successfully removed!', 'type': 'success'});
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
};
