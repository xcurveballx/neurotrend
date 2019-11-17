export const dog = {
    namespaced: true,
    state: {
        dog: null,
    },
    getters: {
        dog: state => state.dog
    },
    mutations: {
        setDog(state, dog) {
            state.dog = dog;
        }
    }
};
