<template>
<b-navbar toggleable="md" :type="color" :variant="color" class="mb-4 border-bottom">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand to="/">Learn english</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav :key="lang">
      <b-nav-item to="/practice"> <b-nav-text v-translate>Practice</b-nav-text></b-nav-item>
      <b-nav-item to="/games"><b-nav-text v-translate>Games</b-nav-text></b-nav-item>
      <b-nav-item v-if="user" to="/dictionary"><b-nav-text v-translate>Dictionary</b-nav-text></b-nav-item>
    </b-navbar-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-form @keyup.enter.prevent="getWordFromDictionary">
        <b-form-input size="sm" class="mr-sm-2" v-model="searchWord" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0 d-flex justify-content-center align-items-center" type="submit"
        @click.prevent="getWordFromDictionary"><i class="material-icons md-light">search</i></b-button>
      </b-nav-form>
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item :variant="color" @click="showAppInEn">EN</b-dropdown-item>
        <b-dropdown-item :variant="color" @click="showAppInRu">RU</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right :key="lang">
        <!-- Using button-content slot -->
        <template slot="button-content">
          User
        </template>
        <b-progress :value="userKnowledge ? userKnowledge.knowledgeDay : 0" class=" mx-2 my-2" variant="success" :max="maxTargetDay"/>
        <b-dropdown-item v-if="!user" to="/authUser/auth-signin" v-translate>SignIn</b-dropdown-item>
        <b-dropdown-item v-if="!user" to="/authUser/auth-signup" v-translate>SignUp</b-dropdown-item>
        <b-dropdown-item v-b-popover.hover="`level: ${userKnowledge ? userKnowledge.level : '0'}`" :title="user.name" v-if="user" to="/profile" v-translate>Profile</b-dropdown-item>
        <logout v-if="user"/>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
import Logout from '~/components/user/logout.vue'
export default {
  name: 'navbar',
  components: {
    logout : Logout
  },
  data () {
    return {
      searchWord: '',
      lang: ''
    }
  },
  computed: {
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
        this.$router.push("/dictionary/word/" + this.searchWord.toLowerCase())
        this.searchWord = ''
      } 
    },
    showAppInEn() {
      this.$translate.setLang('english');
      this.lang = 'en'
    },
    showAppInRu() {
      this.$translate.setLang('russian');
      this.lang = 'ru'
    }
  },
  mixins: [
    require('~/mixins/user-base').default
  ]
}
</script>
