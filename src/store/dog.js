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
        },
        clearDog(state) {
            state.dog = null;
        },
        updateDog(state, updatedDog) {
            if (!state.dog) return;

            for (let dog of state.dog) {
                if (dog.id == updatedDog.id) {
                    dog.name = updatedDog.name;
                    dog.kind = updatedDog.kind;
                    dog.birth_time = updatedDog.birth_time;
                    dog.reg_time = updatedDog.reg_time;
                    dog.photo = updatedDog.photo;
                    dog.trustee = updatedDog.trustee;
                    break;
                }
            }
        },
        addDog(state, newDog) {
            if (!state.dog) return;
            state.dog.push(newDog);
        },
        removeDog(state, id) {
            if (!state.dog) return;

            for (let i = 0; i < state.dog.length; i++) {
                if (state.dog[i].id == id) {
                    state.dog.splice(i, 1);
                    break;
                }
            }
        },
    }
};
