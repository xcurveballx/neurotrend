export const trustee = {
    namespaced: true,
    state: {
        trustee: null,
    },
    getters: {
        trustee: state => state.trustee,
    },
    mutations: {
        setTrustee(state, trustee) {
            state.trustee = trustee;
        },
        clearTrustee(state) {
            state.trustee = null;
        },
        updateTrustee(state, updatedTrustee) {
            if (!state.trustee) return;

            for (let trustee of state.trustee) {
                if (trustee.id == updatedTrustee.id) {
                    trustee.fio = updatedTrustee.fio;
                    trustee.birth_time = updatedTrustee.birth_time;
                    trustee.photo = updatedTrustee.photo;
                    break;
                }
            }
        },
        addTrustee(state, newTrustee) {
            if (!state.trustee) return;
            state.trustee.push(newTrustee);
        },
        removeTrustee(state, id) {
            if (!state.trustee) return;

            for (let i = 0; i < state.trustee.length; i++) {
                if (state.trustee[i].id == id) {
                    state.trustee.splice(i, 1);
                    break;
                }
            }
        },
    }
};
