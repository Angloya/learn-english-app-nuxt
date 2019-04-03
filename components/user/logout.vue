<template>
    <b-dropdown-item @click="logout" v-translate>Signout</b-dropdown-item>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.appLogic.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
