<template>
  <div class="login-with-google">
    <b-button variant="light" @click.prevent="onSigninGoogle" class="google">{{t('Login with')}}
      <img src="/image/google.png">oogle
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'login-with-google',
  computed: {
    user () {
      return this.$store.state.appLogic.user
    },
    error () {
      return this.$store.state.appLogic.error
    },
    loading () {
      return this.$store.state.appLogic.loading
    }
  },
  methods: {
    onSigninGoogle () {
      this.$store.dispatch('signUserInGoogle')
    }
  }
}
</script>
