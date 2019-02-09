<template>
  <div class="loginWithGoogle">
    <b-button variant="primary" @click.prevent="onSigninGoogle" class="google">Login with
      <img src="/image/google.png">oogle
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'loginWithGoogle',
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
