const getters = {
    getProfession: state => id => {
      let userProfession = state.professions.find(profession => profession.profession_id === id);
      return userProfession.text;
    }
  };
  
  export default getters;