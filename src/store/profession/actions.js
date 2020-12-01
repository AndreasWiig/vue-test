const actions = {
    addNewUser: ({ commit }, user) => {
      commit("SET_PROFESSION", user);
    },
  };
  
  export default actions;