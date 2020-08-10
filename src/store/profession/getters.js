const getters = {
  getProfessionById: state => id => {
    return state.professions.find(profession => profession.profession_id === id);
  }
};

export default getters;
