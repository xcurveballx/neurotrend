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
        },
        updatePayment(state, updatedPayment) {
            if (!state.payment) return;

            for (let payment of state.payment) {
                if (payment.id == updatedPayment.id) {
                    payment.purpose = updatedPayment.purpose;
                    payment.sum = updatedPayment.sum;
                    payment.time = updatedPayment.time;
                    payment.dog = updatedPayment.dog;
                    payment.trustee = updatedPayment.trustee;
                    break;
                }
            }
        },
        addPayment(state, newPayment) {
            if (!state.payment) return;
            state.payment.push(newPayment);
        },
        removePayment(state, id) {
            if (!state.payment) return;

            for (let i = 0; i < state.payment.length; i++) {
                if (state.payment[i].id == id) {
                    state.payment.splice(i, 1);
                    break;
                }
            }
        },
    }
};
