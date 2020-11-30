<template>
  <table class="table-auto mx-auto my-10">
    <thead>
      <th
        class="px-4 py-2"
        v-text="'Namn'"
      />
      <th
        class="px-4 py-2"
        v-text="'Date of Birth'"
      />
      <th
        class="px-4 py-2"
        v-text="'Age'"
      />
      <th
        class="px-4 py-2"
        v-text="'Profession'"
      />
      <th
        class="px-4 py-2"
        v-text="'Country'"
      />
      <th
        class="px-4 py-2"
        v-text="'Favorite Quote'"
      />
      <th
        class="px-4 py-2"
        v-text="''"
      />
    </thead>
    <tbody>
      <tr
        v-for="(user, key) in users"
        :key="key"
      >
        <td
          class="border px-4 py-2"
          v-text="user.firstName + ' ' + user.lastName"
        />
        <td
          class="border px-4 py-2"
          v-text="user.birthDate"
        />
        <td
          class="border px-4 py-2"
          v-text="userAge(user)"
        />
        <td
          class="border px-4 py-2"
          v-text="user.profession_id"
        />
        <td
          class="border px-4 py-2"
          v-text="user.country_id"
        />
        <td
          class="border px-4 py-2"
          v-text="user.quote"
        />
        <td
          class="px-4 py-2"
        >
          <button-component
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            :on-click="(user) => removeRow(user)"
            :button-text="'Remove'"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ButtonComponent from './Button.vue';

export default {
  name: 'UserList',
  components: {
    ButtonComponent,
  },
  data() {
    return {
      selected: []
    };
  },
  computed: {
    ...mapState({
        users: state => state.userModule.users,
        professions: state => state.professionModule.professions,
        countries: state => state.countriesModule.countries,
    }),
  },
  methods: {
    ...mapMutations({
      setProfession: 'SET_PROFESSION',
      setCountry: 'SET_COUNTRY',
    }),
    ...mapActions([
      'removeUser',
    ]),
    removeRow() {
      this.removeUser(this.user);
    },
    userAge(user) {
      const birthDate = user.birthDate;
      const todaysDate = Date.now();
      const birthDateInMilliseconds = (new Date(birthDate)).getTime();
      const ageInMilliSeconds = todaysDate - birthDateInMilliseconds;
      const age = (new Date(ageInMilliSeconds)).getUTCFullYear() - 1970;
      return age;
    },
  },
}
</script>