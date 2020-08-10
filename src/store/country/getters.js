const getters = {
  getCountryById: state => id => {
    return state.countries.find(country => country.country_id === id);
  }
};

export default getters;
