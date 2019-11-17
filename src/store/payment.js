export const payment = {
    namespaced: true,
    state: {
        payment: null,
    },
    getters: {
        payment: state => state.payment,
    },
    mutations: {
        setPayment(state, payment) {
            state.payment = payment;
        }
    }
};
