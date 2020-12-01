<template>
  <form class="md:w-8/12 mx-auto my-10">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
          v-text="'First Name'"
        />
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          placeholder="Enter First Name"
          v-model="user.firstName"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
          v-text="'Last Name'"
        />
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-last-name"
          type="text"
          placeholder="Enter Last Name"
          v-model="user.lastName"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-date"
          v-text="'Date of Birth'"
        />
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-date"
          type="date"
          v-model="user.birthDate"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-quote"
          v-text="'Favorite Quote'"
        />
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-quote"
          type="text"
          placeholder="Enter Quote"
          v-model="user.quote"
        />
      </div>
      <drop-down
        :options="professions"
        :changeSelect="setProfession"
        :label="'Profession'"
      />
      <drop-down
        :options="countries"
        :changeSelect="setCountry"
        :label="'Country'"
      />
    </div>
    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" @click.prevent="addUser">
      Save User
    </button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DropDown from './DropDown';

export default {
  name: 'AddUser',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        birthDate: null,
        quote: '', 
        profession_id: 1,
        country_id: 1
      },
    };
  },
  components: {
    DropDown,
  },
  computed: {
    ...mapState({
      professions: state => state.professionModule.professions,
      countries: state => state.countryModule.countries
    })
  },
  methods: {
    ...mapActions(["addNewUser"]),
    addUser() {
      this.$store.dispatch("addNewUser", this.user);
      this.user = {
        firstName: '',
        lastName: '',
        birthDate: null,
        quote: '', 
        profession_id: 1,
        country_id: 1
      };
    },
    setProfession(id) {
      this.user.profession_id = parseInt(id) + 1;
    },
    setCountry(id) {
      this.user.country_id = parseInt(id) + 1;
    }
  }
}
</script>

<style scoped>
</style>