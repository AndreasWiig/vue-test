const getters = {
    getCountry: state => id => {
      let userCountry = state.countries.find(country => country.country_id === id);
      return userCountry.text;

    }
  };
  
  export default getters;