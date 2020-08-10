const mutations = {
  APPEND_USER: (state, user) => {
    state.users.push(user);
  },
  REMOVE_USER: (state, userId) => {
    let index = state.users.findIndex(user => user.id === userId);
    let value = index > -1 ? state.users.splice(index, 1) : false;
    console.log(value);
  }
};

export default mutations;
