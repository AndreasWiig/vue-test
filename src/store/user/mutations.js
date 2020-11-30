const mutations = {
    REMOVE_USER: (state, user) => state.users = state.users.filter(x => x.id !== user.id),
    ADD_NEW_USER: (state, user) => {
        let idArray = state.users.map(x => x.id);
        let highestNumber = Math.max(...idArray);
        let uniqId = highestNumber + 1;
        user.id = uniqId; 
        state.users = [...state.users, user];
    },
};

export default mutations;