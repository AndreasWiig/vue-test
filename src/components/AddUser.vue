<template>
  <form id="add-user-form" class="md:w-8/12 mx-auto my-10">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full h-5 px-3 mb-6">
        <span
          class="form-error-paragraph md:w-1/3 md:mb-0"
          v-if="this.isFirstNameInvalid"
        >
          {{ this.errorMsg }}
        </span>
        <span
          class="form-error-paragraph md:w-1/3 md:mb-0"
          v-if="this.isLastNameInvalid"
        >
          {{ this.errorMsg }}
        </span>
        <span
          class="form-error-paragraph md:w-1/3 md:mb-0"
          v-if="this.isBirthDateInvalid"
        >
          {{ this.errorMsg }}
        </span>
      </div>

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
    <button class="btn-blue" @click.prevent="handleAddUserSubmit">
      Save User
    </button>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DropDown from "./DropDown";

export default {
  name: "AddUser",
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        birthDate: null,
        quote: null,
        profession_id: 0,
        country_id: 0
      },
      errorMsg: null,
      isFirstNameInvalid: false,
      isLastNameInvalid: false,
      isBirthDateInvalid: false
    };
  },
  components: {
    DropDown
  },
  computed: {
    ...mapState({
      professions: state => state.professionModule.professions,
      countries: state => state.countryModule.countries
    })
  },
  methods: {
    /** Vuex Spreaders. */
    ...mapActions(["addthis.user"]),
    /** Functions. */
    handleAddUserSubmit() {
      /** Reset validation and error message values. */
      this.errorMsg = null;
      this.isFirstNameInvalid = false;
      this.isLastNameInvalid = false;
      this.isBirthDateInvalid = false;

      /**
       * Simple error handlng. Will return at the first matched instance and give a very
       * basic error message.
       */
      if (!this.user.firstName || !this.user.firstName.match(/^[A-Za-z]+$/)) {
        this.isFirstNameInvalid = true;
        this.errorMsg = "Invalid first name, only letters A-Z allowed.";
        return;
      }

      if (!this.user.lastName || !this.user.lastName.match(/^[A-Za-z]+$/)) {
        this.isLastNameInvalid = true;
        this.errorMsg = "Invalid last name, only letters A-Z allowed.";
        return;
      }

      /** Validate that age is between 18 and 100. */
      let now = new Date();
      let currentYear = now.getFullYear();
      let birthDate = new Date(this.user.birthDate).getFullYear();

      if (
        !this.user.birthDate ||
        !(
          currentYear - birthDate > 18 ||
          currentYear - this.user.birthDate < 100
        )
      ) {
        this.isBirthDateInvalid = true;
        this.errorMsg = "Birth date must be above 18 and below 100 years old.";
        return;
      }

      if (
        !this.isFirstNameInvalid &&
        !this.isLastNameInvalid &&
        !this.isBirthDateInvalid
      ) {
        /** Dispatch form data to user action if all fields are valid. */
        this.$store.dispatch("addNewUser", this.user);

        /** Reset form data. */
        this.user = {
          firstName: "",
          lastName: "",
          birthDate: null,
          quote: "",
          profession_id: 0,
          country_id: 0
        };
      }
    },
    selectProfession(value) {
      this.user.profession_id = parseInt(value) + 1;
    },
    selectCountry(value) {
      console.log("country changed");
      this.user.country_id = parseInt(value) + 1;
      console.log(this.user.country_id);
    }
  }
};
</script>

<style scoped></style>
