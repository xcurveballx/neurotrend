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
    }
  }
};
