<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="auto" md="auto">
        <b-img rounded width="200"
          height="300"
          thumbnail
          :src='photoURL'
          fluid alt="userIcon"/>
      </b-col>
      <b-col cols="auto" md="auto">
        <h4 class="m-3">{{ user.name }}</h4>
        <p class="m-3"><b>Your email: </b> {{ user.email }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    user () {
         return this.$store.state.appLogic.user || {}
    },
    photoURL () {
      return this.user.photoURL || "/image/avatar.png"
    }
  }
}
</script>
