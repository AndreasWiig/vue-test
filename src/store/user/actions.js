const actions = {
    removeUser({ commit }, user) {
        commit('REMOVE_USER', user);
    },

    addNewUser({ commit }, user) {
        commit('ADD_NEW_USER', user)
    }
};

export default actions;