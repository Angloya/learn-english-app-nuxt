<template>
    <b-dropdown-item @click="logout">Signout</b-dropdown-item>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
