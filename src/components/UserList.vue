<template>
  <table class="table-auto mx-auto my-10">
    <thead>
      <th class="px-4 py-2" v-text="'Namn'" />
      <th class="px-4 py-2" v-text="'Date of Birth'" />
      <th class="px-4 py-2" v-text="'Age'" />
      <th class="px-4 py-2" v-text="'Profession'" />
      <th class="px-4 py-2" v-text="'Country'" />
      <th class="px-4 py-2" v-text="'Favorite Quote'" />
      <th class="px-4 py-2" v-text="''" />
    </thead>
    <tbody>
      <tr v-for="(user, key) in users" :key="key">
        <td
          class="border px-4 py-2"
          v-text="user.firstName + ' ' + user.lastName"
        />
        <td class="border px-4 py-2" v-text="user.birthDate" />
        <td class="border px-4 py-2" v-text="userAge(user)" />
        <td
          class="border px-4 py-2"
          v-text="getProfessionById(user.profession_id).text"
        />
        <td
          class="border px-4 py-2"
          v-text="getCountryById(user.country_id).text"
        />
        <td class="border px-4 py-2" v-text="user.quote" />
        <td class="px-4 py-2">
          <button-component
            class="btn-red"
            :on-click="() => removeRow(user)"
            :button-text="'Remove'"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import User from './User';
import { mapState, mapActions, mapGetters } from "vuex";
import ButtonComponent from "./Button.vue";

export default {
  name: "UserList",
  components: {
    ButtonComponent
  },
  data() {
    return {
      selected: []
    };
  },
  computed: {
    ...mapState({
      users: state => state.userModule.users,
      professions: state => state.professionModule.professions
    }),
    ...mapGetters(["getProfessionById", "getCountryById"])
  },
  methods: {
    ...mapActions(["removeUser"]),
    removeRow(user) {
      this.$store.dispatch("removeUser", user);
    },
    userAge(user) {
      const birthDateInMilliseconds = new Date(user.birthDate).getTime();
      const ageInMilliSeconds = Date.now() - birthDateInMilliseconds;
      const age = new Date(ageInMilliSeconds).getUTCFullYear() - 1970;
      return age;
    }
  },
  mounted() {
    console.log(this.users);
  }
};
</script>

<style scoped>
.btn-red {
  background-color: crimson;
}
</style>
