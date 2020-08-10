<template>
  <form id="add-user-form" class="md:w-8/12 mx-auto my-10">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="add-user-form-label"
          for="grid-first-name"
          v-text="'First Name'"
        />
        <input
          class="add-user-form-input"
          id="grid-first-name"
          type="text"
          placeholder="Enter First Name"
          v-model="user.firstName"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="add-user-form-label"
          for="grid-last-name"
          v-text="'Last Name'"
        />
        <input
          class="add-user-form-input"
          id="grid-last-name"
          type="text"
          placeholder="Enter Last Name"
          v-model="user.lastName"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="add-user-form-label"
          for="grid-date"
          v-text="'Date of Birth'"
        />
        <input
          class="add-user-form-input"
          id="grid-date"
          type="date"
          v-model="user.birthDate"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="add-user-form-label"
          for="grid-quote"
          v-text="'Favorite Quote'"
        />
        <input
          class="add-user-form-input"
          id="grid-quote"
          type="text"
          placeholder="Enter Quote"
          v-model="user.quote"
        />
      </div>

      <DropDown
        :options="professions"
        :changeSelect="selectProfession"
        :label="`Select Profession`"
      />

      <DropDown
        :options="countries"
        :changeSelect="selectCountry"
        :label="`Select Country`"
      />
    </div>
    <button-component
      class="btn-blue"
      :on-click="handleAddUserSubmit"
      :button-text="'Save User'"
    />
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import DropDown from "./DropDown";
import ButtonComponent from "./Button";

export default {
  name: "AddUser",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        birthDate: null,
        quote: "",
        profession_id: 0,
        country_id: 0
      }
    };
  },
  components: {
    DropDown,
    ButtonComponent
  },
  computed: {
    ...mapState({
      professions: state => state.professionModule.professions,
      countries: state => state.countryModule.countries
    })
  },
  methods: {
    /** Vuex Spreaders */
    ...mapMutations({
      setProfession: "SET_PROFESSION"
    }),
    ...mapActions(["addNewUser"]),

    /** Functions */
    handleAddUserSubmit() {
      /** Dispatch form data to user action */
      this.$store.dispatch("addNewUser", this.user);

      /** Reset form data */
      this.user = {
        firstName: "",
        lastName: "",
        birthDate: null,
        quote: "",
        profession_id: 0,
        country_id: 0
      };
    },
    selectProfession(value) {
      this.user.profession_id = parseInt(value);
    },
    selectCountry(value) {
      this.user.country_id = parseInt(value);
    }
  }
};
</script>

<style scoped></style>
