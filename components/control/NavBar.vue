<template>
<b-navbar toggleable="md" :type="color" :variant="color" class="mb-4">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand to="/">Learn english</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item to="/practice">Practice</b-nav-item>
      <b-nav-item v-if="user" to="/dictionary">Dictionary</b-nav-item>
    </b-navbar-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-form @keyup.enter.prevent="getWordFromDictionary">
        <b-form-input size="sm" class="mr-sm-2" v-model="searchWord" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0 d-flex justify-content-center align-items-center" type="submit"
        @click.prevent="getWordFromDictionary"><i class="material-icons md-light">search</i></b-button>
      </b-nav-form>
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          User
        </template>
        <b-dropdown-item v-if="!user" to="/authUser/auth-signin">SignIn</b-dropdown-item>
        <b-dropdown-item v-if="!user" to="/authUser/auth-signup">SignUp</b-dropdown-item>
        <b-dropdown-item v-b-popover.hover="user.email" :title="user.name" v-if="user" to="/profile">Profile</b-dropdown-item>
        <logout v-if="user"/>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
import Logout from '~/components/user/Logout.vue'
export default {
  name: 'navbar',
  components: {
    logout : Logout
  },
  data () {
    return {
      searchWord: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.appLogic.user
    },
    color () {
      if (this.$store.state.colorScheme.isColorDark) {
        return 'dark'
      } else {
        return 'light'
      }
    }
  },
  methods: {
    getWordFromDictionary () {
      if (this.searchWord) {
        this.$router.push("/dictionary/" + this.searchWord.toLowerCase())
        this.searchWord = ''
      } 
    }
  }
}
</script>
