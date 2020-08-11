const actions = {
  addNewUser: ({ commit }, user) => {
    commit("APPEND_USER", user);
  },
  removeUser: ({ commit }, user) => {
    commit("REMOVE_USER", user.id);
  }
};

export default actions;
